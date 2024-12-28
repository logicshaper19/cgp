// src/lib/api-handlers.ts
import { createClient } from '@supabase/supabase-js'
import type { FinancialProduct } from '@/types/supabase'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function searchFinancialProducts(query: string) {
  const { data, error } = await supabase
    .from('financial_products_extended')
    .select()
    .or(`isin.ilike.%${query}%,company_name.ilike.%${query}%`)
    .limit(10)

  if (error) throw error
  return data
}

export async function getProductByIsin(isin: string) {
  const { data, error } = await supabase
    .from('financial_products_extended')
    .select(`
      *,
      fund_risk_metrics(
        volatility_1y,
        srri_rating,
        risk_level
      ),
      fund_documents(
        document_type,
        document_url
      )
    `)
    .eq('isin', isin)
    .single()

  if (error) throw error
  return data
}