import type { Transition, Variants } from 'motion/react';

// Shared timing so every section moves with the same rhythm
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = {
  micro: 0.2,
  ui: 0.35,
  reveal: 0.7,
};

export const SPRING: Transition = { type: 'spring', stiffness: 380, damping: 32, mass: 0.8 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.reveal, ease: EASE_OUT } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
};
