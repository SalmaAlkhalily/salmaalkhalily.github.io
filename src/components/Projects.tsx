import { projects } from '../data/portfolio';
import SectionTitle from './SectionTitle';
import { StarIcon } from './icons';

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <SectionTitle
          eyebrow="Selected Work"
          title="Projects"
          subtitle="AI, data and software projects I have built"
          icon={<StarIcon />}
        />
        <div className="grid grid-cols-2">
          {projects.map((p, idx) => (
            <article key={p.title} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '0.9rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                }}
              >
                <span style={{ color: 'var(--color-accent)' }}>{String(idx + 1).padStart(2, '0')}</span>
                {p.period && <span style={{ color: 'var(--color-text-muted)' }}>{p.period}</span>}
              </div>
              <h3 style={{ lineHeight: 1.3, marginBottom: '0.7rem' }}>{p.title}</h3>
              <p style={{ flex: 1, fontSize: '0.95rem' }}>{p.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.5rem' }}>
                {p.tech.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
