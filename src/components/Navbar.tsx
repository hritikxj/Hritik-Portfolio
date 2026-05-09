'use client';

import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="border-b-[0.5px] border-border-subtle bg-off-white sticky top-0 z-50">
      <div className="flex justify-between items-center px-[clamp(20px,4vw,40px)] py-4">
        <div className="font-display text-lg font-normal tracking-[0.02em]">Hritik Jasnani</div>
        
        <ul className="hidden md:flex gap-8 list-none items-center">
          <li><button onClick={() => scrollTo('work')} className="text-xs text-smoke tracking-[0.08em] uppercase transition-colors duration-200 hover:text-ink cursor-pointer">Work</button></li>
          <li><button onClick={() => scrollTo('about')} className="text-xs text-smoke tracking-[0.08em] uppercase transition-colors duration-200 hover:text-ink cursor-pointer">About</button></li>
          <li><button onClick={() => scrollTo('services')} className="text-xs text-smoke tracking-[0.08em] uppercase transition-colors duration-200 hover:text-ink cursor-pointer">Services</button></li>
          <li><button onClick={() => scrollTo('contact')} className="bg-ink text-off-white px-5 py-2 rounded-sm tracking-[0.06em] text-[11px] transition-colors duration-200 hover:bg-brand-red cursor-pointer">Hire Me →</button></li>
        </ul>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => scrollTo('contact')} className="bg-ink text-off-white px-4 py-1.5 rounded-sm tracking-[0.06em] text-[10px] transition-colors duration-200 hover:bg-brand-red cursor-pointer">Hire Me</button>
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
        <div className="md:hidden bg-off-white border-t-[0.5px] border-border-subtle flex flex-col absolute w-full px-[clamp(20px,4vw,40px)] py-4 gap-2 shadow-sm">
          <button onClick={() => scrollTo('work')} className="text-xs text-smoke text-left tracking-[0.08em] uppercase py-2">Work</button>
          <button onClick={() => scrollTo('about')} className="text-xs text-smoke text-left tracking-[0.08em] uppercase py-2">About</button>
          <button onClick={() => scrollTo('services')} className="text-xs text-smoke text-left tracking-[0.08em] uppercase py-2">Services</button>
        </div>
      )}
    </nav>
  );
}
