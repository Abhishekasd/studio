'use server';
/**
 * @fileOverview Generates a stylized image with the displayed message embedded and a Morning Muse watermark.
 *
 * - generateImageWithWatermark - A function that handles the image generation process.
 * - GenerateImageWithWatermarkInput - The input type for the generateImageWithWatermark function.
 * - GenerateImageWithWatermarkOutput - The return type for the generateImageWithWatermark function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageWithWatermarkInputSchema = z.object({
  message: z.string().describe('The message to be embedded in the image.'),
  category: z.string().describe('The category of the message (e.g., Shayari, Joke).'),
});
export type GenerateImageWithWatermarkInput = z.infer<typeof GenerateImageWithWatermarkInputSchema>;

const GenerateImageWithWatermarkOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated image as a data URI.'),
});
export type GenerateImageWithWatermarkOutput = z.infer<typeof GenerateImageWithWatermarkOutputSchema>;

export async function generateImageWithWatermark(input: GenerateImageWithWatermarkInput): Promise<GenerateImageWithWatermarkOutput> {
  return generateImageWithWatermarkFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateImageWithWatermarkPrompt',
  input: {schema: GenerateImageWithWatermarkInputSchema},
  output: {schema: GenerateImageWithWatermarkOutputSchema},
  prompt: `Generate a stylized image with the following message embedded and a Morning Muse watermark. The image should be visually appealing and suitable for sharing.

Message: {{{message}}}
Category: {{{category}}}

Incorporate the "Morning Muse" watermark subtly and artistically. Consider the message category when designing the image (e.g., use relevant imagery and colors). The watermark should be readable but not distracting. Return the image as a data URI.

Example styles, depending on category:
- Shayari: soft, dreamy background with floral elements.
- Joke: humorous, cartoonish style with bright colors.
- Motivational: inspiring landscape with uplifting typography.
- Spiritual: serene, minimalist design with symbolic elements.
`,
});

const generateImageWithWatermarkFlow = ai.defineFlow(
  {
    name: 'generateImageWithWatermarkFlow',
    inputSchema: GenerateImageWithWatermarkInputSchema,
    outputSchema: GenerateImageWithWatermarkOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      // IMPORTANT: ONLY the googleai/gemini-2.0-flash-preview-image-generation model is able to generate images. You MUST use exactly this model to generate images.
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        input.message,
        'Incorporate a subtle "Morning Muse" watermark. The watermark should be readable but not distracting.',
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
      },
    });
    return {imageDataUri: media!.url!};
  }
);
