import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

function systemTheme(): Theme {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * The site always follows the visitor's system preference.
 * There is no manual toggle and no stored override.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(systemTheme);

  useEffect(() => {
    // Clear any override an older version stored, so it cannot stick.
    try {
      localStorage.removeItem('theme');
    } catch {}

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const t: Theme = mq.matches ? 'dark' : 'light';
      setTheme(t);
      document.documentElement.classList.toggle('dark', t === 'dark');
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return { theme };
}
