'use client'

import { useState } from 'react'
import VCAnalysis from './analysis/VCAnalysis'
import MarketAnalysis from './analysis/MarketAnalysis'
import { PersonaKey } from '@/lib/openai'

interface AnalysisContent {
  executiveSummary: string
  detailedAnalysis: {
    marketOpportunity: string
    businessModel: string
    competitiveAdvantage: string
    keyRisks: string
  }
  strengths: string[]
  concerns: string[]
  recommendations: string[]
  nextSteps: string[]
  score: {
    marketPotential: string
    executionRisk: string
    overallViability: string
  }
}

interface Analysis {
  persona: string
  role: string
  analysis: AnalysisContent
}

interface AnalysisResultsProps {
  analyses: Analysis[]
}

export default function AnalysisResults({ analyses }: AnalysisResultsProps) {
  const [activePersona, setActivePersona] = useState<PersonaKey>('VC')
  const analysis = analyses.find(a => a.persona === activePersona)?.analysis

  const renderAnalysis = () => {
    if (!analysis) return null

    switch (activePersona) {
      case 'VC':
        return <VCAnalysis analysis={analysis} />
      case 'MARKET':
        return <MarketAnalysis analysis={analysis} />
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