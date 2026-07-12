'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';

export type Referral = {
  name: string;
  link: string;
  updatedDate: string;
};

export function useReferrals() {
  const [data, setData] = useState<Record<string, Referral>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);

    const { data: rows, error: queryError } = await supabase
      .from('referrals')
      .select('name, link, updated_date');

    if (queryError) {
      setError(queryError.message);
      setLoading(false);
      return;
    }

    const map: Record<string, Referral> = {};
    for (const row of rows ?? []) {
      map[row.name] = {
        name: row.name,
        link: row.link,
        updatedDate: row.updated_date
      };
    }

    setData(map);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}
