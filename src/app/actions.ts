"use server";

import { aiChatSupport as aiChatSupportFlow } from "@/ai/flows/ai-chat-support";
import { suggestTools as suggestToolsFlow, SuggestToolsOutput } from "@/ai/flows/smart-tool-suggestions";
import { audioToText as audioToTextFlow } from "@/ai/flows/audio-transcription";
import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getSupabaseUserId } from "@/lib/supabase/user-sync";
import type { Database } from "@/lib/supabase/database.types";

type HistoryEntry = Database['public']['Tables']['user_history']['Row'];

/**
 * Save a chat message to user history
 */
export async function saveChatHistory(input: { title: string; content: string }) {
  try {
    const user = await currentUser();
    if (!user) {
      return { error: 'User not authenticated' };
    }

    const userId = await getSupabaseUserId();
    if (!userId) {
      return { error: 'User not found in database' };
    }

    if (!supabaseAdmin) {
      return { error: 'Supabase admin client not configured' };
    }

    const { data, error } = await supabaseAdmin
      .from('user_history')
      .insert({
        user_id: userId,
        type: 'chat',
        title: input.title,
        content: input.content,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving chat history:', error);
      return { error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error saving chat history:', error);
    return { error: 'Failed to save chat history' };
  }
}

/**
 * Save a file upload to user history
 */
export async function saveFileHistory(input: {
  title: string;
  fileUrl: string;
  fileName: string;
  fileSize?: number;
  metadata?: Record<string, any>;
}) {
  try {
    const user = await currentUser();
    if (!user) {
      return { error: 'User not authenticated' };
    }

    const userId = await getSupabaseUserId();
    if (!userId) {
      return { error: 'User not found in database' };
    }

    if (!supabaseAdmin) {
      return { error: 'Supabase admin client not configured' };
    }

    const { data, error } = await supabaseAdmin
      .from('user_history')
      .insert({
        user_id: userId,
        type: 'file',
        title: input.title,
        file_url: input.fileUrl,
        file_name: input.fileName,
        file_size: input.fileSize || null,
        metadata: input.metadata || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving file history:', error);
      return { error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error saving file history:', error);
    return { error: 'Failed to save file history' };
  }
}

/**
 * Get all history entries for the current user
 */
export async function getUserHistory(options?: {
  type?: 'chat' | 'file';
  limit?: number;
  offset?: number;
}): Promise<{ data: HistoryEntry[] | null; error: string | null }> {
  try {
    const user = await currentUser();
    if (!user) {
      return { data: null, error: 'User not authenticated' };
    }

    const userId = await getSupabaseUserId();
    if (!userId) {
      return { data: null, error: 'User not found in database' };
    }

    if (!supabaseAdmin) {
      return { data: null, error: 'Supabase admin client not configured' };
    }

    let query = supabaseAdmin
      .from('user_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (options?.type) {
      query = query.eq('type', options.type);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching user history:', error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching user history:', error);
    return { data: null, error: 'Failed to fetch user history' };
  }
}

/**
 * Delete a history entry by ID
 */
export async function deleteHistoryEntry(entryId: string) {
  try {
    const user = await currentUser();
    if (!user) {
      return { error: 'User not authenticated' };
    }

    const userId = await getSupabaseUserId();
    if (!userId) {
      return { error: 'User not found in database' };
    }

    if (!supabaseAdmin) {
      return { error: 'Supabase admin client not configured' };
    }

    // Verify the entry belongs to the user
    const { data: entry } = await supabaseAdmin
      .from('user_history')
      .select('user_id')
      .eq('id', entryId)
      .single();

    if (!entry || entry.user_id !== userId) {
      return { error: 'Entry not found or access denied' };
    }

    const { error } = await supabaseAdmin
      .from('user_history')
      .delete()
      .eq('id', entryId);

    if (error) {
      console.error('Error deleting history entry:', error);
      return { error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting history entry:', error);
    return { error: 'Failed to delete history entry' };
  }
}

export async function handleAiChatSupport(input: { query: string }) {
  try {
    const result = await aiChatSupportFlow(input);
    return result;
  } catch (error) {
    console.error("AI Chat Support Error:", error);
    return { response: "Sorry, I encountered an error. Please try again." };
  }
}

export async function handleSuggestTools(input: {
  userInput: string;
}): Promise<SuggestToolsOutput> {
  try {
    const result = await suggestToolsFlow(input);
    return result;
  } catch (error) {
    console.error("Suggest Tools Error:", error);
    return [];
  }
}

export async function handleAudioTranscription(input: { audioDataUri: string }) {
  try {
    const result = await audioToTextFlow(input);
    return result;
  } catch (error) {
    console.error("Audio Transcription Error:", error);
    return { transcript: "Sorry, could not transcribe the audio. Please try again." };
  }
}
