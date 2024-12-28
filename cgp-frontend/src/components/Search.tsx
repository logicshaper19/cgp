// src/components/Search.tsx
'use client'

import { useState } from 'react';
import { FinancialProduct } from '@/types/supabase';
import { searchProducts } from '@/lib/products';
import { fetchAndStoreProduct } from '@/lib/yfinance-service';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FinancialProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    try {
      setLoading(true);
      setError(null);
      
      if (!query.trim()) {
        setError('Please enter a search term');
        return;
      }

      console.log('Search query:', query); // Debug log
      let data = await searchProducts(query);
      console.log('Database search results:', data); // Debug log

      if (data.length === 0) {
        // If no results from database, fetch from yfinance API
        console.log('Fetching from yfinance API');
        const product = await fetchAndStoreProduct(query);
        data = [product];
      }

      setResults(data);
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
        {results.map((product, index) => (
          <div key={product.id || index} className="p-4 border rounded bg-gray-800 text-white">
            <h3 className="font-bold">{product.company_name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: {product.price !== "N/A" ? `${product.price} ${product.currency}` : "Price not available"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}