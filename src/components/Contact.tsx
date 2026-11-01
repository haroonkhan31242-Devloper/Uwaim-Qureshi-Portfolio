import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, CheckCircle2, ChevronDown, Copy, Github, Info, Linkedin, Mail, MapPin, PhoneCall, Send, Twitter } from 'lucide-react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { Accent, SectionHeader } from './ui/SectionHeader';
import { Reveal } from './ui/Reveal';
import { EASE_OUT } from './ui/motion';

type FormField = 'name' | 'email' | 'subject' | 'message';

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  serviceType: 'Flutter & Mobile Development',
  message: '',
};

const SERVICE_OPTIONS = [
  { value: 'Flutter & Mobile Development', label: 'Flutter & Mobile Development' },
  { value: 'Website Development', label: 'Website Development' },
  { value: 'Desktop Application Development', label: 'Desktop Application Development' },
  { value: 'Backend & REST API Integration', label: 'Backend & REST API Integration' },
  { value: 'Custom Software Development', label: 'Custom Software Development' },
  { value: 'UI/UX Implementation', label: 'UI/UX Implementation' },
  { value: 'Software Integration & Digital Solutions', label: 'Software Integration & Solutions' },
];

const socialLinks = [
  { href: DEVELOPER_INFO.socials.github, label: 'GitHub', Icon: Github },
  { href: DEVELOPER_INFO.socials.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: DEVELOPER_INFO.socials.twitter, label: 'Twitter / X', Icon: Twitter },
];

