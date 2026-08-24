import { NextResponse } from 'next/server';

// Fear & Greed Index updates once per day — cache for 1 hour
export const revalidate = 3600;

export async function GET() {
  try {
    const response = await fetch(
      'https://api.alternative.me/fng/?limit=1',
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) throw new Error('Failed to fetch Fear & Greed Index.');

    const json = await response.json();
    const item = json?.data?.[0];

    if (!item) throw new Error('Invalid Fear & Greed response.');

    return NextResponse.json(
      {
        value: Number(item.value),
        classification: item.value_classification,
        timestamp: item.timestamp
      },
      {
        headers: {
          'Cache-Control':
            'public, s-maxage=3600, stale-while-revalidate=7200, max-age=0, must-revalidate'
        }
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not fetch Fear & Greed Index.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
