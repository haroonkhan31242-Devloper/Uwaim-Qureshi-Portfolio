import { Github, Linkedin, Mail } from 'lucide-react';
import { DEVELOPER_INFO } from '../../data/portfolioData';

export interface ProfileLink {
  id: 'email' | 'linkedin' | 'github';
  label: string;
  handle: string;
  href: string;
  Icon: typeof Mail;
  external: boolean;
}

/** Official contact profiles, shared by the hero, contact section and footer. */
export const PROFILES: ProfileLink[] = [
  {
    id: 'email',
    label: 'Email',
    handle: DEVELOPER_INFO.email,
    href: `mailto:${DEVELOPER_INFO.email}`,
    Icon: Mail,
    external: false,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/muhammad-uwaim-qureshi',
    href: DEVELOPER_INFO.socials.linkedin,
    Icon: Linkedin,
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: 'github.com/uwaim45264',
    href: DEVELOPER_INFO.socials.github,
    Icon: Github,
    external: true,
  },
];

/** Props that open external profiles in a new tab without leaking the opener. */
export const linkTarget = (external: boolean) =>
  external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

/** Accessible name that also warns screen-reader users about a new tab. */
export const profileLabel = ({ label, handle, external }: ProfileLink) =>
  `${label}: ${handle}${external ? ' (opens in a new tab)' : ''}`;
