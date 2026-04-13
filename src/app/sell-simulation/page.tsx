'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Logos } from '@/components/Logos';
import { useAuth } from '@/hooks/useAuth';
import { useBtcPrice } from '@/hooks/useBtcPrice';
import { useInvestments } from '@/hooks/useInvestments';
import { useT } from '@/hooks/useT';
import { calculatePortfolioTotals } from '@/lib/calculations';
import { formatBtcFull, formatMoneyRounded } from '@/lib/format';
import { createSellSimulationInvestment } from '@/services/investmentsService';
import {
  getAvailableBtc,
  simulateSellBtcMode,
  simulateSellEurMode,
  SimulationResult
} from '@/services/sellSimulationService';

const EUR = '\u20AC';

function todayInputDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function SellSimulationPage() {
  const router = useRouter();
  const { session, user, loading } = useAuth();
  const { price } = useBtcPrice();
  const t = useT('sell-simulation');
  const tCommon = useT('common');
  const {
    member,
    portfolios,
    selectedPortfolioId,
    investments,
    loading: investmentsLoading,
    error: investmentsError,
    refresh,
    selectPortfolio
  } = useInvestments(user);

  const [mode, setMode] = useState<'btc' | 'eur'>('btc');
  const [btcAmount, setBtcAmount] = useState('');
  const [allPortfolio, setAllPortfolio] = useState(false);
  const [eurAmount, setEurAmount] = useState('');
  const [isPreTax, setIsPreTax] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/');
    }
  }, [loading, session, router]);

  useEffect(() => {
    setResult(null);
  }, [selectedPortfolioId, mode]);

  const availableBtc = useMemo(() => getAvailableBtc(investments), [investments]);

  const totals = useMemo(() => {
    if (!investments.length || !price) return null;
    const taxRate = member?.taxes ?? 0;
    return calculatePortfolioTotals(investments, price, taxRate);
  }, [investments, price, member?.taxes]);

  const portfolioValue = totals ? totals.totalCurrentValue : 0;

  const handleRunSimulation = () => {
    setError(null);
    setResult(null);

    if (!selectedPortfolioId) {
      setError(t('error_select_portfolio'));
      return;
    }

    if (!investments.length) {
      setError(t('error_no_transactions'));
      return;
    }

    if (!price || price <= 0) {
      setError(t('error_no_btc_price'));
      return;
    }

    const taxRate = member?.taxes ?? 0;

    if (mode === 'btc') {
      const btcTarget = allPortfolio ? availableBtc : Number(btcAmount);
      const outcome = simulateSellBtcMode({
        investments,
        currentPrice: price,
        taxRate,
        btcAmount: btcTarget,
        allPortfolio
      });
      if (!outcome.ok) {
        setError(outcome.error);
        return;
      }
      setResult(outcome.result);
      return;
    }

    const outcome = simulateSellEurMode({
      investments,
      currentPrice: price,
      taxRate,
      eurAmount: Number(eurAmount),
      isPreTax
    });

    if (!outcome.ok) {
      setError(outcome.error);
      return;
    }

    setResult(outcome.result);
  };

  const handleConfirmSell = async () => {
    if (!result || !selectedPortfolioId) return;
    setSaving(true);
    setError(null);

    const { error: saveError } = await createSellSimulationInvestment({
      portfolios_id: selectedPortfolioId,
      btc_amount: result.btc_sold,
      price: result.current_price,
      eur_amount: result.eur_without_tax,
      date_swap: todayInputDate(),
      notes: 'Sorry'
    });

    if (saveError) {
      setError(saveError.message ?? t('error_save_failed'));
      setSaving(false);
      return;
    }

    await refresh(selectedPortfolioId);
    router.push('/dashboard');
  };

  const canRunSimulation =
    !investmentsLoading &&
    !saving &&
    !!selectedPortfolioId &&
    investments.length > 0 &&
    price > 0 &&
    (mode === 'btc'
      ? (allPortfolio ? availableBtc > 0 : Number(btcAmount) > 0)
      : Number(eurAmount) > 0);

  return (
    <div className="container simulation-shell">
      <div className="simulation-header">
        <div>
          <h2>{t('page_title')}</h2>
          <p className="muted">{t('page_subtitle')}</p>
        </div>
        <div className="stat-tooltip simulation-tooltip">
          <button type="button" className="info-icon" aria-label={t('tooltip_tax_label')}>
            i
          </button>
          <div className="tooltip-bubble">{t('tooltip_tax')}</div>
        </div>
      </div>

      <section className="simulation-panel">
        <div className="simulation-panel-header">
          <h3>{t('section_input')}</h3>
        </div>

        <div className="simulation-grid">
          <div className="simulation-card">
            <div className="form-group">
              <label htmlFor="simulation-portfolio">{t('label_portfolio')}</label>
              <select
                id="simulation-portfolio"
                value={selectedPortfolioId ?? ''}
                onChange={(event) => selectPortfolio(event.target.value)}
                disabled={!portfolios.length || investmentsLoading}
              >
                {portfolios.map((portfolio) => (
                  <option key={portfolio.portfolios_id} value={portfolio.portfolios_id}>
                    {portfolio.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="simulation-stats">
              <div className="simulation-stat">
                <span className="simulation-stat-label">{t('label_btc_hodled')}</span>
                <span className="simulation-stat-value">
                  {totals ? `${formatBtcFull(totals.totalBTC)} BTC` : '--'}
                </span>
              </div>
              <div className="simulation-stat">
                <span className="simulation-stat-label">{t('label_portfolio_value')}</span>
                <span className="simulation-stat-value">
                  {totals ? `${formatMoneyRounded(portfolioValue)} ${EUR}` : `-- ${EUR}`}
                </span>
              </div>
            </div>
          </div>

          <div className="simulation-card">
            <div className="simulation-mode">
              <button
                type="button"
                className={`mode-toggle ${mode === 'btc' ? 'active' : ''}`}
                onClick={() => setMode('btc')}
              >
                BTC
              </button>
              <button
                type="button"
                className={`mode-toggle ${mode === 'eur' ? 'active' : ''}`}
                onClick={() => setMode('eur')}
              >
                EUR
              </button>
            </div>

            {mode === 'btc' ? (
              <>
                <div className="form-group">
                  <label htmlFor="btc-amount">{t('label_btc_amount')}</label>
                  <input
                    id="btc-amount"
                    type="number"
                    min="0"
                    step="any"
                    value={allPortfolio ? availableBtc.toFixed(8) : btcAmount}
                    onChange={(event) => setBtcAmount(event.target.value)}
                    disabled={allPortfolio}
                  />
                </div>
                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={allPortfolio}
                    onChange={(event) => setAllPortfolio(event.target.checked)}
                  />
                  {t('label_all_portfolio')}
                </label>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="eur-amount">{t('label_eur_amount')}</label>
                  <input
                    id="eur-amount"
                    type="number"
                    min="0"
                    step="any"
                    value={eurAmount}
                    onChange={(event) => setEurAmount(event.target.value)}
                  />
                </div>
                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={isPreTax}
                    onChange={(event) => setIsPreTax(event.target.checked)}
                  />
                  {t('label_without_taxes')}
                </label>
              </>
            )}
          </div>
        </div>

        <div className="simulation-actions">
          <button type="button" onClick={() => router.push('/dashboard')}>
            {t('btn_diamond_hands')}
          </button>
          <button type="button" className="btn-secondary" onClick={handleRunSimulation} disabled={!canRunSimulation}>
            {t('btn_run_simulation')}
          </button>
        </div>
      </section>

      <section className="simulation-panel">
        <div className="simulation-panel-header">
          <h3>{t('section_output')}</h3>
        </div>

        {result ? (
          <div className="simulation-output-wrap">
            <div className="sim-box sim-box-btc">
              <span className="sim-row-label">{t('label_btc_sold')}</span>
              <span className="sim-row-value">{formatBtcFull(result.btc_sold)} BTC</span>
            </div>

            <div className="sim-boxes-row">
              <div className="sim-box">
                <div className="sim-row">
                  <span className="sim-row-label">{t('label_eur_invested')}</span>
                  <span className="sim-row-value">{formatMoneyRounded(result.buy_value)} {EUR}</span>
                </div>
                <div className="sim-row">
                  <span className="sim-row-label">{t('label_avg_price')}</span>
                  <span className="sim-row-value">{formatMoneyRounded(result.avg_buy_price)} {EUR}</span>
                </div>
              </div>

              <div className="sim-box">
                <div className="sim-row">
                  <span className="sim-row-label">{t('label_eur_divested')}</span>
                  <span className="sim-row-value">{formatMoneyRounded(result.eur_without_tax)} {EUR}</span>
                </div>
                <div className="sim-row">
                  <span className="sim-row-label">{t('label_current_price')}</span>
                  <span className="sim-row-value">{formatMoneyRounded(result.current_price)} {EUR}</span>
                </div>
              </div>

              <div className="sim-box">
                <div className="sim-row">
                  <span className="sim-row-label">{t('label_eur_net')}</span>
                  <span className="sim-row-value">{formatMoneyRounded(result.eur_with_tax)} {EUR}</span>
                </div>
                <div className="sim-row">
                  <span className="sim-row-label">{t('label_profit_loss')}</span>
                  <span className={`sim-row-value ${result.profit_loss >= 0 ? 'positive' : 'negative'}`}>
                    {result.profit_loss >= 0 ? '+' : ''}{formatMoneyRounded(result.profit_loss)} {EUR}
                  </span>
                </div>
                <div className="sim-row">
                  <span className="sim-row-label">{t('label_taxes')}</span>
                  <span className="sim-row-value">{formatMoneyRounded(result.tax_eur)} {EUR}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="simulation-output-empty" />
        )}

        {investmentsError ? <p className="error">{investmentsError}</p> : null}
        {error ? <p className="error">{error}</p> : null}

        <div className="simulation-actions">
          <button type="button" onClick={() => router.push('/dashboard')}>
            {t('btn_hodling')}
          </button>
          <button type="button" className="btn-secondary" onClick={handleConfirmSell} disabled={!result || saving}>
            {saving ? tCommon('btn_saving') : t('btn_sorry_satoshi')}
          </button>
        </div>
      </section>

      <Footer />
      <Logos />
    </div>
  );
}
