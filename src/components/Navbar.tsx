'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

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
      window.location.href = `/#${id}`;
    }
  };

  const handleHireMeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    window.location.href = "mailto:hritikjasnani.design@gmail.com?subject=Design%20Project%20Inquiry&body=Hi%20Hritik,%0A%0AI%20came%20across%20your%20work%20and%20I%20am%20interested%20in%20collaborating%20with%20you%20on%20a%20design%20project.%0A%0AHere%20is%20a%20brief%20overview%20of%20what%20I%20am%20looking%20for:%0A%0AProject%20Type:%20%0ATimeline:%20%0ABudget:%20%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards,%0A%5BYour%20Name%5D";
    setShowToast(true);
    setCopied(false);
    setTimeout(() => setShowToast(false), 8000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('hritikjasnani.design@gmail.com');
    setCopied(true);
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

      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-ink text-off-white px-6 py-4 rounded shadow-2xl flex items-center gap-4 text-xs font-body animate-in slide-in-from-bottom-5 fade-in duration-300">
          <span>
            Opening mail app... If nothing happened, 
            <button onClick={copyEmail} className="ml-2 underline text-brand-red hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 inline">
              {copied ? "Copied!" : "click here to copy email"}
            </button>
          </span>
          <button onClick={() => setShowToast(false)} className="ml-4 text-white/50 hover:text-white cursor-pointer bg-transparent border-none p-0 text-lg">✕</button>
        </div>
      )}
    </nav>
  );
}
