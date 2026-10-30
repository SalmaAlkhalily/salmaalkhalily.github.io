import { projects } from '../data/portfolio';
import SectionTitle from './SectionTitle';
import ProjectPreview from './ProjectPreview';
import { GitHubIcon, LinkExternalIcon, StarIcon } from './icons';

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <SectionTitle eyebrow="Achieved projects" title="Projects"
          subtitle="Four projects in retrieval, model evaluation and knowledge engineering."
          icon={<StarIcon />} />
        <div className="project-list">
          {projects.map((project, index) => (
            <article key={project.title} className="project-row" aria-labelledby={`project-${index}`}>
              <div className="project-overview">
                <div className="project-meta">
                  <span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span>{project.context}</span>
                  {project.period && <span className="project-period">{project.period}</span>}
                </div>
                <h3 id={`project-${index}`}>
                  {project.caseStudy ? <a href={project.caseStudy}>
                    {project.title}<span className="case-title-arrow" aria-hidden> →</span>
                  </a> : project.repo ? <a href={project.repo} target="_blank" rel="noopener noreferrer">
                    {project.title}<LinkExternalIcon width={17} height={17} />
                  </a> : project.title}
                </h3>
                <p className="project-description">{project.description}</p>
                {project.result && <p className="project-result"><span>{project.resultLabel ?? 'Result'}</span><strong>{project.result}</strong></p>}
                <ul className="project-stack" aria-label="Technologies and methods">
                  {project.tech.map((tech) => <li key={tech} className="tag">{tech}</li>)}
                </ul>
                <div className="project-links">
                  {project.caseStudy && <a href={project.caseStudy} aria-label={`Read about ${project.title}`}>Read project <span aria-hidden>→</span></a>}
                  {project.demo && <a href={project.demo} aria-label={`Watch the 1-minute ${project.title} demo`}><span aria-hidden>▶</span> Watch the 1-minute demo</a>}
                  {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`View code for ${project.title}`}>
                    <GitHubIcon /> View repository
                  </a>}
                  {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer"><LinkExternalIcon /> Live project</a>}
                  {project.event && <a href={project.event.url} target="_blank" rel="noopener noreferrer"><LinkExternalIcon /> {project.event.label}</a>}
                </div>
              </div>
              {project.preview ? <ProjectPreview project={project} /> : project.pipeline && <figure className="project-process">
                <figcaption className="eyebrow">The approach</figcaption>
                <ol>{project.pipeline.map((step, stepIndex) => <li key={step}>
                  <span className="process-node" aria-hidden="true">{stepIndex + 1}</span><span>{step}</span>
                </li>)}</ol>
              </figure>}
            </article>
          ))}
        </div>
        <a href="/archive.html" className="archive-link">
          <span><span className="eyebrow">More to explore</span><strong>An NLP project and earlier software</strong></span>
          <span className="text-link">View the archive <LinkExternalIcon width={18} height={18} /></span>
        </a>
      </div>
    </section>
  );
}
