'use client';
import { motion } from 'framer-motion';

export default function ShinyText({ text, speed = 3, className = '' }) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ backgroundPosition: '200% 0' }}
      animate={{ backgroundPosition: '-200% 0' }}
      transition={{
        repeat: Infinity,
        duration: speed,
        ease: 'linear',
      }}
      style={{
        backgroundSize: '200% auto',
      }}
    >
      {text}
    </motion.span>
  );
}
