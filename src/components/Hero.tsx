import { profile } from '../data/portfolio';
import FlowingWaves from './FlowingWaves';
import { GitHubIcon, LinkedInIcon } from './icons';

const initials = profile.name
  .split(' ')
  .map((n) => n[0])
  .join('');

export default function Hero() {
  return (
    <section id="top" className="hero">
      <FlowingWaves />

      <div className="container hero-grid">
        <div>
          <span className="eyebrow">Hello, I'm</span>
          <h1 style={{ margin: '1rem 0 0.6rem', lineHeight: 1.05 }}>{profile.name}</h1>
          <p
            className="gradient-text"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.25rem, 2.4vw, 1.6rem)',
              fontWeight: 500,
              margin: '0 0 1.5rem',
              display: 'inline-block',
            }}
          >
            {profile.title}
          </p>
          <p style={{ fontSize: '1.08rem', maxWidth: '540px', marginBottom: '2.25rem' }}>
            {profile.tagline}
          </p>

          <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-outline">
              Get in Touch
            </a>
            <span style={{ display: 'inline-flex', gap: '0.4rem', marginLeft: '0.4rem' }}>
              {[
                { href: profile.linkedin, label: 'LinkedIn', icon: <LinkedInIcon width={18} height={18} /> },
                { href: profile.github, label: 'GitHub', icon: <GitHubIcon width={18} height={18} /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-soft)',
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </span>
          </div>
        </div>

        <aside className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="monogram" aria-hidden>
              {initials}
            </span>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.1rem' }}>
                At a glance
              </div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>{profile.location}</div>
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
