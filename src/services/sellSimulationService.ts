import { Investment } from '@/lib/types';

export type FifoLot = {
  btcRemaining: number;
  price: number;
  date: string;
};

export type SimulationResult = {
  btc_sold: number;
  avg_buy_price: number;
  estimated_buy_date: string | null;
  current_price: number;
  eur_without_tax: number;
  eur_with_tax: number;
  tax_eur: number;
  buy_value: number;
};

export type SimulationOutcome =
  | { ok: true; result: SimulationResult }
  | { ok: false; error: string };

type SimulationBaseInput = {
  investments: Investment[];
  currentPrice: number;
  taxRate: number;
};

type BtcModeInput = SimulationBaseInput & {
  btcAmount: number;
  allPortfolio: boolean;
};

type EurModeInput = SimulationBaseInput & {
  eurAmount: number;
  isPreTax: boolean;
};

const EPS = 1e-12;

function toNumber(value: number | string | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const parsed = typeof value === 'string' ? Number(value) : value;
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeTransactionType(value: string | null | undefined): string {
  return (value ?? '').trim().toLowerCase();
}

function clampTaxRate(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(value, 0), 1);
}

function resolveLotPrice(investment: Investment): number {
  const price = toNumber(investment.price);
  if (price > 0) return price;
  const btcAmount = toNumber(investment.btc_amount);
  const eurAmount = toNumber(investment.eur_amount);
  if (btcAmount > 0 && eurAmount > 0) return eurAmount / btcAmount;
  return 0;
}

function sortTransactions(investments: Investment[]): Investment[] {
  return [...investments].sort((a, b) => {
    const aTime = Date.parse(a.date_swap);
    const bTime = Date.parse(b.date_swap);
    const aBtc = toNumber(a.btc_amount);
    const bBtc = toNumber(b.btc_amount);

    if (Number.isFinite(aTime) && Number.isFinite(bTime)) {
      if (aTime !== bTime) return aTime - bTime;
      if (aBtc !== bBtc) return bBtc - aBtc;
      return String(a.date_swap ?? '').localeCompare(String(b.date_swap ?? ''));
    }

    const dateCompare = String(a.date_swap ?? '').localeCompare(String(b.date_swap ?? ''));
    if (dateCompare !== 0) return dateCompare;
    if (aBtc !== bBtc) return bBtc - aBtc;
    return 0;
  });
}

export function buildFifoQueue(investments: Investment[]): FifoLot[] {
  const fifo: FifoLot[] = [];
  const sorted = sortTransactions(investments);

  sorted.forEach((investment) => {
    const type = normalizeTransactionType(investment.type);
    const btcAmount = toNumber(investment.btc_amount);
    if (!Number.isFinite(btcAmount) || btcAmount <= 0) return;

    if (type === 'buy' || type === 'transfer-in') {
      fifo.push({
        btcRemaining: btcAmount,
        price: resolveLotPrice(investment),
        date: investment.date_swap
      });
      return;
    }

    if (type === 'sell' || type === 'transfer-out') {
      let remaining = btcAmount;
      while (remaining > EPS && fifo.length > 0) {
        const lot = fifo[0];
        if (lot.btcRemaining <= remaining + EPS) {
          remaining -= lot.btcRemaining;
          fifo.shift();
        } else {
          lot.btcRemaining -= remaining;
          remaining = 0;
        }
      }
    }
  });

  return fifo;
}

export function getAvailableBtc(investments: Investment[]): number {
  return buildFifoQueue(investments).reduce((sum, lot) => sum + lot.btcRemaining, 0);
}

function netAfterTax(sellValue: number, buyValue: number, taxRate: number): number {
  const profit = sellValue - buyValue;
  if (profit <= 0) return sellValue;
  return sellValue - profit * taxRate;
}

function finalizeResult(
  btcSold: number,
  buyValue: number,
  earliestDate: string | null,
  currentPrice: number,
  taxRate: number
): SimulationOutcome {
  if (btcSold <= 0 || !Number.isFinite(btcSold)) {
    return { ok: false, error: 'BTC amount must be greater than 0.' };
  }

  const sellValue = btcSold * currentPrice;
  const profit = sellValue - buyValue;
  const tax = profit > 0 ? profit * taxRate : 0;
  const avgBuyPrice = btcSold > 0 ? buyValue / btcSold : 0;

  return {
    ok: true,
    result: {
      btc_sold: btcSold,
      avg_buy_price: avgBuyPrice,
      estimated_buy_date: earliestDate,
      current_price: currentPrice,
      eur_without_tax: sellValue,
      eur_with_tax: sellValue - tax,
      tax_eur: tax,
      buy_value: buyValue
    }
  };
}

