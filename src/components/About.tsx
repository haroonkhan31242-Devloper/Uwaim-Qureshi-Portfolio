import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CheckCircle, Compass, Cpu, GitBranch, Layers, ShieldCheck, Zap } from 'lucide-react';
import { DEVELOPER_INFO, ENGINEERING_PHILOSOPHY } from '../data/portfolioData';
import { Accent, SectionHeader } from './ui/SectionHeader';
import { Reveal } from './ui/Reveal';
import { EASE_OUT, SPRING, scrollToId } from './ui/motion';

type TabId = 'philosophy' | 'approach' | 'interests';

const approachSteps = [
  {
    title: 'First-Principles Decomposition',
    desc: 'Breaking down complex system requirements into modular, isolated, and verifiable sub-problems before writing a single line of code.',
  },
  {
    title: 'Clean Layered Architecture',
    desc: 'Strictly separating domain business logic from presentation widgets and external data sources (Bloc / MVVM / Repository patterns).',
  },
  {
    title: 'Edge-Case Resilience',
    desc: 'Anticipating flaky network connectivity, intermittent API states, offline data synchronization, and device hardware variance.',
  },
  {
    title: 'Continuous Refinement',
    desc: 'Profiling frame rates, reducing widget re-renders, optimizing database queries, and keeping bundle sizes minimal.',
  },
];

const technicalInterests = [
  {
    domain: 'Cross-Platform Ecosystems',
    summary:
      'Exploring modern multi-platform runtimes (Flutter for mobile and desktop, React for modern web) to maximize code reuse without sacrificing native feel.',
  },
  {
    domain: 'Distributed APIs & System Scalability',
    summary:
      'Designing predictable RESTful microservices, asynchronous message queues, database indexing, and secure token lifecycle management.',
  },
  {
    domain: 'Offline-First Mobile Architecture',
    summary:
      'Engineering local-first transactional stores with SQLite, Hive, and Isar, syncing seamlessly with central cloud repositories.',
  },
  {
    domain: 'High-Fidelity Interactive UIs',
    summary:
      'Crafting fluid, responsive micro-interactions, hardware-accelerated animations, and dark cinematic design systems.',
  },
];

