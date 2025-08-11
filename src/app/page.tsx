import { MorningMuseClient } from "@/components/morning-muse-client";
import ThreeBackground from "@/components/three-background";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <ThreeBackground />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 w-full">
          <MorningMuseClient />
        </main>
        <footer className="w-full max-w-4xl p-8 text-center text-foreground/70">
          <Separator className="my-8 bg-border/50" />
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-primary">About MorningMuse3D</h2>
            <p className="text-base leading-relaxed">
              MorningMuse3D is your daily sanctuary for inspiration and positivity. We believe that a great day starts with a great mindset. Our platform delivers unique, AI-powered messages across a variety of categories including motivating quotes, spiritual wisdom, delightful shayari, and light-hearted jokes. 
            </p>
            <p className="text-base leading-relaxed">
              Available in multiple languages like <span className="font-semibold">English, Hindi, Sanskrit, and Urdu</span>, our goal is to offer a moment of peace and inspiration to people across the globe. With our "Generate Image" feature, you can even bring these messages to life through beautiful, AI-generated art, creating a unique visual representation of your daily muse. Start your morning with us and set the tone for a beautiful day ahead.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
