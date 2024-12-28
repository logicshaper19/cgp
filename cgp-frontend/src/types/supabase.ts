// src/types/supabase.ts
export interface FinancialProduct {
  id: string;
  isin: string;
  company_name: string;
  description: string;
  price: number | string;
  currency: string;
  sri_rating: number;
  nav_value: number;
  manager_name: string;
  creation_date: string;
}

export interface SearchResponse {
  data: FinancialProduct[];
  count: number;
}
