export interface User {
  id: string
  email: string
  created_at?: Date
  updated_at?: Date
}

export interface Analysis {
  id: string
  user_id: string
  title: string
  description: string
  target_market: string
  business_model: string
  stage: string
  challenges: string
  persona: string
  analysis_result: AnalysisResult
  created_at?: Date
  updated_at?: Date
}

export interface AnalysisResult {
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