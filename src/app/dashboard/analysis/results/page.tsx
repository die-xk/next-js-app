'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import DashboardShell from '@/components/dashboard/DashboardShell'
import AnalysisResults from '@/components/dashboard/AnalysisResults'
import AnalysisLoading from '@/components/dashboard/AnalysisLoading'

export default function ResultsPage() {
  const [analyses, setAnalyses] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const analysisId = searchParams.get('id')

  useEffect(() => {
    const fetchResults = async () => {
      if (!analysisId) {
        setError('No analysis ID provided')
        setLoading(false)
        return
      }

      try {
        console.log('Fetching analysis with ID:', analysisId)
        
        // Try to get from sessionStorage first
        const storedData = sessionStorage.getItem(`analysis_${analysisId}`)
        if (!storedData) {
          throw new Error('Analysis data not found')
        }

        const parsedData = JSON.parse(storedData)
        console.log('Retrieved analysis data:', parsedData)
        
        if (!Array.isArray(parsedData)) {
          throw new Error('Invalid analysis data format')
        }

        setAnalyses(parsedData)
      } catch (err: any) {
        console.error('Error fetching results:', err)
        setError(err.message || 'Failed to load analysis results')
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [analysisId])

  if (loading) {
    return (
      <DashboardShell>
        <AnalysisLoading />
      </DashboardShell>
    )
  }

  if (error) {
    return (
      <DashboardShell>
        <div className="max-w-2xl mx-auto text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Analysis</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button 
            onClick={() => window.history.back()}
            className="text-indigo-600 hover:text-indigo-500"
          >
            ← Go Back
          </button>
        </div>
      </DashboardShell>
    )
  }

  if (!analyses) {
    return (
      <DashboardShell>
        <div className="text-center py-12">
          <p>No analysis data found</p>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <AnalysisResults analyses={analyses} />
    </DashboardShell>
  )
} 