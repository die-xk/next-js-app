'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  getIdToken
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  loading: boolean
  token: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  getAuthHeaders: () => HeadersInit
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const saveUserToDb = async (user: User) => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.uid,
          email: user.email,
          name: user.displayName,
          image: user.photoURL
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to save user to database')
      }
    } catch (error) {
      console.error('Error saving user to database:', error)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      if (user) {
        // Get fresh token when user signs in
        const token = await getIdToken(user, true)
        setToken(token)
        // Save user to database
        await saveUserToDb(user)
      } else {
        setToken(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw error
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      setToken(null)
    } catch (error) {
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      console.log('Google sign in successful:', result)
      router.push('/dashboard')
    } catch (error: any) {
      console.error('Google sign in error:', {
        code: error.code,
        message: error.message,
        // Additional error details if available
        email: error.email,
        credential: error.credential
      })
      
      // Handle specific error cases
      switch (error.code) {
        case 'auth/popup-blocked':
          alert('Please allow popups for this website')
          break
        case 'auth/popup-closed-by-user':
          console.log('Sign-in cancelled by user')
          break
        case 'auth/cancelled-popup-request':
          console.log('Multiple popup requests - latest cancelled')
          break
        default:
          alert('Failed to sign in with Google. Please try again.')
      }
    }
  }

  const getAuthHeaders = (): HeadersInit => ({
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json'
  })

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      token,
      signIn,
      signUp,
      signOut,
      signInWithGoogle,
      getAuthHeaders
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 