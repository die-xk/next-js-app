import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { deleteAnalysis } from '@/lib/db'
import { adminAuth } from '@/lib/firebase-admin'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } } // Make params a direct object
) {
  try {
    const { id } = params; // Directly access `params` instead of awaiting it
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    await deleteAnalysis(id, userId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to delete analysis';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
