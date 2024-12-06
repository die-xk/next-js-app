'use client'

import { useSearchParams } from 'next/navigation'
import { PADDLE_IDS } from '@/lib/paddle-client'
import { useState } from 'react'
import PaddleLoader from '@/components/PaddleLoader'

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')?.toLowerCase()
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    if (!window.Paddle || !plan) {
      setError('Paddle is not initialized or no plan selected');
      console.error('Paddle is not initialized or no plan selected');
      return;
    }

    const priceId = plan === 'pro' 
      ? PADDLE_IDS.PRO.PRICE_ID
      : plan === 'enterprise' 
        ? PADDLE_IDS.ENTERPRISE.PRICE_ID 
        : null;

    console.log('Selected plan:', plan);
    console.log('Resolved priceId:', priceId);

    if (!priceId) {
      setError('Invalid plan selected');
      console.error('Invalid plan selected');
      return;
    }

    try {
      window.Paddle.Checkout.open({
        settings: {
          displayMode: 'overlay',
          theme: 'light',
          locale: 'en',
          successUrl: `${window.location.origin}/dashboard?checkout=success`
        },
        items: [{
          priceId: priceId,
          quantity: 1
        }]
      });
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message);
    }
  }

  return (
    <>
      <PaddleLoader />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Complete Your {plan?.charAt(0).toUpperCase()}{plan?.slice(1)} Subscription
          </h2>
          {error && (
            <div className="text-red-500 mb-4">{error}</div>
          )}
          <button
            onClick={handleCheckout}
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Continue to Checkout
          </button>
        </div>
      </div>
    </>
  );
}