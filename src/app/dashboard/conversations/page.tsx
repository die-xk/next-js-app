'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardShell from '@/components/dashboard/DashboardShell'
import { useAuth } from '@/lib/context/AuthContext'
import { BrainCircuit, LineChart, ShieldCheck, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const personaIcons = {
  VC: BrainCircuit,
  MARKET: LineChart,
  RISK: ShieldCheck,
}

interface Analysis {
  id: string
  title: string
  description: string
  persona: keyof typeof personaIcons
  created_at: string
}

export default function ConversationsPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getAuthHeaders } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const response = await fetch('/api/analyses', {
          headers: getAuthHeaders(),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch analyses')
        }

        const data = await response.json()
        setAnalyses(data.analyses)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyses()
  }, [])

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Conversations</h1>
          <p className="text-gray-500">Your ongoing discussions with AI advisors.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {analyses.map((analysis) => {
            const Icon = personaIcons[analysis.persona]
            return (
              <div
                key={analysis.id}
                className="bg-white p-6 rounded-lg shadow-sm border hover:border-indigo-500 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Icon className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium line-clamp-1">{analysis.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {analysis.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(analysis.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Button 
                    className="w-full"
                    onClick={() => router.push(`/dashboard/chat/${analysis.id}?persona=${analysis.persona}`)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Continue Discussion
                  </Button>
                </div>
              </div>
            )
          })}

          {analyses.length === 0 && !error && (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No analyses yet. Start by creating a new analysis!</p>
              <Button className="mt-4" onClick={() => router.push('/dashboard/new')}>
                Create Your First Analysis
              </Button>
            </div>
          )}

          {error && (
            <div className="col-span-full text-center py-12 bg-red-50 rounded-lg">
              <p className="text-red-500">{error}</p>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  )
} 