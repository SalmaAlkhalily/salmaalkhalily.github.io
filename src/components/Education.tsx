import { certifications, education, publications } from '../data/portfolio';
import type { CSSProperties } from 'react';
import SectionTitle from './SectionTitle';
import { GraduationIcon, BuildingIcon, CheckIcon, QuillIcon, LinkExternalIcon } from './icons';

export default function Education() {
  return (
    <section id="education" style={{ background: 'var(--color-bg-subtle)' }}>
      <div className="container">
        <SectionTitle
          eyebrow="Formation & Recognition"
          title="Education & Credentials"
          subtitle="Academic background and professional certifications"
          icon={<GraduationIcon />}
        />

        <div className="grid grid-cols-2" style={{ gap: '2.5rem' }}>
          {/* Education column */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.35rem',
                marginBottom: '1.5rem',
                color: 'var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}
            >
              <span className="inline-icon" style={{ color: 'var(--color-accent)' }}>
                <GraduationIcon />
              </span>
              Education
            </h3>
            <div style={{ display: 'grid', gap: '1.25rem' }}>
              {education.map((e) => (
                <div
                  key={e.degree + e.period}
                  style={{
                    paddingLeft: '1.25rem',
                    borderLeft: '2px solid var(--color-accent)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--color-accent)',
                      letterSpacing: '0.06em',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {e.period}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      marginBottom: '0.15rem',
                    }}
                  >
                    {e.degree}
                  </div>
                  {e.field && (
                    <div style={{ color: 'var(--color-text-soft)', fontStyle: 'italic', fontSize: '0.92rem' }}>
                      {e.field}
                    </div>
                  )}
                  <div
                    style={{
                      color: 'var(--color-text-muted)',
                      fontSize: '0.88rem',
                      marginTop: '0.4rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <span className="inline-icon" style={{ color: 'var(--color-text-muted)' }}>
                      <BuildingIcon />
                    </span>
                    {e.institution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications column */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.35rem',
                marginBottom: '1.5rem',
                color: 'var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}
            >
              <span className="inline-icon" style={{ color: 'var(--color-accent)' }}>
                <CheckIcon />
              </span>
              Certifications
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
              {certifications.map((c) => {
                const inner = (
                  <>
                    <div
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span>{c.name}</span>
                      {c.url && (
                        <span
                          className="inline-icon"
                          style={{ color: 'var(--color-accent)', opacity: 0.7 }}
                        >
                          <LinkExternalIcon />
                        </span>
                      )}
                    </div>
                    {c.issuer && (
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: 'var(--color-text-muted)',
                          letterSpacing: '0.03em',
                          marginTop: '0.2rem',
                        }}
                      >
                        {c.issuer}
                      </div>
                    )}
                    {c.details && (
                      <div
                        style={{
                          fontSize: '0.9rem',
                          color: 'var(--color-text-muted)',
                          lineHeight: 1.5,
                          marginTop: '0.35rem',
                        }}
                      >
                        {c.details}
                      </div>
                    )}
                  </>
                );

                const style: CSSProperties = {
                  paddingLeft: '1.25rem',
                  borderLeft: '2px solid var(--color-border-strong)',
                  display: 'block',
                  transition: 'border-color 220ms ease, transform 220ms ease',
                  textDecoration: 'none',
                  color: 'inherit',
                };

                if (c.url) {
                  return (
                    <li key={c.name} style={{ listStyle: 'none' }}>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                        style={style}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderLeftColor = 'var(--color-accent)';
                          e.currentTarget.style.transform = 'translateX(3px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderLeftColor = 'var(--color-border-strong)';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        {inner}
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={c.name} style={style}>
                    {inner}
                  </li>
                );
              })}
            </ul>

            {publications.length > 0 && (
              <>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: '1.35rem',
                    marginTop: '2.5rem',
                    marginBottom: '1rem',
                    color: 'var(--color-text)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                  }}
                >
                  <span className="inline-icon" style={{ color: 'var(--color-accent)' }}>
                    <QuillIcon />
                  </span>
                  Publications
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
                  {publications.map((p) => (
                    <li
                      key={p.title}
                      style={{
                        paddingLeft: '1.25rem',
                        borderLeft: '2px solid var(--color-border-strong)',
                      }}
                    >
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontStyle: 'italic',
                            fontSize: '1rem',
                            color: 'var(--color-text)',
                            borderBottom: '1px solid var(--color-accent)',
                          }}
                        >
                          “{p.title}”
                        </a>
                      ) : (
                        <span
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontStyle: 'italic',
                            color: 'var(--color-text-soft)',
                          }}
                        >
                          “{p.title}”
                        </span>
                      )}
                      {p.venue && (
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            color: 'var(--color-text-muted)',
                            letterSpacing: '0.05em',
                            marginTop: '0.2rem',
                          }}
                        >
                          {p.venue}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
