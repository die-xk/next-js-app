"use client"
import { useEffect, useState } from 'react';

export default function PricesPage() {
  const [prices, setPrices] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('/api/prices');
        const data = await response.json();
        console.log('Received data:', data);

        if (response.ok) {
          setPrices(data.data || []);
        } else {
          throw new Error(data.error || 'Failed to fetch prices');
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchPrices();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Product Prices</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(prices, null, 2)}
      </pre>
    </div>
  );
} 