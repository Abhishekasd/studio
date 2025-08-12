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
        background: { color: { value: "transparent" } },
        particles: {
          number: { value: 150 },
          size: { value: 2 },
          move: { enable: true, speed: 0.6 },
          opacity: { value: 0.8 },
          color: {
            value: ["#ff4b5c", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"]
          },
          shape: { type: "circle" },
          links: { enable: false }
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" }
          },
          modes: {
            repulse: { distance: 100 },
            push: { quantity: 4 }
          }
        },
        detectRetina: true
      });
    } else {
      console.error('tsParticles not found on window. It might not have loaded correctly.');
    }
  }, []);

  return <div id="tsparticles" className="fixed inset-0 -z-10" />;
};

export default ThreeBackground;
