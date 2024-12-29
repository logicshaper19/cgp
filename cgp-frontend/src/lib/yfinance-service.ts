// src/lib/yfinance-service.ts
import supabase from './supabaseClient'
import { FinancialProduct } from '@/types/supabase'

export async function fetchAndStoreProduct(isin: string): Promise<FinancialProduct> {
  try {
    // Call Python yfinance script
    const response = await fetch(`/api/yfinance/fetch?isin=${isin}`)
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }
    const data = await response.json()

    if (data.error) {
      throw new Error(data.error)
    }

    // Fetch historical prices
    const historicalResponse = await fetch(`/api/yfinance/historical?isin=${isin}`)
    if (!historicalResponse.ok) {
      throw new Error(`API request failed with status ${historicalResponse.status}`)
    }
    const historicalData = await historicalResponse.json()

    // Transform and store in Supabase
    const product: FinancialProduct = {
      isin: data.isin,
      longName: data.longName,
      shortName: data.shortName,
      symbol: data.symbol,
      currency: data.currency,
      exchange: data.exchange,
      quoteType: data.quoteType,
      regularMarketPrice: data.regularMarketPrice !== "N/A" ? data.regularMarketPrice : null,
      regularMarketOpen: data.regularMarketOpen !== "N/A" ? data.regularMarketOpen : null,
      regularMarketDayHigh: data.regularMarketDayHigh !== "N/A" ? data.regularMarketDayHigh : null,
      regularMarketDayLow: data.regularMarketDayLow !== "N/A" ? data.regularMarketDayLow : null,
      regularMarketVolume: data.regularMarketVolume !== "N/A" ? data.regularMarketVolume : null,
      marketCap: data.marketCap !== "N/A" ? data.marketCap : null,
      previousClose: data.previousClose !== "N/A" ? data.previousClose : null,
      fiftyTwoWeekHigh: data.fiftyTwoWeekHigh !== "N/A" ? data.fiftyTwoWeekHigh : null,
      fiftyTwoWeekLow: data.fiftyTwoWeekLow !== "N/A" ? data.fiftyTwoWeekLow : null,
      trailingPE: data.trailingPE !== "N/A" ? data.trailingPE : null,
      forwardPE: data.forwardPE !== "N/A" ? data.forwardPE : null,
      priceToBook: data.priceToBook !== "N/A" ? data.priceToBook : null,
      dividendYield: data.dividendYield !== "N/A" ? data.dividendYield : null,
      dividendRate: data.dividendRate !== "N/A" ? data.dividendRate : null,
      earningsGrowth: data.earningsGrowth !== "N/A" ? data.earningsGrowth : null,
      revenueGrowth: data.revenueGrowth !== "N/A" ? data.revenueGrowth : null,
      grossMargins: data.grossMargins !== "N/A" ? data.grossMargins : null,
      operatingMargins: data.operatingMargins !== "N/A" ? data.operatingMargins : null,
      profitMargins: data.profitMargins !== "N/A" ? data.profitMargins : null,
      totalRevenue: data.totalRevenue !== "N/A" ? data.totalRevenue : null,
      grossProfits: data.grossProfits !== "N/A" ? data.grossProfits : null,
      ebitda: data.ebitda !== "N/A" ? data.ebitda : null,
      netIncomeToCommon: data.netIncomeToCommon !== "N/A" ? data.netIncomeToCommon : null,
      totalCash: data.totalCash !== "N/A" ? data.totalCash : null,
      totalDebt: data.totalDebt !== "N/A" ? data.totalDebt : null,
      freeCashflow: data.freeCashflow !== "N/A" ? data.freeCashflow : null,
      sector: data.sector,
      industry: data.industry,
      fullTimeEmployees: data.fullTimeEmployees !== "N/A" ? data.fullTimeEmployees : null,
      website: data.website,
      address1: data.address1,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country: data.country,
      phone: data.phone,
      longBusinessSummary: data.longBusinessSummary,
      beta: data.beta !== "N/A" ? data.beta : null,
      enterpriseValue: data.enterpriseValue !== "N/A" ? data.enterpriseValue : null,
      averageDailyVolume10Day: data.averageDailyVolume10Day !== "N/A" ? data.averageDailyVolume10Day : null,
      averageDailyVolume3Month: data.averageDailyVolume3Month !== "N/A" ? data.averageDailyVolume3Month : null,
      historicalPrices: historicalData.prices
    }

    const { data: supabaseData, error } = await supabase
      .from('financial_products_extended')
      .upsert(product)
      .select()
      .single()

    if (error) throw error
    return supabaseData

  } catch (error) {
    console.error('Failed to fetch/store product:', error)
    throw error
  }
}