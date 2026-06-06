'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  width?: 'fit-content' | '100%';
  className?: string;
}

export default function Reveal({ children, width = '100%', className = '', delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        delay
      }}
      style={{ width }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
