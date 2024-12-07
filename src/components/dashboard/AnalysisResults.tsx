'use client'

import { useState } from 'react'
import VCAnalysis from './analysis/VCAnalysis'
import MarketAnalysis from './analysis/MarketAnalysis'
import { PersonaKey } from '@/lib/openai'
import { Analysis } from '@/types/database'

interface AnalysisResultsProps {
  analyses: Analysis[]
  selectedPersona?: PersonaKey
}

export default function AnalysisResults({ analyses, selectedPersona = 'VC' }: AnalysisResultsProps) {
  const [activePersona, setActivePersona] = useState<PersonaKey>(selectedPersona)
  const analysisResult = analyses.find(a => a.persona === activePersona)?.analysis_result

  const renderAnalysis = () => {
    if (!analysisResult) return null

    switch (activePersona) {
      case 'VC':
        return <VCAnalysis analysis={analysisResult} />
      case 'MARKET':
        return <MarketAnalysis analysis={analysisResult} />
      case 'RISK':
        return <></>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        {analyses.map(a => (
          <button
            key={a.persona}
            onClick={() => setActivePersona(a.persona as PersonaKey)}
            className={`px-4 py-2 rounded-lg ${
              activePersona === a.persona 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {a.persona} Analysis
          </button>
        ))}
      </div>

      {renderAnalysis()}
    </div>
  )
} 