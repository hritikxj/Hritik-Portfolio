'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useHireMe } from './HireMeProvider';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { handleHireMeClick } = useHireMe();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollTo = (id: string) => {
    setIsOpen(false);
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Client-side navigation; IntroScene skips the intro on return visits
      // because the sessionStorage flag is already set.
      router.push(`/#${id}`);
    }
  };

  return (
    <nav className="border-b-[0.5px] border-border-subtle bg-off-white sticky top-0 z-50">
      <div className="w-full flex justify-between items-center px-5 md:px-12 lg:px-10 py-4">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="font-display text-lg font-normal tracking-[0.02em] text-ink no-underline hover:opacity-70 transition-opacity duration-200"
        >
          Hritik Jasnani
        </Link>

        <ul className="hidden md:flex gap-8 list-none items-center">
          <li><button onClick={() => scrollTo('work')} className="text-xs text-smoke tracking-[0.08em] uppercase transition-colors duration-200 hover:text-ink cursor-pointer">Work</button></li>
          <li><button onClick={() => scrollTo('about')} className="text-xs text-smoke tracking-[0.08em] uppercase transition-colors duration-200 hover:text-ink cursor-pointer">About</button></li>
          <li><button onClick={() => scrollTo('services')} className="text-xs text-smoke tracking-[0.08em] uppercase transition-colors duration-200 hover:text-ink cursor-pointer">Services</button></li>
          <li><button onClick={handleHireMeClick} className="bg-ink text-off-white px-5 py-2 rounded-sm tracking-[0.06em] text-[11px] transition-colors duration-200 hover:bg-brand-red cursor-pointer inline-block">Hire Me →</button></li>
        </ul>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={handleHireMeClick} className="bg-ink text-off-white px-4 py-1.5 rounded-sm tracking-[0.06em] text-[10px] transition-colors duration-200 hover:bg-brand-red cursor-pointer inline-block">Hire Me</button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-ink focus:outline-none p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-off-white border-t-[0.5px] border-border-subtle flex flex-col absolute w-full left-0 right-0">
          <div className="w-full flex flex-col px-5 md:px-12 lg:px-10 py-4 gap-2 shadow-sm">
            <button onClick={() => scrollTo('work')} className="text-xs text-smoke text-left tracking-[0.08em] uppercase py-2">Work</button>
            <button onClick={() => scrollTo('about')} className="text-xs text-smoke text-left tracking-[0.08em] uppercase py-2">About</button>
            <button onClick={() => scrollTo('services')} className="text-xs text-smoke text-left tracking-[0.08em] uppercase py-2">Services</button>
          </div>
        </div>
      )}
    </nav>
  );
}
