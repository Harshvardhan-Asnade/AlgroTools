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

const SuggestToolsInputSchema = z.object({
  userInput: z.string().describe('The current user input or activity description.'),
  availableTools: z.array(z.string()).describe('A list of available tools.'),
});
export type SuggestToolsInput = z.infer<typeof SuggestToolsInputSchema>;

const SuggestToolsOutputSchema = z.array(z.string()).describe('A list of suggested tools based on the user input.');
export type SuggestToolsOutput = z.infer<typeof SuggestToolsOutputSchema>;

export async function suggestTools(input: SuggestToolsInput): Promise<SuggestToolsOutput> {
  return suggestToolsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestToolsPrompt',
  input: {schema: SuggestToolsInputSchema},
  output: {schema: SuggestToolsOutputSchema},
  prompt: `You are an AI assistant that suggests relevant tools based on user input and a list of available tools.

User Input: {{{userInput}}}
Available Tools: {{#each availableTools}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Based on the user input, suggest the most relevant tools from the available tools list. Only return the names of suggested tools, and separate multiple tools with commas.
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
    // Split the comma-separated string into an array of tools
    const suggestedTools = output!.map(tool => tool.trim());
    return suggestedTools;
  }
);
