import { useCallback, useEffect, useState } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { tsParticles } from '@tsparticles/engine';
import type { Container } from '@tsparticles/engine';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';

const NeuralNetwork = () => {
  const [init, setInit] = useState(false);
  const { reducedMotion, isLowPowerOrMobile } = usePerformanceMode();

  useEffect(() => {
    loadSlim(tsParticles).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    // loaded
  }, []);

  const options: any = {
    fullScreen: { enable: true, zIndex: 0 },
    background: { color: { value: 'transparent' } },
    fpsLimit: isLowPowerOrMobile ? 30 : 60,
    interactivity: {
      events: {
        onHover: {
          enable: !isLowPowerOrMobile,
          mode: ['grab', 'bubble']
        },
        onClick: {
          enable: !isLowPowerOrMobile,
          mode: 'push'
        },
        resize: { enable: true }
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
          quantity: 2
        },
        repulse: {
          distance: 150,
          duration: 0.4
        }
      }
    },
    particles: {
      number: {
        value: isLowPowerOrMobile ? 35 : 75,
        density: {
          enable: true,
          width: 1920,
          height: 1080
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
          enable: !isLowPowerOrMobile,
          speed: 0.8,
          sync: false
        }
      },
      size: {
        value: { min: 1.5, max: 3.5 },
        animation: {
          enable: !isLowPowerOrMobile,
          speed: 1.2,
          sync: false
        }
      },
      links: {
        enable: true,
        distance: isLowPowerOrMobile ? 110 : 140,
        color: '#2E75B6',
        opacity: 0.25,
        width: 1,
        triangles: {
          enable: false
        }
      },
      move: {
        enable: true,
        speed: { min: 0.2, max: isLowPowerOrMobile ? 0.6 : 1.0 },
        direction: 'none',
        random: true,
        straight: false,
        outModes: {
          default: 'bounce'
        }
      },
      shadow: {
        enable: !isLowPowerOrMobile,
        color: '#00D4FF',
        blur: 4
      }
    },
    detectRetina: !isLowPowerOrMobile,
    responsive: [
      {
        maxWidth: 768,
        options: {
          particles: {
            number: { value: 25 },
            links: { distance: 90 },
            move: { speed: { min: 0.2, max: 0.5 } }
          }
        }
      }
    ]
  };

  if (!init || reducedMotion) return null;

  return (
    <Particles
      id="neural-network"
      particlesLoaded={particlesLoaded}
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

