# Prompt for Building MorningMuse3D

## 1. Project Overview

Create a web application called "MorningMuse3D". It will be a multi-lingual, AI-powered platform for generating daily inspirational messages and transforming them into beautiful, shareable art. The entire experience should be set against an immersive, 3D particle effect background.

## 2. Tech Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **UI Components**: ShadCN/UI
- **Styling**: Tailwind CSS
- **AI/Backend**: Genkit for generative AI flows
- **Deployment**: Configured for Firebase App Hosting

## 3. Core Features

### 3.1. Main Page (`/`)

- **Layout**: Centered content on the page. A main card will display the generated message. Below it will be action buttons.
- **Header**:
    - App title "MorningMuse3D" with a spinning sun icon.
    - A language selector dropdown with options: English, Hindi, Sanskrit, Urdu, Spanish, and Portuguese.
- **Image Search Bar**: A prominent search input field with a "Generate Image" button. This allows users to type any text and generate AI images directly.
- **Category Selection**: A list of buttons for message categories: `Greeting`, `Festival`, `Motivational`, `Spiritual`, `Shayari`, `Joke`, `Thank You`, `Welcome`, `Birthday`, `Anniversary`. The active category should be visually distinct.
- **Message Display Card**: A central card that displays the current message. It should have a subtle "flip" animation when a new message is generated. For the "Greeting" category, it should be formatted with "Good Morning" and "Have a nice day" text above and below the main message.
- **Action Buttons**:
    - `Copy Text`: Copies the message (and a promotional link) to the clipboard.
    - `Generate Image`: Triggers the AI image generation flow based on the current message.
    - `Show Another`: Fetches a new message from the selected category.

### 3.2. Personalization Features

- For `Birthday` and `Anniversary` categories, display a form to input:
    - **Person's Name** (text input).
    - **Person's Photo** (file input, optional). Support `.heic` and `.heif` files by converting them to JPEG on the client-side before processing.
    - **Characteristics** (textarea, e.g., "kind, funny, brave").
- The generated message should incorporate these details.
- The `Generate Image` flow should use the uploaded photo for these categories.

### 3.3. AI-Powered Message Generation

- Create a Genkit flow (`getNewMessage`) in `src/ai/flows/message-generation-flow.ts`.
- The flow should take `language`, `category`, `existingMessages` (to ensure uniqueness), and optional `name`/`characteristics` as input.
- It should use a Genkit prompt to generate a new, unique message based on the inputs. The prompt must be sophisticated enough to handle different tones and requirements for each category.
- Implement a `getFestivalMessage` flow that identifies if a major festival is happening on the current day and returns a relevant greeting in the chosen language.
- Implement a fallback system. If the AI flow fails, the app should pull a message from a predefined list in `src/lib/messages.ts`.

### 3.4. AI-Powered Image Generation

- Create a Genkit flow (`generateImage`) in `src/ai/flows/image-generation-flow.ts`.
- The flow should generate 6 distinct images using a generative AI model.
- **Prompt Engineering**: The prompt sent to the image model must be dynamically constructed based on the message `category` and `language`:
    - **Spiritual**: Generate culturally appropriate art. For Hindu-related languages (en, hi, sa), depict deities like Radha-Krishna or Shiva. For Urdu, create Islamic calligraphy or geometric patterns (no figures). For Portuguese, create Christian-themed art.
    - **Birthday/Anniversary with Photo**: Use the user's uploaded photo as a base. The AI should add a decorative frame and stylistically integrate the message text onto the image without altering the person in the photo.
    - **Greeting**: Offer two sub-categories: "Simple" (secular, e.g., landscapes, floral) and "Spiritual" (devotional art in the background with the greeting text prominent).
    - **Custom Search**: Generate an image based on the raw text from the search bar.
- **UI for Image Generation**:
    - When "Generate Image" is clicked, open a full-screen dialog.
    - Show a loading spinner while images are being generated.
    - Display the 6 generated images in a 2-column grid.
    - Allow the user to click an image to see a larger preview.
    - In the preview view, provide buttons to `Download` the image, `Share` the image, and go `Back to Grid`.
    - Implement robust sharing functionality, including a fallback to WhatsApp/Telegram/Email if the native Web Share API is not available or fails.

## 4. UI/UX and Styling

- **Theme**: A dark, cosmic theme. The specific HSL color variables are in `src/app/globals.css`. The primary color is a golden yellow, secondary is a vibrant pink, and the background is a very dark blue/black.
- **Background**: Implement a dynamic, floating particle effect using `particles.js` that covers the entire background of the application. The main content should appear to float on top of this effect.
- **Fonts**: Use the "Poppins" font.
- **Responsiveness**: The application must be fully responsive and look great on all devices, from mobile phones to desktops.
- **Welcome Guide**: For first-time visitors, show a welcome dialog that briefly explains the 3 main steps: 1. Choose category, 2. Get message, 3. Generate art. Use local storage to ensure this only appears once.
- **Static Pages**: Create `About`, `Contact`, and `Privacy Policy` pages with relevant static content, styled consistently with the rest of the app.
- **Toasts**: Use toast notifications for user feedback, such as "Copied to clipboard" or error messages.

## 5. File Structure and Code Guidelines

- All components should be functional components using React Hooks.
- Use the provided ShadCN UI components and create new ones as needed in `src/components/ui`.
- Define all UI text in a centralized `src/lib/ui-text.ts` file to manage translations for all supported languages.
- Place all AI logic within Genkit flows in the `src/ai/flows/` directory.
- Use TypeScript and define clear types for all props, state, and function signatures.
- Ensure all file imports use relative paths (e.g., `../lib/utils`) to avoid alias resolution issues.
- The `package.json` should include all necessary dependencies: `next`, `react`, `genkit`, `@genkit-ai/googleai`, `shadcn-ui` related packages, `lucide-react`, `heic2any`, `tailwindcss`, etc.
- Add Vercel Analytics and Speed Insights for performance monitoring.
- The root `layout.tsx` should set up the global styles, font, particle background script, and Toaster provider.
