import React from 'react';
import { motion } from 'motion/react';
import { fadeUp, stagger } from './motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** Fades content up once as it scrolls into view. */
export const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0 }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.15 }}
    variants={fadeUp}
    transition={{ delay }}
  >
    {children}
  </motion.div>
);

/** Parent that staggers its RevealItem children into view. */
export const RevealGroup: React.FC<{ children: React.ReactNode; className?: string; gap?: number }> = ({
  children,
  className,
  gap = 0.08,
}) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.1 }}
    variants={stagger(gap)}
  >
    {children}
  </motion.div>
);

export const RevealItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <motion.div className={className} variants={fadeUp}>
    {children}
  </motion.div>
);
