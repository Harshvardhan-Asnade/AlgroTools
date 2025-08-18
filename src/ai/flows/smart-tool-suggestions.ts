'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting relevant tools based on user activity and input.
 *
 * - suggestTools - A function that takes user input and returns a list of suggested tools.
 * - SuggestToolsInput - The input type for the suggestTools function.
 * - SuggestToolsOutput - The return type for the suggestTools function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { tools } from '@/lib/tool-definitions';

const availableToolSchema = z.object({
    slug: z.string().describe('The unique slug for the tool.'),
    name: z.string().describe('The display name of the tool.'),
    description: z.string().describe('A brief description of what the tool does.'),
});

const SuggestToolsInputSchema = z.object({
  userInput: z.string().describe('The current user input or activity description.'),
});
export type SuggestToolsInput = z.infer<typeof SuggestToolsInputSchema>;

const SuggestedToolSchema = z.object({
    slug: z.string().describe('The slug of the suggested tool.'),
    name: z.string().describe('The name of the suggested tool.'),
    reason: z.string().describe('A very brief (3-5 word) reason why this tool is suggested.'),
});

const SuggestToolsOutputSchema = z.array(SuggestedToolSchema).describe('A list of suggested tools based on the user input.');
export type SuggestToolsOutput = z.infer<typeof SuggestToolsOutputSchema>;

export async function suggestTools(input: SuggestToolsInput): Promise<SuggestToolsOutput> {
  if (!input.userInput) {
    return [];
  }
  return suggestToolsFlow(input);
}

const allTools = tools.map(tool => ({ slug: tool.slug, name: tool.name, description: tool.description }));

const prompt = ai.definePrompt({
  name: 'suggestToolsPrompt',
  input: {schema: SuggestToolsInputSchema},
  output: {schema: SuggestToolsOutputSchema},
  prompt: `You are an AI assistant that suggests relevant tools.
You will be given a user's input and a list of available tools.
Your task is to analyze the user's input and suggest up to 3 of the most relevant tools from the list.

User Input: {{{userInput}}}

Available Tools:
${JSON.stringify(allTools, null, 2)}

Based on the user's input, identify the most relevant tools. For each suggestion, provide the tool's slug, name, and a very brief (3-5 word) reason for the suggestion.
If the user's input is a greeting or doesn't seem related to any tool, return an empty array.
Only return tools that are highly relevant to the user's query.
`,
});

const suggestToolsFlow = ai.defineFlow(
  {
    name: 'suggestToolsFlow',
    inputSchema: SuggestToolsInputSchema,
    outputSchema: SuggestToolsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output || [];
  }
);
