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
        <div id="particles-js" />
        <div className="relative flex flex-col min-h-screen bg-background">
          <main className="flex-grow">
            {children}
          </main>
          <footer className="w-full bg-background/50 border-t border-border/30 mt-16 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
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
              <div className="mt-6 text-center text-xs sm:text-sm text-foreground/50">
                <p>&copy; {new Date().getFullYear()} MorningMuse3D. All rights reserved. Your daily sanctuary for AI-powered inspiration.</p>
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
        <Script id="particles-init" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined' && window.tsParticles) {
              window.tsParticles.load("particles-js", {
                particles: {
                  number: {
                    value: 200,
                    density: {
                      enable: true,
                      value_area: 800
                    }
                  },
                  color: {
                    value: ["#845ec2", "#d65db1", "#ff6f91", "#ff9671", "#ffc75f", "#f9f871"]
                  },
                  shape: {
                    type: "circle"
                  },
                  opacity: {
                    value: 0.8,
                    random: true,
                    anim: {
                      enable: true,
                      speed: 0.5,
                      opacity_min: 0.1,
                      sync: false
                    }
                  },
                  size: {
                    value: 3,
                    random: true,
                    anim: {
                      enable: false
                    }
                  },
                  links: {
                    enable: false
                  },
                  move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                      enable: true,
                      rotateX: 600,
                      rotateY: 1200
                    }
                  }
                },
                interactivity: {
                  detect_on: "canvas",
                  events: {
                    onhover: {
                      enable: true,
                      mode: "bubble"
                    },
                    onclick: {
                      enable: true,
                      mode: "push"
                    },
                    resize: true
                  },
                  modes: {
                    bubble: {
                      distance: 200,
                      size: 8,
                      duration: 2,
                      opacity: 1,
                      speed: 3
                    },
                    push: {
                      particles_nb: 4
                    }
                  }
                },
                retina_detect: true
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
