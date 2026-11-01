import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CheckCircle, Code, Database, Globe, Server, Smartphone, Sparkles, Wrench } from 'lucide-react';
import { SKILLS } from '../data/portfolioData';
import { Accent, SectionHeader } from './ui/SectionHeader';
import { Reveal } from './ui/Reveal';
import { EASE_OUT, SPRING, scrollToId } from './ui/motion';

const categories = [
  { id: 'all', label: 'All Technologies', icon: Sparkles },
  { id: 'mobile', label: 'Flutter & Mobile', icon: Smartphone },
  { id: 'frontend', label: 'Frontend Development', icon: Globe },
  { id: 'backend', label: 'Backend & APIs', icon: Server },
  { id: 'languages', label: 'Programming Languages', icon: Code },
  { id: 'databases', label: 'Databases & Storage', icon: Database },
  { id: 'tools', label: 'Dev Tools & DevOps', icon: Wrench },
];

// Level badges carry meaning through color: Core = ember, Specialization = cobalt, Proficient = neutral
const LEVEL_STYLE: Record<string, string> = {
  Core: 'bg-accent-soft text-accent-ink border-accent-line',
  Specialization: 'bg-cobalt-soft text-cobalt border-[color-mix(in_srgb,var(--cobalt)_30%,transparent)]',
  Proficient: 'bg-surface-2 text-muted border-line',
};

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredSkills = activeCategory === 'all' ? SKILLS : SKILLS.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="section-y relative overflow-hidden border-t border-line bg-bg-alt">
      <div className="bg-dots fade-mask-b pointer-events-none absolute inset-x-0 top-0 h-96" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeader
          index="03"
          eyebrow="Technical Proficiency"
          title={
            <>
              Curated technology stack & <Accent>architectural tooling.</Accent>
            </>
          }
          description="Organized across languages, cross-platform frameworks, server environments, and database engines. No arbitrary percentage bars—only real architectural capability and production execution."
        />

        {/* Filters — scroll horizontally on small screens instead of wrapping into a wall of pills */}
        <Reveal>
          <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
            <div role="group" aria-label="Filter skills by category" className="flex w-max gap-1.5 sm:w-auto sm:flex-wrap">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    aria-pressed={isActive}
                    className={`relative flex min-h-10 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${
                      isActive ? 'border-transparent text-[var(--btn-fg)]' : 'border-line bg-surface text-muted hover:border-line-strong hover:text-fg'
                    }`}
                  >
                    {isActive && (
                      <motion.span layoutId="skills-filter" className="absolute inset-0 rounded-full bg-[var(--btn)]" transition={SPRING} />
                    )}
                    <Icon className="relative h-3.5 w-3.5" />
                    <span className="relative">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
            <span className="font-mono text-subtle">
              {String(filteredSkills.length).padStart(2, '0')} technologies
            </span>
            {Object.keys(LEVEL_STYLE).map((level) => (
              <span key={level} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full border ${LEVEL_STYLE[level]}`} />
                {level}
              </span>
            ))}
          </div>
        </Reveal>

        <motion.ul layout className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => (
              <motion.li
                key={skill.name}
                layout
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: EASE_OUT, delay: (i % 3) * 0.05 }}
              >
                {/* Inner element owns the CSS hover lift so it never fights Motion's inline transform */}
                <div className={`card card-interactive h-full p-5 ${skill.highlight ? 'border-accent-line' : ''}`}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="flex items-center gap-2 font-display text-[17px] font-semibold leading-snug tracking-tight text-fg">
                      {skill.name}
                      {skill.highlight && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-label="Highlighted skill" />
                      )}
                    </h3>
                    <span
                      className={`shrink-0 rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                        LEVEL_STYLE[skill.level] ?? LEVEL_STYLE.Proficient
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{skill.description}</p>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {/* Engineering standards callout */}
        <Reveal className="mt-10">
          <div className="card flex flex-col items-start justify-between gap-5 p-6 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint-soft text-mint">
                <CheckCircle className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-base font-semibold tracking-tight text-fg">Full-Stack Code Quality Standards</div>
                <div className="mt-1 text-[13px] text-muted">
                  Strict TypeScript typing, Bloc event separation, automated CI testing, and secure credential handling.
                </div>
              </div>
            </div>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('projects');
              }}
              className="btn btn-secondary btn-sm shrink-0"
            >
              See Technical Implementations
              <ArrowRight className="btn-arrow h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
