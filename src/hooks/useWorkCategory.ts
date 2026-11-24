'use client';

import { useSyncExternalStore } from 'react';

export const workCategories = ['Selected', 'Branding', 'UI/UX', 'Illustrations'] as const;
type Category = typeof workCategories[number];
const values = ['selected', 'branding', 'uiux', 'illustrations'];

function snapshot(): Category {
  const query = new URLSearchParams(window.location.search).get('category');
  const index = values.indexOf(query ?? '');
  if (index >= 0) return workCategories[index];
  try {
    const saved = sessionStorage.getItem('portfolio-category');
    return workCategories.find(category => category === saved) ?? 'Selected';
  } catch {
    return 'Selected';
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
  const category = useSyncExternalStore(subscribe, snapshot, () => 'Selected' as Category);
  const setCategory = (next: Category) => {
    const url = new URL(window.location.href);
    url.searchParams.set('category', values[workCategories.indexOf(next)]);
    window.history.replaceState(window.history.state, '', url);
    try { sessionStorage.setItem('portfolio-category', next); } catch { /* Storage may be disabled. */ }
    window.dispatchEvent(new Event('portfolio-category-change'));
  };
  return [category, setCategory] as const;
}
