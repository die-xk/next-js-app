import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@/lib/openai'
import { adminAuth } from '@/lib/firebase-admin'
import { saveChatMessage, getChatMessages, getAnalysisById } from '@/lib/db'
import { nanoid } from 'nanoid'

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'No analysis ID provided' }, { status: 400 })
    }

    const token = request.headers.get('Authorization')?.split('Bearer ')[1]
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const decodedToken = await adminAuth.verifyIdToken(token)
    const messages = await getChatMessages(id, decodedToken.uid)
    
    return NextResponse.json({ messages })
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'No analysis ID provided' }, { status: 400 })
    }

    const token = request.headers.get('Authorization')?.split('Bearer ')[1]
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const decodedToken = await adminAuth.verifyIdToken(token)
    const { message } = await request.json()

    // Get original analysis for context
    const analysis = await getAnalysisById(id, decodedToken.uid)
    if (!analysis) {
      return NextResponse.json({ error: 'Analysis not found' }, { status: 404 })
    }

    // Save user message
    const userMessageId = nanoid()
    await saveChatMessage({
      id: userMessageId,
      analysisId: id,
      userId: decodedToken.uid,
      role: 'user',
      content: message
    })

    // Get AI response
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an AI advisor analyzing a startup idea. Previous analysis: ${JSON.stringify(analysis.analysis_result)}`
        },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    const aiReply = response.choices[0].message.content || ''

    // Save AI response
    const aiMessageId = nanoid()
    await saveChatMessage({
      id: aiMessageId,
      analysisId: id,
      userId: decodedToken.uid,
      role: 'ai',
      content: aiReply
    })

    return NextResponse.json({ 
      messages: [
        { id: userMessageId, role: 'user', content: message },
        { id: aiMessageId, role: 'ai', content: aiReply }
      ] 
    })
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
} 