'use server';

/**
 * @fileOverview A Genkit flow for converting text to a PDF document.
 *
 * - textToPdf - A function that takes a string of text and returns a data URI for a PDF.
 * - TextToPdfInput - The input type for the textToPdf function.
 * - TextToPdfOutput - The return type for the textToPdf function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import jsPDF from 'jspdf';

const TextToPdfInputSchema = z.object({
  text: z.string().describe('The text content to be converted to PDF.'),
});
export type TextToPdfInput = z.infer<typeof TextToPdfInputSchema>;

const TextToPdfOutputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "The generated PDF file as a data URI. Expected format: 'data:application/pdf;base64,<encoded_data>'."
    ),
});
export type TextToPdfOutput = z.infer<typeof TextToPdfOutputSchema>;

export async function textToPdf(input: TextToPdfInput): Promise<TextToPdfOutput> {
  return textToPdfFlow(input);
}

const textToPdfFlow = ai.defineFlow(
  {
    name: 'textToPdfFlow',
    inputSchema: TextToPdfInputSchema,
    outputSchema: TextToPdfOutputSchema,
  },
  async (input) => {
    const doc = new jsPDF();
    
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    const lines = doc.splitTextToSize(input.text, doc.internal.pageSize.width - margin * 2);
    let y = margin;

    lines.forEach((line: string) => {
        if (y + 10 > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }
        doc.text(line, margin, y);
        y += 7;
    });

    const pdfDataUri = doc.output('datauristring');
    
    return {
      pdfDataUri: pdfDataUri,
    };
  }
);
