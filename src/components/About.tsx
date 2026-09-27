import { profile } from '../data/portfolio';
import SectionTitle from './SectionTitle';
import { BookIcon, CheckIcon } from './icons';

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--color-bg-subtle)' }}>
      <div className="container">
        <SectionTitle eyebrow="About" title="Background & focus" icon={<BookIcon />} />
        <div className="about-grid">
          <div>
            {profile.bio.split('\n\n').map((paragraph) => (
              <p key={paragraph.slice(0, 24)} style={{ fontSize: '1.08rem', lineHeight: 1.8 }}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1.1rem' }}>Currently exploring</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.8rem' }}>
              {profile.interests.map((interest) => (
                <li key={interest} style={{ display: 'flex', gap: '0.6rem', alignItems: 'baseline' }}>
                  <span className="inline-icon" style={{ transform: 'translateY(2px)' }}>
                    <CheckIcon />
                  </span>
                  <span style={{ color: 'var(--color-text-soft)' }}>{interest}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
