import { NextResponse } from 'next/server'
import { openai, AI_PERSONAS, PersonaKey } from '@/lib/openai'
import { getMonthlyAnalysisCount, saveAnalysis } from '@/lib/db'
import { adminAuth } from '@/lib/firebase-admin'
import { nanoid } from 'nanoid'
import { AnalysisResult } from '@/types/database'
import { subscriptionGuard } from '@/middleware/subscriptionGuard'
import { SUBSCRIPTION_LIMITS, SubscriptionTier } from '@/types/subscription'
import personaPrompts from '@/lib/prompts/personas'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import { AnalysisFormData } from '@/components/dashboard/NewAnalysisForm'
import OpenAI from 'openai'

interface RequestBody extends AnalysisFormData {
  persona: PersonaKey
}

export async function POST(req: Request) {
  try {
    // Get the token from the Authorization header
    const token = req.headers.get('Authorization')?.split('Bearer ')[1]
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    // Verify the Firebase token
    const decodedToken = await adminAuth.verifyIdToken(token)
    const userId = decodedToken.uid

    // Check subscription access
    const { allowed, subscription, message } = await subscriptionGuard(userId, 'free')
    
    if (!allowed) {
      return NextResponse.json({ 
        error: message || 'Subscription required',
        upgrade: true 
      }, { status: 403 })
    }

    // Get monthly analysis count for user
    const monthlyCount = await getMonthlyAnalysisCount(userId)
    const limit = SUBSCRIPTION_LIMITS[subscription.subscription_tier as SubscriptionTier].analysisCount

    if (limit !== -1 && monthlyCount >= limit) {
      return NextResponse.json({
        error: 'Monthly analysis limit reached',
        upgrade: true
      }, { status: 403 })
    }

    const body = (await req.json()) as RequestBody
    console.log('Request body:', body)

    const { title, description, targetMarket, businessModel, stage, challenges, persona } = body

    console.log('Received request with persona:', persona)

    const prompt = personaPrompts[persona as PersonaKey]
    if (!prompt) {
      console.error('Invalid persona selected:', persona)
      return NextResponse.json(
        { error: 'Invalid advisor selected' },
        { status: 400 }
      )
    }

    console.log('Making OpenAI request...')

    try {
      const messages = [
        { role: 'system', content: prompt.systemPrompt },
        { role: 'user', content: prompt.userPrompt(body) }
      ]

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: messages as ChatCompletionMessageParam[],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      })

      console.log('OpenAI response received')

      const analysisContent = JSON.parse(response.choices[0].message.content || '') as AnalysisResult
      
      console.log('Analysis parsed successfully')

      // After successful OpenAI response
      const analysisId = nanoid()
      await saveAnalysis({
        id: analysisId,
        userId: userId,
        title,
        description,
        targetMarket,
        businessModel,
        stage,
        challenges,
        persona,
        analysisResult: analysisContent
      })

      return NextResponse.json({
        analyses: [{
          id: analysisId,
          persona,
          analysis: analysisContent
        }]
      })

    } catch (openAiError: Error | typeof OpenAI.APIError | unknown) {
      console.error('OpenAI API Error:', openAiError)
      const errorMessage = openAiError instanceof Error ? openAiError.message : 'Failed to generate analysis'
      return NextResponse.json(
        { error: 'Failed to generate analysis', details: errorMessage },
        { status: 500 }
      )
    }

  } catch (error: Error | unknown) {
    console.error('Analysis error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze startup idea'
    return NextResponse.json(
      { error: 'Failed to analyze startup idea', details: errorMessage },
      { status: 500 }
    )
  }
} 