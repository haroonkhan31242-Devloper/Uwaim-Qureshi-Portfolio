import React from 'react';

type SpotlightCardProps = React.HTMLAttributes<HTMLDivElement> & { as?: 'div' | 'article' };

const track = (e: React.PointerEvent<HTMLElement>) => {
  if (e.pointerType !== 'mouse') return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  // Written straight to CSS variables — no React re-render per mouse move
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
};

/** Card surface with a soft ember glow that follows the cursor. */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({ as = 'div', className = '', onPointerMove, ...rest }) => {
  const Tag = as;
  return (
    <Tag
      {...rest}
      className={`card card-interactive spotlight ${className}`}
      onPointerMove={(e) => {
        track(e);
        onPointerMove?.(e as React.PointerEvent<HTMLDivElement>);
      }}
    />
  );
};
