import type { CSSProperties, ElementType, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger in milliseconds. Keep small (≤ 240) so nothing feels slow. */
  delay?: number;
  as?: ElementType;
}

export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: RevealProps) {
  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined;
  return (
    <Tag data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  );
}
