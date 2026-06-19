import { NextResponse } from 'next/server';

export const revalidate = 60;

export async function GET() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur',
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch BTC price from CoinGecko.');
    }

    const data = await response.json();
    const price = data?.bitcoin?.eur;

    if (!price || typeof price !== 'number') {
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