import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const ScrollReveal = ({ 
  children, 
  direction = 'up',
  delay = 0, 
  duration = 0.7,
  className = '',
  threshold = 0.15
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: '0px 0px -80px 0px',
    amount: threshold
  });

  const directions = {
    up:    { hidden: { opacity: 0, y: 50 },  visible: { opacity: 1, y: 0 } },
    down:  { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 60 },  visible: { opacity: 1, x: 0 } },
    fade:  { hidden: { opacity: 0 },         visible: { opacity: 1 } },
    scale: { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={directions[direction]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

export const StaggerContainer = ({ children, className = '', staggerDelay = 0.12, delayChildren = 0.1 }: StaggerContainerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    margin: '0px 0px -60px 0px'
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'scale';
}

export const StaggerItem = ({ children, className = '', direction = 'up' }: StaggerItemProps) => {
  const directions = {
    up:    { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 },  visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }
  };

  return (
    <motion.div
      className={className}
      variants={directions[direction]}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
