import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'MorningMuse3D - Daily Inspirational Quotes & AI Art',
  description: 'Start your day with MorningMuse3D. Get unique, AI-generated inspirational, motivational, spiritual messages, shayari, and jokes in multiple languages. Generate beautiful, divine images to match your mood.',
  keywords: ['inspirational quotes', 'motivational messages', 'daily spiritual messages', 'shayari', 'jokes', 'AI art generator', 'good morning quotes', 'hindi shayari', 'sanskrit quotes', 'urdu shayari'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2365487260750859"
     crossOrigin="anonymous"></script>
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
