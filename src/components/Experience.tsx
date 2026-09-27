import { experience } from '../data/portfolio';
import SectionTitle from './SectionTitle';
import { ScrollIcon, CalendarIcon, MapPinIcon } from './icons';

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <SectionTitle
          eyebrow="Professional Journey"
          title="Experience"
          subtitle="Roles and impact over the years"
          icon={<ScrollIcon />}
        />
        <div className="timeline">
          {experience.map((item, i) => (
            <article key={i} className="timeline-item">
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
              </div>
              <div className="role">{item.role}</div>
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
              <ul>
                {item.highlights.map((h, hi) => (
                  <li key={hi}>{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
