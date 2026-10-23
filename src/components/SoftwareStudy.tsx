import type { SoftwareStudyKey } from '../data/softwareStudies';
import { softwareDetails } from '../data/softwareStudyContent';
import { StudySection, Workflow } from './ProjectStudyContent';

export default function SoftwareStudy({ studyKey }: { studyKey: SoftwareStudyKey }) {
  const data = softwareDetails[studyKey];
  const image = `/images/projects/${data.image}`;
  return <>
    <StudySection id="overview" title="What the application does"><p>{data.overview}</p></StudySection>
    <StudySection id="interface" title="The running interface">
      <figure className="report-figure">
        <a href={image} target="_blank" rel="noopener noreferrer" aria-label="Open full-size interface capture">
          <img src={image} alt={data.alt} width={data.width} height={data.height} loading="lazy" decoding="async" />
        </a>
        <figcaption>{data.caption}<span className="figure-links"><a href={image} target="_blank" rel="noopener noreferrer">View full size</a></span></figcaption>
      </figure>
    </StudySection>
    <StudySection id="workflow" title="From input to output"><Workflow steps={data.steps} /></StudySection>
    <StudySection id="implementation" title="Inside the implementation">{data.implementation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</StudySection>
    <StudySection id="limitations" title="Scope and limits"><p>{data.limitations}</p></StudySection>
  </>;
}
