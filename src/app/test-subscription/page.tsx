'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/context/AuthContext'

export default function TestSubscriptionPage() {
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { getAuthHeaders } = useAuth()

  const fetchSubscription = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/test-subscription', {
        headers: getAuthHeaders()
      })
      const data = await response.json()
      
      if (!response.ok) throw new Error(data.error)
      setSubscription(data.subscription)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateSubscription = async (tier: string) => {
    try {
      setLoading(true)
      const response = await fetch('/api/test-subscription', {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tier,
          subscriptionId: `test_${tier}_${Date.now()}`,
          status: 'active'
        })
      })
      const data = await response.json()
      
      if (!response.ok) throw new Error(data.error)
      setSubscription(data.subscription)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscription()
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Subscription Test Page</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="font-semibold mb-2">Current Subscription:</h2>
        <pre>{JSON.stringify(subscription, null, 2)}</pre>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => updateSubscription('free')}
          disabled={loading}
          className="block w-full p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Set Free Tier
        </button>
        
        <button
          onClick={() => updateSubscription('pro')}
          disabled={loading}
          className="block w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Set Pro Tier
        </button>
        
        <button
          onClick={() => updateSubscription('enterprise')}
          disabled={loading}
          className="block w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Set Enterprise Tier
        </button>
      </div>
    </div>
  )
} 