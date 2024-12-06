import { NextResponse } from 'next/server';
import { getUserSubscription } from '@/lib/db';
import { SUBSCRIPTION_LIMITS, SubscriptionTier } from '@/types/subscription';

export async function subscriptionGuard(
  userId: string,
  requiredTier: 'free' | 'pro' | 'enterprise'
) {
  const subscription = await getUserSubscription(userId);
  
  if (!subscription) {
    return {
      allowed: false,
      message: 'No subscription found'
    };
  }

  const tierLevels = {
    free: 0,
    pro: 1,
    enterprise: 2
  };

  return {
    allowed: tierLevels[subscription.subscription_tier as SubscriptionTier] >= tierLevels[requiredTier],
    subscription: subscription
  };
} 