import { motion } from 'framer-motion'
import { AnalysisResult } from '@/types/database'
import { TrendingUp, Target, Scale, AlertCircle, Milestone } from 'lucide-react'

interface VCAnalysisProps {
  analysis: AnalysisResult
}

export default function VCAnalysis({ analysis }: VCAnalysisProps) {
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 w-full"
    >
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

      {/* Analysis Sections */}
      {Object.entries(analysis.sections).map(([key, points]) => {
        const Icon = sectionIcons[key as keyof typeof sectionIcons]
        return (
          <motion.div 
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6 w-full"
          >
            <div className="flex items-center gap-3 mb-4">
              {Icon && <Icon className={`w-5 h-5 ${getScoreColor(analysis.summary.score)}`} />}
              <h4 className="text-lg font-medium text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1')}
              </h4>
            </div>
            <ul className="space-y-3">
              {points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className={`flex-shrink-0 w-6 h-6 ${getScoreBg(analysis.summary.score)} ${getScoreColor(analysis.summary.score)} rounded-full flex items-center justify-center text-sm`}>
                    {index + 1}
                  </span>
                  <span className="text-gray-600">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )
      })}

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