export function simulateSellBtcMode({
  investments,
  currentPrice,
  taxRate,
  btcAmount,
  allPortfolio
}: BtcModeInput): SimulationOutcome {
  if (!investments.length) return { ok: false, error: 'No transactions available for simulation.' };
  if (!Number.isFinite(currentPrice) || currentPrice <= 0) {
    return { ok: false, error: 'Current BTC price is unavailable.' };
  }

  const fifo = buildFifoQueue(investments);
  const availableBtc = fifo.reduce((sum, lot) => sum + lot.btcRemaining, 0);

  if (availableBtc <= EPS) return { ok: false, error: 'No BTC available to sell.' };

  const targetBtc = allPortfolio ? availableBtc : btcAmount;
  if (!Number.isFinite(targetBtc) || targetBtc <= 0) {
    return { ok: false, error: 'BTC amount must be greater than 0.' };
  }

  if (targetBtc > availableBtc + EPS) {
    return { ok: false, error: 'Not enough BTC available for this simulation.' };
  }

  let remaining = targetBtc;
  let buyValue = 0;
  let earliestDate: string | null = null;

  fifo.forEach((lot) => {
    if (remaining <= EPS) return;
    const take = Math.min(remaining, lot.btcRemaining);
    if (take <= EPS) return;
    buyValue += take * lot.price;
    if (!earliestDate) earliestDate = lot.date;
    remaining -= take;
  });

  return finalizeResult(targetBtc, buyValue, earliestDate, currentPrice, clampTaxRate(taxRate));
}

export function simulateSellEurMode({
  investments,
  currentPrice,
  taxRate,
  eurAmount,
  isPreTax
}: EurModeInput): SimulationOutcome {
  if (!investments.length) return { ok: false, error: 'No transactions available for simulation.' };
  if (!Number.isFinite(currentPrice) || currentPrice <= 0) {
    return { ok: false, error: 'Current BTC price is unavailable.' };
  }

  const safeTaxRate = clampTaxRate(taxRate);
  if (!Number.isFinite(eurAmount) || eurAmount <= 0) {
    return { ok: false, error: 'EUR amount must be greater than 0.' };
  }

  const fifo = buildFifoQueue(investments);
  const availableBtc = fifo.reduce((sum, lot) => sum + lot.btcRemaining, 0);
  if (availableBtc <= EPS) return { ok: false, error: 'No BTC available to sell.' };

  let btcSold = 0;
  let buyValue = 0;
  let sellValue = 0;
  let earliestDate: string | null = null;

  const takeFromLot = (lot: FifoLot, btcToTake: number) => {
    if (btcToTake <= EPS) return;
    if (!earliestDate) earliestDate = lot.date;
    btcSold += btcToTake;
    buyValue += btcToTake * lot.price;
    sellValue += btcToTake * currentPrice;
  };

  if (isPreTax) {
    for (const lot of fifo) {
      if (sellValue + EPS >= eurAmount) break;
      const remainingValue = eurAmount - sellValue;
      const lotSellValue = lot.btcRemaining * currentPrice;
      if (lotSellValue <= remainingValue + EPS) {
        takeFromLot(lot, lot.btcRemaining);
        continue;
      }
      const btcNeeded = remainingValue / currentPrice;
      takeFromLot(lot, btcNeeded);
      break;
    }
    if (sellValue + EPS < eurAmount) {
      return { ok: false, error: 'Not enough BTC available for this simulation.' };
    }
  } else {
    for (const lot of fifo) {
      const netBefore = netAfterTax(sellValue, buyValue, safeTaxRate);
      if (netBefore + EPS >= eurAmount) break;

      const lotSellValue = lot.btcRemaining * currentPrice;
      const lotBuyValue = lot.btcRemaining * lot.price;
      const netAfterFull = netAfterTax(sellValue + lotSellValue, buyValue + lotBuyValue, safeTaxRate);

      if (netAfterFull + EPS < eurAmount) {
        takeFromLot(lot, lot.btcRemaining);
        continue;
      }

      let low = 0;
      let high = lot.btcRemaining;
      for (let i = 0; i < 60; i += 1) {
        const mid = (low + high) / 2;
        const netMid = netAfterTax(sellValue + mid * currentPrice, buyValue + mid * lot.price, safeTaxRate);
        if (netMid >= eurAmount) {
          high = mid;
        } else {
          low = mid;
        }
      }
      takeFromLot(lot, high);
      break;
    }
    if (netAfterTax(sellValue, buyValue, safeTaxRate) + EPS < eurAmount) {
      return { ok: false, error: 'Not enough BTC available for this simulation.' };
    }
  }

  if (btcSold <= EPS) return { ok: false, error: 'Not enough BTC available for this simulation.' };
  if (btcSold > availableBtc + EPS) return { ok: false, error: 'Not enough BTC available for this simulation.' };

  return finalizeResult(btcSold, buyValue, earliestDate, currentPrice, safeTaxRate);
}
