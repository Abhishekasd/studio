
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

    let imagePrompt = `Generate a beautiful, divine, and artistic image that captures the essence of the following spiritual or motivational quote: "${input.prompt}". The style should be serene, devotional, and visually appealing, suitable for a spiritual app. Focus on creating illustrations of deities, spiritual symbols, or serene landscapes that match the message's tone. For example, if the message is about love and devotion, an image of Radha and Krishna would be appropriate. Subtly include the text "MorningMuse3D" as a small, elegant watermark in a corner of the image.`;

    if (input.category === 'spiritual') {
      if (['en', 'hi', 'sa'].includes(input.language)) {
        imagePrompt = `Generate a beautiful, divine, and artistic image of a Hindu deity that captures the essence of the following spiritual quote: "${input.prompt}". The style should be serene, devotional, and visually appealing. Create a variety of deities based on the message, such as Shiva and his family (Parvati, Ganesha, Kartikeya), Ganesh ji, Saraswati mata, Hanuman ji, or Radha and Krishna. The choice of deity should be inspired by the quote. Subtly include the text "MorningMuse3D" as a small, elegant watermark in a corner of the image.`;
      } else if (input.language === 'ur') {
        imagePrompt = `Generate a beautiful and serene image of Islamic art. This could be intricate calligraphy of a spiritual phrase from the quote "${input.prompt}", stunning mosque architecture, or an abstract geometric pattern that evokes peace and spirituality. Do not generate images of people or prophets. The style should be respectful and visually appealing. Subtly include the text "MorningMuse3D" as a small, elegant watermark in a corner of the image.`;
      }
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
