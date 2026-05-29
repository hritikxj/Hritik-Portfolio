'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
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
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!introComplete || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-50px' }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [introComplete]);

  return (
    <div ref={ref} style={{ width }} className={`relative ${className}`}>
      <div
        className="w-full h-full"
        style={{
          opacity: shouldAnimate ? 1 : 0,
          transform: shouldAnimate ? 'translateY(0)' : 'translateY(30px)',
          transitionProperty: 'opacity, transform',
          transitionDuration: '800ms',
          transitionDelay: `${delay * 1000}ms`,
          transitionTimingFunction: 'cubic-bezier(0.21, 0.47, 0.32, 0.98)',
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </div>
    </div>
  );
}

