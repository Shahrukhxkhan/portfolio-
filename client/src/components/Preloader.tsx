import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 600);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#0A0F1E',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          {/* Animated MSK monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              color: '#00D4FF',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.2em'
            }}
          >
            MSK
          </motion.div>

          {/* Loading bar */}
          <motion.div
            style={{
              marginTop: '2rem',
              width: '200px',
              height: '2px',
              backgroundColor: '#1E3A5F',
              borderRadius: '999px',
              overflow: 'hidden'
            }}
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              style={{
                height: '100%',
                backgroundColor: '#00D4FF',
                borderRadius: '999px',
                boxShadow: '0 0 10px #00D4FF'
              }}
            />
          </motion.div>

          {/* Subtle tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              marginTop: '1rem',
              color: '#8892A4',
              fontSize: '0.85rem',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.1em'
            }}
          >
            Initializing portfolio...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
