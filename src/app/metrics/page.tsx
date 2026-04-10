'use client';

import { useEffect, useRef, useState } from 'react';
import { LandingHeader } from '@/components/LandingHeader';
import { Footer } from '@/components/Footer';

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
  useEffect(() => {
    fetch('/api/fear-greed')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setFearGreed(data);
      })
      .catch((err) =>
        setFgError(err instanceof Error ? err.message : 'Could not load index.')
      )
      .finally(() => setFgLoading(false));
  }, []);

  const fgColor = fearGreed ? getFearGreedColor(fearGreed.value) : '#9ca3af';

  return (
    <>
      <LandingHeader />
      <div className="metrics-shell">

        {/* BTC Price + RSI — TradingView widget */}
        <section className="metrics-panel">
          <div className="metrics-panel-header">
            <div>
              <h2 className="metrics-panel-title">BTC Price &amp; RSI</h2>
              <p className="metrics-panel-subtitle">Weekly · BTCEUR · Kraken</p>
            </div>
            <span className="metrics-source">
              Source:{' '}
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
              <h3 className="metrics-panel-title">Fear &amp; Greed Index</h3>
              <span className="metrics-source">
                Source:{' '}
                <a
                  href="https://alternative.me/crypto/fear-and-greed-index/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  alternative.me
                </a>
              </span>
            </div>

            {fgLoading && <p className="muted">Loading...</p>}
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
              <h3 className="metrics-panel-title">MVRV Z-Score</h3>
              <span className="metrics-source">
                Source:{' '}
                <a
                  href="https://www.bitcoinmagazinepro.com/charts/mvrv-zscore/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bitcoin Magazine Pro
                </a>
              </span>
            </div>
            <p className="metrics-description">
              Compares Bitcoin&apos;s market cap to its realised value. High positive
              values signal the market is overheated; negative values mark strong
              accumulation zones historically.
            </p>
            <a
              href="https://www.bitcoinmagazinepro.com/charts/mvrv-zscore/"
              target="_blank"
              rel="noopener noreferrer"
              className="metrics-chart-link"
            >
              View live chart →
            </a>
          </section>

          {/* BTC Addresses in Profit */}
          <section className="metrics-panel metrics-card metrics-link-card">
            <div className="metrics-panel-header">
              <h3 className="metrics-panel-title">Addresses in Profit</h3>
              <span className="metrics-source">
                Source:{' '}
                <a
                  href="https://www.bitcoinmagazinepro.com/charts/percent-addresses-in-profit/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bitcoin Magazine Pro
                </a>
              </span>
            </div>
            <p className="metrics-description">
              Percentage of BTC addresses currently holding at a profit. Near 100%
              has historically marked cycle tops; readings below 50% signal deep
              bear markets and strong accumulation opportunities.
            </p>
            <a
              href="https://www.bitcoinmagazinepro.com/charts/percent-addresses-in-profit/"
              target="_blank"
              rel="noopener noreferrer"
              className="metrics-chart-link"
            >
              View live chart →
            </a>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}
