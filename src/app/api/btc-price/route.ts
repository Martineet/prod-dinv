import { NextResponse } from 'next/server';

export const revalidate = 60;

export async function GET() {
  try {
    const response = await fetch(
      'https://api.kraken.com/0/public/Ticker?pair=XBTEUR',
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch BTC price from Kraken.');
    }

    const data = (await response.json()) as {
      error?: string[];
      result?: Record<string, { c?: [string, string] }>;
    };

    if (data.error?.length) {
      throw new Error(`Kraken error: ${data.error.join(', ')}`);
    }

    const ticker = Object.values(data.result ?? {})[0];
    const price = Number(ticker?.c?.[0]);

    if (!Number.isFinite(price) || price <= 0) {
      throw new Error('BTC price data unavailable.');
    }

    return NextResponse.json(
      { price },
      {
        headers: {
          'Cache-Control':
            'public, s-maxage=60, stale-while-revalidate=120, max-age=0, must-revalidate',
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not fetch BTC price.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}