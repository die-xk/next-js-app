import { AnalysisFormData } from '@/components/dashboard/NewAnalysisForm'

export interface AnalysisPrompt {
  systemPrompt: string
  userPrompt: (formData: AnalysisFormData) => string
  outputFormat: {
    sections: string[]
    requiredFields: string[]
  }
}

export interface AnalysisResponse {
  summary: {
    title: string
    verdict: string
    score: number
  }
  sections: Record<string, string[]>
  recommendations: string[]
  followUpQuestions: string[]
} 