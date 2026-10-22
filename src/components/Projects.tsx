import { projectArchive, projects } from '../data/portfolio';
import SectionTitle from './SectionTitle';
import { GitHubIcon, LinkExternalIcon, StarIcon } from './icons';

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <SectionTitle
          eyebrow="Selected Work"
          title="Projects"
          subtitle="Recent AI and knowledge engineering work. Earlier projects are listed in the archive below."
          icon={<StarIcon />}
        />
        <div className="grid grid-cols-2">
          {projects.map((p, idx) => (
            <article key={p.title} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                className="meta"
                style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.9rem' }}
              >
                <span style={{ color: 'var(--color-accent)' }}>{String(idx + 1).padStart(2, '0')}</span>
                {p.period && <span>{p.period}</span>}
              </div>
              <h3 style={{ marginBottom: '0.7rem' }}>
                {p.repo ? (
                  <a href={p.repo} target="_blank" rel="noopener noreferrer">
                    {p.title}
                  </a>
                ) : p.title}
              </h3>
              {p.pipeline && (
                <figure className="pipeline" aria-label={`Pipeline: ${p.pipeline.join(', then ')}`}>
                  <ol aria-hidden>
                    {p.pipeline.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </figure>
              )}
              <p style={{ flex: 1 }}>{p.description}</p>
              {(p.role || p.result) && (
                <dl className="project-details">
                  {p.role && (
                    <div>
                      <dt>Role</dt>
                      <dd>{p.role}</dd>
                    </div>
                  )}
                  {p.result && (
                    <div>
                      <dt>Result</dt>
                      <dd style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{p.result}</dd>
                    </div>
                  )}
                </dl>
              )}
              <ul
                aria-label="Stack"
                style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', listStyle: 'none', margin: 0, padding: 0 }}
              >
                {p.tech.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
              {(p.repo || p.live) && (
                <div className="project-links">
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer">
                      <GitHubIcon />
                      Code
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer">
                      <LinkExternalIcon />
                      Live
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>

        <h3 style={{ margin: '4rem 0 1rem' }}>Archive</h3>
        <ul className="archive">
          {projectArchive.map((p) => (
            <li key={p.title}>
              <span className="archive-title">
                {p.repo ? (
                  <a href={p.repo} target="_blank" rel="noopener noreferrer">
                    {p.title}
                    <LinkExternalIcon />
                  </a>
                ) : (
                  p.title
                )}
                {p.period && (
                  <span className="meta" style={{ marginLeft: '0.6rem', fontWeight: 400 }}>
                    {p.period}
                  </span>
                )}
                <span className="archive-summary">{p.description}</span>
              </span>
              <span className="archive-stack">{p.tech.join(' · ')}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
