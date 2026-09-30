import { profile } from '../data/portfolio';
import SectionTitle from './SectionTitle';
import { EnvelopeIcon, GitHubIcon, LinkedInIcon } from './icons';

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
        fontSize: '0.9rem',
        fontWeight: 500,
        letterSpacing: '0.02em',
        transition: 'all 220ms ease',
        borderBottom: '1px solid var(--color-border-strong)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-accent)';
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
  return (
    <section id="contact">
      <div className="container">
        <SectionTitle
          eyebrow="Correspondence"
          title="Get in Touch"
          subtitle="Always happy to connect and discuss new opportunities"
          icon={<EnvelopeIcon />}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
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
