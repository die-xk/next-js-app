'use client'

import { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export function useAuth() {
  useEffect(() => {
    const firebaseAuth = getAuth()
    
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        // Get fresh token when user signs in
        await user.getIdToken(true)
      }
    })

    // Auto refresh token every 6 days (token expires in 7 days)
    const refreshInterval = setInterval(async () => {
      const user = firebaseAuth.currentUser
      if (user) {
        await user.getIdToken(true)  // Force refresh
      }
    }, 6 * 24 * 60 * 60 * 1000)

    return () => {
      unsubscribe()
      clearInterval(refreshInterval)
    }
  }, [])
} 