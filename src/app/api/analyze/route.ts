import { NextResponse } from 'next/server'
import { openai, AI_PERSONAS, PersonaKey } from '@/lib/openai'
import { saveAnalysis } from '@/lib/db'
import { adminAuth } from '@/lib/firebase-admin'
import { nanoid } from 'nanoid'
import { AnalysisResult } from '@/types/database'

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

    const body = await req.json()
    console.log('Request body:', body)

    const { title, description, targetMarket, businessModel, stage, challenges, persona } = body

    console.log('Received request with persona:', persona)

    const startupContext = `
Startup Analysis Request:
------------------------
Name: ${title}
Current Stage: ${stage}

Detailed Description:
${description}

Target Market:
${targetMarket}

Business Model:
${businessModel}

Key Challenges:
${challenges}

Analyze this startup and return the analysis in the following JSON structure:
{
  "executiveSummary": "2-3 sentence overview",
  "detailedAnalysis": {
    "marketOpportunity": "analysis of market potential",
    "businessModel": "analysis of business model",
    "competitiveAdvantage": "analysis of competitive position",
    "keyRisks": "main risks identified"
  },
  "strengths": [
    "strength 1",
    "strength 2"
  ],
  "concerns": [
    "concern 1",
    "concern 2"
  ],
  "recommendations": [
    "recommendation 1",
    "recommendation 2"
  ],
  "nextSteps": [
    "step 1",
    "step 2"
  ],
  "score": {
    "marketPotential": "1-10 score",
    "executionRisk": "1-10 score",
    "overallViability": "1-10 score"
  }
}`

    const selectedPersona = AI_PERSONAS[persona as PersonaKey]
    if (!selectedPersona) {
      console.error('Invalid persona selected:', persona)
      return NextResponse.json(
        { error: 'Invalid advisor selected' },
        { status: 400 }
      )
    }

    console.log('Making OpenAI request...')

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: `${selectedPersona.prompt}\n\nProvide your analysis in valid JSON format. Ensure all text is properly escaped and the response is a valid JSON object.`
          },
          {
            role: "user",
            content: startupContext
          }
        ],
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
          role: selectedPersona.role,
          analysis: analysisContent
        }]
      })

    } catch (openAiError: any) {
      console.error('OpenAI API Error:', openAiError)
      return NextResponse.json(
        { error: 'Failed to generate analysis', details: openAiError.message },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze startup idea', details: error.message },
      { status: 500 }
    )
  }
} 