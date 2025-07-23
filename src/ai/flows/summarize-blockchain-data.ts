'use server';

import {z} from 'genkit';
import {ai} from '@/ai/genkit';

/**
 * @fileOverview Summarizes raw blockchain data into natural language for better understanding.
 *
 * - summarizeBlockchainData - A function that summarizes the blockchain data.
 * - SummarizeBlockchainDataInput - The input type for the summarizeBlockchainData function.
 * - SummarizeBlockchainDataOutput - The return type for the summarizeBlockchainData function.
 */

const SummarizeBlockchainDataInputSchema = z.object({
  rawData: z.string().describe('The raw blockchain data to summarize.'),
});

export type SummarizeBlockchainDataInput = z.infer<typeof SummarizeBlockchainDataInputSchema>;

const SummarizeBlockchainDataOutputSchema = z.object({
  summary: z.string().describe('A natural language summary of the blockchain data.'),
});

export type SummarizeBlockchainDataOutput = z.infer<typeof SummarizeBlockchainDataOutputSchema>;

export async function summarizeBlockchainData(input: SummarizeBlockchainDataInput): Promise<SummarizeBlockchainDataOutput> {
  return summarizeBlockchainDataFlow(input);
}

const summarizeBlockchainDataPrompt = ai.definePrompt({
  name: 'summarizeBlockchainDataPrompt',
  input: {schema: SummarizeBlockchainDataInputSchema},
  output: {schema: SummarizeBlockchainDataOutputSchema},
  prompt: `Summarize the following raw blockchain data in a clear and concise manner:\n\n{{rawData}}`,
});

const summarizeBlockchainDataFlow = ai.defineFlow(
  {
    name: 'summarizeBlockchainDataFlow',
    inputSchema: SummarizeBlockchainDataInputSchema,
    outputSchema: SummarizeBlockchainDataOutputSchema,
  },
  async input => {
    const {output} = await summarizeBlockchainDataPrompt(input);
    return {
      summary: output!.summary
    };
  }
);
