import { profile } from '../data/portfolio';
import { GitHubIcon, LinkedInIcon } from './icons';
import CopyEmailButton from './CopyEmailButton';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '1.5rem 0',
        textAlign: 'center',
        color: 'var(--color-text-muted)',
        fontSize: 'var(--text-sm)',
      }}
    >
      <div className="container">
        <div
          aria-hidden
          style={{
            color: 'var(--color-accent)',
            marginBottom: '1rem',
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-wide)',
          }}
        >
          ❖
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {profile.name}
        </div>
        <p style={{ margin: '0.5rem 0 0', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
          Open to a {profile.availability}.
        </p>
        <div className="footer-contact">
          <a href={`mailto:${profile.email}`}>Email me</a>
          <CopyEmailButton />
          <a href={profile.cv} download>
            CV (PDF)
          </a>
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
        <div style={{ marginTop: '0.75rem', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
          Built with React &amp; Vite · Hosted on GitHub Pages
        </div>
      </div>
    </footer>
  );
}
