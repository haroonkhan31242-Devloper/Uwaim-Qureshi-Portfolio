import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, FileCheck } from 'lucide-react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { Accent, SectionHeader } from './ui/SectionHeader';
import { Reveal } from './ui/Reveal';
import { EASE_OUT } from './ui/motion';

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [direction, setDirection] = useState(1);

  const currentStepData = PROCESS_STEPS.find((s) => s.stepNumber === activeStep) || PROCESS_STEPS[0];
  const total = PROCESS_STEPS.length;

  const goTo = (step: number) => {
    const next = Math.min(total, Math.max(1, step));
    if (next === activeStep) return;
    setDirection(next > activeStep ? 1 : -1);
    setActiveStep(next);
  };

  const onStepKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = Math.min(total, Math.max(1, activeStep + (e.key === 'ArrowRight' ? 1 : -1)));
    goTo(next);
    document.getElementById(`process-step-${next}`)?.focus();
  };

  return (
    <section id="process" className="section-y relative overflow-hidden border-t border-line bg-bg-alt">
      <div className="container-x">
        <SectionHeader
          index="05"
          eyebrow="Development Lifecycle"
          title={
            <>
              Disciplined engineering <Accent>from concept to delivery.</Accent>
            </>
          }
          description="A battle-tested 6-stage delivery methodology ensuring transparency, predictable milestones, airtight architecture, and zero post-launch surprises."
        />

        <Reveal>
          {/* Step navigator with a progress rail on wide screens */}
          <div className="relative">
            <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-line lg:block" aria-hidden="true">
              <motion.div
                className="h-full origin-left bg-accent"
                animate={{ scaleX: (activeStep - 1) / (total - 1) }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
              />
            </div>

            <div role="tablist" aria-label="Development phases" className="relative grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
              {PROCESS_STEPS.map((step) => {
                const isActive = activeStep === step.stepNumber;
                const isDone = step.stepNumber < activeStep;
                return (
                  <button
                    key={step.stepNumber}
                    id={`process-step-${step.stepNumber}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="process-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => goTo(step.stepNumber)}
                    onKeyDown={onStepKey}
                    className={`group flex items-center gap-3 rounded-2xl border p-3 text-left transition-[background-color,border-color] duration-300 lg:flex-col lg:items-start lg:border-0 lg:bg-transparent lg:p-0 ${
                      isActive ? 'border-accent-line bg-accent-soft' : 'border-line bg-surface hover:border-line-strong'
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold transition-[background-color,border-color,color,transform] duration-300 ${
                        isActive
                          ? 'scale-105 border-transparent bg-[var(--btn)] text-[var(--btn-fg)] shadow-card'
                          : isDone
                            ? 'border-accent-line bg-surface text-accent-ink'
                            : 'border-line bg-surface text-subtle group-hover:border-line-strong group-hover:text-fg'
                      }`}
                    >
                      0{step.stepNumber}
                    </span>
                    <span
                      className={`text-[13px] font-semibold leading-snug transition-colors lg:mt-1 ${
                        isActive ? 'text-fg' : 'text-muted group-hover:text-fg'
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8 lg:mt-12">
          <div id="process-panel" role="tabpanel" aria-labelledby={`process-step-${activeStep}`} className="card overflow-hidden shadow-card">
            <div className="relative min-h-[26rem] p-6 sm:p-10 lg:min-h-[22rem]">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={activeStep}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -24 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12"
                >
                  <div className="space-y-5 lg:col-span-7">
                    <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em]">
                      <span className="rounded-md border border-accent-line bg-accent-soft px-2.5 py-1 text-accent-ink">
                        Phase 0{currentStepData.stepNumber} of 0{total}
                      </span>
                      <span className="text-subtle">Engineering Stage</span>
                    </div>

                    <h3 className="font-display text-3xl font-semibold tracking-[-0.02em] text-fg sm:text-4xl">
                      {currentStepData.title}
                    </h3>
                    <p className="text-base font-medium leading-relaxed text-fg/90 sm:text-[17px]">{currentStepData.summary}</p>
                    <p className="text-sm leading-relaxed text-muted">{currentStepData.details}</p>

                    <div className="pt-1">
                      <div className="eyebrow text-[11px]">Key Tooling & Workflows</div>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {currentStepData.toolsUsed.map((tool) => (
                          <li key={tool} className="chip text-xs">
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-line bg-surface-2 p-5 sm:p-6 lg:col-span-5">
                    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-mint">
                      <FileCheck className="h-4 w-4" />
                      Verifiable Deliverables
                    </div>
                    <ul className="mt-4 space-y-2.5">
                      {currentStepData.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-surface p-3.5">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                          <span className="text-[13px] font-medium text-fg">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs">
                      <span className="font-mono text-subtle">Quality Guarantee</span>
                      <span className="font-semibold text-mint">Strict Sign-off</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-line bg-surface-2/60 px-6 py-4 sm:px-10">
              <button type="button" onClick={() => goTo(activeStep - 1)} disabled={activeStep === 1} className="btn btn-secondary btn-sm">
                <ArrowLeft className="h-4 w-4" />
                Previous Phase
              </button>

              <div className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
                {PROCESS_STEPS.map((s) => (
                  <span
                    key={s.stepNumber}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      s.stepNumber === activeStep ? 'w-6 bg-accent' : 'w-1.5 bg-line-strong'
                    }`}
                  />
                ))}
              </div>

              <button type="button" onClick={() => goTo(activeStep + 1)} disabled={activeStep === total} className="btn btn-primary btn-sm">
                Next Phase
                <ArrowRight className="btn-arrow h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
