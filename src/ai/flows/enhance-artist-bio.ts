'use server';

/**
 * @fileOverview An AI agent that enhances artist bios for increased engagement.
 *
 * - enhanceArtistBio - A function that enhances the artist bio.
 * - EnhanceArtistBioInput - The input type for the enhanceArtistBio function.
 * - EnhanceArtistBioOutput - The return type for the enhanceArtistBio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceArtistBioInputSchema = z.object({
  artistBio: z.string().describe('The artist bio to be enhanced.'),
  artistName: z.string().describe('The name of the artist.'),
  artistCategory: z.string().describe('The category of the artist (e.g., singer, dancer, DJ).'),
});
export type EnhanceArtistBioInput = z.infer<typeof EnhanceArtistBioInputSchema>;

const EnhanceArtistBioOutputSchema = z.object({
  enhancedBio: z.string().describe('The enhanced artist bio.'),
});
export type EnhanceArtistBioOutput = z.infer<typeof EnhanceArtistBioOutputSchema>;

export async function enhanceArtistBio(input: EnhanceArtistBioInput): Promise<EnhanceArtistBioOutput> {
  return enhanceArtistBioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceArtistBioPrompt',
  input: {schema: EnhanceArtistBioInputSchema},
  output: {schema: EnhanceArtistBioOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in writing compelling artist biographies.

  Your goal is to enhance the provided artist bio to increase engagement and attract more bookings.
  Consider the artist's name, category, and existing bio when crafting your enhanced bio.  The enhanced bio should be concise, engaging, and highlight the artist's unique qualities and accomplishments.

  Artist Name: {{{artistName}}}
  Artist Category: {{{artistCategory}}}
  Existing Bio: {{{artistBio}}}

  Enhanced Bio:`,
});

const enhanceArtistBioFlow = ai.defineFlow(
  {
    name: 'enhanceArtistBioFlow',
    inputSchema: EnhanceArtistBioInputSchema,
    outputSchema: EnhanceArtistBioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
