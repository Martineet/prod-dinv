export async function fetchBtcPriceEur(): Promise<number> {
  const response = await fetch('/api/btc-price');

  if (!response.ok) {
    throw new Error('Failed to fetch BTC price.');
  }

  const data = await response.json();
  const price = data?.price;

  if (!price || typeof price !== 'number') {
    throw new Error('BTC price data unavailable.');
  }

  return price;
}