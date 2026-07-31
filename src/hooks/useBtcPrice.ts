'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { fetchBtcPriceEur } from '@/services/btc';

type Snapshot = {
  price: number;
  loading: boolean;
  error: string | null;
};

const INITIAL_SNAPSHOT: Snapshot = { price: 0, loading: true, error: null };

let snapshot: Snapshot = INITIAL_SNAPSHOT;
const listeners = new Set<() => void>();
let inFlight: Promise<void> | null = null;
let handlersInstalled = false;

function setSnapshot(next: Snapshot) {
  snapshot = next;
  listeners.forEach((listener) => listener());
}

async function refreshShared(): Promise<void> {
  if (inFlight) return inFlight;
  inFlight = (async () => {
    try {
      const nextPrice = await fetchBtcPriceEur();
      setSnapshot({ price: nextPrice, loading: false, error: null });
    } catch (err) {
      setSnapshot({
        price: snapshot.price,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load BTC price.'
      });
    } finally {
      inFlight = null;
    }
  })();
  return inFlight;
}

function installHandlers(refreshIntervalMs: number) {
  if (handlersInstalled || typeof window === 'undefined') return;
  handlersInstalled = true;

  refreshShared();
  setTimeout(refreshShared, 1000);
  setInterval(refreshShared, refreshIntervalMs);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') refreshShared();
  });
  window.addEventListener('pageshow', (event) => {
    if ((event as PageTransitionEvent).persisted) refreshShared();
  });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Snapshot {
  return snapshot;
}

function getServerSnapshot(): Snapshot {
  return INITIAL_SNAPSHOT;
}

export function useBtcPrice(refreshIntervalMs = 3600000) {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const refresh = useCallback(() => refreshShared(), []);

  useEffect(() => {
    installHandlers(refreshIntervalMs);
  }, [refreshIntervalMs]);

  return { ...current, refresh };
}
