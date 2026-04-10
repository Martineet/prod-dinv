import { NextResponse } from 'next/server';

// Cache CoinGecko response on the server for 5 minutes
export const revalidate = 300;

export async function GET() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur',
      { next: { revalidate: 300 } }
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
      { headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=300' } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not fetch BTC price.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}