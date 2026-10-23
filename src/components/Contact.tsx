import { profile } from '../data/portfolio';
import SectionTitle from './SectionTitle';
import { DownloadIcon, EnvelopeIcon, GitHubIcon, LinkedInIcon } from './icons';
import CopyEmailButton from './CopyEmailButton';

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
      className="btn btn-outline social-link"
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
          eyebrow="Contact"
          title="Get in touch"
          subtitle={`Open to a ${profile.availability}. Based in ${profile.location}.`}
          icon={<EnvelopeIcon />}
        />

        <div className="email-row">
          <a href={`mailto:${profile.email}`} className="email-address">
            {profile.email}
          </a>
          <CopyEmailButton />
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
