import React, { Suspense, lazy, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Code,
  Github,
  Globe,
  Linkedin,
  Mail,
  Monitor,
  Send,
  Server,
  Smartphone,
  Twitter,
} from 'lucide-react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { EASE_OUT } from './ui/motion';

// three.js is ~600 kB — load it after the page is interactive; the canvas fades in when ready
const ThreeBackground = lazy(() => import('./ThreeBackground').then((m) => ({ default: m.ThreeBackground })));

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

const specializations = [
  { label: 'Flutter & Mobile', Icon: Smartphone },
  { label: 'Modern Web', Icon: Globe },
  { label: 'Desktop Systems', Icon: Monitor },
  { label: 'Scalable Backend', Icon: Server },
];

const socials = [
  { href: `mailto:${DEVELOPER_INFO.email}`, label: 'Send an email', Icon: Mail, external: false },
  { href: DEVELOPER_INFO.socials.github, label: 'GitHub Profile', Icon: Github, external: true },
  { href: DEVELOPER_INFO.socials.linkedin, label: 'LinkedIn Profile', Icon: Linkedin, external: true },
  { href: DEVELOPER_INFO.socials.twitter, label: 'Twitter / X Profile', Icon: Twitter, external: true },
];

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE_OUT, delay },
});

/** Headline split into words that rise out of a mask one after another. */
const RevealWords: React.FC<{ text: string; className?: string; delay: number }> = ({ text, className, delay }) => (
  <>
    {text.split(' ').map((word, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
        <motion.span
          className={`inline-block ${className ?? ''}`}
          initial={{ y: '105%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: delay + i * 0.06 }}
        >
          {word}
        </motion.span>
        {' '}
      </span>
    ))}
  </>
);

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onContactClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate overflow-hidden pb-16 pt-32 sm:pt-36 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:pb-20 lg:pt-36"
    >
      {/* Background layers */}
      <div className="bg-dots fade-mask-b pointer-events-none absolute inset-0 -z-20" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 top-10 -z-20 h-[38rem] w-[38rem] rounded-full opacity-70 blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--glow), transparent 65%)' }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 opacity-35 [mask-image:radial-gradient(ellipse_at_50%_30%,black_25%,transparent_70%)] lg:opacity-100 lg:[mask-image:linear-gradient(to_right,transparent_30%,black_62%)]"
        style={{ y: sceneY }}
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <ThreeBackground />
        </Suspense>
      </motion.div>

      <div className="container-x">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="text-center lg:col-span-7 lg:text-left">
            <motion.div
              {...enter(0.05)}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 py-1.5 pl-2.5 pr-3.5 text-xs shadow-soft backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inset-0 rounded-full bg-mint" />
                <span className="relative h-2 w-2 rounded-full bg-mint" />
              </span>
              <span className="font-medium text-fg">{DEVELOPER_INFO.fullName}</span>
              <span className="hidden h-3 w-px bg-line-strong sm:block" />
              <span className="hidden text-muted sm:inline">Available for Opportunities</span>
            </motion.div>

            <h1 className="mt-7 font-display text-[2.6rem] font-bold leading-[1.02] tracking-[-0.04em] text-fg sm:text-6xl lg:text-[4.6rem] xl:text-[5.1rem]">
              <RevealWords text="Turning Ideas Into" delay={0.15} />
              <br className="hidden sm:block" />
              <RevealWords
                text="Powerful"
                delay={0.33}
                className="font-serif text-[1.1em] font-normal italic tracking-[-0.02em] text-accent-ink"
              />
              <RevealWords text="Digital Experiences." delay={0.4} />
            </h1>

            <motion.p
              {...enter(0.55)}
              className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0"
            >
              {DEVELOPER_INFO.supportingText}
            </motion.p>

            <motion.ul {...enter(0.65)} className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
              {specializations.map(({ label, Icon }) => (
                <li key={label} className="chip py-1.5 text-[12px]">
                  <Icon className="h-3.5 w-3.5 text-accent-ink" />
                  {label}
                </li>
              ))}
            </motion.ul>

            <motion.div
              {...enter(0.75)}
              className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
            >
              <button type="button" onClick={onExploreClick} className="btn btn-primary btn-lg">
                Explore My Work
                <ArrowRight className="btn-arrow h-4 w-4" />
              </button>
              <button type="button" onClick={onContactClick} className="btn btn-secondary btn-lg">
                <Send className="h-4 w-4 text-accent-ink" />
                Let's Work Together
              </button>
            </motion.div>

            <motion.div
              {...enter(0.85)}
              className="mt-10 flex flex-col items-center gap-4 border-t border-line pt-6 sm:flex-row lg:items-center"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">Connect</span>
                <div className="flex items-center gap-1.5">
                  {socials.map(({ href, label, Icon, external }) => (
                    <a
                      key={label}
                      href={href}
                      className="icon-btn h-9 w-9"
                      aria-label={label}
                      title={label}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
              <span className="hidden h-4 w-px bg-line-strong sm:block" />
              <span className="flex items-center gap-2 text-xs text-muted">
                <CheckCircle2 className="h-4 w-4 text-mint" />
                Verified Engineering Craftsmanship
              </span>
            </motion.div>
          </div>

          {/* Portrait */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <motion.div style={{ y: portraitY }} className="relative w-full max-w-[340px] sm:max-w-[400px]">
              {/* Rotating seal */}
              <div className="pointer-events-none absolute -left-10 -top-10 z-20 hidden h-28 w-28 sm:block" aria-hidden="true">
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: EASE_OUT, delay: 1 }}
                  className="relative h-full w-full"
                >
                  <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full text-fg">
                    <defs>
                      <path id="seal-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                    </defs>
                    <circle cx="50" cy="50" r="49" fill="var(--surface)" stroke="var(--line)" />
                    <text fontSize="9.2" fontFamily="JetBrains Mono, monospace" letterSpacing="2.6" fill="currentColor">
                      <textPath href="#seal-circle">AVAILABLE FOR WORK • 2026 • REMOTE •</textPath>
                    </text>
                  </svg>
                  <span className="absolute inset-0 m-auto flex h-9 w-9 items-center justify-center rounded-full bg-accent text-[var(--btn-hover-fg)]">
                    <Code className="h-4 w-4" />
                  </span>
                </motion.div>
              </div>

              <motion.div
                initial={{ clipPath: 'inset(100% 0% 0% 0% round 28px)' }}
                animate={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
                transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.25 }}
                className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-surface-2 shadow-float"
              >
                <motion.img
                  src={DEVELOPER_INFO.portraitUrl}
                  alt="Eng.Muhammad Uwaim Qureshi - Software Engineer"
                  width={1081}
                  height={1455}
                  className="h-full w-full object-cover object-top"
                  initial={{ scale: 1.18 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.25 }}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

                <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[10px] text-white/85 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b35]" />
                  ENG-SYS.ID #2101
                </div>

                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-black/45 p-3.5 text-white backdrop-blur-md">
                  <div className="min-w-0">
                    <div className="truncate font-display text-[15px] font-semibold tracking-tight">
                      Eng.Muhammad Uwaim Qureshi
                    </div>
                    <div className="font-mono text-[11px] text-white/70">Software Engineer | Full-Stack</div>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ff6b35] text-[#170904]">
                    <Code className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.1 }}
                className="absolute -left-3 top-[38%] z-10 sm:-left-12"
              >
                <div className="animate-float flex items-center gap-2.5 rounded-2xl border border-line bg-surface/90 px-3 py-2.5 shadow-float backdrop-blur-md">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
                    <Smartphone className="h-4 w-4" />
                  </span>
                  <span className="text-left">
                    <span className="block text-[10px] text-subtle">Specialization</span>
                    <span className="block text-xs font-semibold text-fg">Flutter & Mobile</span>
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.25 }}
                className="absolute -right-3 bottom-24 z-10 sm:-right-10"
              >
                <div className="animate-float-delayed flex items-center gap-2.5 rounded-2xl border border-line bg-surface/90 px-3 py-2.5 shadow-float backdrop-blur-md">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cobalt-soft text-cobalt">
                    <Server className="h-4 w-4" />
                  </span>
                  <span className="text-left">
                    <span className="block text-[10px] text-subtle">Architecture</span>
                    <span className="block text-xs font-semibold text-fg">REST & Cloud APIs</span>
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Capability strip */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 1 }}
          className="mt-16 grid grid-cols-1 overflow-hidden rounded-3xl border border-line bg-surface/80 shadow-card backdrop-blur-md sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
        >
          {DEVELOPER_INFO.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`group relative p-5 transition-colors duration-300 hover:bg-surface-2 sm:p-6 ${
                i > 0 ? 'border-t border-line sm:border-t-0' : ''
              } ${i % 2 === 1 ? 'sm:border-l' : ''} ${i >= 2 ? 'sm:border-t lg:border-t-0' : ''} ${
                i > 0 ? 'lg:border-l' : ''
              } border-line`}
            >
              <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">
                <span className="font-semibold text-accent-ink">0{i + 1}</span>
                {stat.label}
              </dt>
              <dd className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight text-fg">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
};
