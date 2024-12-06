import { NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { getMonthlyAnalysisCount, checkUserAnalyses } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.split('Bearer ')[1]
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const decodedToken = await adminAuth.verifyIdToken(token)
    const userId = decodedToken.uid

    // Get both the count and the analysis details
    const [count, analyses] = await Promise.all([
      getMonthlyAnalysisCount(userId),
      checkUserAnalyses(userId)
    ])

    return NextResponse.json({ 
      count,
      analyses,
      debug: {
        userId,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error fetching analysis count:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analysis count' },
      { status: 500 }
    )
  }
} 