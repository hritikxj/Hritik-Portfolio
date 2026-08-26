'use client';

import { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  width?: 'fit-content' | '100%';
  className?: string;
}

export default function Reveal({ children, width = '100%', className = '' }: RevealProps) {
  return (
    <div
      style={{ width }}
      className={className}
    >
      {children}
    </div>
  );
}
