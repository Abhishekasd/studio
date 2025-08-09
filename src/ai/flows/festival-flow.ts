'use server';
/**
 * @fileOverview A flow for generating festival-specific messages.
 *
 * - getFestivalMessage - A function that returns a greeting for a current festival.
 * - FestivalMessageInput - The input type for the getFestivalMessage function.
 * - FestivalMessageOutput - The return type for the getFestivalMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

if (!process.env.GEMINI_API_KEY) {
  throw new Error(
    'GEMINI_API_KEY is not defined in the environment. Please set it in your .env file or hosting provider configuration.'
  );
}

const FestivalMessageInputSchema = z.object({
  language: z.string().describe('The language for the festival message (e.g., "en", "hi", "es").'),
});
export type FestivalMessageInput = z.infer<typeof FestivalMessageInputSchema>;

const FestivalMessageOutputSchema = z.object({
  message: z.string().describe('The festival-specific greeting message.'),
});
export type FestivalMessageOutput = z.infer<typeof FestivalMessageOutputSchema>;

const getFestivalMessageFlow = ai.defineFlow(
  {
    name: 'getFestivalMessageFlow',
    inputSchema: FestivalMessageInputSchema,
    outputSchema: FestivalMessageOutputSchema,
  },
  async (input) => {
    const festivalPrompt = ai.definePrompt({
        name: 'festivalPrompt',
        input: {schema: z.object({
          language: z.string(),
          currentDate: z.string(),
        })},
        output: {schema: FestivalMessageOutputSchema},
        prompt: `You are an expert on world festivals and greetings.
      Your task is to generate a short, cheerful greeting for a major festival happening today.
      
      1.  The current date is {{{currentDate}}}.
      2.  Check if there is a major global or regional festival (like Rakshabandhan, Christmas, Diwali, Eid, New Year's, etc.) happening on this date.
      3.  If a major festival is found, generate a relevant, single-sentence greeting for it in the language: {{{language}}}. The greeting should be unique and varied each time it's generated.
      4.  If no major festival is happening today, generate a generic, cheerful festive greeting like "Wishing you a day full of joy and celebration!". This also needs to be varied.
      5.  The response should only be the message text.
      
      Example for Diwali in English: "Wishing you a Diwali that's as bright as the lights and as sweet as the mithai! ✨"
      Example for Rakshabandhan in Hindi: "राखी का यह त्योहार आपके जीवन में खुशियां और समृद्धि लाए।"
      Example for no festival in Spanish: "¡Te deseo un día lleno de alegría y celebración!"
      `,
      });
      
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    const {output} = await festivalPrompt({
        language: input.language,
        currentDate: currentDate,
    });
    return output!;
  }
);


export async function getFestivalMessage(input: FestivalMessageInput): Promise<FestivalMessageOutput> {
  return getFestivalMessageFlow(input);
}
