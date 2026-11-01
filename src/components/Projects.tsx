import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, ExternalLink, Eye, Github, Globe, Layers, Monitor, Server, Smartphone } from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/portfolioData';
import { Accent, SectionHeader } from './ui/SectionHeader';
import { Reveal } from './ui/Reveal';
import { Modal } from './ui/Modal';
import { EASE_OUT, SPRING, scrollToId } from './ui/motion';

type Category = 'all' | ProjectItem['category'];

const tabs: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'mobile', label: 'Flutter & Mobile' },
  { id: 'web', label: 'Web Applications' },
  { id: 'desktop', label: 'Desktop Systems' },
  { id: 'backend', label: 'Backend & APIs' },
];

const CATEGORY_ICON: Record<string, typeof Layers> = { mobile: Smartphone, web: Globe, desktop: Monitor, backend: Server };

const CategoryIcon: React.FC<{ category: string; className?: string }> = ({ category, className = 'h-3.5 w-3.5' }) => {
  const Icon = CATEGORY_ICON[category] ?? Layers;
  return <Icon className={className} />;
};

/** "AeroPulse — Cross-Platform Fleet…" → name + subtitle for a stronger typographic hierarchy */
const splitTitle = (title: string) => {
  const [name, ...rest] = title.split(' — ');
  return { name, subtitle: rest.join(' — ') };
};

