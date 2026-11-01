import React from 'react';
import { motion } from 'motion/react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { ThemePreference, useTheme } from '../../theme/ThemeProvider';
import { SPRING } from './motion';

const OPTIONS: { value: ThemePreference; label: string; Icon: typeof Sun }[] = [
  { value: 'light', label: 'Light theme', Icon: Sun },
  { value: 'system', label: 'System theme', Icon: Monitor },
  { value: 'dark', label: 'Dark theme', Icon: Moon },
];

/** Three-way segmented switch: Light · System · Dark. */
export const ThemeToggle: React.FC<{ id: string; className?: string }> = ({ id, className = '' }) => {
  const { preference, setPreference } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className={`relative inline-flex items-center gap-0.5 rounded-full border border-line bg-surface-2 p-1 ${className}`}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = preference === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setPreference(value, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
            }}
            className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 ${
              active ? 'text-fg' : 'text-subtle hover:text-fg'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`theme-pill-${id}`}
                className="absolute inset-0 rounded-full border border-line bg-surface shadow-soft"
                transition={SPRING}
              />
            )}
            <Icon className="relative h-[15px] w-[15px]" strokeWidth={2} />
          </button>
        );
      })}
    </div>
  );
};
