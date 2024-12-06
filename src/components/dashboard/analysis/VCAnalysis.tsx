import { motion } from 'framer-motion'
import { AnalysisResult } from '@/types/database'

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

  return (
    <div className="space-y-6">
      {/* Investment Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Investment Summary</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className={`text-center p-4 rounded-lg ${getScoreBg(analysis.summary.score)}`}>
            <div className={`text-3xl font-bold ${getScoreColor(analysis.summary.score)}`}>
              {analysis.summary.score}/100
            </div>
            <div className="text-sm text-gray-500">Investment Score</div>
          </div>
          <div className="col-span-2">
            <div className="font-medium text-gray-900">Verdict</div>
            <p className={`${getVerdictColor(analysis.summary.score)}`}>
              {analysis.summary.verdict}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Investment Analysis</h3>
        {Object.entries(analysis.sections).map(([key, points]) => (
          <div key={key} className="mb-6 last:mb-0">
            <h4 className="font-medium text-gray-900 mb-2 capitalize">
              {key.replace(/([A-Z])/g, ' $1')}
            </h4>
            <ul className="space-y-2">
              {points.map((point, index) => (
                <li key={index} className="text-gray-600">• {point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
        <ul className="space-y-2">
          {analysis.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start">
              <span className={`flex-shrink-0 w-6 h-6 ${getScoreBg(analysis.summary.score)} ${getScoreColor(analysis.summary.score)} rounded-full flex items-center justify-center mr-2`}>
                {index + 1}
              </span>
              <span className="text-gray-600">{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 