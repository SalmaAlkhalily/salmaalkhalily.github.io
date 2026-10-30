import { projectArchive } from '../data/portfolio';
import { LinkExternalIcon } from './icons';

export default function ProjectArchive() {
  return (
    <section id="top" className="archive-page">
      <div className="container">
        <a href="/#projects" className="text-link archive-back">Back to selected projects</a>
        <p className="eyebrow">The archive</p>
        <h1>More projects</h1>
        <p className="archive-lead">An NLP course project and earlier mobile, web and desktop applications I have worked on.</p>
        <ul className="archive">
          {projectArchive.map((project) => <li key={project.title}>
            <div className="archive-title">
              <h2>{project.caseStudy || project.repo || project.live ? <a href={project.caseStudy || project.repo || project.live} target={project.caseStudy ? undefined : '_blank'} rel={project.caseStudy ? undefined : 'noopener noreferrer'}>
                {project.title}{project.caseStudy ? <span aria-hidden>→</span> : <LinkExternalIcon />}
              </a> : project.title}</h2>
              {project.period && <p className="meta">{project.period}</p>}
              <p className="archive-summary">{project.description}</p>
            </div>
            <span className="archive-stack">{project.tech.join(' / ')}</span>
          </li>)}
        </ul>
      </div>
    </section>
  );
}
