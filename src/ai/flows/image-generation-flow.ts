
'use server';
/**
 * @fileOverview A flow for generating images from a text prompt.
 *
 * - generateImage - A function that generates an image based on a prompt.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
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

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate an image from.'),
  language: z.string().describe('The language of the prompt (e.g., "en", "ur").'),
  category: z.string().describe('The category of the prompt (e.g., "spiritual").'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated image as a data URI.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('Server is not configured with a GEMINI_API_KEY.');
    }
    
    const watermarkText = input.category === 'greeting' ? '' : 'Subtly include the text "MorningMuse3D" as a small, elegant watermark in a corner of the image.';
    const watermarkTextSpiritual = input.category === 'greeting' ? '' : 'Place the text "MorningMuse3D" as a small, elegant watermark in the **bottom-right corner ONLY**. Do not place this text anywhere else in the image.';

    let imagePrompt = `Generate a beautiful, divine, and artistic image that captures the essence of the following spiritual or motivational quote: "${input.prompt}". The style should be serene, devotional, and visually appealing, suitable for a spiritual app. Focus on creating illustrations of deities, spiritual symbols, or serene landscapes that match the message's tone. For example, if the message is about love and devotion, an image of Radha and Krishna would be appropriate. ${watermarkText}`;

    if (input.category === 'spiritual') {
      if (['en', 'hi', 'sa'].includes(input.language)) {
        imagePrompt = `Create a beautiful, divine, and artistic image of a Hindu deity.

**Instructions:**
1.  **Deity Selection:** Choose a deity inspired by the spiritual quote provided. Your options are:
    *   Radha and Krishna
    *   Shiva and his family (Parvati, Ganesha, Kartikeya)
    *   Ganesh ji
    *   Saraswati mata
    *   Hanuman ji
    *   Ram Darbar (Rama, Sita, Lakshmana, and Hanuman)
2.  **Art Style:** The style must be serene, devotional, and visually appealing.
3.  **Composition:**
    *   The main artwork should feature the chosen deity or deities.
    *   Include a relevant deity call or chant (e.g., "Radhe Radhe" for Krishna, "Jai Shri Ram" for Ram Darbar, "Om Namah Shivaya" for Shiva) as an artistic, integrated part of the image. Do not use the text "MorningMuse3D" for this.
    *   Place the full spiritual quote text clearly and legibly *below* the main deity artwork.
    *   ${watermarkTextSpiritual}

**Spiritual Quote:** "${input.prompt}"`;
      } else if (input.language === 'ur') {
        imagePrompt = `Generate a beautiful and serene image of Islamic art. This could be intricate calligraphy of a spiritual phrase from the quote "${input.prompt}", stunning mosque architecture, or an abstract geometric pattern that evokes peace and spirituality. Do not generate images of people or prophets. The style should be respectful and visually appealing. ${watermarkText}`;
      }
    } else if (input.category === 'greeting') {
       imagePrompt = `Generate a beautiful, traditional, and visually appealing "good morning" or "have a nice day" style greeting image. The image should feature the text "${input.prompt}" prominently and beautifully integrated.

**Instructions:**
1.  **Theme:** The theme should be positive, serene, and suitable for a general audience. Think of floral patterns, beautiful landscapes, sunrises, or traditional motifs relevant to the language and culture of the greeting.
2.  **Text Integration:** The text "${input.prompt}" should be the main focus, rendered in an elegant and readable font.
3.  **No Watermark:** Do not include any watermarks or extra text like "MorningMuse3D". The image should only contain the greeting text and the background art.
4.  **Style:** The style should be similar to popular digital greetings found on platforms like Pinterest or WhatsApp, often featuring vibrant colors and decorative elements.`;
    }
    
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: imagePrompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed to return an image.');
    }

    return { imageDataUri: media.url };
  }
);

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}
