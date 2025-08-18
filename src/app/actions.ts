"use server";

import { aiChatSupport as aiChatSupportFlow } from "@/ai/flows/ai-chat-support";
import { suggestTools as suggestToolsFlow, SuggestToolsOutput } from "@/ai/flows/smart-tool-suggestions";
import { audioToText as audioToTextFlow } from "@/ai/flows/audio-transcription";

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
