import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Here we'll add database integration later
    // For now, return the results from session storage
    const analyses = JSON.parse(sessionStorage.getItem(`analysis_${params.id}`) || '[]')
    
    return NextResponse.json({ analyses })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch analysis results' },
      { status: 500 }
    )
  }
} 