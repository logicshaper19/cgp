// src/lib/yfinance-service.ts
import { createClient } from '@supabase/supabase-js'
import type { FinancialProduct } from '@/types/supabase'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface YFinanceProduct {
  isin: string;
  longName: string;
  regularMarketPrice: number;
  currency: string;
  fundFamily?: string;
  category?: string;
  totalAssets?: number;
  yield?: number;
  riskRating?: number;
}

export async function fetchAndStoreProduct(isin: string) {
  try {
    // Call Python yfinance script
    const response = await fetch(`/api/yfinance/fetch?isin=${isin}`)
    const yahooData: YFinanceProduct = await response.json()

    // Transform and store in Supabase
    const product = {
      isin: yahooData.isin,
      company_name: yahooData.longName,
      nav_value: yahooData.regularMarketPrice,
      currency: yahooData.currency,
      sri_rating: yahooData.riskRating || 3, // Default value
      category: yahooData.category,
      manager_name: yahooData.fundFamily
    }

    const { data, error } = await supabase
      .from('financial_products_extended')
      .upsert(product)
      .select()
      .single()

    if (error) throw error
    return data

  } catch (error) {
    console.error('Failed to fetch/store product:', error)
    throw error
  }
}