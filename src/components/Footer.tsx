import React from 'react';
import { ArrowUp, ArrowUpRight, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { Reveal } from './ui/Reveal';
import { scrollToId } from './ui/motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { href: DEVELOPER_INFO.socials.github, label: 'GitHub', Icon: Github, external: true },
  { href: DEVELOPER_INFO.socials.linkedin, label: 'LinkedIn', Icon: Linkedin, external: true },
  { href: DEVELOPER_INFO.socials.twitter, label: 'Twitter', Icon: Twitter, external: true },
  { href: `mailto:${DEVELOPER_INFO.email}`, label: 'Email', Icon: Mail, external: false },
];

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-alt">
      <div className="container-x pb-10 pt-16 lg:pt-24">
        {/* Closing call-to-action */}
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 border-b border-line pb-14 lg:flex-row lg:items-end">
            <div>
              <div className="eyebrow">Have a project in mind?</div>
              <a
                href={`mailto:${DEVELOPER_INFO.email}`}
                className="group mt-4 flex w-fit items-center gap-3 font-display text-[2rem] font-bold leading-none tracking-[-0.04em] text-fg transition-colors hover:text-accent-ink sm:text-5xl lg:text-6xl"
              >
                Let's talk.
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--btn)] text-[var(--btn-fg)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 sm:h-14 sm:w-14">
                  <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
              </a>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">{DEVELOPER_INFO.positioning}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-12">
          {/* Identity */}
          <div className="space-y-4 md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-fg font-display text-[15px] font-bold text-bg">
                MQ
                <span className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <div>
                <div className="font-display text-[15px] font-semibold tracking-tight text-fg">{DEVELOPER_INFO.fullName}</div>
                <div className="font-mono text-[11px] text-subtle">{DEVELOPER_INFO.title}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
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

          {/* Navigation */}
          <nav aria-label="Footer" className="md:col-span-4">
            <div className="eyebrow text-[11px]">Portfolio Navigation</div>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(link.href.slice(1));
                    }}
                    className="link-u text-muted hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Back to top */}
          <div className="flex flex-col items-start gap-4 md:col-span-3 md:items-end">
            <button type="button" onClick={scrollToTop} className="btn btn-secondary btn-sm group">
              Back to Top
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
            <p className="font-mono text-[11px] leading-relaxed text-subtle md:text-right">
              Designed & Engineered with React, TypeScript, Three.js & Tailwind CSS.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-subtle sm:flex-row">
          <div>&copy; 2026 {DEVELOPER_INFO.fullName}. All rights reserved.</div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span>Clean Code</span>
            <span className="text-accent">•</span>
            <span>High Performance</span>
            <span className="text-accent">•</span>
            <span>Production Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
