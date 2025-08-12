'use client';

import React, { useEffect, useRef } from 'react';

// Extend the Window interface to include tsParticles
declare global {
  interface Window {
    tsParticles: any;
  }
}

const ThreeBackground: React.FC = () => {
  const initialized = useRef(false);

  useEffect(() => {
    // Ensure this runs only once and only on the client
    if (typeof window === 'undefined' || initialized.current) {
      return;
    }

    initialized.current = true;

    // Check if the tsParticles library is loaded
    if (window.tsParticles) {
      window.tsParticles.load("tsparticles", {
        particles: {
          number: { value: 120 },
          size: { value: 3 },
          move: { enable: true, speed: 1.5 },
          opacity: { value: 0.7 },
          color: { value: "#ffffff" },
          shape: { type: "circle" }
        },
        interactivity: {
          events: { onhover: { enable: true, mode: "repulse" } },
          modes: { repulse: { distance: 100 } }
        }
      });
    } else {
      console.error('tsParticles not found on window. It might not have loaded correctly.');
    }
  }, []);

  return <div id="tsparticles" className="fixed inset-0 -z-10" />;
};

export default ThreeBackground;
