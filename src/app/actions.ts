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
    throw new Error('Failed to generate image. Please try again.');
  }
}
