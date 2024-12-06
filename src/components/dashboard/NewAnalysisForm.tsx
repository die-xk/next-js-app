'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSubscription } from '@/hooks/useSubscription'
import { PersonaKey } from '@/lib/openai'
import { useAuth } from '@/lib/context/AuthContext'
import FormProgress from './FormProgress'
import AnalysisPreview from './AnalysisPreview'

export interface FormData {
  title: string
  description: string
  targetMarket: string
  businessModel: string
  stage: string
  challenges: string
}

interface NewAnalysisFormProps {
  selectedPersona: PersonaKey | null
}

const stages = [
  { value: 'idea', label: 'Idea Stage' },
  { value: 'mvp', label: 'MVP' },
  { value: 'launched', label: 'Already Launched' },
  { value: 'scaling', label: 'Scaling' }
] as const

const initialFormData: FormData = {
  title: '',
  description: '',
  targetMarket: '',
  businessModel: '',
  stage: 'idea',
  challenges: ''
}

const DRAFT_STORAGE_KEY = 'analysis_draft'

export default function NewAnalysisForm({ selectedPersona }: NewAnalysisFormProps) {
  const { getAuthHeaders } = useAuth();
  const { canAccessAdvisor, getRemainingAnalyses, analyses } = useSubscription();
  const remainingAnalyses = getRemainingAnalyses();
  const [showLimitModal, setShowLimitModal] = useState(false)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [showPreview, setShowPreview] = useState(false)

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY)
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft))
    }
  }, [])

  // Calculate next reset date based on the most recent analysis
  const getNextResetDate = () => {
    if (!analyses.length) return new Date()
    const lastAnalysis = new Date(analyses[0].created_at)
    return new Date(
      lastAnalysis.getFullYear(),
      lastAnalysis.getMonth() + 1,
      1
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!showPreview) {
      setShowPreview(true)
      return
    }

    if (remainingAnalyses === 0) {
      setShowLimitModal(true)
      return
    }

    if (!selectedPersona) {
      setError('Please select an AI advisor')
      return
    }

    if (!canAccessAdvisor(selectedPersona)) {
      setError(`${selectedPersona} advisor is only available in higher tiers. Please upgrade to access.`);
      return;
    }

    setIsLoading(true)
    setError(null)
    
    try {
      router.push('/dashboard/analysis/results?loading=true')
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...formData,
          persona: selectedPersona
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed')
      }

      const analysisId = data.analyses[0].id
      sessionStorage.setItem(`analysis_${analysisId}`, JSON.stringify(data.analyses))
      router.push(`/dashboard/analysis/results?id=${analysisId}`)
    } catch (error: any) {
      setError(`Failed to analyze startup idea: ${error.message}`)
      setIsLoading(false)
    }
  }

  // Save draft before redirecting to pricing
  const handleUpgradeClick = () => {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formData))
    router.push('/pricing')
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {showPreview ? (
        <AnalysisPreview
          formData={formData}
          selectedPersona={selectedPersona}
          onBack={() => setShowPreview(false)}
          onSubmit={() => handleSubmit(new Event('submit') as any)}
          onUpgrade={handleUpgradeClick}
          isLoading={isLoading}
        />
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
              {error}
            </div>
          )}
          <FormProgress formData={formData} />
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Startup Name / Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Describe your startup idea
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="What problem does it solve? How does it work? What makes it unique?"
                required
              />
              <div className="mt-1 flex justify-end">
                <span className={`text-sm ${
                  formData.description.length < 100 ? 'text-amber-600' : 'text-green-600'
                }`}>
                  {formData.description.length}/500 characters
                  {formData.description.length < 100 && ' (aim for at least 100)'}
                </span>
              </div>
            </div>
          </div>

          {/* Target Market */}
          <div>
            <label htmlFor="targetMarket" className="block text-sm font-medium text-gray-700">
              Target Market
            </label>
            <textarea
              id="targetMarket"
              rows={2}
              value={formData.targetMarket}
              onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Who are your target customers? What is the market size?"
              required
            />
          </div>

          {/* Business Model */}
          <div>
            <label htmlFor="businessModel" className="block text-sm font-medium text-gray-700">
              Business Model
            </label>
            <textarea
              id="businessModel"
              rows={2}
              value={formData.businessModel}
              onChange={(e) => setFormData({ ...formData, businessModel: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="How will you make money? What's your pricing strategy?"
              required
            />
          </div>

          {/* Stage */}
          <div>
            <label htmlFor="stage" className="block text-sm font-medium text-gray-700">
              Current Stage
            </label>
            <select
              id="stage"
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {stages.map((stage) => (
                <option key={stage.value} value={stage.value}>
                  {stage.label}
                </option>
              ))}
            </select>
          </div>

          {/* Challenges */}
          <div>
            <label htmlFor="challenges" className="block text-sm font-medium text-gray-700">
              Key Challenges
            </label>
            <textarea
              id="challenges"
              rows={2}
              value={formData.challenges}
              onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="What are your biggest concerns or challenges?"
              required
            />
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Remaining Analyses</span>
              <span className={remainingAnalyses === 0 ? 'text-red-500' : 'text-green-500'}>
                {remainingAnalyses === -1 ? 'Unlimited' : remainingAnalyses}
              </span>
            </div>
            
            {selectedPersona && !canAccessAdvisor(selectedPersona) && (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-md">
                <Lock className="w-4 h-4" />
                <span className="text-sm">
                  This advisor is only available in higher tiers. 
                  <button 
                    type="button"
                    onClick={handleUpgradeClick}
                    className="ml-2 underline"
                  >
                    Upgrade now
                  </button>
                </span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Analyzing...
              </>
            ) : (
              'Get Analysis'
            )}
          </button>
        </motion.form>
      )}
    </div>
  )
} 