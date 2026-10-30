import { profile } from '../data/portfolio';
import FlowingWaves from './FlowingWaves';
import HeroGraph from './HeroGraph';
import { ArrowDownIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from './icons';

const initials = profile.name
  .split(' ')
  .map((n) => n[0])
  .join('');

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-waves">
        <FlowingWaves />
      </div>

      <div className="container grid hero-grid">
        <div className="span-7">
          <p className="eyebrow hero-intro">M2 Data, Knowledge &amp; Hybrid AI · Université Paris-Saclay</p>
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

          <div className="availability">
            <p className="availability-note">
              <span className="status-dot" aria-hidden />
              Seeking a 6-month final-year internship · March 2027
            </p>
            <p className="availability-interests">{profile.internshipInterests}</p>
          </div>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View projects <ArrowDownIcon width={16} height={16} />
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-outline">
              Email me
            </a>
          </div>
        </div>

        <aside className="profile-panel span-5">
          <HeroGraph initials={initials} />
          <div className="profile-panel-heading">
            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 'var(--text-lg)' }}>
              At a glance
            </div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>{profile.location}</div>
          </div>
          {/* The graph above already names the focus areas. */}
          <dl className="facts">
            {profile.facts.filter((f) => f.label !== 'Open to' && f.label !== 'Focus').map((f) => (
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
