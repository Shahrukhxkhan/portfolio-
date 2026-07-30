import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

const TypewriterText = ({ text, className, delay = 0, speed = 0.05 }: TypewriterTextProps) => {
  const letters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: delay
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 10,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const
      }
    }
  };

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'inline-block' }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          style={{ 
            display: 'inline-block',
            whiteSpace: letter === ' ' ? 'pre' : 'normal'
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const BlinkingCursor = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'loop',
        delay: delay
      }}
      style={{
        display: 'inline-block',
        width: '2px',
        height: '1em',
        backgroundColor: '#00D4FF',
        marginLeft: '4px',
        verticalAlign: 'middle',
        borderRadius: '1px',
        boxShadow: '0 0 8px #00D4FF'
      }}
    />
  );
};

export default TypewriterText;
