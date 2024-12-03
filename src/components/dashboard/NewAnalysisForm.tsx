'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PersonaKey } from '@/lib/openai'
import { useAuth } from '@/lib/context/AuthContext'

interface FormData {
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
]

const initialFormData: FormData = {
  title: '',
  description: '',
  targetMarket: '',
  businessModel: '',
  stage: 'idea',
  challenges: ''
}

export default function NewAnalysisForm({ selectedPersona }: NewAnalysisFormProps) {
  const { getAuthHeaders } = useAuth()
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedPersona) {
      setError('Please select an AI advisor')
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      console.log('Submitting analysis request...', { selectedPersona, formData })
      
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

      console.log('Analysis response:', data)

      if (!data.analyses || !data.analyses.length) {
        throw new Error('No analysis data received')
      }

      const analysisId = Date.now().toString()
      sessionStorage.setItem(`analysis_${analysisId}`, JSON.stringify(data.analyses))
      router.push(`/dashboard/analysis/results?id=${analysisId}`)
    } catch (error: any) {
      console.error('Error details:', error)
      setError(`Failed to analyze startup idea: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-2xl"
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
          {error}
        </div>
      )}
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
        <textarea
          id="description"
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="What problem does it solve? How does it work? What makes it unique?"
          required
        />
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
  )
} 