import { getAuth } from 'firebase/auth'
import { app } from './firebase'

interface AuthSession {
  user: {
    id: string;
    email: string | null;
    name?: string | null;
    image?: string | null;
  } | null;
  token?: string;
}

export const auth = async (): Promise<AuthSession> => {
  const auth = getAuth(app)
  const user = auth.currentUser
  
  if (!user) {
    return { user: null }
  }

  // Get Firebase ID token
  const token = await user.getIdToken()

  return {
    user: {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      image: user.photoURL
    },
    token
  }
}