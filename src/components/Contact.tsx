import { useState } from 'react';
import { profile } from '../data/portfolio';
import SectionTitle from './SectionTitle';
import { CheckIcon, CopyIcon, DownloadIcon, EnvelopeIcon, GitHubIcon, LinkedInIcon } from './icons';

interface SocialProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

function SocialLink({ href, label, icon }: SocialProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="me noopener noreferrer"
      aria-label={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.65rem',
        padding: '0.85rem 1.5rem',
        border: '1px solid var(--color-border-strong)',
        borderRadius: '999px',
        background: 'var(--color-surface)',
        color: 'var(--color-text)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        fontWeight: 500,
        transition: 'all 220ms ease',
        borderBottom: '1px solid var(--color-border-strong)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-primary)';
        e.currentTarget.style.color = 'var(--color-primary)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-strong)';
        e.currentTarget.style.color = 'var(--color-text)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <span
        style={{
          width: '18px',
          height: '18px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </span>
      {label}
    </a>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <SectionTitle
          eyebrow="Contact"
          title="Get in Touch"
          subtitle={`Open to a ${profile.availability}. Based in ${profile.location}.`}
          icon={<EnvelopeIcon />}
        />

        <div className="email-row">
          <a href={`mailto:${profile.email}`} className="email-address">
            {profile.email}
          </a>
          <button type="button" className="btn btn-outline" onClick={copyEmail}>
            {copied ? <CheckIcon width={16} height={16} /> : <CopyIcon width={16} height={16} />}
            {copied ? 'Copied' : 'Copy email'}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? 'Email address copied to clipboard' : ''}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <a href={profile.cv} download className="btn btn-primary">
            <DownloadIcon width={16} height={16} />
            Download CV (PDF)
          </a>
          <SocialLink
            href={profile.linkedin}
            label="LinkedIn"
            icon={<LinkedInIcon width={18} height={18} />}
          />
          <SocialLink
            href={profile.github}
            label={`${profile.name} on GitHub`}
            icon={<GitHubIcon width={18} height={18} />}
          />
        </div>
      </div>
    </section>
  );
}
