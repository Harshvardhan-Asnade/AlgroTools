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
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

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
        audioFile: z.string().describe('The path to the audio file to transcribe.'),
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
    const { audioDataUri } = input;
    const matches = audioDataUri.match(/^data:(audio\/\w+);base64,(.*)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid audio data URI format.');
    }

    const [, mimeType, base64Data] = matches;
    const extension = mimeType.split('/')[1];
    const audioBuffer = Buffer.from(base64Data, 'base64');
    
    const tempDir = os.tmpdir();
    const inputPath = path.join(tempDir, `${uuidv4()}.${extension}`);
    const outputPath = path.join(tempDir, `${uuidv4()}.mp3`);

    await fs.writeFile(inputPath, audioBuffer);
    
    try {
      await new Promise<void>((resolve, reject) => {
        ffmpeg(inputPath)
          .toFormat('mp3')
          .on('error', (err) => {
            console.error('FFmpeg error:', err);
            reject(new Error(`Failed to convert audio: ${err.message}`));
          })
          .on('end', () => resolve())
          .save(outputPath);
      });

      const convertedAudioBuffer = await fs.readFile(outputPath);
      const convertedDataUri = `data:audio/mp3;base64,${convertedAudioBuffer.toString('base64')}`;

      const { output } = await prompt({ audioFile: convertedDataUri });

      return output || { transcript: '' };
    } finally {
        // Clean up temp files
        await fs.unlink(inputPath).catch(err => console.error(`Failed to delete input temp file: ${err.message}`));
        await fs.unlink(outputPath).catch(err => console.error(`Failed to delete output temp file: ${err.message}`));
    }
  }
);
