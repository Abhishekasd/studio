
'use server';
/**
 * @fileOverview A flow for generating festival-specific messages.
 *
 * - getFestivalMessage - A function that returns a greeting for a current festival.
 * - FestivalMessageInput - The input type for the getFestivalMessage function.
 * - FestivalMessageOutput - The return type for the getFestivalMessage function.
 */

import {ai} from '../genkit';
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
        prompt: `You are an expert on world cultures, festivals, and greetings. Your task is to generate a short, cheerful greeting for a festival or special observance happening today.

**Instructions:**
1.  **Current Date:** The current date is {{{currentDate}}}.
2.  **Research Festivals:** You must first determine if there are any notable festivals or observances on this specific date. Check for:
    *   **Hindu Festivals:** Check the Panchang for festivals like Radha Ashtami, Mahalakshmi Vrat, Durva Ashtami, etc. For languages 'en', 'hi', 'sa', you should give these the highest priority.
    *   **Other Major Religious/Regional Festivals:** Check for significant events like Christmas, Diwali, Eid, Hanukkah, New Year's Day, etc.
    *   **National Holidays:** Check for independence days or major national holidays (e.g., Hari Merdeka in Malaysia).
    *   **International Observances:** Check for UN observances or global awareness days.
3.  **Generate a Greeting:**
    *   **If a festival is found:** Identify the most significant or joyous festival for the day. Generate a relevant, single-sentence greeting for it in the requested language: **{{{language}}}**. The greeting should be unique and celebratory. Prioritize joyous festivals over solemn observances.
    *   **If multiple festivals exist:** Pick the one that is most celebratory in nature. For example, you **must** prioritize Radha Ashtami over a Vrat, an awareness day, or a national holiday like Hari Merdeka.
    *   **If no festival is found:** Generate a generic, cheerful greeting like "Wishing you a day full of joy and celebration! 🎉". This must also be varied each time.
4.  **Formatting:** The response must ONLY be the message text, ending with one or two relevant emojis. Do not add any extra commentary.

**Examples:**
- For Radha Ashtami in English: "Happy Radha Ashtami! May the divine love of Radha and Krishna bless your day. 🙏"
- For no festival in Spanish: "¡Te deseo un día lleno de alegría y celebración! 🎉"
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
