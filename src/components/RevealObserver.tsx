'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * One shared IntersectionObserver for every `[data-reveal]` element on the
 * page. Elements stay visible without JavaScript; the hidden starting state is
 * only applied under `html.js` (see globals.css).
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = (element: Element) => element.classList.add('is-revealed');

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('[data-reveal]').forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    const observe = (root: ParentNode) => {
      root.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach(element => observer.observe(element));
    };
    observe(document);

    // Category switches and client navigations add new cards later.
    const mutations = new MutationObserver(records => {
      for (const record of records) {
        record.addedNodes.forEach(node => {
          if (!(node instanceof Element)) return;
          if (node.matches('[data-reveal]:not(.is-revealed)')) observer.observe(node);
          observe(node);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
