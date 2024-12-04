'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardShell from '@/components/dashboard/DashboardShell'
import { useAuth } from '@/lib/context/AuthContext'
import { BrainCircuit, LineChart, ShieldCheck, Filter, Search, Eye, Trash2, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const personaIcons = {
  VC: BrainCircuit,
  MARKET: LineChart,
  RISK: ShieldCheck,
}

const timeFilters = [
  { value: 'all', label: 'All Time' },
  { value: 'week', label: 'Past Week' },
  { value: 'month', label: 'Past Month' },
  { value: '3months', label: 'Past 3 Months' },
]

interface Analysis {
  id: string
  title: string
  description: string
  persona: string
  created_at: string
}

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [filteredAnalyses, setFilteredAnalyses] = useState<Analysis[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPersona, setSelectedPersona] = useState('all')
  const [timeFilter, setTimeFilter] = useState('all')
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
        setFilteredAnalyses(data.analyses)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyses()
  }, [])

  useEffect(() => {
    let filtered = [...analyses]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        analysis => 
          analysis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          analysis.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by persona
    if (selectedPersona !== 'all') {
      filtered = filtered.filter(analysis => analysis.persona === selectedPersona)
    }

    // Filter by time
    if (timeFilter !== 'all') {
      const now = new Date()
      const filterDate = new Date()
      
      switch(timeFilter) {
        case 'week':
          filterDate.setDate(now.getDate() - 7)
          break
        case 'month':
          filterDate.setMonth(now.getMonth() - 1)
          break
        case '3months':
          filterDate.setMonth(now.getMonth() - 3)
          break
      }

      filtered = filtered.filter(
        analysis => new Date(analysis.created_at) >= filterDate
      )
    }

    setFilteredAnalyses(filtered)
  }, [searchTerm, selectedPersona, timeFilter, analyses])

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click event
    try {
      const response = await fetch(`/api/analysis/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to delete analysis')
      }

      // Remove the deleted analysis from state
      setAnalyses(analyses.filter(a => a.id !== id))
      setFilteredAnalyses(filteredAnalyses.filter(a => a.id !== id))
    } catch (err: any) {
      setError('Failed to delete analysis')
    }
  }

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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Analysis History</h1>
            <p className="text-gray-500">Review your previous startup analyses.</p>
          </div>
          <Button onClick={() => router.push('/dashboard/new')}>
            New Analysis
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
          <h2 className="font-medium flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search analyses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <Select
              value={selectedPersona}
              onValueChange={setSelectedPersona}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Advisor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Advisors</SelectItem>
                <SelectItem value="VC">VC Advisor</SelectItem>
                <SelectItem value="MARKET">Market Research</SelectItem>
                <SelectItem value="RISK">Risk Analysis</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={timeFilter}
              onValueChange={setTimeFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                {timeFilters.map(filter => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="grid gap-4">
          {filteredAnalyses.map((analysis) => {
            const Icon = personaIcons[analysis.persona as keyof typeof personaIcons]
            return (
              <div
                key={analysis.id}
                className="bg-white p-6 rounded-lg shadow-sm border hover:border-indigo-500 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{analysis.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {analysis.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(analysis.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/dashboard/analysis/results?id=${analysis.id}`)
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="sr-only">View</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/dashboard/chat/${analysis.id}`)
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="sr-only">Chat</span>
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Analysis</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this analysis? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={(e) => handleDelete(analysis.id, e)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            )
          })}

          {filteredAnalyses.length === 0 && !error && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                {analyses.length === 0 
                  ? "No analyses yet. Start by creating a new analysis!"
                  : "No analyses match your filters."}
              </p>
              {analyses.length === 0 && (
                <Button className="mt-4" onClick={() => router.push('/dashboard/new')}>
                  Create Your First Analysis
                </Button>
              )}
            </div>
          )}

          {error && (
            <div className="text-center py-12 bg-red-50 rounded-lg">
              <p className="text-red-500">{error}</p>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  )
} 