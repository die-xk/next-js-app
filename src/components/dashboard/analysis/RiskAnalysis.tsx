import { motion } from 'framer-motion'
import { AnalysisResult } from '@/types/database'
import { AlertTriangle, Shield, TrendingUp } from 'lucide-react'

interface RiskAnalysisProps {
  analysis: AnalysisResult
}

export default function RiskAnalysis({ analysis }: RiskAnalysisProps) {
  return (
    <div className="space-y-6">
      {/* Risk Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Risk Assessment Overview</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600">{analysis.summary.score}/100</div>
            <div className="text-sm text-gray-500">Risk Score</div>
          </div>
          <div className="col-span-2">
            <div className="font-medium text-gray-900">Risk Summary</div>
            <p className="text-gray-600">{analysis.summary.verdict}</p>
          </div>
        </div>
      </div>

      {/* Risk Categories */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Risk Analysis by Category</h3>
        {Object.entries(analysis.sections).map(([key, points]) => (
          <div key={key} className="mb-6 last:mb-0">
            <div className="flex items-center gap-2 mb-2">
              {key.includes('Risk') && <AlertTriangle className="w-5 h-5 text-amber-500" />}
              {key.includes('mitigation') && <Shield className="w-5 h-5 text-green-500" />}
              <h4 className="font-medium text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1')}
              </h4>
            </div>
            <ul className="space-y-2 ml-7">
              {points.map((point, index) => (
                <li key={index} className="text-gray-600">• {point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Mitigation Strategies */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-indigo-500" />
          <h3 className="text-xl font-semibold">Recommended Actions</h3>
        </div>
        <ul className="space-y-3">
          {analysis.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                {index + 1}
              </span>
              <span className="text-gray-600">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Follow-up Questions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Key Areas to Monitor</h3>
        <ul className="space-y-2">
          {analysis.followUpQuestions.map((question, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-600">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              {question}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 