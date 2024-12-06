'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/context/AuthContext'
import { SUBSCRIPTION_LIMITS, SubscriptionTier } from '@/types/subscription'
import { PersonaKey } from '@/lib/openai'

export function useSubscription() {
  const [subscription, setSubscription] = useState<{
    tier: SubscriptionTier;
    limits: typeof SUBSCRIPTION_LIMITS[SubscriptionTier];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const { getAuthHeaders } = useAuth();

  useEffect(() => {
    async function fetchSubscription() {
      try {
        const response = await fetch('/api/test-subscription', {
          headers: getAuthHeaders()
        });
        const data = await response.json();
        
        if (data.subscription) {
          setSubscription({
            tier: data.subscription.subscription_tier as SubscriptionTier,
            limits: SUBSCRIPTION_LIMITS[data.subscription.subscription_tier as SubscriptionTier]
          });
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSubscription();
  }, []);

  const getAvailableAdvisors = (): PersonaKey[] => {
    if (!subscription) return ['VC']; // Free tier default
    return SUBSCRIPTION_LIMITS[subscription.tier].advisors as PersonaKey[];
  };

  const canAccessAdvisor = (persona: PersonaKey): boolean => {
    const availableAdvisors = getAvailableAdvisors();
    return availableAdvisors.includes(persona);
  };

  const getRemainingAnalyses = () => {
    if (!subscription) return 0;
    return subscription.limits.analysisCount;
  };

  return {
    subscription,
    loading,
    canAccessAdvisor,
    getAvailableAdvisors,
    getRemainingAnalyses
  };
} 