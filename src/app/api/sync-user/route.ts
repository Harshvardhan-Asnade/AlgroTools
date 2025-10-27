import { NextRequest, NextResponse } from 'next/server';
import { syncClerkUserToSupabase } from '@/lib/supabase/user-sync';

/**
 * API endpoint to sync Clerk user to Supabase
 * Call this after user signs in or updates their profile
 */
export async function POST(request: NextRequest) {
  try {
    const result = await syncClerkUserToSupabase();

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      action: result.action,
      userId: result.userId,
    });
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json(
      { error: 'Failed to sync user' },
      { status: 500 }
    );
  }
}

