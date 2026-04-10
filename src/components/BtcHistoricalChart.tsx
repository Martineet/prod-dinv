'use client';

import { useEffect, useRef } from 'react';

const TV_CONFIG = {
  autosize: true,
  symbol: 'KRAKEN:BTCEUR',
  interval: 'W',
  timezone: 'Etc/UTC',
  theme: 'dark',
  style: '3',
  range: 'ALL',
  locale: 'en',
  hide_volume: true,
  hide_top_toolbar: false,
  hide_legend: true,
  save_image: false,
  backgroundColor: 'rgba(10, 14, 39, 1)',
  gridColor: 'rgba(45, 53, 72, 0.5)',
  overrides: {
    'mainSeriesProperties.lineStyle.color': '#f59e0b',
    'mainSeriesProperties.lineStyle.linestyle': 0,
    'mainSeriesProperties.lineStyle.linewidth': 2,
    'mainSeriesProperties.areaStyle.linecolor': '#f59e0b',
    'mainSeriesProperties.areaStyle.color1': 'rgba(245, 158, 11, 0.3)',
    'mainSeriesProperties.areaStyle.color2': 'rgba(245, 158, 11, 0)',
  },
};

export function BtcHistoricalChart() {
  const tvRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="historical-chart-section">
      <div className="content-width">
        <div className="historical-chart-card">
          <div ref={tvRef} className="historical-chart-tv-container" />
        </div>
      </div>
    </section>
  );
}
