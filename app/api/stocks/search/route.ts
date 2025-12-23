import { NextRequest, NextResponse } from 'next/server';
import stocksData from '@/public/data/nse-stocks.json';
import { StockSearchResult } from '@/lib/types/stock';

// Build search index on server startup for fast lookups
const stocksIndex = new Map<string, string>();
Object.entries(stocksData).forEach(([symbol, name]) => {
  stocksIndex.set(symbol.toLowerCase(), name as string);
});

// Create an array for efficient searching
const stocksArray = Array.from(stocksIndex.entries()).map(([symbol, name]) => ({
  symbol: symbol.toUpperCase(),
  name,
  searchKey: `${symbol} ${name}`.toLowerCase(),
}));

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q')?.toLowerCase().trim() || '';

    // Return empty array for very short queries
    if (query.length < 2) {
      return NextResponse.json([]);
    }

    // Search for matches (symbol starts with query OR name contains query)
    const results: StockSearchResult[] = stocksArray
      .filter((stock) => stock.searchKey.includes(query))
      .slice(0, 10) // Limit to top 10 results
      .map(({ symbol, name }) => ({ symbol, name }));

    return NextResponse.json(results, {
      headers: {
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Stock search error:', error);
    return NextResponse.json(
      { error: 'Failed to search stocks' },
      { status: 500 }
    );
  }
}
