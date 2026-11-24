'use client';

import { useEffect } from 'react';

const KEY = 'portfolio-scroll-y';

/**
 * Remembers where the visitor was on the homepage when they open a project
 * (from any internal link), and returns them to that spot when they come back
 * by "Back to portfolio" or the browser's Back button.
 */
export default function ScrollMemory() {
  useEffect(() => {
    const remember = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link || (link.target && link.target !== '_self')) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === '/') return;
      try { sessionStorage.setItem(KEY, String(window.scrollY)); } catch { /* Storage may be disabled. */ }
    };
    document.addEventListener('click', remember, true);
    return () => document.removeEventListener('click', remember, true);
  }, []);

  useEffect(() => {
    let saved: number | null = null;
    try {
      const value = sessionStorage.getItem(KEY);
      if (value !== null && Number.isFinite(Number(value))) saved = Number(value);
    } catch { /* Storage may be disabled. */ }
    if (saved === null) return;

    const y = saved;
    // Clear only after restoring: React runs effects twice in development, and
    // clearing on read would leave the second run with nothing to restore.
    const frame = requestAnimationFrame(() => {
      if (!window.location.hash) window.scrollTo(0, y);
      try { sessionStorage.removeItem(KEY); } catch { /* Storage may be disabled. */ }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return null;
}
