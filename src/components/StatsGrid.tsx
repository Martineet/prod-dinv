'use client';

import { PRICE_HAIRCUT } from '@/lib/constants';
import { formatBtc, formatMoneyRounded } from '@/lib/format';
import { PortfolioTotals } from '@/lib/types';
import { useT } from '@/hooks/useT';

type StatsGridProps = {
  totals: PortfolioTotals | null;
};

export function StatsGrid({ totals }: StatsGridProps) {
  const t = useT('dashboard');
  const EUR = '\u20AC';
  const display = (value: number | null | undefined) => {
    if (!totals || value === null || value === undefined) return `-- ${EUR}`;
    return `${formatMoneyRounded(value)} ${EUR}`;
  };
  const btcHodledFull = totals ? `${formatBtc(totals.totalBTC)} BTC` : '-- BTC';
  const btcHodledCompact = totals
    ? `${totals.totalBTC.toLocaleString('de-DE', {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
      })} BTC`
    : '-- BTC';
  const totalDivested = totals?.totalDivested ?? 0;
  const netInvested = totals?.totalInvested ?? 0;
  const finalValue = totals?.totalFinalValue ?? 0;
  const resultEur = totals ? finalValue - netInvested : null;
  const resultPct = totals && netInvested !== 0 ? (resultEur ?? 0) / netInvested * 100 : null;
  const resultClass = resultEur === null ? '' : resultEur >= 0 ? 'positive' : 'negative';
  const formatSigned = (value: number, suffix: string) => {
    const sign = value >= 0 ? '+' : '-';
    return `${sign}${formatMoneyRounded(Math.abs(value))}${suffix}`;
  };
  const resultEurDisplay = resultEur === null ? `-- ${EUR}` : formatSigned(resultEur, EUR);
  const resultPctDisplay = resultPct === null ? '--%' : formatSigned(resultPct, '%');

  const renderTooltip = (label: string, description: string) => (
    <div className="stat-tooltip">
      <button type="button" className="info-icon" aria-label={label}>
        i
      </button>
      <span className="tooltip-bubble">{description}</span>
    </div>
  );

  return (
    <div className="stats-grid">
      <div className="stats-group">
        <div className="stat-card highlight stat-card-btc mobile-left order-1">
          <div className="stat-label">{t('stat_btc_hodled')}</div>
          <div className="stat-value highlight-value">
            <span className="btc-hodled-full">{btcHodledFull}</span>
            <span className="btc-hodled-compact">{btcHodledCompact}</span>
          </div>
        </div>
        <div className="stat-card stat-card-avg order-2">
          {renderTooltip(t('tooltip_avg_price_label'), t('tooltip_avg_price'))}
          <div className="stat-label">{t('stat_avg_price')}</div>
          <div className="stat-value">{display(totals?.averagePurchasePrice)}</div>
        </div>
        <div className="stat-card stat-card-portfolio order-3">
          {renderTooltip(t('tooltip_portfolio_value_label'), t('tooltip_portfolio_value').replace('{haircut}', String(PRICE_HAIRCUT)))}
          <div className="stat-label">{t('stat_portfolio_value')}</div>
          <div className="stat-value">{display(totals?.totalCurrentValue)}</div>
        </div>
        <div className="stat-card stat-card-net mobile-left order-4">
          {renderTooltip(t('tooltip_net_invested_label'), t('tooltip_net_invested'))}
          <div className="stat-label">{t('stat_net_invested')}</div>
          <div className="stat-value">{display(totals?.totalInvested)}</div>
        </div>
        <div className="stat-card stat-card-final mobile-left order-5">
          {renderTooltip(t('tooltip_final_value_label'), t('tooltip_final_value'))}
          <div className="stat-final-layout">
            <div className="stat-final-main">
              <div className="stat-label">{t('stat_final_value')}</div>
              <div className="stat-value">{display(totals?.totalFinalValue)}</div>
            </div>
            <div className="stat-final-results desktop-only">
              <div className={`stat-final-result ${resultClass}`}>{resultEurDisplay}</div>
              <div className={`stat-final-result ${resultClass}`}>{resultPctDisplay}</div>
            </div>
          </div>
        </div>
        <div className="stat-card stat-card-result mobile-only order-6">
          <div className="stat-label">{t('stat_result')}</div>
          <div className="stat-result-values">
            <div className={`stat-final-result ${resultClass}`}>{resultEurDisplay}</div>
            <div className={`stat-final-result ${resultClass}`}>{resultPctDisplay}</div>
          </div>
        </div>
        <div className="stat-card stat-card-divested hide-mobile order-7">
          <div className="stat-label">{t('stat_total_divested')}</div>
          <div className="stat-value">{display(totalDivested)}</div>
        </div>
      </div>
    </div>
  );
}
