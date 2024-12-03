import { NextResponse } from 'next/server'
import { createUser } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { id, email, name, image } = await req.json()
    await createUser(id, email, name, image)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
} 