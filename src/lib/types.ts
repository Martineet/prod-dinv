export type Investment = {
  investments_id?: string | number;
  portfolios_id: string;
  btc_amount: number | string;
  eur_amount: number | string;
  price: number | string;
  type: string | null;
  notes: string | null;
  commission: number | string;
  guaranteed: boolean;
  date_swap: string;
};

export type InvestmentFormInput = {
  portfolios_id: string;
  asset: string;
  amount: number;
  eur_amount: number;
  price: number;
  date: string;
  notes: string;
};

export type MemberProfile = {
  members_id: string;
  display_name: string | null;
  email: string;
  visibility_summary?: boolean | null;
  taxes?: number | null;
};

export type Portfolio = {
  portfolios_id: string;
  members_id: string;
  name: string;
};

export type PortfolioSummary = {
  total_btc: number;
  total_invested: number;
  total_guaranteed: number;
  bitcoiners: number;
};

export type InvestmentRow = {
  id: string;
  portfolioId: string;
  date: string;
  type: string;
  notes: string;
  btcAmount: number;
  invested: number;
  divested: number;
  price: number | null;
  profitLoss: number | null;
};

export type PortfolioTotals = {
  totalInvested: number;
  totalDivested: number;
  totalBTC: number;
  averagePurchasePrice: number;
  totalCurrentValue: number;
  totalFinalValue: number;
  totalTaxes: number;
  totalProfitLoss: number;
};

export type AssetKind = 'bitcoin' | 'gold' | 'sp500' | 'ibex35';

export type AssetsDailyPrice = {
  price_date: string;
  btc_eur: number;
  btc_source: string | null;
  gold_eur: number;
  gold_source: string | null;
  sp500_eur: number;
  sp500_source: string | null;
  ibex35_eur: number;
  ibex35_source: string | null;
};
