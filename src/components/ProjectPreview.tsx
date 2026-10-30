import type { Project } from '../data/portfolio';
import irResults from '../data/irResults.json';
import nlpResults from '../data/nlpResults.json';
import { CheckIcon } from './icons';

function ScoreBars({ label, rows }: { label: string; rows: { name: string; value: number }[] }) {
  return <div className="preview-scores">
    <p className="preview-label">{label}</p>
    <dl>{rows.map((row) => <div key={row.name}>
      <dt>{row.name}</dt>
      <dd><span className="preview-bar-track" aria-hidden><span style={{ width: `${row.value * 100}%` }} /></span><span>{row.value.toFixed(4)}</span></dd>
    </div>)}</dl>
  </div>;
}

function PreviewContent({ kind }: { kind: Project['preview'] }) {
  switch (kind) {
    case 'policygap':
      return <div className="preview-browser">
        <div className="preview-browser-bar" aria-hidden>
          <span className="preview-browser-dots"><i /><i /><i /></span>
          <span className="preview-browser-title">
            <img src="/images/projects/policygap-logo-320.webp" width={16} height={16} alt="" />
            PolicyGap · Assessment
          </span>
        </div>
        <img className="preview-browser-shot" src="/images/projects/policygap-dashboard-960.webp"
          srcSet="/images/projects/policygap-dashboard-480.webp 480w, /images/projects/policygap-dashboard-960.webp 960w"
          sizes="(max-width: 460px) calc(100vw - 40px), (max-width: 768px) 420px, 320px"
          width={960} height={584} loading="lazy" decoding="async"
          alt="PolicyGap dashboard from the recorded demo: overall compliance score, scores by NIST function, status breakdown and top priority gaps." />
      </div>;
    case 'vlm':
      return <div className="preview-vlm">
        <p className="preview-label">One identity, four conditions</p>
        <img src="/images/projects/vlm-accessory-example.png" width={872} height={264} loading="lazy" decoding="async"
          alt="The same synthetic face shown as an original portrait, with a mask, with a cap and with glasses." />
        <div className="preview-vlm-models"><span>MiniCPM-V 4.6</span><span>SigLIP 2</span></div>
      </div>;
    case 'nlp':
      return <ScoreBars label="Test macro F1 · lexical models" rows={nlpResults.classification.filter((row) => row.input === 'TF-IDF + source distance').map((row) => ({
        name: row.model === 'Logistic regression' ? 'Logistic' : row.model === 'Tuned XGBoost' ? 'XGBoost' : row.model,
        value: row.f1Macro,
      }))} />;
    case 'ir':
      return <ScoreBars label="Public-query NDCG@10" rows={irResults.comparison.filter((row) => row.model === 'TF-IDF · title + abstract' || row.model === 'Optimised 8-signal fusion').map((row) => ({
        name: row.model.startsWith('TF-IDF') ? 'TF-IDF' : 'Fusion', value: row.ndcg10,
      }))} />;
    case 'shacl':
      return <div className="preview-shacl">
        <p className="preview-label">Reuse a key across vocabularies</p>
        <div className="preview-mapping">
          <div><span>Source</span><code>hasAuthor</code><code>hasTitle</code></div>
          <span className="preview-mapping-arrow" aria-hidden>→</span>
          <div><span>Target</span><code>author</code><code>title</code></div>
        </div>
        <p className="preview-validation"><CheckIcon width={16} height={16} /> Generate shapes &amp; validate</p>
      </div>;
    default:
      return null;
  }
}

const captions = {
  policygap: 'Dashboard from the recorded PolicyGap demo',
  vlm: 'Synthetic portraits from our report',
  nlp: 'TF-IDF + paired-source distance',
  ir: '100 queries; fusion tuned on this set',
  shacl: 'Property-mapping example from the TER',
};

export default function ProjectPreview({ project }: { project: Project }) {
  if (!project.preview) return null;
  const href = project.caseStudy ?? project.repo;
  const external = !project.caseStudy;
  return <figure className="project-preview" data-preview={project.preview}>
    <a href={href} className="project-preview-link" aria-label={`${external ? 'View repository for' : 'Read about'} ${project.title}`}
      target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
      <PreviewContent kind={project.preview} />
    </a>
    <figcaption>{captions[project.preview]}</figcaption>
  </figure>;
}
