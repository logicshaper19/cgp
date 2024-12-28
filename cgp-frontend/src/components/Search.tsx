// src/components/Search.tsx
'use client'

import { useState } from 'react';
import { FinancialProduct } from '@/types/supabase';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FinancialProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    try {
      setLoading(true);
      setError(null);

      // Validate the query
      if (!query.trim()) {
        setError('Please enter a search term');
        return;
      }

      // Fetch data from the API
      const response = await fetch(`/api/yfinance/fetch?isin=${query}`);
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Search failed with status: ${response.status}. Details: ${errorDetails}`);
      }

      // Parse the JSON response
      const data = await response.json();
      console.log('Search results:', data); // Debug log

      // Map the API response to the FinancialProduct type
      const product: FinancialProduct = {
        id: data.isin, // Use ISIN as the unique ID
        isin: data.isin,
        name: data.name, // Add the name property
        company_name: data.name, // Use company_name as well
        sri_rating: 0, // Default value (update if available)
        nav_value: data.price,
        currency: data.currency,
        nav_date: '', // Add default value
        manager_name: '', // Add default value
        category: '', // Add default value
        is_etf: false, // Add default value
      };

      setResults([product]);
    } catch (err) {
      console.error('Search error details:', err);
      setError(err instanceof Error ? err.message : 'Search failed. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by ISIN or name..."
          className="flex-1 p-2 border rounded bg-gray-800 text-white"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className={`px-4 py-2 rounded ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mt-4 space-y-4">
        {Array.isArray(results) && results.map((product) => (
          <div key={product.id} className="p-4 border rounded bg-gray-800 text-white">
            <h3 className="font-bold">{product.name}</h3>
            <p>ISIN: {product.isin}</p>
            <p>SRI Rating: {product.sri_rating}/7</p>
            <p>NAV: {product.nav_value} {product.currency}</p>
          </div>
        ))}
      </div>
    </div>
  );
}