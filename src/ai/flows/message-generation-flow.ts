
'use server';
/**
 * @fileOverview A flow for generating dynamic, category-specific messages.
 *
 * - getNewMessage - A function that returns a unique message for a given category and language.
 * - MessageInput - The input type for the getNewMessage function.
 * - MessageOutput - The return type for the getNewMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

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
  name: z.string().optional().describe('An optional name of a person for personalized messages.'),
});
export type MessageInput = z.infer<typeof MessageInputSchema>;

const MessageOutputSchema = z.object({
  message: z.string().describe('The newly generated, unique message.'),
});
export type MessageOutput = z.infer<typeof MessageOutputSchema>;

const messagePrompt = ai.definePrompt({
    name: 'messagePrompt',
    input: {schema: MessageInputSchema},
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
  - **birthday:** A cheerful and celebratory birthday wish for **{{{name}}}**. The message must include the name.
  - **anniversary:** A warm and loving anniversary message, suitable for couples. If a name **{{{name}}}** is provided, it should be for that person/couple. The message must include the name if provided.

  Your response MUST only be the message text itself. Do not add any extra commentary or labels.
  `,
   config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
    ],
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
    
    const {output} = await messagePrompt(input);
    return output!;
  }
);


export async function getNewMessage(input: MessageInput): Promise<MessageOutput> {
  return getNewMessageFlow(input);
}
