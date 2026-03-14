import { PRICE_HAIRCUT, TAX_RATE } from '@/lib/constants';
import { Investment, InvestmentRow, PortfolioTotals } from '@/lib/types';

function toNumber(value: number | string | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const parsed = typeof value === 'string' ? Number(value) : value;
  return Number.isFinite(parsed) ? parsed : 0;
}

export function buildInvestmentRows(
  investments: Investment[],
  currentBtcPrice: number
): InvestmentRow[] {
  const sortedInvestments = [...investments].sort((a, b) => {
    const aTime = Date.parse(a.date_swap);
    const bTime = Date.parse(b.date_swap);
    if (Number.isFinite(aTime) && Number.isFinite(bTime)) {
      return bTime - aTime;
    }
    return String(b.date_swap ?? '').localeCompare(String(a.date_swap ?? ''));
  });

  return sortedInvestments.map((investment) => {
    const btcAmount = toNumber(investment.btc_amount);
    const eurAmount = toNumber(investment.eur_amount);
    const purchasePrice = toNumber(investment.purchase_price);
    const transactionType = (investment.type ?? '').trim().toLowerCase();
    const isBuy = transactionType === 'buy';
    const isSell = transactionType === 'sell';
    const invested = isBuy ? eurAmount : 0;
    const proceeds = isSell ? eurAmount : 0;

    const currentValue = btcAmount * currentBtcPrice * PRICE_HAIRCUT;
    const profitLoss = currentValue - eurAmount;

    return {
      id: String(investment.id ?? `${investment.portfolio_id}-${investment.date_swap}`),
      portfolioId: investment.portfolio_id,
      date: investment.date_swap,
      type: investment.type ?? '-',
      notes: investment.notes ?? '-',
      btcAmount,
      invested,
      proceeds,
      purchasePrice,
      profitLoss
    };
  });
}

export function calculatePortfolioTotals(
  investments: Investment[],
  currentBtcPrice: number
): PortfolioTotals {
  let totalInvestedGross = 0;
  let totalProceeds = 0;
  let totalBTC = 0;

  investments.forEach((investment) => {
    const btcAmount = toNumber(investment.btc_amount);
    const eurAmount = toNumber(investment.eur_amount);
    const transactionType = (investment.type ?? '').trim().toLowerCase();

    if (transactionType === 'buy') {
      totalInvestedGross += eurAmount;
      totalBTC += btcAmount;
      return;
    }

    if (transactionType === 'sell') {
      totalProceeds += eurAmount;
      totalBTC -= btcAmount;
      return;
    }

    if (transactionType === 'transfer-in') {
      totalBTC += btcAmount;
      return;
    }

    if (transactionType === 'transfer-out') {
      totalBTC -= btcAmount;
    }
  });

  const totalInvested = totalInvestedGross - totalProceeds;
  const totalCurrentValue = totalBTC * currentBtcPrice * PRICE_HAIRCUT;
  const averagePurchasePrice = totalBTC > 0 ? totalInvested / totalBTC : 0;

  let totalTaxes = 0;
  if (totalCurrentValue > totalInvested) {
    totalTaxes = (totalCurrentValue - totalInvested) * TAX_RATE;
  }

  const totalFinalValue = totalCurrentValue - totalTaxes;
  const totalProfitLoss = totalFinalValue - totalInvested;

  return {
    totalInvested,
    totalProceeds,
    totalBTC,
    averagePurchasePrice,
    totalCurrentValue,
    totalFinalValue,
    totalTaxes,
    totalProfitLoss
  };
}
