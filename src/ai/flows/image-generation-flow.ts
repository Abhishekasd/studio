
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
  language: z.string().describe('The language of the prompt (e.g., "en", "ur", "pt").'),
  category: z.string().describe('The category of the prompt (e.g., "spiritual").'),
  subCategory: z.string().optional().describe('An optional sub-category for more specific image generation (e.g., "simple", "spiritual").'),
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
      throw new Error('Server is not configured with a GEMINI_API_KEY. Please set it in your .env file.');
    }
    
    let prompt: any;

    if (input.category === 'spiritual') {
      if (['en', 'hi', 'sa'].includes(input.language)) {
        prompt = `Create a beautiful, divine, and artistic image of a Hindu deity.

**Instructions:**
1.  **Deity Selection:** Choose a deity inspired by the spiritual quote provided. Your options are:
    *   Radha and Krishna
    *   Shiva and his family (Parvati, Ganesha, Kartikeya)
    *   Ganesh ji
    *   Saraswati mata
    *   Hanuman ji
    *   Ram Darbar (Rama, Sita, Lakshmana, and Hanuman)
2.  **Slogan Generation:** Based on the chosen deity, generate a relevant, traditional slogan (e.g., "Har Har Mahadev" for Shiva, "Jai Shri Krishna" for Krishna).
3.  **Art Style:** The style must be serene, devotional, and visually appealing.
4.  **Composition:**
    *   The main artwork should feature the chosen deity or deities.
    *   Artistically and clearly integrate BOTH the spiritual quote and the slogan you generated into the image. For example, the slogan could be at the top and the quote at the bottom.
    *   **No Watermark:** Do not include any watermarks or extra text.

**Spiritual Quote:** "${input.prompt}"`;
      } else if (input.language === 'ur') {
        prompt = `Generate a beautiful and serene image of Islamic art. This could be intricate calligraphy of a spiritual phrase from the quote "${input.prompt}", stunning mosque architecture, or an abstract geometric pattern that evokes peace and spirituality. Do not generate images of people or prophets. The style should be respectful and visually appealing. Do not include any watermarks.`;
      } else if (input.language === 'pt') {
        prompt = `Create a beautiful, serene, and artistic image with a Christian theme, inspired by the spiritual quote provided.

**Instructions:**
1.  **Theme Selection:** The image should be inspired by Christian spirituality. Options include:
    *   An artistic representation of Jesus Christ.
    *   The Holy Family (Jesus, Mary, and Joseph).
    *   A guardian angel.
    *   Symbolic imagery like a cross, a dove (representing the Holy Spirit), or a lamb.
2.  **Text Integration:** Artistically and clearly integrate the spiritual quote into the image. The text should complement the art.
3.  **Art Style:** The style must be reverent, peaceful, and visually appealing, suitable for a spiritual message.
4.  **No Watermark:** Do not include any watermarks or extra text.

**Spiritual Quote:** "${input.prompt}"`;
      } else {
        prompt = `Generate a beautiful and artistic image that captures the essence of the following quote: "${input.prompt}". The style should be visually appealing and match the message's tone. Do not include any watermark.`;
      }
    } else if (input.category === 'greeting') {
      if (input.subCategory === 'spiritual') {
         if (['en', 'hi', 'sa'].includes(input.language)) {
             prompt = `Create a beautiful, devotional greeting card image. The greeting text itself is "${input.prompt}".

**Instructions:**
1.  **Greeting Text is Primary:** The main focus of the image MUST be the greeting text: "${input.prompt}". It should be prominent, artistic, and easy to read.
2.  **Background Art:** The background should be a beautiful, artistic, and serene depiction of a Hindu deity or symbols associated with them. The deity should be part of the background art, not the main subject. For example, for a "Ram Ram Ji" greeting, the background could feature a subtle image of Ram, or a bow and arrow, or other related symbols.
    *   Choose an appropriate deity based on the greeting, such as Ganesh ji, Radha-Krishna, or Ram.
3.  **Art Style:** The overall style should be similar to popular digital greetings, with vibrant colors and decorative elements like flowers, but with a clear spiritual theme.
4.  **No Watermark:** Do not include any watermarks or extra text. The image should only contain the greeting text and the spiritual background art.`;
         } else if (input.language === 'pt') {
            prompt = `Create a beautiful, devotional Christian greeting card image. The greeting text itself is "${input.prompt}".

**Instructions:**
1.  **Greeting Text is Primary:** The main focus of the image MUST be the greeting text: "${input.prompt}". It should be prominent, artistic, and easy to read.
2.  **Background Art:** The background should be a beautiful, artistic, and serene depiction of a Christian theme or symbol. This could be a subtle image of Jesus, an angel, a cross, or a dove. The art should be a background element, not the main subject.
3.  **Art Style:** The overall style should be similar to popular digital greetings, with soft colors and decorative elements like light rays or flowers, with a clear spiritual theme.
4.  **No Watermark:** Do not include any watermarks or extra text. The image should only contain the greeting text and the spiritual background art.`;
         } else {
             prompt = `Generate a beautiful, traditional, and visually appealing greeting image with a spiritual but non-figurative theme. The image should feature the text "${input.prompt}" prominently and beautifully integrated.

**Instructions:**
1.  **Theme:** The theme must be positive and serene, suitable for a spiritual greeting. Think of beautiful calligraphy, geometric patterns, or mosque architecture.
2.  **Strict Restriction:** You MUST NOT generate any images of deities, religious figures, or people. The image must be non-figurative.
3.  **Text Integration:** The text "${input.prompt}" should be the main focus, rendered in an elegant and readable font.
4.  **No Watermark:** Do not include any watermarks or extra text.`;
         }
      } else {
        prompt = `Generate a beautiful, traditional, and visually appealing "good morning" or "have a nice day" style greeting image. The image should feature the text "${input.prompt}" prominently and beautifully integrated.

**Instructions:**
1.  **Theme:** The theme must be positive and serene, suitable for a general audience. Think of floral patterns, beautiful landscapes, sunrises, or traditional motifs.
2.  **Strict Restriction:** You MUST NOT generate any images of deities, religious figures, or specific spiritual symbols. The image must be secular.
3.  **Text Integration:** The text "${input.prompt}" should be the main focus, rendered in an elegant and readable font.
4.  **No Watermark:** Do not include any watermarks or extra text. The image should only contain the greeting text and the background art.
5.  **Style:** The style should be similar to popular digital greetings found on platforms like Pinterest or WhatsApp, often featuring vibrant colors and decorative elements.`;
      }
    } else {
       prompt = `Generate a beautiful and artistic image that captures the essence of the following quote: "${input.prompt}". The style should be visually appealing and match the message's tone. Do not include any watermark.`;
    }
    
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: prompt,
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
