import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'theme-preference';
const THEME_COLORS: Record<ResolvedTheme, string> = { light: '#f5f3ee', dark: '#0a0b0f' };

interface ThemeContextValue {
  preference: ThemePreference;
  resolved: ResolvedTheme;
  setPreference: (pref: ThemePreference, origin?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const systemTheme = (): ResolvedTheme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const readPreference = (): ThemePreference => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    // storage blocked (private mode) — fall back to system
  }
  return 'system';
};

const applyTheme = (theme: ResolvedTheme) => {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preference, setPreferenceState] = useState<ThemePreference>(readPreference);
  const [resolved, setResolved] = useState<ResolvedTheme>(() =>
    preference === 'system' ? systemTheme() : preference
  );

  // Follow OS changes while the preference is "system"
  useEffect(() => {
    if (preference !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      const next = mq.matches ? 'dark' : 'light';
      applyTheme(next);
      setResolved(next);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [preference]);

  const setPreference = useCallback(
    (pref: ThemePreference, origin?: { x: number; y: number }) => {
      try {
        localStorage.setItem(STORAGE_KEY, pref);
      } catch {
        // ignore storage failures; the choice still applies for this visit
      }
      setPreferenceState(pref);

      const next = pref === 'system' ? systemTheme() : pref;
      if (next === document.documentElement.getAttribute('data-theme')) {
        setResolved(next);
        return;
      }

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> };
      };

      if (!doc.startViewTransition || reduceMotion) {
        applyTheme(next);
        setResolved(next);
        return;
      }

      // Circular reveal expanding from the toggle that was pressed
      const x = origin?.x ?? window.innerWidth - 40;
      const y = origin?.y ?? 40;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

      const transition = doc.startViewTransition(() => {
        applyTheme(next);
        setResolved(next);
      });
      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' }
          );
        })
        .catch(() => {
          // transition skipped — theme is already applied
        });
    },
    []
  );

  return (
    <ThemeContext.Provider value={{ preference, resolved, setPreference }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
