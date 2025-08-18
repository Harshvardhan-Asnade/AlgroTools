"use server";

import { aiChatSupport as aiChatSupportFlow } from "@/ai/flows/ai-chat-support";
import { suggestTools as suggestToolsFlow } from "@/ai/flows/smart-tool-suggestions";

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
  availableTools: string[];
}) {
  try {
    const result = await suggestToolsFlow(input);
    return result;
  } catch (error) {
    console.error("Suggest Tools Error:", error);
    return [];
  }
}
