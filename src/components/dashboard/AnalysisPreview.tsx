'use client'

import { motion } from 'framer-motion'
import {FormData} from './NewAnalysisForm'
import { PersonaKey } from '@/lib/openai'
import { ArrowLeft, Send } from 'lucide-react'
import { useSubscription } from '@/hooks/useSubscription'
import AnalysisLimitModal from './AnalysisLimitModal'
import { useState } from 'react'

interface PreviewProps {
  formData: FormData
  selectedPersona: PersonaKey | null
  onBack: () => void
  onSubmit: () => void
  isLoading: boolean
}

export default function AnalysisPreview({ 
  formData, 
  selectedPersona, 
  onBack, 
  onSubmit,
  isLoading 
}: PreviewProps) {
  const { getRemainingAnalyses, analyses } = useSubscription()
  const [showLimitModal, setShowLimitModal] = useState(false)
  const remainingAnalyses = getRemainingAnalyses()

  const getNextResetDate = () => {
    if (!analyses.length) return new Date()
    const lastAnalysis = new Date(analyses[0].created_at)
    return new Date(
      lastAnalysis.getFullYear(),
      lastAnalysis.getMonth() + 1,
      1
    )
  }

  const handleSubmit = () => {
    if (remainingAnalyses === 0) {
      setShowLimitModal(true)
      return
    }
    onSubmit()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <AnalysisLimitModal 
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        nextResetDate={getNextResetDate()}
      />

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
          disabled={isLoading}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Edit
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLoading ? (
            <>Processing...</>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit Analysis
            </>
          )}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <h3 className="font-medium text-gray-900">Startup Name</h3>
          <p className="mt-1">{formData.title}</p>
        </div>

        <div>
          <h3 className="font-medium text-gray-900">Description</h3>
          <p className="mt-1 whitespace-pre-wrap">{formData.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-900">Target Market</h3>
            <p className="mt-1">{formData.targetMarket}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Business Model</h3>
            <p className="mt-1">{formData.businessModel}</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900">Key Challenges</h3>
          <p className="mt-1">{formData.challenges}</p>
        </div>

        <div>
          <h3 className="font-medium text-gray-900">Selected Advisor</h3>
          <p className="mt-1">{selectedPersona || 'None selected'}</p>
        </div>
      </div>
    </motion.div>
  )
} 