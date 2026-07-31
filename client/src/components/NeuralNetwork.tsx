import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

const NeuralNetwork = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options: any = {
    fullScreen: { enable: true, zIndex: 0 },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: ['grab', 'bubble']
        },
        onClick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.8,
            color: '#00D4FF'
          }
        },
        bubble: {
          distance: 200,
          size: 6,
          duration: 0.3,
          opacity: 0.8
        },
        push: {
          quantity: 3
        },
        repulse: {
          distance: 150,
          duration: 0.4
        }
      }
    },
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          area: 900
        }
      },
      color: {
        value: ['#2E75B6', '#00D4FF', '#4A9EDB', '#1D9E75']
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: { min: 0.2, max: 0.7 },
        animation: {
          enable: true,
          speed: 0.8,
          sync: false
        }
      },
      size: {
        value: { min: 1.5, max: 4 },
        animation: {
          enable: true,
          speed: 1.5,
          sync: false
        }
      },
      links: {
        enable: true,
        distance: 140,
        color: '#2E75B6',
        opacity: 0.25,
        width: 1,
        triangles: {
          enable: false
        }
      },
      move: {
        enable: true,
        speed: { min: 0.3, max: 1.2 },
        direction: 'none',
        random: true,
        straight: false,
        outModes: {
          default: 'bounce'
        }
      },
      shadow: {
        enable: true,
        color: '#00D4FF',
        blur: 4
      }
    },
    detectRetina: true,
    responsive: [
      {
        maxWidth: 768,
        options: {
          particles: {
            number: { value: 40 },
            links: { distance: 100 },
            move: { speed: { min: 0.2, max: 0.8 } }
          }
        }
      }
    ]
  };

  return (
    <Particles
      id="neural-network"
      init={particlesInit}
      options={options}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default NeuralNetwork;
