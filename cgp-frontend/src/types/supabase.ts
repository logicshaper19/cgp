// src/types/supabase.ts
export interface FinancialProduct {
    id: string;
    isin: string;
    nav_value: number;
    nav_date: string;
    sri_rating: number;
    currency: string;
    company_name: string;
    manager_name: string;
    category: string;
    is_etf: boolean;
    name: string; // Add this property
  }
  
  export interface SearchResponse {
    data: FinancialProduct[];
    count: number;
  }
