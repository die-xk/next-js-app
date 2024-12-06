import { motion } from 'framer-motion'
import { useState } from 'react'
import { AnalysisResult } from '@/types/database'
import { TrendingUp, Target, Scale, AlertCircle, Milestone, MessageCircle, Loader2 } from 'lucide-react'

interface VCAnalysisProps {
  analysis: AnalysisResult
}

interface FollowUpQuestion {
  question: string
  answer: {
    summary: string
    keyPoints: string[]
    recommendations: string[]
    metrics: string[]
    risks: string[]
  }
  loading?: boolean
}

export default function VCAnalysis({ analysis }: VCAnalysisProps) {
  const [sectionQuestions, setSectionQuestions] = useState<Record<string, FollowUpQuestion[]>>({})
  const [isAsking, setIsAsking] = useState<string | null>(null)

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-indigo-600'
    if (score >= 40) return 'text-amber-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50'
    if (score >= 60) return 'bg-indigo-50'
    if (score >= 40) return 'bg-amber-50'
    return 'bg-red-50'
  }

  const getVerdictColor = (score: number) => {
    if (score >= 80) return 'text-green-700'
    if (score >= 60) return 'text-indigo-700'
    if (score >= 40) return 'text-amber-700'
    return 'text-red-700'
  }

  const sectionIcons = {
    investmentPotential: TrendingUp,
    marketAnalysis: Target,
    scalability: Scale,
    risks: AlertCircle,
    milestones: Milestone
  }

  const askFollowUp = async (section: string, context: string[]) => {
    setIsAsking(section)
    try {
      const response = await fetch('/api/analysis/followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section,
          context,
          previousQuestions: sectionQuestions[section] || []
        })
      })
      
      const data = await response.json()
      setSectionQuestions(prev => ({
        ...prev,
        [section]: [...(prev[section] || []), data]
      }))
    } catch (error) {
      console.error('Failed to get follow-up insights:', error)
    }
    setIsAsking(null)
  }

  const renderSection = (key: string, points: string[]) => {
    const Icon = sectionIcons[key as keyof typeof sectionIcons]
    const questions = sectionQuestions[key] || []

    return (
      <motion.div 
        key={key}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md p-6 w-full"
      >
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {Icon && <Icon className={`w-5 h-5 ${getScoreColor(analysis.summary.score)}`} />}
            <h4 className="text-lg font-medium text-gray-900 capitalize">
              {key.replace(/([A-Z])/g, ' $1')}
            </h4>
          </div>
          <button
            onClick={() => askFollowUp(key, points)}
            disabled={isAsking === key}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-indigo-600 
              hover:bg-indigo-50 rounded-lg transition-colors"
          >
            {isAsking === key ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <MessageCircle className="w-4 h-4" />
            )}
            Get More Insights
          </button>
        </div>

        {/* Main Points */}
        <ul className="space-y-3 mb-4">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className={`flex-shrink-0 w-6 h-6 ${getScoreBg(analysis.summary.score)} 
                ${getScoreColor(analysis.summary.score)} rounded-full flex items-center justify-center text-sm`}>
                {index + 1}
              </span>
              <span className="text-gray-600">{point}</span>
            </li>
          ))}
        </ul>

        {/* Follow-up Q&A */}
        {questions.length > 0 && (
          renderFollowUpQA(questions)
        )}
      </motion.div>
    )
  }

  const renderFollowUpQA = (questions: FollowUpQuestion[]) => {
    return (
      <div className="mt-6 pt-6 border-t space-y-6">
        <h5 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-indigo-500" />
          Additional Insights
        </h5>
        <div className="space-y-6">
          {questions.map((qa, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6"
            >
              <div className="space-y-6">
                {/* Question */}
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-white text-indigo-600 rounded-full flex items-center justify-center font-medium border border-indigo-100">
                    Q{index + 1}
                  </span>
                  <p className="text-lg font-medium text-gray-900">{qa.question}</p>
                </div>

                {/* Answer */}
                <div className="ml-12 space-y-4">
                  {/* Summary */}
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-gray-600 leading-relaxed">{qa.answer.summary}</p>
                  </div>

                  {/* Key Points */}
                  <div className="space-y-2">
                    <h6 className="font-medium text-gray-900">Key Points</h6>
                    <ul className="space-y-2">
                      {qa.answer.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm">
                            {i + 1}
                          </span>
                          <span className="text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-2">
                    <h6 className="font-medium text-gray-900">Recommendations</h6>
                    <ul className="space-y-2">
                      {qa.answer.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">
                            ✓
                          </span>
                          <span className="text-gray-600">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-2">
                    <h6 className="font-medium text-gray-900">Key Metrics to Track</h6>
                    <div className="grid grid-cols-2 gap-2">
                      {qa.answer.metrics.map((metric, i) => (
                        <div key={i} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                          {metric}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risks */}
                  <div className="space-y-2">
                    <h6 className="font-medium text-gray-900">Risks to Consider</h6>
                    <ul className="space-y-2">
                      {qa.answer.risks.map((risk, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm">
                            !
                          </span>
                          <span className="text-gray-600">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div className="space-y-6 w-full">
      {/* Investment Summary Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
          <h3 className="text-xl font-semibold text-white">Investment Summary</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-8">
            <div className={`flex-shrink-0 p-6 rounded-xl ${getScoreBg(analysis.summary.score)}`}>
              <div className={`text-4xl font-bold ${getScoreColor(analysis.summary.score)}`}>
                {analysis.summary.score}
              </div>
              <div className="text-sm font-medium text-gray-500 mt-1">Investment Score</div>
            </div>
            <div className="flex-grow">
              <h4 className="text-lg font-medium text-gray-900 mb-2">Verdict</h4>
              <p className={`${getVerdictColor(analysis.summary.score)} text-lg`}>
                {analysis.summary.verdict}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Sections with Q&A */}
      {Object.entries(analysis.sections).map(([key, points]) => renderSection(key, points))}

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-md p-6 w-full">
        <h3 className="text-xl font-semibold mb-4">Recommended Actions</h3>
        <div className="space-y-4">
          {analysis.recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-start gap-4 p-4 rounded-lg ${getScoreBg(analysis.summary.score)}`}
            >
              <span className={`flex-shrink-0 w-8 h-8 ${getScoreColor(analysis.summary.score)} bg-white rounded-full flex items-center justify-center font-medium`}>
                {index + 1}
              </span>
              <span className="text-gray-700">{rec}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
} 