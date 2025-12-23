import { NextRequest, NextResponse } from 'next/server';
import { NetworkGraphData } from '@/lib/types/network';

export async function GET(req: NextRequest) {
  try {
    // Check if API token is configured
    if (!process.env.SKYLIFE_API_TOKEN) {
      console.error('SKYLIFE_API_TOKEN is not configured');
      return NextResponse.json(
        { error: 'API token not configured. Please add SKYLIFE_API_TOKEN to your environment variables.' },
        { status: 500 }
      );
    }

    const response = await fetch(
      'https://api.skyliferesearch.com/network-graph',
      {
        headers: {
          'Authorization': `Bearer ${process.env.SKYLIFE_API_TOKEN}`,
        },
        // 10 second timeout
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Network graph API error:', response.status, errorText);

      if (response.status === 403 || response.status === 401) {
        return NextResponse.json(
          { error: 'Authentication failed. Please check your SKYLIFE_API_TOKEN.' },
          { status: 403 }
        );
      }

      throw new Error(`API returned status ${response.status}`);
    }

    const rawData = await response.json();

    // Transform the API response to our expected format
    // The API returns { "nif50_centrality_YYYYMMDD_HHMM": [...links] }
    // We need to extract the links and build nodes from them

    let links: any[] = [];
    let latestKey = '';

    // Get the most recent dataset (first key in the object)
    const keys = Object.keys(rawData);
    if (keys.length > 0) {
      latestKey = keys[0];
      links = rawData[latestKey] || [];
    }

    // Build unique nodes from source/target in links
    const nodeSet = new Set<string>();
    const nodeClusterMap = new Map<string, number>();

    links.forEach((link: any) => {
      nodeSet.add(link.source);
      nodeSet.add(link.target);

      // Map community to cluster
      if (link.community !== undefined) {
        nodeClusterMap.set(link.source, link.community);
        nodeClusterMap.set(link.target, link.community);
      }
    });

    // Create nodes array
    const nodes = Array.from(nodeSet).map(id => ({
      id,
      cluster: nodeClusterMap.get(id) || 0,
      size: 12, // Default size
    }));

    // Transform links to our format
    const transformedLinks = links.map((link: any) => ({
      source: link.source,
      target: link.target,
      weight: link.weight,
    }));

    const data: NetworkGraphData = {
      nodes,
      links: transformedLinks,
      timestamp: new Date().toISOString(),
    };

    // Cache for 5 minutes (data updates periodically)
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Network graph error:', error);

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout. Please try again.' },
          { status: 504 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to fetch network graph data. Please try again later.' },
      { status: 500 }
    );
  }
}
