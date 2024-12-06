'use client'

import { useAuth } from '@/lib/context/AuthContext'
import { PersonaKey } from '@/lib/openai'
import { useState, useEffect } from 'react'

export function useSubscription() {
  const { user } = useAuth()
  const [analysisCount, setAnalysisCount] = useState(0)
  const [analyses, setAnalyses] = useState<any[]>([])

  useEffect(() => {
    const fetchAnalysisCount = async () => {
      if (!user) return
      
      try {
        const response = await fetch('/api/user/analysis-count', {
          headers: {
            'Authorization': `Bearer ${await user.getIdToken()}`
          }
        })
        const data = await response.json()
        console.log('Analysis data:', data) // Debug log
        setAnalysisCount(data.count)
        setAnalyses(data.analyses)
      } catch (error) {
        console.error('Failed to fetch analysis count:', error)
      }
    }

    fetchAnalysisCount()
  }, [user])

  const canAccessAdvisor = (persona: PersonaKey) => {
    return persona === 'VC' || user?.subscriptionTier === 'pro'
  }

  const getRemainingAnalyses = () => {
    if (!user) return 0
    if (user?.subscriptionTier === 'pro') return -1 // Unlimited for pro users
    return Math.max(1 - analysisCount, 0) // Free tier gets 1 analysis per month
  }

  return {
    canAccessAdvisor,
    getRemainingAnalyses,
    analysisCount,
    analyses // Include analyses in return object if needed elsewhere
  }
} 