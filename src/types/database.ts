export interface User {
  id: string
  email: string
  subscription_tier: 'free' | 'pro' | 'enterprise'
  subscription_id?: string
  subscription_status?: string
  subscription_updated_at?: Date
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
  summary: {
    score: number;
    verdict: string;
  };
  sections: {
    [key: string]: string[];
  };
  recommendations: string[];
  followUpQuestions: string[];
} 