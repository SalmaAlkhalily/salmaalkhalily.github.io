import { skills } from '../data/portfolio';
import SectionTitle from './SectionTitle';
import { CompassIcon } from './icons';

export default function Skills() {
  return (
    <section id="skills" style={{ background: 'var(--color-bg-subtle)' }}>
      <div className="container">
        <SectionTitle
          eyebrow="Practice Areas"
          title="Skills & Expertise"
          subtitle="Tools, disciplines, and languages I work with"
          icon={<CompassIcon />}
        />
        <div className="grid grid-cols-3">
          {skills.map((group, idx) => (
            <div key={group.category} className="card">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.6rem',
                  marginBottom: '1rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--color-accent)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', margin: 0 }}>
                  {group.category}
                </h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {group.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
