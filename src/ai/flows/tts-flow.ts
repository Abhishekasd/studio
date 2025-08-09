
'use server';
/**
 * @fileOverview A flow for converting text to speech.
 *
 * - textToSpeech - A function that converts text to an audio data URI.
 * - TextToSpeechInput - The input type for the textToSpeech function.
 * - TextToSpeechOutput - The return type for the textToSpeech function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import wav from 'wav';

if (!process.env.GEMINI_API_KEY) {
  // This error will be caught by the client and displayed to the user.
  // We are not throwing here because that would crash the server.
  console.error(
    'GEMINI_API_KEY is not defined in the environment. Please set it in your .env file or hosting provider configuration.'
  );
}

const TextToSpeechInputSchema = z.object({
  text: z.string().describe('The text to convert to speech.'),
  language: z.string().describe('The language of the text (e.g., "en", "hi", "es").'),
});
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

const TextToSpeechOutputSchema = z.object({
  audioDataUri: z.string().describe('The generated audio as a data URI.'),
});
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;

async function toWav(
    pcmData: Buffer,
    channels = 1,
    rate = 24000,
    sampleWidth = 2
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const writer = new wav.Writer({
        channels,
        sampleRate: rate,
        bitDepth: sampleWidth * 8,
      });
  
      let bufs = [] as any[];
      writer.on('error', reject);
      writer.on('data', function (d) {
        bufs.push(d);
      });
      writer.on('end', function () {
        resolve(Buffer.concat(bufs).toString('base64'));
      });
  
      writer.write(pcmData);
      writer.end();
    });
}

const textToSpeechFlow = ai.defineFlow(
  {
    name: 'textToSpeechFlow',
    inputSchema: TextToSpeechInputSchema,
    outputSchema: TextToSpeechOutputSchema,
  },
  async (input) => {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('Server is not configured with a GEMINI_API_KEY.');
    }
    
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-preview-tts',
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Algenib' },
            },
          },
        },
        prompt: input.text,
    });

    if (!media?.url) {
      throw new Error('Text-to-speech generation failed to return audio.');
    }

    const audioBuffer = Buffer.from(
        media.url.substring(media.url.indexOf(',') + 1),
        'base64'
    );

    const wavBase64 = await toWav(audioBuffer);

    return { audioDataUri: `data:audio/wav;base64,${wavBase64}` };
  }
);

export async function textToSpeech(input: TextToSpeechInput): Promise<TextToSpeechOutput> {
  return textToSpeechFlow(input);
}
