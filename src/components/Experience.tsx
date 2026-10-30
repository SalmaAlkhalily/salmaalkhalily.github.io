import { experience } from '../data/portfolio';
import SectionTitle from './SectionTitle';
import { ScrollIcon, CalendarIcon, MapPinIcon, LinkExternalIcon } from './icons';

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <SectionTitle
          eyebrow="Work"
          title="Experience"
          subtitle="Professional software engineering"
          icon={<ScrollIcon />}
        />
        <div className="timeline">
          {experience.map((item) => (
            <article key={`${item.company}-${item.period}`} className="timeline-item">
              <div
                className="period"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <span className="inline-icon">
                  <CalendarIcon />
                </span>
                {item.period}
                {item.status && <span className="experience-status">{item.status}</span>}
              </div>
              <h3 className="role">{item.role}</h3>
              <div className="company">{item.company}</div>
              {item.location && (
                <div
                  className="location"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <span className="inline-icon" style={{ color: 'var(--color-text-muted)' }}>
                    <MapPinIcon />
                  </span>
                  {item.location}
                </div>
              )}
              {item.roles && <dl className="experience-roles" aria-label={`Roles at ${item.company}`}>
                {item.roles.map((role) => <div key={role.title}>
                  <dt>{role.title}</dt>
                  <dd>{role.period}</dd>
                </div>)}
              </dl>}
              <ul>
                {item.highlights.map((h, hi) => (
                  <li key={hi}>{h}</li>
                ))}
              </ul>
              {item.links && (
                <div className="project-links">
                  {item.links.map((link) => link.url.startsWith('/') ? (
                    <a key={link.url} href={link.url}>
                      {link.label} <span aria-hidden>→</span>
                    </a>
                  ) : (
                    <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                      <LinkExternalIcon /> {link.label}
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
