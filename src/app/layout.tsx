import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

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
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            {children}
          </main>
          <footer className="w-full bg-background/50 border-t border-border/30 mt-16">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center space-x-6">
                <Link href="/about" className="text-foreground/70 hover:text-primary transition-colors">
                  About Us
                </Link>
                <Link href="/contact" className="text-foreground/70 hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link href="/privacy" className="text-foreground/70 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </div>
              <div className="mt-6 text-center text-sm text-foreground/50">
                <p>&copy; {new Date().getFullYear()} MorningMuse3D. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
