'use server';

import { currentUser } from '@clerk/nextjs/server';
import { supabaseAdmin } from './server';
import { Database } from './database.types';

type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export type User = Tables<'users'>;
export type UserPreference = Tables<'user_preferences'>;
export type ToolUsage = Tables<'tool_usage'>;

/**
 * Get current user's Supabase record
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser || !supabaseAdmin) return null;

    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('clerk_user_id', clerkUser.id)
      .single();

    if (error) {
      console.error('Error fetching current user:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Get user preferences
 */
export async function getUserPreferences(): Promise<Record<string, string>> {
  try {
    const user = await getCurrentUser();
    if (!user || !supabaseAdmin) return {};

    const { data, error } = await supabaseAdmin
      .from('user_preferences')
      .select('preference_key, preference_value')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching user preferences:', error);
      return {};
    }

    const preferences: Record<string, string> = {};
    data?.forEach((pref) => {
      preferences[pref.preference_key] = pref.preference_value;
    });

    return preferences;
  } catch (error) {
    console.error('Error getting user preferences:', error);
    return {};
  }
}

/**
 * Set user preference
 */
export async function setUserPreference(
  key: string,
  value: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await getCurrentUser();
    if (!user || !supabaseAdmin) {
      return { success: false, error: 'User not authenticated' };
    }

    const { error } = await supabaseAdmin
      .from('user_preferences')
      .upsert({
        user_id: user.id,
        preference_key: key,
        preference_value: value,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error setting user preference:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error setting preference:', error);
    return { success: false, error: 'Failed to set preference' };
  }
}

/**
 * Track tool usage
 */
export async function trackToolUsage(
  toolSlug: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await getCurrentUser();
    if (!user || !supabaseAdmin) {
      return { success: false, error: 'User not authenticated' };
    }

    // Check if usage record exists
    const { data: existingUsage } = await supabaseAdmin
      .from('tool_usage')
      .select('*')
      .eq('user_id', user.id)
      .eq('tool_slug', toolSlug)
      .single();

    if (existingUsage) {
      // Update existing usage
      const { error } = await supabaseAdmin
        .from('tool_usage')
        .update({
          usage_count: existingUsage.usage_count + 1,
          last_used_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingUsage.id);

      if (error) {
        console.error('Error updating tool usage:', error);
        return { success: false, error: error.message };
      }
    } else {
      // Create new usage record
      const { error } = await supabaseAdmin
        .from('tool_usage')
        .insert({
          user_id: user.id,
          tool_slug: toolSlug,
          usage_count: 1,
          last_used_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error creating tool usage:', error);
        return { success: false, error: error.message };
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error tracking tool usage:', error);
    return { success: false, error: 'Failed to track usage' };
  }
}

/**
 * Get most used tools
 */
export async function getMostUsedTools(
  limit: number = 10
): Promise<ToolUsage[]> {
  try {
    const user = await getCurrentUser();
    if (!user || !supabaseAdmin) return [];

    const { data, error } = await supabaseAdmin
      .from('tool_usage')
      .select('*')
      .eq('user_id', user.id)
      .order('usage_count', { ascending: false })
      .order('last_used_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching most used tools:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error getting most used tools:', error);
    return [];
  }
}

