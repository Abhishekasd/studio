import { MorningMuseClient } from "@/components/morning-muse-client";

export default function Home() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center pt-24">
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        <iframe
          src="https://my.spline.design/orb-bFuqF8lCEvWM4o0m7qVBfTzV/"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{ pointerEvents: 'auto' }}
        ></iframe>
      </div>
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 w-full">
        <MorningMuseClient />
      </main>
    </div>
  );
}
