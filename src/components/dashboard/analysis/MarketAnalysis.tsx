import { motion } from 'framer-motion'
import { AnalysisResult } from '@/types/database'

interface MarketAnalysisProps {
  analysis: AnalysisResult
}

export default function MarketAnalysis({ analysis }: MarketAnalysisProps) {
  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Market Overview</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600">{analysis.summary.score}/100</div>
            <div className="text-sm text-gray-500">Market Potential</div>
          </div>
          <div className="col-span-2">
            <div className="font-medium text-gray-900">Market Assessment</div>
            <p className="text-gray-600">{analysis.summary.verdict}</p>
          </div>
        </div>
      </div>

      {/* Market Analysis Sections */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Detailed Market Analysis</h3>
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
    </div>
  )
} 