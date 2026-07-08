'use client';

import { useCallback, useEffect, useState } from 'react';
import { fetchBtcPriceEur } from '@/services/btc';

export function useBtcPrice(refreshIntervalMs = 3600000) {
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const nextPrice = await fetchBtcPriceEur();
      setPrice(nextPrice);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load BTC price.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const timeoutId = setTimeout(refresh, 1000);
    const intervalId = setInterval(refresh, refreshIntervalMs);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refresh();
      }
    };
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        refresh();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [refresh, refreshIntervalMs]);

  return { price, loading, error, refresh };
}
