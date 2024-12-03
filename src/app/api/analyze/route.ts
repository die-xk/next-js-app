import { NextResponse } from 'next/server'
import { openai, AI_PERSONAS, PersonaKey } from '@/lib/openai'

export async function POST(req: Request) {
  try {
    const body = await req.json()
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

      const analysisContent = JSON.parse(response.choices[0].message.content || '')
      
      console.log('Analysis parsed successfully')

      return NextResponse.json({
        analyses: [{
          persona: persona,
          role: selectedPersona.role,
          analysis: analysisContent
        }]
      })

    } catch (openAiError) {
      console.error('OpenAI API Error:', openAiError)
      return NextResponse.json(
        { error: 'Failed to generate analysis', details: openAiError.message },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('General error:', error)
    return NextResponse.json(
      { error: 'Failed to process request', details: error.message },
      { status: 500 }
    )
  }
} 