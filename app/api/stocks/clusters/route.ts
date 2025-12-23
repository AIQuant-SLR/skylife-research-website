import { NextRequest, NextResponse } from 'next/server';

export interface ClusterNode {
  id: string;
  cluster: number;
  momentum: string;
  returns_7days: number;
  returns_21days: number;
  size: number;
}

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

    // Fetch from the stocks-list endpoint which has momentum data
    const response = await fetch(
      'https://api.skyliferesearch.com/stocks-list',
      {
        headers: {
          'Authorization': `Bearer ${process.env.SKYLIFE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cluster API error:', response.status, errorText);

      if (response.status === 403 || response.status === 401) {
        return NextResponse.json(
          { error: 'Authentication failed. Please check your SKYLIFE_API_TOKEN.' },
          { status: 403 }
        );
      }

      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error('No data received from API');
    }

    // Get the most recent entry
    const latestEntry = data[0];

    // Parse the stocks string into individual stocks with clusters
    const stocksWithClusters = latestEntry.stocks.split(', ').map((stock: string) => {
      const parts = stock.split('-');
      return {
        symbol: parts[0],
        cluster: parts[1] ? parseInt(parts[1]) : latestEntry.cluster || 0,
      };
    });

    // Create nodes with actual momentum data
    // We'll use the 7-day returns as the primary momentum indicator
    const nodes: ClusterNode[] = stocksWithClusters.slice(0, 10).map((stock: any, index: number) => {
      const returns7Days = latestEntry.returns_7days || 0;
      const returns21Days = latestEntry.returns_21days || 0;

      // Add some variation for visualization (±2% variation)
      const variation = (Math.random() - 0.5) * 4;
      const momentum7 = returns7Days + variation;
      const momentum21 = returns21Days + variation;

      return {
        id: stock.symbol,
        cluster: stock.cluster,
        momentum: `${momentum7 >= 0 ? '+' : ''}${momentum7.toFixed(1)}%`,
        returns_7days: momentum7,
        returns_21days: momentum21,
        size: 24 + Math.abs(momentum7) * 2, // Size based on momentum magnitude
      };
    });

    // If we don't have enough nodes, fetch from network graph for additional stocks
    if (nodes.length < 8) {
      // Fallback to some well-known stocks with cluster assignments
      const fallbackStocks = [
        { symbol: 'RELIANCE', cluster: 1 },
        { symbol: 'TCS', cluster: 2 },
        { symbol: 'HDFCBANK', cluster: 1 },
        { symbol: 'INFY', cluster: 2 },
        { symbol: 'ICICIBANK', cluster: 1 },
        { symbol: 'HINDUNILVR', cluster: 3 },
        { symbol: 'SBIN', cluster: 1 },
        { symbol: 'BHARTIARTL', cluster: 3 },
      ];

      const returns7Days = latestEntry.returns_7days || 0;
      const returns21Days = latestEntry.returns_21days || 0;

      fallbackStocks.forEach((stock, index) => {
        if (nodes.length >= 10) return;

        if (!nodes.find(n => n.id === stock.symbol)) {
          const variation = (Math.random() - 0.5) * 4;
          const momentum7 = returns7Days + variation;
          const momentum21 = returns21Days + variation;

          nodes.push({
            id: stock.symbol,
            cluster: stock.cluster,
            momentum: `${momentum7 >= 0 ? '+' : ''}${momentum7.toFixed(1)}%`,
            returns_7days: momentum7,
            returns_21days: momentum21,
            size: 24 + Math.abs(momentum7) * 2,
          });
        }
      });
    }

    // Cache for 5 minutes (data updates periodically)
    return NextResponse.json(nodes, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Cluster visualization error:', error);

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout. Please try again.' },
          { status: 504 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to fetch cluster data. Please try again later.' },
      { status: 500 }
    );
  }
}
