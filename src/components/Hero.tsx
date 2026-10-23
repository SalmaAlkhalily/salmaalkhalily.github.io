import { profile } from '../data/portfolio';
import FlowingWaves from './FlowingWaves';
import CopyEmailButton from './CopyEmailButton';
import { DownloadIcon, GitHubIcon, LinkedInIcon } from './icons';

const initials = profile.name
  .split(' ')
  .map((n) => n[0])
  .join('');

export default function Hero() {
  return (
    <section id="top" className="hero">
      <FlowingWaves />

      <div className="container grid hero-grid">
        <div className="span-7">
          <p className="eyebrow hero-intro">M2 DKAI student · Université Paris-Saclay</p>
          <h1 style={{ margin: '0 0 0.6rem' }}>{profile.name}</h1>
          <p className="hero-role">{profile.title}</p>
          <p className="hero-description">{profile.tagline}</p>

          <ul className="profile-links">
            <li>
              <a href={profile.github} target="_blank" rel="me noopener noreferrer">
                <GitHubIcon />
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="me noopener noreferrer">
                <LinkedInIcon />
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.cv} download>
                <DownloadIcon />
                CV (PDF)
              </a>
            </li>
          </ul>

          <p className="availability-note">
            <span className="status-dot" aria-hidden />
            Seeking a 6-month final-year internship · 2027
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View projects <span aria-hidden>↓</span>
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-outline">
              Get in touch
            </a>
          </div>
          <div className="hero-email">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <CopyEmailButton compact />
          </div>
        </div>

        <aside className="profile-panel span-5">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="monogram" aria-hidden>
              {initials}
            </span>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 'var(--text-lg)' }}>
                At a glance
              </div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>{profile.location}</div>
            </div>
          </div>
          <dl className="facts">
            {profile.facts.filter((f) => f.label !== 'Open to').map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
