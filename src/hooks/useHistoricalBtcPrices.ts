'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';

export type HistoricalBtcPricePoint = {
  date: string;
  price: number;
};

export function useHistoricalBtcPrices(fromDate = '2013-05-01', toDate?: string) {
  const [data, setData] = useState<HistoricalBtcPricePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);

    let query = supabase
      .from('assets_daily_prices')
      .select('price_date, btc_eur')
      .gte('price_date', fromDate)
      .order('price_date', { ascending: true });

    if (toDate) {
      query = query.lte('price_date', toDate);
    }

    const { data: rows, error: queryError } = await query;

    if (queryError) {
      setError(queryError.message);
      setLoading(false);
      return;
    }

    setData((rows ?? []).map((row) => ({
      date: row.price_date,
      price: Number(row.btc_eur)
    })));
    setError(null);
    setLoading(false);
  }, [fromDate, toDate]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}
