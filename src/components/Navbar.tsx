import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { ThemeToggle } from './ui/ThemeToggle';
import { EASE_OUT, SPRING, scrollToId } from './ui/motion';

interface NavbarProps {
  activeSection: string;
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu: close on Escape, close when resizing up to desktop, lock page scroll while open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false);
    const mq = window.matchMedia('(min-width: 1024px)');
    const onMq = () => mq.matches && setMobileMenuOpen(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    // Let the scroll lock release before scrolling
    requestAnimationFrame(() => scrollToId(href.slice(1)));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Reading progress */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-accent"
        style={{ scaleX: progress }}
      />

      <div
        className={`transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled ? 'pt-2.5 sm:pt-3' : 'pt-4 sm:pt-5'
        }`}
      >
        <div className="container-x">
          <div
            className={`flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 transition-[background-color,border-color,box-shadow] duration-500 sm:px-4 ${
              isScrolled || mobileMenuOpen
                ? 'border-line bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] shadow-card backdrop-blur-xl'
                : 'border-transparent bg-transparent'
            }`}
          >
            {/* Brand */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="group flex min-w-0 items-center gap-3"
              aria-label="Back to top"
            >
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-fg font-display text-[15px] font-bold tracking-tight text-bg transition-transform duration-300 group-hover:-rotate-6">
                MQ
                <span className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-[14px] font-semibold leading-tight tracking-tight text-fg sm:text-base">
                  <span className="sm:hidden">{DEVELOPER_INFO.shortName}</span>
                  <span className="hidden sm:inline">{DEVELOPER_INFO.fullName}</span>
                </span>
                <span className="hidden font-mono text-[11px] text-subtle sm:block">Software Engineer · Full-Stack</span>
              </span>
            </a>

            {/* Desktop links */}
            <nav aria-label="Primary" className="hidden items-center lg:flex">
              <ul className="flex items-center gap-0.5">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`relative block rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 ${
                          isActive ? 'text-fg' : 'text-muted hover:text-fg'
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-0 rounded-full bg-surface-2 ring-1 ring-line"
                            transition={SPRING}
                          />
                        )}
                        <span className="relative">{link.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              <div className="hidden sm:block">
                <ThemeToggle id="desktop" />
              </div>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn btn-primary btn-sm hidden xl:inline-flex"
              >
                Let's Work Together
                <ArrowUpRight className="btn-arrow-up h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="icon-btn lg:hidden"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mobileMenuOpen ? 'close' : 'open'}
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                id="mobile-menu"
                aria-label="Mobile"
                className="mt-2 overflow-hidden rounded-2xl border border-line bg-surface shadow-float lg:hidden"
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                style={{ transformOrigin: 'top center' }}
              >
                <motion.ul
                  className="max-h-[calc(100dvh-7rem)] overflow-y-auto p-2"
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } } }}
                >
                  {navLinks.map((link, i) => {
                    const isActive = activeSection === link.href.slice(1);
                    return (
                      <motion.li
                        key={link.label}
                        variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                        transition={{ duration: 0.3, ease: EASE_OUT }}
                      >
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          aria-current={isActive ? 'true' : undefined}
                          className={`flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                            isActive ? 'bg-accent-soft text-accent-ink' : 'text-fg hover:bg-surface-2'
                          }`}
                        >
                          <span>{link.label}</span>
                          <span className="font-mono text-[11px] text-subtle">0{i + 1}</span>
                        </a>
                      </motion.li>
                    );
                  })}
                </motion.ul>
                <div className="flex items-center justify-between gap-3 border-t border-line p-3">
                  <ThemeToggle id="mobile" className="sm:hidden" />
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, '#contact')}
                    className="btn btn-primary btn-sm flex-1 sm:flex-none"
                  >
                    Let's Work Together
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tap-outside area for the mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 -z-10 lg:hidden" onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
      )}
    </header>
  );
};
