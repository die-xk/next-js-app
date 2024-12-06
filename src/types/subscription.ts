export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface SubscriptionLimits {
  analysisCount: number;
  followUpQuestions: boolean;
  advisors: string[];
  responseTime: string;
}

export const SUBSCRIPTION_LIMITS: Record<SubscriptionTier, SubscriptionLimits> = {
  free: {
    analysisCount: 1,
    followUpQuestions: false,
    advisors: ['VC'],
    responseTime: '24h'
  },
  pro: {
    analysisCount: 3,
    followUpQuestions: true,
    advisors: ['VC', 'MARKET'],
    responseTime: '6h'
  },
  enterprise: {
    analysisCount: -1, // unlimited
    followUpQuestions: true,
    advisors: ['VC', 'MARKET', 'RISK'],
    responseTime: '1h'
  }
}; 