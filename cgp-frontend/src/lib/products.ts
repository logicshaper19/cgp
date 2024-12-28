// src/lib/products.ts
import supabase from './supabaseClient'

export async function searchProducts(query: string) {
  const { data, error } = await supabase
    .from('financial_products_extended') // Correct table name
    .select('*')
    .or(`isin.ilike.%${query}%,company_name.ilike.%${query}%`)
    .limit(10)

  if (error) {
    console.error('Supabase error:', error)
    throw error
  }

  console.log('Supabase query data:', data) // Debug log
  return data
}