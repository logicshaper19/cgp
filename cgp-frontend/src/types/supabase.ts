// src/types/supabase.ts
export interface HistoricalPrice {
  date: string;
  close: number;
}

export interface FinancialProduct {
  id?: string;
  isin: string;
  longName?: string;
  shortName?: string;
  symbol?: string;
  currency?: string;
  exchange?: string;
  quoteType?: string;
  regularMarketPrice?: number | null;
  regularMarketOpen?: number | null;
  regularMarketDayHigh?: number | null;
  regularMarketDayLow?: number | null;
  regularMarketVolume?: number | null;
  marketCap?: number | null;
  previousClose?: number | null;
  fiftyTwoWeekHigh?: number | null;
  fiftyTwoWeekLow?: number | null;
  trailingPE?: number | null;
  forwardPE?: number | null;
  priceToBook?: number | null;
  dividendYield?: number | null;
  dividendRate?: number | null;
  earningsGrowth?: number | null;
  revenueGrowth?: number | null;
  grossMargins?: number | null;
  operatingMargins?: number | null;
  profitMargins?: number | null;
  totalRevenue?: number | null;
  grossProfits?: number | null;
  ebitda?: number | null;
  netIncomeToCommon?: number | null;
  totalCash?: number | null;
  totalDebt?: number | null;
  freeCashflow?: number | null;
  sector?: string;
  industry?: string;
  fullTimeEmployees?: number | null;
  website?: string;
  address1?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  longBusinessSummary?: string;
  beta?: number | null;
  enterpriseValue?: number | null;
  averageDailyVolume10Day?: number | null;
  averageDailyVolume3Month?: number | null;
  historicalPrices?: HistoricalPrice[];
}