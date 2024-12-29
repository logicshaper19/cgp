// src/pages/results.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FinancialProduct } from '@/types/supabase';
import { fetchAndStoreProduct } from '@/lib/yfinance-service';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts') as any, { ssr: false });

export default function Results() {
  const router = useRouter();
  const { query } = router;
  const [product, setProduct] = useState<FinancialProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (query.isin) {
        try {
          const data = await fetchAndStoreProduct(query.isin as string);
          setProduct(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch data');
        } finally {
          setLoading(false);
        }
      }
    }
    fetchData();
  }, [query.isin]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No data found</div>;
  }

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: product.historicalPrices?.map((price) => price.date) || [],
    },
  };

  const chartSeries = [
    {
      name: 'Price',
      data: product.historicalPrices?.map((price) => price.close) || [],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{product.longName}</h1>
      <p>{product.longBusinessSummary}</p>
      <div className="mt-4">
        <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
      </div>
    </div>
  );
}