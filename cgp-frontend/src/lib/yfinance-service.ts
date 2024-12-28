// src/lib/yfinance-service.ts
import supabase from './supabaseClient'

export async function fetchAndStoreProduct(isin: string) {
  try {
    // Call Python yfinance script
    const response = await fetch(`/api/yfinance/fetch?isin=${isin}`)
    const yahooData = await response.json()

    // Transform and store in Supabase
    const product = {
      isin: yahooData.isin,
      company_name: yahooData.longName,
      nav_value: yahooData.regularMarketPrice !== "N/A" ? yahooData.regularMarketPrice : null,
      currency: yahooData.currency,
      sri_rating: yahooData.sri_rating || 3, // Default value
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