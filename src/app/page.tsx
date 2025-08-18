import { MorningMuseClient } from "@/components/morning-muse-client";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pt-24">
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 w-full z-10">
        <MorningMuseClient />
      </main>
      <div className="fixed inset-0 -z-10 h-full w-full bg-background" />
    </div>
  );
}
