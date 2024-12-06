import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.PADDLE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Missing Paddle credentials' }, { status: 500 });
  }

  try {
    const response = await fetch('https://sandbox-api.paddle.com/prices', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      }
    });

    const data = await response.json();
    console.log('Paddle API Response:', data);

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch prices');
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching prices:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 