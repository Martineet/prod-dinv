import { PRICE_HAIRCUT } from '@/lib/constants';
import { Investment, InvestmentRow, PortfolioTotals } from '@/lib/types';

function toNumber(value: number | string | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const parsed = typeof value === 'string' ? Number(value) : value;
  return Number.isFinite(parsed) ? parsed : 0;
}

function toNullableNumber(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined || value === '') return null;
  const parsed = typeof value === 'string' ? Number(value) : value;
  return Number.isFinite(parsed) ? parsed : null;
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
    const price = toNullableNumber(investment.price);
    const transactionType = (investment.type ?? '').trim().toLowerCase();
    const isBuy = transactionType === 'buy';
    const isSell = transactionType === 'sell';
    const isTransferOut = transactionType === 'transfer-out';
    const invested = isBuy ? eurAmount : 0;
    const divested = isSell ? eurAmount : 0;

    const currentValue = btcAmount * currentBtcPrice * PRICE_HAIRCUT;
    let profitLoss: number | null = currentValue - eurAmount;
    if (isSell) {
      profitLoss = null;
    } else if (isTransferOut) {
      profitLoss = -Math.abs(currentValue);
    }

    return {
      id: String(investment.id ?? `${investment.portfolio_id}-${investment.date_swap}`),
      portfolioId: investment.portfolio_id,
      date: investment.date_swap,
      type: investment.type ?? '-',
      notes: investment.notes ?? '-',
      btcAmount,
      invested,
      divested,
      price,
      profitLoss
    };
  });
}

export function calculatePortfolioTotals(
  investments: Investment[],
  currentBtcPrice: number,
  taxRate: number
): PortfolioTotals {
  let totalInvestedGross = 0;
  let totalDivested = 0;
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
      totalDivested += eurAmount;
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

  const totalInvested = totalInvestedGross - totalDivested;
  const totalCurrentValue = totalBTC * currentBtcPrice * PRICE_HAIRCUT;
  const averagePurchasePrice = totalBTC > 0 ? totalInvested / totalBTC : 0;

  let totalTaxes = 0;
  const safeTaxRate = Number.isFinite(taxRate) ? taxRate : 0;
  if (totalCurrentValue > totalInvested) {
    totalTaxes = (totalCurrentValue - totalInvested) * safeTaxRate;
  }

  const totalFinalValue = totalCurrentValue - totalTaxes + totalDivested;
  const totalProfitLoss = totalFinalValue - totalInvested;

  return {
    totalInvested,
    totalDivested,
    totalBTC,
    averagePurchasePrice,
    totalCurrentValue,
    totalFinalValue,
    totalTaxes,
    totalProfitLoss
  };
}
