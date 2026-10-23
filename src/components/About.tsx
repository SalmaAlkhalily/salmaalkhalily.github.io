import { profile } from '../data/portfolio';
import SectionTitle from './SectionTitle';
import { BookIcon, DownloadIcon, LinkExternalIcon } from './icons';

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <SectionTitle eyebrow="01 / About" title="My background" icon={<BookIcon />} />
        <div className="about-layout">
          <div className="about-copy">
            {profile.bio.split('\n\n').map((paragraph) => {
              const [before, after] = paragraph.split(profile.summerSchool.name);
              return <p key={paragraph.slice(0, 24)}>
                {before}
                {after !== undefined && <>
                  <a className="bio-link" href={profile.summerSchool.url} target="_blank" rel="noopener noreferrer">
                    {profile.summerSchool.name}<LinkExternalIcon width={14} height={14} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  {after}
                </>}
              </p>;
            })}
            <a href={profile.cv} className="text-link" download>
              <DownloadIcon width={17} height={17} /> Read my CV (PDF)
            </a>
          </div>

          <aside className="about-focus" aria-labelledby="focus-title">
            <span className="eyebrow">Current focus</span>
            <h3 id="focus-title">What I work on</h3>
            <dl className="focus-list">
              {profile.focusAreas.map((area, index) => (
                <div key={area.title}>
                  <dt><span aria-hidden>{String(index + 1).padStart(2, '0')}</span> {area.title}</dt>
                  <dd>{area.description}</dd>
                </div>
              ))}
            </dl>
            <p className="about-languages">{profile.facts.find((fact) => fact.label === 'Languages')?.value}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
