"use server";

import { aiChatSupport as aiChatSupportFlow } from "@/ai/flows/ai-chat-support";
import { suggestTools as suggestToolsFlow, SuggestToolsOutput } from "@/ai/flows/smart-tool-suggestions";
import { textToPdf as textToPdfFlow } from "@/ai/flows/text-to-pdf";

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

export async function handleTextToPdf(input: { text: string }) {
  try {
    const result = await textToPdfFlow(input);
    return result;
  } catch (error) {
    console.error("Text to PDF Error:", error);
    throw new Error("Failed to generate PDF.");
  }
}
