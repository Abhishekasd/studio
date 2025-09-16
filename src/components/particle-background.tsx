"use client";

import React, { useEffect, memo } from 'react';

declare global {
  interface Window {
    particlesJS: any;
    cancelAnimationFrame: any;
    mozCancelAnimationFrame: any;
    webkitCancelAnimationFrame: any;
    msCancelAnimationFrame: any;
  }
}

const ParticlesBackground: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.async = true;
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          "particles": {
            "number": {
              "value": 15, // Fewer particles for a cleaner look
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#ffffff" // Birds will be white
            },
            "shape": {
              "type": "edge", // A 'V' shape, like a bird
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              }
            },
            "opacity": {
              "value": 0.8,
              "random": true,
              "anim": {
                "enable": true,
                "speed": 0.5,
                "opacity_min": 0.3,
                "sync": false
              }
            },
            "size": {
              "value": 5,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 4,
                "size_min": 3,
                "sync": false
              }
            },
            "line_linked": {
              "enable": false // No lines connecting the birds
            },
            "move": {
              "enable": true,
              "speed": 2, // Slower, more graceful movement
              "direction": "none",
              "random": true,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "bubble" // Birds get slightly bigger on hover
              },
              "onclick": {
                "enable": true,
                "mode": "push" // Click to push them away gently
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 150,
                "size": 8,
                "duration": 2,
                "opacity": 1,
                "speed": 3
              },
              "repulse": {
                "distance": 100,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      const pjs = document.getElementById('particles-js');
      if (pjs) {
        pjs.remove();
      }
      const canvas = document.querySelector('.particles-js-canvas-el');
      if(canvas) {
        canvas.remove();
      }
       if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
      }
    };
  }, []);

  return <div id="particles-js"></div>;
};

export default memo(ParticlesBackground);