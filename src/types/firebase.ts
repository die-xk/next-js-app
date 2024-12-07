import { User } from 'firebase/auth'
import { SubscriptionTier } from './subscription'

declare module 'firebase/auth' {
  interface User {
    subscriptionTier?: SubscriptionTier;
  }
} 