import { MorningMuseClient } from "@/components/morning-muse-client";
import ThreeBackground from "@/components/three-background";

export default function Home() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center pt-24">
      <ThreeBackground />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 w-full">
        <MorningMuseClient />
      </main>
    </div>
  );
}