const FieldError: React.FC<{ id: string; message?: string }> = ({ id, message }) => (
  <AnimatePresence initial={false}>
    {message && (
      <motion.p
        id={id}
        role="alert"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden pt-1.5 text-xs font-medium text-danger"
      >
        {message}
      </motion.p>
    )}
  </AnimatePresence>
);

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format (e.g. name@domain.com)';
    }
    if (!formData.subject.trim()) errs.subject = 'Please specify a subject';
    if (!formData.message.trim()) {
      errs.message = 'Please provide brief details about your inquiry or project';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Please provide at least 10 characters describing your inquiry';
    }
    setErrors(errs);
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    const firstInvalid = (['name', 'email', 'subject', 'message'] as FormField[]).find((f) => errs[f]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setIsSubmitting(true);
    // Simulate frontend validation & processing delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const updateField = (field: keyof typeof INITIAL_FORM, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear a field's error as soon as the visitor starts fixing it
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DEVELOPER_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      window.location.href = `mailto:${DEVELOPER_INFO.email}`;
    }
  };

  const fieldProps = (field: FormField) => ({
    id: `contact-${field}`,
    name: field,
    value: formData[field],
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
    className: 'input',
  });

  return (
    <section id="contact" className="section-y relative overflow-hidden border-t border-line">
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[32rem] w-[32rem] rounded-full opacity-60 blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--glow), transparent 65%)' }}
        aria-hidden="true"
      />
      <div className="container-x relative">
        <SectionHeader
          index="06"
          eyebrow="Start a Conversation"
          title={
            <>
              Let's build something <Accent>great together.</Accent>
            </>
          }
          description="Have an ambitious mobile app concept, modern web application, desktop software requirement, or backend architecture to scale? Let's discuss your roadmap."
        />

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Direct channels */}
          <Reveal className="space-y-4 lg:col-span-5">
            <div className="card p-6 sm:p-7">
              <h3 className="font-display text-xl font-semibold tracking-tight text-fg">Direct Contact Channels</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                Reach out directly for freelance contracts, full-time engineering roles, or consulting inquiries.
              </p>

              <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface-2 p-3.5">
                <a href={`mailto:${DEVELOPER_INFO.email}`} className="group flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-ink">
                    <Mail className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">Primary Email</span>
                    <span className="block truncate text-sm font-semibold text-fg group-hover:text-accent-ink">
                      {DEVELOPER_INFO.email}
                    </span>
                  </span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="icon-btn shrink-0"
                  aria-label={copiedEmail ? 'Email copied' : 'Copy email to clipboard'}
                  title="Copy email to clipboard"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copiedEmail ? 'done' : 'copy'}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.15 }}
                      className="flex"
                    >
                      {copiedEmail ? <Check className="h-4 w-4 text-mint" /> : <Copy className="h-4 w-4" />}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
              <div aria-live="polite" className="sr-only">
                {copiedEmail ? 'Email address copied to clipboard' : ''}
              </div>

              <ul className="mt-5 space-y-3 text-[13px] text-muted">
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-cobalt">
                    <MapPin className="h-4 w-4" />
                  </span>
                  {DEVELOPER_INFO.location}
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-mint">
                    <PhoneCall className="h-4 w-4" />
                  </span>
                  Direct WhatsApp / Asynchronous Response within 24h
                </li>
              </ul>

              <div className="mt-6 border-t border-line pt-5">
                <div className="eyebrow text-[11px]">Professional Profiles</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {socialLinks.map(({ href, label, Icon }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-[color-mix(in_srgb,var(--cobalt)_25%,transparent)] bg-cobalt-soft p-4 text-xs leading-relaxed text-muted">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
              <span>
                <strong className="font-semibold text-fg">Frontend Integration Notice:</strong> Client-side validation is
                active. Live production routing connects directly to primary mailbox or dedicated webhook on deployment.
              </span>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="card p-6 shadow-card sm:p-9">
              <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className="py-10 text-center"
                    role="status"
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint-soft text-mint"
                    >
                      <CheckCircle2 className="h-8 w-8" />
                    </motion.div>
                    <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-fg">Message Form Validated!</h3>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                      Thank you, <strong className="text-fg">{formData.name}</strong>. Your inquiry regarding{' '}
                      <em>{formData.serviceType}</em> has passed client-side validation.
                    </p>
                    <p className="mx-auto mt-2 max-w-sm text-xs text-subtle">
                      To send directly via your default email client right now, click the button below:
                    </p>
                    <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
                      <a
                        href={`mailto:${DEVELOPER_INFO.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                          `Hi Eng.Muhammad Uwaim Qureshi,\n\nName: ${formData.name}\nService: ${formData.serviceType}\n\nMessage:\n${formData.message}`
                        )}`}
                        className="btn btn-primary"
                      >
                        <Mail className="h-4 w-4" />
                        Open Email Client
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData(INITIAL_FORM);
                          setErrors({});
                        }}
                        className="btn btn-secondary"
                      >
                        Reset Form
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    noValidate
                  >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="field-label">
                          Your Full Name <span className="text-danger">*</span>
                        </label>
                        <input
                          {...fieldProps('name')}
                          type="text"
                          autoComplete="name"
                          onChange={(e) => updateField('name', e.target.value)}
                          placeholder="e.g. Alex Johnson"
                        />
                        <FieldError id="contact-name-error" message={errors.name} />
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="field-label">
                          Email Address <span className="text-danger">*</span>
                        </label>
                        <input
                          {...fieldProps('email')}
                          type="email"
                          autoComplete="email"
                          inputMode="email"
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder="e.g. alex@company.com"
                        />
                        <FieldError id="contact-email-error" message={errors.email} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-service" className="field-label">
                          Service of Interest
                        </label>
                        <div className="relative">
                          <select
                            id="contact-service"
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={(e) => updateField('serviceType', e.target.value)}
                            className="input appearance-none pr-10"
                          >
                            {SERVICE_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="contact-subject" className="field-label">
                          Subject Line <span className="text-danger">*</span>
                        </label>
                        <input
                          {...fieldProps('subject')}
                          type="text"
                          onChange={(e) => updateField('subject', e.target.value)}
                          placeholder="e.g. Mobile App MVP Architecture"
                        />
                        <FieldError id="contact-subject-error" message={errors.subject} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="field-label">
                        Project Details & Objectives <span className="text-danger">*</span>
                      </label>
                      <textarea
                        {...fieldProps('message')}
                        rows={6}
                        onChange={(e) => updateField('message', e.target.value)}
                        placeholder="Outline your timeline, target platforms (iOS, Android, Web, Desktop), or specific technical requirements..."
                        className="input resize-none"
                      />
                      <FieldError id="contact-message-error" message={errors.message} />
                    </div>

                    <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-subtle">
                        <span className="text-danger">*</span> Required fields
                      </p>
                      <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg w-full sm:w-auto">
                        {isSubmitting ? (
                          <>
                            <span className="animate-spinner h-4 w-4 rounded-full border-2 border-current border-r-transparent" />
                            Validating Data...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="btn-arrow h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
