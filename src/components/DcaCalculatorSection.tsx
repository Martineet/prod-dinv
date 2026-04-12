'use client';

import { useDcaCalculator } from '@/hooks/useDcaCalculator';
import { AssetKind } from '@/lib/types';
import { formatMoneyRounded } from '@/lib/format';
import { useT } from '@/hooks/useT';

type DcaCalculatorSectionProps = {
  btcPrice: number;
};

const EUR = '\u20AC';
const DIAMOND = '\u{1F48E}';
const HANDS = '\u{1F932}';

export function DcaCalculatorSection({ btcPrice }: DcaCalculatorSectionProps) {
  const t = useT('landing');
  const {
    monthlyEur,
    startDate,
    endDate,
    today,
    result,
    loading,
    error,
    compareAsset,
    setMonthlyEur,
    setStartDate,
    setEndDate,
    setCompareAsset
  } = useDcaCalculator(btcPrice);

  const btcSign = result && result.bitcoin.profitLoss >= 0 ? '+' : '';
  const btcClass = result && result.bitcoin.profitLoss >= 0 ? 'positive' : 'negative';
  const cmpSign = result && result.compare.profitLoss >= 0 ? '+' : '';
  const cmpClass = result && result.compare.profitLoss >= 0 ? 'positive' : 'negative';

  const cmpValue     = t(`dca_${compareAsset}_value`);
  const cmpProfit    = t(`dca_${compareAsset}_profit`);
  const cmpReference = t(`dca_${compareAsset}_reference`);

  return (
    <div className="calculator-panel">
      <h2 className="section-title large">{`${DIAMOND} `}{t('dca_title')}{` ${HANDS}`}</h2>
      <div className="calculator-card">
        <div className="calc-grid">
          <div className="calc-row">
            <label>{t('dca_monthly_investment')}</label>
            <input
              type="number"
              min={0}
              placeholder="69"
              value={monthlyEur}
              onChange={(event) => setMonthlyEur(event.target.value === '' ? '' : Number(event.target.value))}
              className="input-accent"
            />
          </div>
          <div className="calc-row">
            <label>{t('dca_start_date')}</label>
            <input
              type="date"
              min="2013-05-01"
              max={today}
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>
          <div className="calc-row">
            <label>{t('dca_end_date')}</label>
            <input
              type="date"
              min={startDate || '2013-05-01'}
              max={today}
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>
          <div className="calc-row">
            <label>{t('dca_compare_with')}</label>
            <select
              value={compareAsset}
              onChange={(event) => setCompareAsset(event.target.value as AssetKind)}
            >
              <option value="gold">{t('dca_option_gold')}</option>
              <option value="sp500">{t('dca_option_sp500')}</option>
              <option value="ibex35">{t('dca_option_ibex35')}</option>
            </select>
          </div>
        </div>

        <div className="calc-result">
          <div className="dca-row dca-row-eur">
            <div className="dca-inline-line">
              <span className="result-label dca-inline-label">{t('dca_euros_invested')}</span>
              <span className="result-value result-value-normal dca-inline-value">
                {result ? `${formatMoneyRounded(result.investedEur)} ${EUR}` : `-- ${EUR}`}
              </span>
            </div>
          </div>

          <div className="dca-row dca-row-strong">
            <div className="dca-row-item">
              <div className="result-label">{t('dca_bitcoin_value')}</div>
              <div className="result-value">
                {result ? `${formatMoneyRounded(result.bitcoin.eurosValue)} ${EUR}` : `-- ${EUR}`}
              </div>
            </div>
            <div className="dca-row-item">
              <div className={`result-label ${result ? btcClass : ''}`}>{t('dca_bitcoin_profit')}</div>
              <div className={`result-value ${result ? btcClass : ''}`}>
                {result ? `${btcSign}${formatMoneyRounded(result.bitcoin.profitLoss)} ${EUR}` : `-- ${EUR}`}
              </div>
            </div>
          </div>

          <div className="dca-row">
            <div className="dca-row-item">
              <div className="result-label">{cmpValue}</div>
              <div className="result-value result-value-normal">
                {result ? `${formatMoneyRounded(result.compare.eurosValue)} ${EUR}` : `-- ${EUR}`}
              </div>
            </div>
            <div className="dca-row-item">
              <div className={`result-label ${result ? cmpClass : ''}`}>{cmpProfit}</div>
              <div className={`result-value result-value-normal ${result ? cmpClass : ''}`}>
                {result ? `${cmpSign}${formatMoneyRounded(result.compare.profitLoss)} ${EUR}` : `-- ${EUR}`}
              </div>
            </div>
          </div>

          <div className="result-label">
            {result
              ? `${cmpReference}: ${formatMoneyRounded(result.compareFinalPrice)} ${EUR} ${result.usingLiveFinalPrice ? '(live)' : '(stored monthly)'}`
              : `${cmpReference}: -- ${EUR}`}
          </div>

          {loading && <div className="loading">{t('dca_calculating')}</div>}
          {error && <div className="error centered-text">{error}</div>}
        </div>
      </div>
    </div>
  );
}
