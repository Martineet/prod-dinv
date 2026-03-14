import { PRICE_HAIRCUT, TAX_RATE } from '@/lib/constants';
import { formatBtc, formatMoneyRounded } from '@/lib/format';
import { PortfolioTotals } from '@/lib/types';

type StatsGridProps = {
  totals: PortfolioTotals | null;
};

export function StatsGrid({ totals }: StatsGridProps) {
  const EUR = '\u20AC';
  const display = (value: number | null | undefined) => {
    if (!totals || value === null || value === undefined) return `-- ${EUR}`;
    return `${formatMoneyRounded(value)} ${EUR}`;
  };

  const profitLoss = totals ? totals.totalProfitLoss : 0;
  const profitSign = profitLoss >= 0 ? '+' : '';
  const btcHodled = totals ? `${formatBtc(totals.totalBTC)} BTC` : '-- BTC';
  const totalDivested = totals?.totalDivested ?? 0;

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
        <div className="stat-card">
          <div className="stat-label">BTC hodled</div>
          <div className="stat-value">{btcHodled}</div>
        </div>
        <div className="stat-card">
          {renderTooltip('Portfolio value info', `BTC hodled x current BTC price x ${PRICE_HAIRCUT}.`)}
          <div className="stat-label">Portfolio Value</div>
          <div className="stat-value">{display(totals?.totalCurrentValue)}</div>
        </div>
        <div className="stat-card">
          {renderTooltip('Net invested info', 'Total invested - total divested.')}
          <div className="stat-label">Net Invested</div>
          <div className="stat-value">{display(totals?.totalInvested)}</div>
        </div>
        <div className="stat-card">
          {renderTooltip('Average price info', 'Net invested / BTC hodled.')}
          <div className="stat-label">Average Price</div>
          <div className="stat-value">{display(totals?.averagePurchasePrice)}</div>
        </div>
        <div className="stat-card highlight">
          {renderTooltip('Final value info', 'Portfolio value - taxes + total divested.')}
          <div className="stat-label">Final Value</div>
          <div className="stat-value highlight-value">{display(totals?.totalFinalValue)}</div>
        </div>
        <div className="stat-card">
          {renderTooltip('Result info', 'Final value - net invested.')}
          <div className="stat-label">Result</div>
          <div className={`stat-value ${profitLoss >= 0 ? 'positive' : 'negative'}`}>
            {totals ? `${profitSign}${formatMoneyRounded(profitLoss)} ${EUR}` : `-- ${EUR}`}
          </div>
        </div>
        <div className="stat-card">
          {renderTooltip(
            'Taxes info',
            `Tax applied to positive unrealized gains (portfolio value - net invested) x ${TAX_RATE}.`
          )}
          <div className="stat-label">Total Taxes</div>
          <div className="stat-value">{display(totals?.totalTaxes)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total divested</div>
          <div className="stat-value">{display(totalDivested)}</div>
        </div>
      </div>
    </div>
  );
}
