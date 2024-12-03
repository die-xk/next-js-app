'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { 
  MessageSquare, 
  Download, 
  Share2,
  BrainCircuit,
  LineChart,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  ChevronRight
} from 'lucide-react'

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
  const [activePersona, setActivePersona] = useState('VC')
  const [showFollowUp, setShowFollowUp] = useState(false)
  const [followUpQuestion, setFollowUpQuestion] = useState('')
  const [expandedSections, setExpandedSections] = useState<string[]>(['executiveSummary'])

  const renderDetailedAnalysis = (analysis: AnalysisContent['detailedAnalysis']) => (
    <div className="space-y-4">
      {Object.entries(analysis).map(([key, value]) => (
        <div key={key} className="border-b pb-4">
          <h4 className="font-medium mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
          <p className="text-gray-600">{value}</p>
        </div>
      ))}
    </div>
  )

  const renderScores = (scores: AnalysisContent['score']) => (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(scores).map(([key, value]) => (
        <div key={key} className="text-center">
          <div className="text-2xl font-bold text-indigo-600">{value}/10</div>
          <div className="text-sm text-gray-500 capitalize">
            {key.replace(/([A-Z])/g, ' $1')}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analysis Results</h2>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => {}}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <Tabs value={activePersona} onValueChange={setActivePersona}>
        <TabsList className="grid grid-cols-3">
          {analyses.map((analysis) => (
            <TabsTrigger
              key={analysis.persona}
              value={analysis.persona}
              className="space-x-2"
            >
              {analysis.persona === 'VC' && <BrainCircuit className="w-4 h-4" />}
              {analysis.persona === 'MARKET' && <LineChart className="w-4 h-4" />}
              {analysis.persona === 'RISK' && <ShieldCheck className="w-4 h-4" />}
              <span>{analysis.role}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {analyses.map((analysis) => (
          <TabsContent key={analysis.persona} value={analysis.persona}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm space-y-6 p-6"
            >
              {/* Scores Section */}
              <div className="mb-8">
                {renderScores(analysis.analysis.score)}
              </div>

              {/* Executive Summary */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-3">Executive Summary</h3>
                <p className="text-gray-600">{analysis.analysis.executiveSummary}</p>
              </div>

              {/* Detailed Analysis */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-medium mb-3">Detailed Analysis</h3>
                {renderDetailedAnalysis(analysis.analysis.detailedAnalysis)}
              </div>

              {/* Strengths & Concerns */}
              <div className="grid grid-cols-2 gap-6 border-b pb-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-green-600">Key Strengths</h3>
                  <ul className="space-y-2">
                    {analysis.analysis.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3 text-red-600">Critical Concerns</h3>
                  <ul className="space-y-2">
                    {analysis.analysis.concerns.map((concern, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        <span>{concern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendations & Next Steps */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Recommendations</h3>
                  <ul className="space-y-2">
                    {analysis.analysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <MessageSquare className="w-5 h-5 text-indigo-500 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3">Next Steps</h3>
                  <ul className="space-y-2">
                    {analysis.analysis.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <ChevronRight className="w-5 h-5 text-gray-500 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowFollowUp(!showFollowUp)}
                  className="w-full"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ask Follow-up Question
                </Button>

                <AnimatePresence>
                  {showFollowUp && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-4"
                    >
                      <textarea
                        value={followUpQuestion}
                        onChange={(e) => setFollowUpQuestion(e.target.value)}
                        className="w-full p-3 border rounded-md"
                        placeholder="Type your follow-up question..."
                        rows={3}
                      />
                      <Button className="w-full">
                        Send Question
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
} 