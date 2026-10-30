import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { profile } from '../data/portfolio';
import { DownloadIcon } from './icons';

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Header({ innerPage = false }: { innerPage?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const prefix = innerPage ? '/' : '';

  useEffect(() => {
    let frame = 0;
    const update = () => {
      setScrolled(window.scrollY > 12);
      if (!innerPage) {
        const current = NAV.filter(({ href }) => {
          const section = document.querySelector(href);
          return section && section.getBoundingClientRect().top <= 160;
        }).pop();
        const atBottom = window.scrollY > 100 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        setActive(atBottom ? '#contact' : current?.href ?? '');
      }
    };
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [innerPage]);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        menuButton.current?.focus();
      }
    };
    const closeOnDesktop = () => {
      if (window.innerWidth > 1040) setMobileOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('resize', closeOnDesktop);
    };
  }, [mobileOpen]);

  const [firstName, ...rest] = profile.name.split(' ');
  const navigation = NAV.map(({ href, label }) => (
    <a key={href} href={`${prefix}${href}`} aria-current={active === href ? 'location' : undefined}
      onClick={() => setMobileOpen(false)}>{label}</a>
  ));
  const themeLabel = theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="container header-inner">
        <a href={`${prefix}#top`} className="wordmark" aria-label={`${profile.name}, home`}>
          <span>{firstName}</span> {rest.join(' ')}
        </a>
        <nav className="desktop-nav" aria-label="Main">{navigation}</nav>
        <div className="header-actions">
          <a href={profile.cv} download className="header-cv"><DownloadIcon width={15} height={15} /> CV</a>
          <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={themeLabel}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              {theme === 'light' ? <path d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z" /> : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>}
            </svg>
          </button>
          <button ref={menuButton} type="button" className="mobile-toggle" aria-expanded={mobileOpen}
            aria-controls="mobile-menu" aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((value) => !value)}>
            {mobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile" hidden={!mobileOpen}>{navigation}</nav>
    </header>
  );
}
