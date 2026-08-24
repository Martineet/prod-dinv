'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { LandingHeader } from '@/components/LandingHeader';
import { Footer } from '@/components/Footer';
import { useT } from '@/hooks/useT';

type FearGreedData = {
  value: number;
  classification: string;
  timestamp: string;
};

const TV_CONFIG = {
  autosize: true,
  symbol: 'KRAKEN:BTCEUR',
  interval: 'W',
  timezone: 'Etc/UTC',
  theme: 'dark',
  style: '1',
  locale: 'en',
  studies: ['RSI@tv-basicstudies'],
  hide_volume: true,
  hide_top_toolbar: false,
  hide_legend: true,
  save_image: false,
  backgroundColor: 'rgba(10, 14, 39, 1)',
  gridColor: 'rgba(45, 53, 72, 0.5)',
};

function getFearGreedColor(value: number): string {
  if (value <= 24) return '#ef4444';
  if (value <= 49) return '#f97316';
  if (value <= 74) return '#22c55e';
  return '#16a34a';
}

export default function MetricsPage() {
  const t  = useT('metrics');
  const tc = useT('common');
  const tvRef = useRef<HTMLDivElement>(null);
  const [fearGreed, setFearGreed] = useState<FearGreedData | null>(null);
  const [fgLoading, setFgLoading] = useState(true);
  const [fgError, setFgError] = useState<string | null>(null);

  // TradingView widget — loaded imperatively so React doesn't strip the script
  useEffect(() => {
    const container = tvRef.current;
    if (!container) return;
    container.innerHTML = '';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify(TV_CONFIG);
    container.appendChild(script);
    return () => {
      container.innerHTML = '';
    };
  }, []);

  // Fear & Greed Index
  const refreshFearGreed = useCallback(() => {
    fetch('/api/fear-greed', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setFearGreed(data);
        setFgError(null);
      })
      .catch((err) =>
        setFgError(err instanceof Error ? err.message : 'Could not load index.')
      )
      .finally(() => setFgLoading(false));
  }, []);

  useEffect(() => {
    refreshFearGreed();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') refreshFearGreed();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refreshFearGreed]);

  const fgColor = fearGreed ? getFearGreedColor(fearGreed.value) : '#9ca3af';

  return (
    <>
      <LandingHeader />
      <div className="metrics-shell">

        {/* BTC Price + RSI — TradingView widget */}
        <section className="metrics-panel">
          <div className="metrics-panel-header">
            <div>
              <h2 className="metrics-panel-title">{t('page_title')}</h2>
              <p className="metrics-panel-subtitle">{t('page_subtitle')}</p>
            </div>
            <span className="metrics-source">
              {tc('source')}:{' '}
              <a
                href="https://www.tradingview.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                TradingView
              </a>
            </span>
          </div>
          <div ref={tvRef} className="metrics-tv-container" />
        </section>

        {/* Cards row */}
        <div className="metrics-cards-row">

          {/* Fear & Greed Index */}
          <section className="metrics-panel metrics-card">
            <div className="metrics-panel-header">
              <h3 className="metrics-panel-title">{t('fear_greed_title')}</h3>
              <span className="metrics-source">
                {tc('source')}:{' '}
                <a
                  href="https://alternative.me/crypto/fear-and-greed-index/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  alternative.me
                </a>
              </span>
            </div>

            {fgLoading && <p className="muted">{tc('loading')}</p>}
            {fgError && <p className="error">{fgError}</p>}
            {fearGreed && (
              <div className="fg-gauge">
                <span className="fg-value" style={{ color: fgColor }}>
                  {fearGreed.value}
                </span>
                <span className="fg-classification" style={{ color: fgColor }}>
                  {fearGreed.classification}
                </span>
                <div className="fg-bar-wrap">
                  <div className="fg-bar-track">
                    <div
                      className="fg-bar-marker"
                      style={{ left: `${fearGreed.value}%` }}
                    />
                  </div>
                  <div className="fg-bar-labels">
                    <span>Extreme Fear</span>
                    <span>Fear</span>
                    <span>Greed</span>
                    <span>Extreme Greed</span>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* MVRV Z-Score */}
          <section className="metrics-panel metrics-card metrics-link-card">
            <div className="metrics-panel-header">
              <h3 className="metrics-panel-title">{t('mvrv_title')}</h3>
              <span className="metrics-source">
                {tc('source')}:{' '}
                <a
                  href="https://www.bitcoinmagazinepro.com/charts/mvrv-zscore/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bitcoin Magazine Pro
                </a>
              </span>
            </div>
            <p className="metrics-description">{t('mvrv_description')}</p>
            <a
              href="https://www.bitcoinmagazinepro.com/charts/mvrv-zscore/"
              target="_blank"
              rel="noopener noreferrer"
              className="metrics-chart-link"
            >
              {tc('view_live_chart')}
            </a>
          </section>

          {/* BTC Addresses in Profit */}
          <section className="metrics-panel metrics-card metrics-link-card">
            <div className="metrics-panel-header">
              <h3 className="metrics-panel-title">{t('addresses_title')}</h3>
              <span className="metrics-source">
                {tc('source')}:{' '}
                <a
                  href="https://www.bitcoinmagazinepro.com/charts/percent-addresses-in-profit/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bitcoin Magazine Pro
                </a>
              </span>
            </div>
            <p className="metrics-description">{t('addresses_description')}</p>
            <a
              href="https://www.bitcoinmagazinepro.com/charts/percent-addresses-in-profit/"
              target="_blank"
              rel="noopener noreferrer"
              className="metrics-chart-link"
            >
              {tc('view_live_chart')}
            </a>
          </section>

        </div>
      </div>
      <Footer variant="simple" />
    </>
  );
}
