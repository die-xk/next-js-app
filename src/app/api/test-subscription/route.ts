import { NextResponse } from 'next/server';
import { updateUserSubscription, getUserSubscription } from '@/lib/db';
import { adminAuth } from '@/lib/firebase-admin';
import { SubscriptionTier } from '@/types/subscription';

export async function POST(request: Request) {
  try {
    // Get the token from the Authorization header
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    // Verify the Firebase token
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Get the subscription data from the request body
    const { tier, subscriptionId, status } = await request.json();

    // Validate the tier
    if (!['free', 'pro', 'enterprise'].includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid subscription tier' },
        { status: 400 }
      );
    }

    // Update the subscription
    await updateUserSubscription(userId, {
      tier: tier as SubscriptionTier,
      subscriptionId,
      status
    });

    // Fetch the updated subscription to verify
    const updatedSubscription = await getUserSubscription(userId);

    return NextResponse.json({
      message: 'Subscription updated successfully',
      subscription: updatedSubscription
    });
  } catch (error: any) {
    console.error('Test subscription error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // Get the token from the Authorization header
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    // Verify the Firebase token
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Get the current subscription
    const subscription = await getUserSubscription(userId);

    return NextResponse.json({ subscription });
  } catch (error: any) {
    console.error('Get subscription error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 