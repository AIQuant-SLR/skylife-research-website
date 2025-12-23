import { NextRequest, NextResponse } from 'next/server';
import { PortfolioAnalysisRequest, PortfolioAnalysisResponse } from '@/lib/types/portfolio';
import { z } from 'zod';

// Validation schema
const portfolioRequestSchema = z.object({
  stocks: z.array(
    z.object({
      symbol: z.string().min(1),
      quantity: z.number().min(1),
    })
  ).min(1).max(5),
  email: z.string().email(),
  uid: z.string().min(1),
  custom_instructions: z.string().optional(),
  market_context: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body
    const validationResult = portfolioRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data: PortfolioAnalysisRequest = validationResult.data;

    // Call external API with server-side API token (hidden from client)
    const response = await fetch(
      'https://mcp-api.skyliferesearch.com/portfolio/analyze',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SKYLIFE_API_TOKEN || ''}`,
        },
        body: JSON.stringify(data),
        // 30 second timeout
        signal: AbortSignal.timeout(30000),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Portfolio API error:', errorText);
      throw new Error(`API returned status ${response.status}`);
    }

    const analysisData: PortfolioAnalysisResponse = await response.json();

    // Add timestamp if not present
    if (!analysisData.timestamp) {
      analysisData.timestamp = new Date().toISOString();
    }

    return NextResponse.json(analysisData, {
      headers: {
        // Don't cache portfolio analysis (user-specific data)
        'Cache-Control': 'private, no-cache',
      },
    });
  } catch (error) {
    console.error('Portfolio analysis error:', error);

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout. Please try again.' },
          { status: 504 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to analyze portfolio. Please try again later.' },
      { status: 500 }
    );
  }
}