const tabs: { id: TabId; label: string; short: string; Icon: typeof Compass }[] = [
  { id: 'philosophy', label: 'Development Philosophy', short: 'Philosophy', Icon: Compass },
  { id: 'approach', label: 'Problem-Solving Approach', short: 'Approach', Icon: Layers },
  { id: 'interests', label: 'Technical Focus', short: 'Focus', Icon: Cpu },
];

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('philosophy');

  const onTabKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (idx + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
    setActiveTab(tabs[next].id);
    document.getElementById(`about-tab-${tabs[next].id}`)?.focus();
  };

  return (
    <section id="about" className="section-y relative overflow-hidden border-t border-line bg-bg-alt">
      <div className="container-x">
        <SectionHeader
          index="01"
          eyebrow="About the Engineer"
          title={
            <>
              Engineering rigor meets <Accent>product thinking.</Accent>
            </>
          }
          description={
            <>
              {DEVELOPER_INFO.positioning} My focus is on writing maintainable, high-performance code across mobile, web,
              desktop, and backend environments.
            </>
          }
        />

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Portrait + manifest */}
          <Reveal className="space-y-4 lg:col-span-5 lg:sticky lg:top-28">
            <div className="card overflow-hidden p-3">
              <div className="group relative aspect-[5/4] overflow-hidden rounded-[0.9rem] bg-surface-2 sm:aspect-[4/3] lg:aspect-[4/4.2]">
                <img
                  src={DEVELOPER_INFO.portraitUrl}
                  alt={DEVELOPER_INFO.fullName}
                  width={1081}
                  height={1455}
                  className="h-full w-full object-cover object-[50%_18%] transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 text-white">
                  <div className="font-display text-lg font-semibold tracking-tight">{DEVELOPER_INFO.fullName}</div>
                  <div className="font-mono text-xs text-white/70">Software Engineer | Full-Stack Developer</div>
                </div>
              </div>

              {/* Code signature — stays dark in both themes, like an editor */}
              <pre className="mt-3 overflow-x-auto rounded-[0.9rem] bg-[var(--code-bg)] p-4 font-mono text-[12px] leading-relaxed text-[#c9cdd6]">
                <code>
                  <span className="text-[#6b7280]">// engineer_manifest.ts</span>
                  {'\n'}
                  <span className="text-[#ff8c5f]">const</span> developer = {'{'}
                  {'\n  '}name: <span className="text-[#4ade9c]">"{DEVELOPER_INFO.fullName}"</span>,
                  {'\n  '}mindset: <span className="text-[#a5b0ff]">"Scalable, clean, production-ready"</span>,
                  {'\n  '}focus: [<span className="text-[#ffc56b]">"Flutter"</span>,{' '}
                  <span className="text-[#ffc56b]">"Full-Stack"</span>, <span className="text-[#ffc56b]">"APIs"</span>]
                  {'\n'}
                  {'};'}
                </code>
              </pre>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { Icon: ShieldCheck, title: 'Reliability', text: 'Tested & defensive code', tone: 'bg-mint-soft text-mint' },
                { Icon: Zap, title: 'Efficiency', text: 'Smooth 60fps & low latency', tone: 'bg-accent-soft text-accent-ink' },
              ].map(({ Icon, title, text, tone }) => (
                <div key={title} className="card flex items-start gap-3 p-4">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tone}`}>
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-fg">{title}</div>
                    <div className="mt-0.5 text-xs leading-snug text-muted">{text}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Tabs */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div role="tablist" aria-label="About details" className="grid grid-cols-3 gap-1 rounded-2xl border border-line bg-surface p-1.5">
              {tabs.map(({ id, label, short, Icon }, idx) => {
                const active = activeTab === id;
                return (
                  <button
                    key={id}
                    id={`about-tab-${id}`}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls={`about-panel-${id}`}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setActiveTab(id)}
                    onKeyDown={(e) => onTabKey(e, idx)}
                    className={`relative flex min-h-11 items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-[13px] font-semibold transition-colors duration-200 ${
                      active ? 'text-[var(--btn-fg)]' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {active && (
                      <motion.span layoutId="about-tab" className="absolute inset-0 rounded-xl bg-[var(--btn)]" transition={SPRING} />
                    )}
                    <Icon className="relative hidden h-4 w-4 sm:block" />
                    <span className="relative sm:hidden">{short}</span>
                    <span className="relative hidden sm:inline lg:hidden xl:inline">{label}</span>
                    <span className="relative hidden lg:inline xl:hidden">{short}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative mt-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeTab}
                  id={`about-panel-${activeTab}`}
                  role="tabpanel"
                  aria-labelledby={`about-tab-${activeTab}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  {activeTab === 'philosophy' && (
                    <>
                      <p className="text-[15px] leading-relaxed text-muted">
                        I believe that true engineering excellence lies at the intersection of architectural discipline and
                        pragmatic execution. Rather than building fragile prototypes, I construct foundational codebases
                        designed for longevity.
                      </p>
                      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {ENGINEERING_PHILOSOPHY.map((item, idx) => (
                          <div key={item.title} className="card card-interactive p-5">
                            <span className="font-mono text-xs font-semibold text-accent-ink">0{idx + 1}</span>
                            <h3 className="mt-3 font-display text-[17px] font-semibold leading-snug tracking-tight text-fg">
                              {item.title}
                            </h3>
                            <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {activeTab === 'approach' && (
                    <>
                      <p className="text-[15px] leading-relaxed text-muted">
                        Software development is not about jumping straight into syntax; it is about deconstructing
                        constraints, understanding human requirements, and structuring reliable data flows.
                      </p>
                      <ol className="mt-6 space-y-3">
                        {approachSteps.map((step, idx) => (
                          <li key={step.title} className="card flex items-start gap-4 p-5">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cobalt-soft text-cobalt">
                              <CheckCircle className="h-[18px] w-[18px]" />
                            </span>
                            <div>
                              <h3 className="flex items-baseline gap-2 font-display text-[17px] font-semibold tracking-tight text-fg">
                                <span className="font-mono text-xs text-subtle">0{idx + 1}</span>
                                {step.title}
                              </h3>
                              <p className="mt-1 text-[13px] leading-relaxed text-muted">{step.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </>
                  )}

                  {activeTab === 'interests' && (
                    <>
                      <p className="text-[15px] leading-relaxed text-muted">
                        Software engineering evolves continuously. Here are the core technical paradigms and architectural
                        challenges I actively immerse myself in:
                      </p>
                      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {technicalInterests.map((interest) => (
                          <div key={interest.domain} className="card card-interactive p-5">
                            <GitBranch className="h-[18px] w-[18px] text-accent-ink" />
                            <h3 className="mt-3 font-display text-[17px] font-semibold leading-snug tracking-tight text-fg">
                              {interest.domain}
                            </h3>
                            <p className="mt-2 text-[13px] leading-relaxed text-muted">{interest.summary}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Consultation CTA */}
            <div className="relative mt-6 flex flex-col items-start justify-between gap-4 overflow-hidden rounded-2xl border border-accent-line bg-accent-soft p-5 sm:flex-row sm:items-center">
              <div>
                <div className="font-display text-base font-semibold tracking-tight text-fg">
                  Need a customized engineering approach?
                </div>
                <div className="mt-1 text-[13px] text-muted">
                  Let's discuss architecture requirements for your upcoming digital project.
                </div>
              </div>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId('contact');
                }}
                className="btn btn-primary btn-sm shrink-0"
              >
                Initiate Discussion
                <ArrowRight className="btn-arrow h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
