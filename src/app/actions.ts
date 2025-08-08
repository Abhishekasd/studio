'use server';

import {
  generateImageWithWatermark,
  type GenerateImageWithWatermarkInput,
  type GenerateImageWithWatermarkOutput,
} from '@/ai/flows/generate-image-with-watermark';

export async function generateImageAction(
  input: GenerateImageWithWatermarkInput
): Promise<GenerateImageWithWatermarkOutput> {
  console.log('Generating image with input:', input);
  try {
    const result = await generateImageWithWatermark(input);
    console.log('Image generation successful.');
    return result;
  } catch (error) {
    console.error('Error generating image:', error);
    if (error instanceof Error && (error.message.includes('API key not valid') || error.message.includes('API key is missing'))) {
       throw new Error('Image generation failed: The API key is missing or invalid. Please check your hosting provider\'s environment variables.');
    }
    throw new Error('Failed to generate image. Please try again.');
  }
}
