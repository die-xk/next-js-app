import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' }, 
      { status: 500 }
    )
  }

  const { section, context, previousQuestions } = await req.json()

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: `You are a VC expert focusing on the "${section}" aspect of startup analysis. 
                   Provide detailed, actionable insights based on the given context.
                   Your responses must be in JSON format with the following structure:
                   {
                     "question": "A specific, insightful question about the ${section}",
                     "answer": {
                       "summary": "A brief 1-2 sentence summary",
                       "keyPoints": ["Array of key points"],
                       "recommendations": ["Array of specific recommendations"],
                       "metrics": ["Array of relevant metrics or benchmarks to track"],
                       "risks": ["Array of potential risks or challenges to consider"]
                     }
                   }`
        },
        {
          role: "user",
          content: `Based on these points about ${section}:\n${context.join('\n')}\n
                   Generate a new insightful question and detailed answer that would help 
                   understand this aspect better. Focus on practical, actionable advice.
                   Previous questions: ${previousQuestions.map((q: { question: string }) => q.question).join(', ')}`
        }
      ],
      response_format: { type: "json_object" }
    })

    const content = JSON.parse(response.choices[0].message.content || '')
    return NextResponse.json(content)
  } catch (error: Error | typeof OpenAI.APIError | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get AI response'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
} 