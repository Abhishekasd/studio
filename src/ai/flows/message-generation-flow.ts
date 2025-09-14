
'use server';
/**
 * @fileOverview A flow for generating dynamic, category-specific messages.
 *
 * - getNewMessage - A function that returns a unique message for a given category and language.
 * - MessageInput - The input type for the getNewMessage function.
 * - MessageOutput - The return type for the getNewMessage function.
 */

import {ai} from '../genkit';
import {z} from 'zod';
import {messages} from '@/lib/messages';

if (!process.env.GEMINI_API_KEY) {
  // This error will be caught by the client and displayed to the user.
  // We are not throwing here because that would crash the server.
  console.error(
    'GEMINI_API_KEY is not defined in the environment. Please set it in your .env file or hosting provider configuration.'
  );
}

const MessageInputSchema = z.object({
  language: z.string().describe('The language for the message (e.g., "en", "hi", "es").'),
  category: z.string().describe('The category of the message (e.g., "shayari", "joke").'),
  existingMessages: z.array(z.string()).describe('A list of messages already shown to the user in this session to avoid repetition.'),
  name: z.string().optional().describe('The name of the person for a personalized message.'),
  characteristics: z.string().optional().describe('The characteristics of the person for a personalized message.'),
});
export type MessageInput = z.infer<typeof MessageInputSchema>;

const MessageOutputSchema = z.object({
  message: z.string().describe('The newly generated, unique message.'),
});
export type MessageOutput = z.infer<typeof MessageOutputSchema>;

const messagePrompt = ai.definePrompt({
    name: 'messagePrompt',
    input: {schema: z.object({
      language: z.string(),
      category: z.string(),
      existingMessages: z.array(z.string()),
      name: z.string().optional(),
      characteristics: z.string().optional(),
    })},
    output: {schema: MessageOutputSchema},
    prompt: `You are an expert content creator for a morning inspiration app.
  Your task is to generate a short, engaging, and unique message for the user.

  **Instructions:**
  1.  **Category:** {{{category}}}
  2.  **Language:** {{{language}}}
  3.  **Tone:** Cheerful, positive, and safe for all audiences.
  4.  **Length:** Maximum 1-2 lines. It must be short and impactful.
  5.  **Uniqueness:** The message must be completely new and different from the following messages that have already been shown to the user in this session:
      {{#each existingMessages}}
      - "{{{this}}}"
      {{/each}}
  
  **Category-Specific Guidelines:**
  - **motivational:** A powerful, uplifting quote to inspire action and positivity.
  - **spiritual:** A serene, insightful message about peace, gratitude, or inner connection.
  - **shayari:** An elegant, poetic couplet (two lines) that is emotional and beautiful.
  - **joke:** A light-hearted, clean, family-friendly joke that brings a smile.
  - **greeting:** A simple, warm, and traditional greeting. Examples: "Good Morning", "Ram Ram", "Have a blessed day". Keep it very simple and popular.
  - **thankyou:** A heartfelt, sincere message of gratitude. It can be for a person, a situation, or a general feeling of thanks.
  - **welcome:** A warm and inviting message to welcome someone to a new place, group, or experience.
  - **birthday:** Generate a warm and personalized birthday wish for {{{name}}}. If characteristics are provided ({{{characteristics}}}), weave them into the message in an appreciative and celebratory way. Example for "creative and kind": "Happy Birthday, {{{name}}}! Your creative spirit and kind heart inspire everyone around you. Have a wonderful day! 🎂"
  - **anniversary:** Generate a heartfelt anniversary wish for {{{name}}}. If characteristics are provided ({{{characteristics}}}), use them to create a message that celebrates their journey and bond. Example for "loyal and funny": "Happy Anniversary, {{{name}}}! Your loyalty and humor make your bond so special. Wishing you many more years of love and laughter. ❤️"

  Your response MUST only be the message text itself, ending with one or two relevant emojis. Do not add any extra commentary or labels.
  `,
   config: {
    temperature: 1.0,
  },
});

const getNewMessageFlow = ai.defineFlow(
  {
    name: 'getNewMessageFlow',
    inputSchema: MessageInputSchema,
    outputSchema: MessageOutputSchema,
  },
  async (input) => {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('Server is not configured with a GEMINI_API_KEY.');
    }
    
    try {
      const {output} = await messagePrompt(input);
      if (output?.message) {
        return output;
      }
    } catch (e) {
        console.error("AI message generation failed, using fallback.", e);
    }
    
    // Fallback logic if AI fails or returns empty response
    const fallbackMessages = messages[input.language]?.[input.category] ?? ["Have a wonderful day! 👋"];
    let fallbackMessage = fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];

    return { message: fallbackMessage };
  }
);


export async function getNewMessage(input: MessageInput): Promise<MessageOutput> {
  return getNewMessageFlow(input);
}
