import React from 'react';
import { motion } from 'motion/react';
import { fadeUp, stagger } from './motion';

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'split' | 'center';
}

/**
 * Editorial section heading: numbered eyebrow, display title, and a supporting
 * paragraph that sits beside the title on wide screens ("split") or below it ("center").
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ index, eyebrow, title, description, align = 'split' }) => {
  const centered = align === 'center';
  return (
    <motion.header
      className={
        centered
          ? 'mx-auto mb-14 max-w-3xl text-center lg:mb-20'
          : 'mb-14 grid gap-6 lg:mb-20 lg:grid-cols-12 lg:items-end lg:gap-10'
      }
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger(0.1)}
    >
      <div className={centered ? '' : 'lg:col-span-7'}>
        <motion.div variants={fadeUp} className={`eyebrow ${centered ? 'justify-center' : ''}`}>
          <span className="text-accent-ink">{index}</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
          <span>{eyebrow}</span>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="mt-5 font-display text-[2.15rem] font-bold leading-[1.05] tracking-[-0.03em] text-fg sm:text-5xl lg:text-[3.5rem]"
        >
          {title}
        </motion.h2>
      </div>
      {description && (
        <motion.p
          variants={fadeUp}
          className={`text-base leading-relaxed text-muted sm:text-[1.0625rem] ${
            centered ? 'mx-auto mt-5 max-w-2xl' : 'max-w-xl lg:col-span-5 lg:pb-2'
          }`}
        >
          {description}
        </motion.p>
      )}
    </motion.header>
  );
};

/** Italic serif accent used inside display headings. */
export const Accent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-serif text-[1.08em] font-normal italic tracking-[-0.01em] text-accent-ink">{children}</span>
);
