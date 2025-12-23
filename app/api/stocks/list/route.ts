import { NextRequest, NextResponse } from 'next/server';

export interface MomentumStock {
  date: string;
  stocks: string;
  cluster?: number;
  returns_21days: number;
  returns_7days: number;
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

    const response = await fetch(
      'https://api.skyliferesearch.com/stocks-list',
      {
        headers: {
          'Authorization': `Bearer ${process.env.SKYLIFE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        // 10 second timeout
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Momentum stocks API error:', response.status, errorText);

      if (response.status === 403 || response.status === 401) {
        return NextResponse.json(
          { error: 'Authentication failed. Please check your SKYLIFE_API_TOKEN.' },
          { status: 403 }
        );
      }

      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();

    // Process data similar to legacy code
    const processedData: MomentumStock[] = data.map((stock: any) => ({
      date: stock.date.split('T')[0], // Extract date part
      stocks: stock.stocks
        .split(', ')
        .map((st: string) => st.split('-')[0]) // Remove cluster info from stock symbols
        .join(', '),
      cluster: stock.cluster,
      returns_21days: stock.returns_21days * 100, // Convert to percentage
      returns_7days: stock.returns_7days * 100, // Convert to percentage
    }));

    // Sort by date (most recent first)
    processedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Return top 10 most recent entries
    const recentData = processedData.slice(0, 10);

    // Cache for 12 hours (matching legacy behavior)
    return NextResponse.json(recentData, {
      headers: {
        'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Momentum stocks error:', error);

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout. Please try again.' },
          { status: 504 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to fetch momentum stocks data. Please try again later.' },
      { status: 500 }
    );
  }
}
