import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AuroraBackgroundProps {
  children?: ReactNode;
}

const AuroraBackground = ({ children }: AuroraBackgroundProps) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundColor: '#0A0F1E',
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    >
      {/* Aurora Layer 1 — Deep Blue */}
      <motion.div
        animate={{
          x: [0, 80, -40, 60, 0],
          y: [0, -60, 80, -30, 0],
          scale: [1, 1.2, 0.9, 1.1, 1],
          rotate: [0, 15, -10, 20, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut'
        }}
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '70%',
          height: '70%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(46, 117, 182, 0.35) 0%, rgba(30, 58, 95, 0.2) 40%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      {/* Aurora Layer 2 — Cyan */}
      <motion.div
        animate={{
          x: [0, -70, 50, -40, 0],
          y: [0, 80, -50, 60, 0],
          scale: [1, 0.85, 1.15, 0.95, 1],
          rotate: [0, -20, 15, -10, 0]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
          delay: 3
        }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '-15%',
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.2) 0%, rgba(0, 150, 200, 0.12) 40%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />

      {/* Aurora Layer 3 — Purple */}
      <motion.div
        animate={{
          x: [0, 60, -80, 30, 0],
          y: [0, -40, 70, -60, 0],
          scale: [1, 1.1, 0.8, 1.2, 1],
          rotate: [0, 10, -25, 15, 0]
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
          delay: 6
        }}
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '20%',
          width: '55%',
          height: '55%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(83, 74, 183, 0.25) 0%, rgba(60, 50, 150, 0.15) 40%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      {/* Aurora Layer 4 — Teal accent */}
      <motion.div
        animate={{
          x: [0, -50, 70, -20, 0],
          y: [0, 60, -70, 40, 0],
          scale: [1, 1.3, 0.85, 1.1, 1],
          rotate: [0, -15, 25, -5, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
          delay: 9
        }}
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '45%',
          height: '45%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(29, 158, 117, 0.2) 0%, rgba(20, 120, 90, 0.1) 40%, transparent 70%)',
          filter: 'blur(65px)',
          pointerEvents: 'none'
        }}
      />

      {/* Aurora Layer 5 — Small bright cyan highlight */}
      <motion.div
        animate={{
          x: [0, 40, -60, 20, 0],
          y: [0, -80, 40, -50, 0],
          scale: [1, 0.7, 1.4, 0.9, 1],
          opacity: [0.6, 1, 0.4, 0.8, 0.6]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
          delay: 4
        }}
        style={{
          position: 'absolute',
          top: '30%',
          left: '40%',
          width: '25%',
          height: '25%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />

      {/* Noise texture overlay for depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.4,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Vignette overlay — darkens edges for focus */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10, 15, 30, 0.6) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Content sits above aurora layers */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
};

export default AuroraBackground;
