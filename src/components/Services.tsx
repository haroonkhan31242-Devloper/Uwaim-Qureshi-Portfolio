import React, { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Globe,
  Layers,
  Monitor,
  Palette,
  Server,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/portfolioData';
import { Accent, SectionHeader } from './ui/SectionHeader';
import { RevealGroup, RevealItem } from './ui/Reveal';
import { SpotlightCard } from './ui/SpotlightCard';
import { Modal } from './ui/Modal';
import { scrollToId } from './ui/motion';

const ICONS: Record<string, typeof Cpu> = { Smartphone, Globe, Monitor, Server, Cpu, Palette, Layers };

const ServiceIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'h-5 w-5' }) => {
  const Icon = ICONS[name] ?? Cpu;
  return <Icon className={className} strokeWidth={1.8} />;
};

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="section-y relative overflow-hidden border-t border-line">
      <div className="container-x">
        <SectionHeader
          index="02"
          eyebrow="Specialized Engineering Services"
          title={
            <>
              Comprehensive solutions across <Accent>every screen & layer.</Accent>
            </>
          }
          description="From cross-platform Flutter mobile applications to high-throughput RESTful backends and desktop workstation software, I deliver complete end-to-end digital solutions."
        />

        <RevealGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {SERVICES.map((service, index) => {
            const featured = index === 0;
            // Widening the last card closes the bento grid on 3 columns (2 + 1 / 3 / 1 + 2)
            const closing = index === SERVICES.length - 1 && SERVICES.length % 3 === 1;
            return (
              <RevealItem
                key={service.id}
                className={featured ? 'md:col-span-2' : closing ? 'lg:col-span-2' : ''}
              >
                <SpotlightCard
                  className={`group flex h-full flex-col overflow-hidden p-6 sm:p-7 ${featured ? 'lg:p-9' : ''}`}
                >
                  {featured && (
                    <div
                      className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-80 blur-3xl"
                      style={{ background: 'radial-gradient(circle, var(--glow), transparent 70%)' }}
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex items-start justify-between">
                    <span
                      className={`flex items-center justify-center rounded-2xl border transition-[transform,background-color,color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 ${
                        featured
                          ? 'h-14 w-14 border-transparent bg-[var(--btn)] text-[var(--btn-fg)]'
                          : 'h-12 w-12 border-line bg-surface-2 text-fg group-hover:border-accent-line group-hover:bg-accent-soft group-hover:text-accent-ink'
                      }`}
                    >
                      <ServiceIcon name={service.iconName} className={featured ? 'h-6 w-6' : 'h-5 w-5'} />
                    </span>
                    <span className="font-mono text-xs text-subtle">0{index + 1}</span>
                  </div>

                  <h3
                    className={`relative mt-6 font-display font-semibold leading-tight tracking-[-0.02em] text-fg ${
                      featured ? 'text-2xl sm:text-[1.75rem] lg:max-w-lg' : 'text-xl'
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`relative mt-3 leading-relaxed text-muted ${
                      featured ? 'text-[15px] lg:max-w-xl' : 'text-sm'
                    }`}
                  >
                    {service.shortDesc}
                  </p>

                  <ul className="relative mt-5 flex flex-wrap gap-1.5">
                    {service.tags.slice(0, featured ? 6 : 4).map((tag) => (
                      <li key={tag} className="chip">
                        {tag}
                      </li>
                    ))}
                    {service.tags.length > (featured ? 6 : 4) && (
                      <li className="chip border-dashed bg-transparent">
                        +{service.tags.length - (featured ? 6 : 4)} more
                      </li>
                    )}
                  </ul>

                  <div className="relative mt-auto pt-7">
                    <button
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="group/btn inline-flex items-center gap-1.5 text-[13px] font-semibold text-fg transition-colors hover:text-accent-ink"
                      aria-haspopup="dialog"
                    >
                      <span className="link-u">View Specifications & Architecture</span>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-line transition-[transform,border-color,background-color] duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:border-accent-line group-hover/btn:bg-accent-soft">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  </div>
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>

      <Modal open={!!selectedService} onClose={() => setSelectedService(null)} labelledBy="service-modal-title">
        {selectedService && (
          <div className="p-6 sm:p-9">
            <div className="flex items-center gap-4 pr-12">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-ink">
                <ServiceIcon name={selectedService.iconName} />
              </span>
              <div>
                <span className="eyebrow text-[11px]">Service Specification</span>
                <h3 id="service-modal-title" className="mt-1 font-display text-xl font-semibold leading-tight tracking-tight text-fg sm:text-2xl">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <div className="mt-8 space-y-7">
              <div>
                <h4 className="eyebrow text-[11px]">Scope & Methodology</h4>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{selectedService.fullDesc}</p>
              </div>

              <div className="rounded-2xl border border-line bg-surface-2 p-5">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-cobalt">
                  <ShieldCheck className="h-4 w-4" />
                  Architectural Standard
                </div>
                <p className="mt-2 text-[15px] font-medium text-fg">{selectedService.architecture}</p>
              </div>

              <div>
                <h4 className="eyebrow text-[11px]">Key Deliverables</h4>
                <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {selectedService.deliverables.map((del) => (
                    <li key={del} className="flex items-start gap-2.5 text-sm text-fg">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                      {del}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="eyebrow text-[11px]">Technologies & Tooling</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {selectedService.tags.map((tag) => (
                    <li key={tag} className="chip text-xs">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col-reverse gap-2 border-t border-line pt-6 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => setSelectedService(null)} className="btn btn-ghost">
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedService(null);
                    window.setTimeout(() => scrollToId('contact'), 260);
                  }}
                  className="btn btn-primary"
                >
                  Request This Service
                  <ArrowUpRight className="btn-arrow-up h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
