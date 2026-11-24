'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useHireMe } from './HireMeProvider';
import ThemeToggle from './ThemeToggle';

const links = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
}

export default function Navbar() {
  const { handleHireMeClick } = useHireMe();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    const desktop = window.matchMedia('(min-width: 768px)');
    const onResize = () => { if (desktop.matches) setOpen(false); };
    window.addEventListener('keydown', close);
    desktop.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('keydown', close);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);

  const goTo = (event: React.MouseEvent, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    setOpen(false);
    target.scrollIntoView({ behavior: scrollBehavior() });
  };

  const goHome = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  };

  return (
    <div className="sticky top-0 z-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:bg-ink focus:text-off-white focus:px-4 focus:py-2 focus:rounded-sm"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="border-b-[0.5px] border-border-subtle bg-off-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-off-white/75">
        <div className="page-container flex h-16 items-center justify-between">
          <Link
            href="/"
            onClick={goHome}
            className="font-display text-[18px] font-semibold leading-none text-ink no-underline transition-opacity duration-300 hover:opacity-60"
          >
            Hritik Jasnani
          </Link>

          <ul className="hidden md:flex items-center gap-8 list-none">
            {links.map(link => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={event => goTo(event, link.id)}
                  className="group relative text-[13px] text-smoke transition-colors duration-300 hover:text-ink"
                >
                  {link.label}
                  <span aria-hidden="true" className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out-soft group-hover:scale-x-100" />
                </a>
              </li>
            ))}
            <li>
              <ThemeToggle className="-my-1 text-ink" />
            </li>
            <li>
              <button
                type="button"
                onClick={handleHireMeClick}
                className="cursor-pointer rounded-full bg-ink px-5 py-2.5 text-[13px] text-off-white transition-colors duration-300 hover:bg-ink/80"
              >
                Hire Me →
              </button>
            </li>
          </ul>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle className="text-ink" />
            <button
              type="button"
              onClick={handleHireMeClick}
              className="cursor-pointer rounded-full bg-ink px-4 py-2 text-[13px] text-off-white"
            >
              Hire Me
            </button>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen(value => !value)}
              className="relative grid h-10 w-10 cursor-pointer place-items-center rounded-full"
            >
              <span aria-hidden="true" className={`absolute h-px w-5 bg-ink transition-transform duration-500 ease-out-soft ${open ? 'rotate-45' : '-translate-y-[4px]'}`} />
              <span aria-hidden="true" className={`absolute h-px w-5 bg-ink transition-transform duration-500 ease-out-soft ${open ? '-rotate-45' : 'translate-y-[4px]'}`} />
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out-soft md:hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
          inert={!open}
        >
          <ul className="min-h-0 list-none page-container">
            {links.map((link, index) => (
              <li key={link.id} className={index === 0 ? 'border-t-[0.5px] border-border-subtle' : ''}>
                <a
                  href={`#${link.id}`}
                  onClick={event => goTo(event, link.id)}
                  className="flex items-center justify-between border-b-[0.5px] border-border-subtle py-4 font-display text-[26px] font-semibold leading-none text-ink"
                >
                  {link.label}
                  <span aria-hidden="true" className="font-body text-base text-smoke">↓</span>
                </a>
              </li>
            ))}
            <li className="py-5 text-[13px] text-smoke">hritikjasnani.design@gmail.com</li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