/** Abstract product mockup drawn per category, tinted with the project's accent gradient. */
const ProjectVisual: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const isMobile = project.category === 'mobile';
  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
      <div className="bg-dots absolute inset-0 opacity-70" />
      <div
        className={`absolute -right-16 -top-20 h-64 w-64 rounded-full bg-gradient-to-br opacity-35 blur-3xl transition-opacity duration-500 group-hover:opacity-55 dark:opacity-30 ${project.accentColor}`}
      />

      <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-line bg-surface/90 px-2.5 py-1 font-mono text-[10px] capitalize text-muted backdrop-blur">
        <CategoryIcon category={project.category} className="h-3 w-3 text-accent-ink" />
        {project.category}
      </div>

      {isMobile ? (
        <div className="absolute inset-x-0 bottom-0 flex justify-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2">
          <div className="h-[82%] w-[34%] translate-y-[18%] rounded-t-[1.4rem] border border-line-strong bg-surface p-2 shadow-float">
            <div className="mx-auto h-1 w-8 rounded-full bg-line-strong" />
            <div className={`mt-2.5 h-12 rounded-lg bg-gradient-to-br opacity-80 ${project.accentColor}`} />
            <div className="mt-2 space-y-1.5">
              <div className="h-1.5 w-3/4 rounded bg-line-strong" />
              <div className="h-1.5 w-1/2 rounded bg-line" />
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                <div className="h-8 rounded-md bg-surface-2" />
                <div className="h-8 rounded-md bg-surface-2" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-x-[8%] bottom-0 top-[22%] translate-y-[6%] rounded-t-xl border border-line-strong bg-surface shadow-float transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0">
          <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            <span className="ml-2 truncate font-mono text-[9px] text-subtle">{project.id}.app</span>
          </div>
          <div className="grid grid-cols-[28%_1fr] gap-2 p-2.5">
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded bg-line-strong" />
              <div className="h-1.5 w-3/4 rounded bg-line" />
              <div className="h-1.5 w-5/6 rounded bg-line" />
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-7 rounded-md border border-line bg-surface-2 p-1">
                    <div className={`h-1 w-1/2 rounded bg-gradient-to-r ${project.accentColor}`} />
                  </div>
                ))}
              </div>
              <div className={`h-10 rounded-md bg-gradient-to-r opacity-25 ${project.accentColor}`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Category>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = activeTab === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="section-y relative overflow-hidden border-t border-line">
      <div className="container-x">
        <SectionHeader
          index="04"
          eyebrow="Portfolio Showcase"
          title={
            <>
              Featured systems & <Accent>engineered applications.</Accent>
            </>
          }
          description="Real-world digital architectures engineered with Flutter, React, TypeScript, and scalable backend services. Built with attention to performance, resilience, and user experience."
        />

        <Reveal>
          <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
            <div
              role="group"
              aria-label="Filter projects by category"
              className="inline-flex w-max gap-1 rounded-full border border-line bg-surface p-1"
            >
              {tabs.map((tab) => {
                const active = activeTab === tab.id;
                const count = tab.id === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.category === tab.id).length;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    aria-pressed={active}
                    className={`relative flex min-h-10 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${
                      active ? 'text-[var(--btn-fg)]' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {active && (
                      <motion.span layoutId="projects-filter" className="absolute inset-0 rounded-full bg-[var(--btn)]" transition={SPRING} />
                    )}
                    <span className="relative">{tab.label}</span>
                    <span className={`relative font-mono text-[10px] ${active ? 'opacity-70' : 'text-subtle'}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <motion.ul layout className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => {
              const { name, subtitle } = splitTitle(project.title);
              return (
                <motion.li
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6, ease: EASE_OUT, delay: (i % 3) * 0.06 }}
                >
                  <article className="card card-interactive group flex h-full flex-col overflow-hidden">
                    <div className="relative">
                      <ProjectVisual project={project} />
                      {/* Quick preview — shows on hover and on keyboard focus */}
                      <div className="absolute inset-0 flex items-center justify-center bg-[color-mix(in_srgb,var(--surface)_55%,transparent)] opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="btn btn-primary btn-sm translate-y-2 transition-transform duration-300 group-hover:translate-y-0"
                          aria-haspopup="dialog"
                        >
                          <Eye className="h-4 w-4" />
                          Interactive Walkthrough
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent-ink">{project.badge}</span>
                      <h3 className="mt-2.5 font-display text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] text-fg">
                        {name}
                      </h3>
                      {subtitle && <p className="mt-1 text-[13px] font-medium text-fg/80">{subtitle}</p>}
                      <p className="mt-3 text-[13px] leading-relaxed text-muted">{project.shortDesc}</p>

                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 4).map((tech) => (
                          <li key={tech} className="chip">
                            {tech}
                          </li>
                        ))}
                        {project.stack.length > 4 && (
                          <li className="chip border-dashed bg-transparent">+{project.stack.length - 4}</li>
                        )}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between border-t border-line px-6 py-4 text-[13px]">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 font-semibold text-fg transition-colors hover:text-accent-ink"
                        aria-haspopup="dialog"
                      >
                        <span className="link-u">Live Preview</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                      <a
                        href={project.githubUrl || 'https://github.com'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-fg"
                      >
                        <Github className="h-3.5 w-3.5" />
                        Source Code
                      </a>
                    </div>
                  </article>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>

      <Modal open={!!selectedProject} onClose={() => setSelectedProject(null)} labelledBy="project-modal-title" size="lg">
        {selectedProject && (
          <div>
            <ProjectVisual project={selectedProject} />
            <div className="p-6 sm:p-9">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-ink">
                <CategoryIcon category={selectedProject.category} />
                {selectedProject.badge}
              </div>
              <h3 id="project-modal-title" className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl">
                {selectedProject.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{selectedProject.fullDesc}</p>

              <div className="mt-7 overflow-hidden rounded-2xl border border-line">
                <div className="flex items-center justify-between border-b border-line bg-surface-2 px-4 py-2.5 font-mono text-[11px] text-muted">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-mint" />
                    Active Live Simulation Sandbox
                  </span>
                  <span>v1.0.0-stable</span>
                </div>

                <div className="space-y-6 p-5">
                  <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <div className="eyebrow text-[11px]">Architecture Highlights</div>
                      <div className="mt-1.5 text-sm font-medium text-fg">{selectedProject.architectureHighlight}</div>
                    </div>
                    <span className="shrink-0 rounded-lg border border-[color-mix(in_srgb,var(--mint)_30%,transparent)] bg-mint-soft px-3 py-1.5 font-mono text-[11px] text-mint">
                      Production Verified
                    </span>
                  </div>

                  <div>
                    <div className="eyebrow text-[11px]">Engineering Features & Capabilities</div>
                    <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {selectedProject.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-[13px] text-fg">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="eyebrow text-[11px]">Complete Technology Suite</div>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {selectedProject.stack.map((tech) => (
                        <li key={tech} className="chip text-xs">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href={selectedProject.githubUrl || 'https://github.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-fg"
                >
                  <Github className="h-4 w-4" />
                  Inspect Repository on GitHub
                </a>
                <div className="flex flex-col-reverse gap-2 sm:flex-row">
                  <button type="button" onClick={() => setSelectedProject(null)} className="btn btn-ghost">
                    Close
                  </button>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedProject(null);
                      window.setTimeout(() => scrollToId('contact'), 260);
                    }}
                    className="btn btn-primary"
                  >
                    Discuss Similar Project
                    <ArrowUpRight className="btn-arrow-up h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
