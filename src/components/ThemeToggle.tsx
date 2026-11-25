'use client';

import { useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

// Light unless the visitor has chosen dark; the device setting is not used.
function currentTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

/**
 * Light/dark switch. The icon is chosen in CSS (see globals.css) so the server
 * markup never disagrees with the theme applied before paint.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useSyncExternalStore<Theme | null>(subscribe, currentTheme, () => null);
  const next: Theme = theme === 'dark' ? 'light' : 'dark';

  const toggle = () => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      root.classList.add('theme-transition');
      window.setTimeout(() => root.classList.remove('theme-transition'), 600);
    }
    root.setAttribute('data-theme', next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#131413' : '#F5F6F3');
    try { localStorage.setItem('theme', next); } catch { /* Choice still applies for this visit. */ }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme ? `Switch to ${next} mode` : 'Switch colour theme'}
      title={theme ? `Switch to ${next} mode` : 'Switch colour theme'}
      className={`group relative grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full border-[0.5px] border-current/20 transition-colors duration-300 hover:border-current/50 ${className}`}
    >
      {/* Moon: shown in light mode */}
      <svg className="theme-icon-moon h-[18px] w-[18px] transition-transform duration-500 ease-out-soft group-hover:-rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.6 6.6 0 0 0 10.7 10.7Z" />
      </svg>
      {/* Sun: shown in dark mode */}
      <svg className="theme-icon-sun h-[18px] w-[18px] transition-transform duration-500 ease-out-soft group-hover:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
      </svg>
    </button>
  );
}
