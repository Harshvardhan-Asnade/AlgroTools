'use server';

/**
 * @fileOverview A Genkit flow for transcribing audio files to text.
 *
 * - audioToText - A function that takes an audio file data URI and returns the transcript.
 * - AudioToTextInput - The input type for the audioToText function.
 * - AudioToTextOutput - The return type for the audioToText function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AudioToTextInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "An audio file as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AudioToTextInput = z.infer<typeof AudioToTextInputSchema>;

const AudioToTextOutputSchema = z.object({
  transcript: z.string().describe('The transcribed text from the audio.'),
});
export type AudioToTextOutput = z.infer<typeof AudioToTextOutputSchema>;

export async function audioToText(input: AudioToTextInput): Promise<AudioToTextOutput> {
  return audioToTextFlow(input);
}

const prompt = ai.definePrompt(
  {
    name: 'audioToTextPrompt',
    input: {
      schema: z.object({
        audioFile: z.string().describe('The data URI of the audio file to transcribe.'),
      }),
    },
    output: { schema: AudioToTextOutputSchema },
    prompt: `Transcribe the following audio file.
    
    Audio: {{media url=audioFile}}`,
  },
);

const audioToTextFlow = ai.defineFlow(
  {
    name: 'audioToTextFlow',
    inputSchema: AudioToTextInputSchema,
    outputSchema: AudioToTextOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({ audioFile: input.audioDataUri });
    return output || { transcript: '' };
  }
);
