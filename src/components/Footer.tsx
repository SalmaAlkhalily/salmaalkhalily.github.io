import { profile } from '../data/portfolio';
import { GitHubIcon, LinkedInIcon } from './icons';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '2.5rem 0',
        textAlign: 'center',
        color: 'var(--color-text-muted)',
        fontSize: '0.85rem',
        letterSpacing: '0.03em',
      }}
    >
      <div className="container">
        <div
          aria-hidden
          style={{
            color: 'var(--color-accent)',
            marginBottom: '1rem',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
          }}
        >
          ❖
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
          © {new Date().getFullYear()} {profile.name}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '0.9rem',
          }}
        >
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            style={{
              color: 'var(--color-text-muted)',
              display: 'inline-flex',
              border: 'none',
            }}
          >
            <LinkedInIcon width={18} height={18} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            style={{
              color: 'var(--color-text-muted)',
              display: 'inline-flex',
              border: 'none',
            }}
          >
            <GitHubIcon width={18} height={18} />
          </a>
        </div>
        <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          Crafted with React &amp; Vite · Hosted on GitHub Pages
        </div>
      </div>
    </footer>
  );
}
