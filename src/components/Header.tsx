import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { profile } from '../data/portfolio';

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [firstName, ...rest] = profile.name.split(' ');

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'saturate(1.4) blur(10px)',
        WebkitBackdropFilter: 'saturate(1.4) blur(10px)',
        background: scrolled ? 'var(--color-header-bg)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        transition: 'all 220ms ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
        }}
      >
        <a
          href="#top"
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 600,
            fontSize: '1.2rem',
            color: 'var(--color-text)',
            border: 'none',
          }}
        >
          <span style={{ fontStyle: 'italic' }}>{firstName}</span>{' '}
          <span style={{ color: 'var(--color-primary)' }}>{rest.join(' ')}</span>
        </a>

        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              style={{
                color: 'var(--color-text-soft)',
                fontSize: '0.88rem',
                fontWeight: 500,
                letterSpacing: '0.03em',
                border: 'none',
              }}
            >
              {n.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              background: 'transparent',
              border: '1px solid var(--color-border-strong)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              cursor: 'pointer',
              color: 'var(--color-text)',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 220ms ease',
            }}
          >
            {theme === 'light' ? '☾' : '☀'}
          </button>
        </nav>

        <button
          className="mobile-toggle"
          aria-label="Menu"
          onClick={() => setMobileOpen((v) => !v)}
          style={{
            display: 'none',
            background: 'transparent',
            border: '1px solid var(--color-border-strong)',
            borderRadius: '4px',
            padding: '0.4rem 0.7rem',
            color: 'var(--color-text)',
            cursor: 'pointer',
          }}
        >
          ☰
        </button>
      </div>

      {mobileOpen && (
        <div
          className="mobile-menu"
          style={{
            display: 'none',
            padding: '0.5rem 1.5rem 1.5rem',
            background: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                padding: '0.6rem 0',
                color: 'var(--color-text)',
                border: 'none',
                fontSize: '0.95rem',
              }}
            >
              {n.label}
            </a>
          ))}
          <button onClick={toggleTheme} className="btn btn-outline" style={{ marginTop: '0.75rem' }}>
            {theme === 'light' ? '☾ Dark mode' : '☀ Light mode'}
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 820px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: inline-flex !important; }
          .mobile-menu { display: block !important; }
        }
      `}</style>
    </header>
  );
}
