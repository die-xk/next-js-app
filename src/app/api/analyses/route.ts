import { NextResponse } from 'next/server'
import { getUserAnalyses } from '@/lib/db'
import { adminAuth } from '@/lib/firebase-admin'

export async function GET(request: Request) {
  try {
    const token = request.headers.get('Authorization')?.split('Bearer ')[1]
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const decodedToken = await adminAuth.verifyIdToken(token)
    const userId = decodedToken.uid

    const analyses = await getUserAnalyses(userId)
    
    return NextResponse.json({ analyses })
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch analyses'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
} 