'use server';

/**
 * @fileOverview Provides an AI chatbot that answers questions about the tools and their functions.
 *
 * - aiChatSupport - A function that handles the chatbot interaction.
 * - AIChatSupportInput - The input type for the aiChatSupport function.
 * - AIChatSupportOutput - The return type for the aiChatSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatSupportInputSchema = z.object({
  query: z.string().describe('The user query about the tools and their functions.'),
});
export type AIChatSupportInput = z.infer<typeof AIChatSupportInputSchema>;

const AIChatSupportOutputSchema = z.object({
  response: z.string().describe('The response from the AI chatbot.'),
});
export type AIChatSupportOutput = z.infer<typeof AIChatSupportOutputSchema>;

export async function aiChatSupport(input: AIChatSupportInput): Promise<AIChatSupportOutput> {
  return aiChatSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatSupportPrompt',
  input: {schema: AIChatSupportInputSchema},
  output: {schema: AIChatSupportOutputSchema},
  prompt: `You are an AI chatbot assistant designed to help users understand the tools and functions available in AlgroTools.

  Provide clear, concise, and helpful answers to user queries about the tools and their functionalities.

  User Query: {{{query}}}`,
});

const aiChatSupportFlow = ai.defineFlow(
  {
    name: 'aiChatSupportFlow',
    inputSchema: AIChatSupportInputSchema,
    outputSchema: AIChatSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
