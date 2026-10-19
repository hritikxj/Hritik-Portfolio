'use client';

import { useSyncExternalStore } from 'react';

const categories = ['Branding', 'Illustrations', 'UI/UX'] as const;
type Category = typeof categories[number];
const values = ['branding', 'illustrations', 'uiux'];

function snapshot(): Category {
  const query = new URLSearchParams(window.location.search).get('category');
  const index = values.indexOf(query ?? '');
  if (index >= 0) return categories[index];
  try {
    const saved = sessionStorage.getItem('portfolio-category');
    return categories.find(category => category === saved) ?? 'Branding';
  } catch {
    return 'Branding';
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener('popstate', onChange);
  window.addEventListener('portfolio-category-change', onChange);
  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener('portfolio-category-change', onChange);
  };
}

export function useWorkCategory() {
  const category = useSyncExternalStore(subscribe, snapshot, () => 'Branding' as Category);
  const setCategory = (next: Category) => {
    const url = new URL(window.location.href);
    url.searchParams.set('category', values[categories.indexOf(next)]);
    window.history.replaceState(window.history.state, '', url);
    try { sessionStorage.setItem('portfolio-category', next); } catch { /* Storage may be disabled. */ }
    window.dispatchEvent(new Event('portfolio-category-change'));
  };
  return [category, setCategory] as const;
}
