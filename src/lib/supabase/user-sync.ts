'use server';

import { currentUser } from '@clerk/nextjs/server';
import { supabaseAdmin } from './server';

/**
 * Syncs Clerk user data to Supabase
 * This ensures user data is always up to date in the database
 */
export async function syncClerkUserToSupabase() {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: 'User not authenticated' };
    }

    if (!supabaseAdmin) {
      return { error: 'Supabase admin client not configured' };
    }

    // Check if user exists in Supabase
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('clerk_user_id', user.id)
      .single();

    const userData = {
      clerk_user_id: user.id,
      email: user.emailAddresses[0]?.emailAddress || '',
      full_name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || null,
      avatar_url: user.imageUrl || null,
      updated_at: new Date().toISOString(),
    };

    if (existingUser) {
      // Update existing user
      const { error } = await supabaseAdmin
        .from('users')
        .update(userData)
        .eq('clerk_user_id', user.id);

      if (error) {
        console.error('Error updating user in Supabase:', error);
        return { error: error.message };
      }

      return { success: true, action: 'updated', userId: existingUser.id };
    } else {
      // Insert new user
      const { data, error } = await supabaseAdmin
        .from('users')
        .insert({
          ...userData,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating user in Supabase:', error);
        return { error: error.message };
      }

      return { success: true, action: 'created', userId: data.id };
    }
  } catch (error) {
    console.error('Error syncing user:', error);
    return { error: 'Failed to sync user' };
  }
}

/**
 * Gets the Supabase user ID for the current Clerk user
 */
export async function getSupabaseUserId(): Promise<string | null> {
  try {
    const user = await currentUser();

    if (!user || !supabaseAdmin) {
      return null;
    }

    const { data } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('clerk_user_id', user.id)
      .single();

    return data?.id || null;
  } catch (error) {
    console.error('Error getting Supabase user ID:', error);
    return null;
  }
}

