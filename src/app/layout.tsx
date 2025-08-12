import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'MorningMuse3D - AI-Powered Inspiration, Quotes & Art',
  description: 'MorningMuse3D delivers AI-generated motivational messages and matching art in English, Hindi, Sanskrit, and Urdu to uplift your day.',
  keywords: ['AI quotes', 'inspirational art', 'daily motivation', 'spiritual quotes', 'multilingual quotes'],
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
        <Script src="https://cdn.jsdelivr.net/npm/tsparticles@3.0.0/tsparticles.bundle.min.js" strategy="beforeInteractive" />
      </head>
      <body className="font-body antialiased">
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            {children}
          </main>
          <footer className="w-full bg-background/50 border-t border-border/30 mt-16">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center space-x-6">
                 <Link href="/" className="text-foreground/70 hover:text-primary transition-colors">
                  Home
                </Link>
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
                <p>&copy; {new Date().getFullYear()} MorningMuse3D. All rights reserved. Your daily sanctuary for AI-powered inspiration.</p>
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
