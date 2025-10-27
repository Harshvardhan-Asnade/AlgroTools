import { NextRequest, NextResponse } from 'next/server';
import { trackToolUsage } from '@/lib/supabase/db-helpers';

/**
 * API endpoint to track tool usage
 */
export async function POST(request: NextRequest) {
  try {
    const { toolSlug } = await request.json();

    if (!toolSlug) {
      return NextResponse.json(
        { error: 'Tool slug is required' },
        { status: 400 }
      );
    }

    const result = await trackToolUsage(toolSlug);

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking usage:', error);
    return NextResponse.json(
      { error: 'Failed to track usage' },
      { status: 500 }
    );
  }
}

