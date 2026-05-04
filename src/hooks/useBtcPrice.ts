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
    const intervalId = setInterval(refresh, refreshIntervalMs);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refresh();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refresh, refreshIntervalMs]);

  return { price, loading, error, refresh };
}
