// src/lib/products.ts
import { createClient } from '@supabase/supabase-js';
import { FinancialProduct } from '../types/supabase';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function searchProducts(query: string): Promise<FinancialProduct[]> {
  const { data, error } = await supabase
    .from('financial_products')
    .select()
    .or(`isin.ilike.%${query}%,name.ilike.%${query}%`)
    .limit(10);

  if (error) throw error;
  return data || [];
}