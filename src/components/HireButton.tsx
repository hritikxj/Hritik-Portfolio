'use client';

import { useHireMe } from './HireMeProvider';

export default function HireButton({ className, children }: { className: string; children: React.ReactNode }) {
  const { handleHireMeClick } = useHireMe();
  return (
    <button type="button" onClick={handleHireMeClick} className={className}>
      {children}
    </button>
  );
}
