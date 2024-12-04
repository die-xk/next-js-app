import { NextResponse } from 'next/server'
import { getUserAnalyses } from '@/lib/db'
import { adminAuth } from '@/lib/firebase-admin'

export async function GET(request: Request) {
  try {
    // Get the token from the Authorization header
    const token = request.headers.get('Authorization')?.split('Bearer ')[1]
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    // Verify the Firebase token
    const decodedToken = await adminAuth.verifyIdToken(token)
    const userId = decodedToken.uid

    // Get all analyses for the user
    const analyses = await getUserAnalyses(userId)
    
    return NextResponse.json({ analyses })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch analyses' },
      { status: 500 }
    )
  }
} 