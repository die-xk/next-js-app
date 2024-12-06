'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import PricingSection from '@/components/PricingSection'

function PricingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const hasDraft = searchParams.get('hasDraft') === 'true'

  useEffect(() => {
    // Check if there's a saved draft when the component mounts
    const savedDraft = localStorage.getItem('analysis_draft')
    if (savedDraft && !hasDraft) {
      // If there's a draft but it's not in the URL, update the URL
      router.replace('/pricing?hasDraft=true')
    }
  }, [router, hasDraft])

  return (
    <main className="min-h-screen bg-gray-50">
      {hasDraft && (
        <div className="bg-amber-50 border-b border-amber-100">
          <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <p className="text-sm text-amber-700">
                You have a saved analysis draft. Upgrade now to continue where you left off!
              </p>
              <button
                onClick={() => router.push('/dashboard/new')}
                className="text-sm text-amber-800 underline hover:text-amber-900"
              >
                Return to draft
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600">
            Get expert AI analysis for your startup idea
          </p>
        </div>
        
        <PricingSection />
      </div>
    </main>
  )
}

export default PricingPage 