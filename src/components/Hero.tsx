import { profile } from '../data/portfolio';
import FlowingWaves from './FlowingWaves';
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
          <h1 style={{ margin: '0 0 0.6rem' }}>{profile.name}</h1>
          <p className="hero-role">{profile.title}</p>

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

          <p style={{ fontSize: 'var(--text-lg)', maxWidth: '540px', marginBottom: '2rem' }}>
            {profile.tagline}
          </p>

          <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn btn-primary">
              Get in touch
            </a>
            <a href="#projects" className="btn btn-outline">
              View projects
            </a>
          </div>
        </div>

        <aside className="card span-5" style={{ padding: '2rem' }}>
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
            {profile.facts.map((f) => (
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
