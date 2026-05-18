'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { useIntroComplete } from '@/context/IntroContext';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  width?: 'fit-content' | '100%';
  className?: string;
}

export default function Reveal({ children, delay = 0, width = '100%', className = '' }: RevealProps) {
  const introComplete = useIntroComplete();
  const ref = useRef<HTMLDivElement>(null);
  // once:true means isInView stays true after first intersection — works correctly
  // whether the element enters view during the intro (hidden) or after.
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} style={{ width }} className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={introComplete && isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
