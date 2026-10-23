import { caseStudies, type CaseStudy, type CaseStudyKey } from '../data/caseStudies';
import { GitHubIcon, LinkExternalIcon, BookIcon } from './icons';
import { ShaclStudy, VlmStudy } from './ProjectStudyContent';
import IrStudy from './IrStudy';
import NlpStudy from './NlpStudy';
import PolicyGapStudy from './PolicyGapStudy';
import PolicyGapLogo from './PolicyGapLogo';
import SoftwareStudy from './SoftwareStudy';
import { isSoftwareStudyKey } from '../data/softwareStudies';

export default function ProjectPage({ studyKey }: { studyKey: CaseStudyKey }) {
  const study: CaseStudy = caseStudies[studyKey];
  const keys = (Object.keys(caseStudies) as CaseStudyKey[]).filter((key) => Boolean((caseStudies[key] as CaseStudy).archive) === Boolean(study.archive));
  const next = caseStudies[keys[(keys.indexOf(studyKey) + 1) % keys.length]];
  const Content = isSoftwareStudyKey(studyKey) ? () => <SoftwareStudy studyKey={studyKey} />
    : { shacl: ShaclStudy, vlm: VlmStudy, ir: IrStudy, nlp: NlpStudy, policygap: PolicyGapStudy }[studyKey];

  return (
    <article className="case-study" aria-labelledby="case-title">
      <div className="case-hero" id="top">
        <div className="container">
          <a href={study.archive ? '/archive.html' : '/#projects'} className="text-link case-back">← Back to {study.archive ? 'archive' : 'projects'}</a>
          <div className={studyKey === 'policygap' ? 'case-heading case-heading-with-logo' : 'case-heading'}>
            <div>
              <p className="eyebrow">{study.category}</p>
              <h1 id="case-title">{study.title}</h1>
              <p className="case-introduction">{study.introduction}</p>
            </div>
            {studyKey === 'policygap' && <PolicyGapLogo variant="hero" alt="PolicyGap logo" />}
          </div>
          <dl className="case-meta">
            <div><dt>Project</dt><dd>{study.team}</dd></div>
            {study.supervisor && <div><dt>Supervision</dt><dd>{study.supervisor}</dd></div>}
            {study.institution !== false && <div><dt>University</dt><dd>{study.institution ?? 'Université Paris-Saclay'}</dd></div>}
          </dl>
          <div className="case-actions">
            <a href={study.repo} className="btn btn-primary" target="_blank" rel="noopener noreferrer"><GitHubIcon width={17} height={17} /> View repository</a>
            {study.demo && <a href="#demo" className="btn btn-outline"><span aria-hidden>▶</span> Watch the 1-minute demo</a>}
            {studyKey === 'vlm' && study.report && <a href={study.report} className="btn btn-outline" target="_blank" rel="noopener noreferrer"><BookIcon width={17} height={17} /> Read the report (PDF)</a>}
          </div>
          <dl className="case-facts">
            {study.facts.map((fact) => <div key={fact.label}><dt>{fact.value}</dt><dd>{fact.label}</dd></div>)}
          </dl>
        </div>
      </div>

      <div className="container case-layout">
        <nav className="case-toc" aria-label="On this project page">
          <span className="eyebrow">On this page</span>
          <ol>{study.contents.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}</ol>
        </nav>
        <div className="case-content">
          <Content />

          <section id="sources" className="case-section" aria-labelledby="sources-title">
            <p className="eyebrow">Further reading</p>
            <h2 id="sources-title">{studyKey === 'vlm' ? 'Research & tools' : 'Tools & resources'}</h2>
            {studyKey === 'vlm' && <p>Research team: Yahia Abusaqer, Nagham Abuwarda, Salma Alkhalily, Mouhamed Nourou Dine Cisse and Mouhamadou Moustapha Diop, supervised by Adrian Popescu.</p>}
            <ul className="case-source-links">
              <li><a href={study.repo} target="_blank" rel="noopener noreferrer">GitHub repository <span>Project source code</span><GitHubIcon width={15} height={15} /></a></li>
              {study.additionalSources?.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} {source.detail && <span>{source.detail}</span>}<LinkExternalIcon width={15} height={15} /></a></li>)}
            </ul>
            <ul className="project-stack" aria-label="Tools and methods">{study.technologies.map((tech) => <li className="tag" key={tech}>{tech}</li>)}</ul>
          </section>
          <a href={next.path} className="case-next">
            <span className="eyebrow">Another project</span>
            <strong>{next.shortTitle} <span aria-hidden>→</span></strong>
          </a>
        </div>
      </div>
    </article>
  );
}
