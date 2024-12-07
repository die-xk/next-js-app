export type SubscriptionTier = 'free' | 'pro';

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
  }
}; 