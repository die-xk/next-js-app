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
  const isLoading = searchParams.get('loading') === 'true'

  useEffect(() => {
    const fetchResults = async () => {
      if (isLoading) {
        return
      }

      if (!analysisId) {
        setError('No analysis ID provided')
        setLoading(false)
        return
      }

      try {
        const storedData = sessionStorage.getItem(`analysis_${analysisId}`)
        if (!storedData) {
          throw new Error('Analysis data not found')
        }

        const parsedData = JSON.parse(storedData)
        if (!Array.isArray(parsedData)) {
          throw new Error('Invalid analysis data format')
        }

        setAnalyses(parsedData)
      } catch (err: any) {
        setError(err.message || 'Failed to load analysis results')
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [analysisId, isLoading])

  if (isLoading) {
    return (
      <DashboardShell>
        <AnalysisLoading />
      </DashboardShell>
    )
  }

  if (error) {
    return (
      <DashboardShell>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Analysis</h2>
          <p className="text-gray-500">{error}</p>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      {analyses && <AnalysisResults analyses={analyses} />}
    </DashboardShell>
  )
} 