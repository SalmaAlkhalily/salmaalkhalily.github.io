import { useEffect, useRef, useState } from 'react';
import data from '../data/policyGapData.json';
import { caseStudies } from '../data/caseStudies';
import { computePolicyGapPriority } from '../lib/policyGapScoring';
import { StudySection, Workflow } from './ProjectStudyContent';
import { LinkExternalIcon } from './icons';

const demo = caseStudies.policygap.demo;

function DemoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (started) videoRef.current?.focus();
  }, [started]);

  const play = async () => {
    const video = videoRef.current;
    if (!video) return;
    setFailed(false);
    setStarted(true);
    try {
      if (video.error) video.load();
      await video.play();
    } catch {
      if (videoRef.current === video) setFailed(true);
    }
  };

  return <>
    <div className="policy-demo-player">
      <video ref={videoRef} src={demo.src} controls={started} playsInline preload="none" poster={demo.poster} width={demo.width} height={demo.height}
        tabIndex={started ? 0 : -1} aria-hidden={!started} aria-labelledby="demo-title" aria-describedby="demo-description"
        onPlay={() => { setStarted(true); setFailed(false); }} onError={() => setFailed(true)}>
        Your browser does not support embedded video. Use the Google Drive link below to watch the demo.
      </video>
      {!started && <button type="button" className="policy-demo-cover" onClick={play} aria-label="Play the 1-minute demo" aria-describedby="demo-description">
        <img src={demo.poster} width={demo.width} height={demo.height} alt="" loading="lazy" decoding="async" />
        <span className="policy-demo-play-label"><span aria-hidden>▶</span> Play demo · 1 min</span>
      </button>}
    </div>
    {failed && <p className="policy-demo-error" role="status">The video couldn’t start. You can watch the same demo on Google Drive below.</p>}
  </>;
}

function MethodFigure({ name, width, height, alt, caption }: {
  name: string; width: number; height: number; alt: string; caption: string;
}) {
  const base = `/images/projects/${name}`;
  return <figure className="report-figure">
    <a href={`${base}.png`} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size chart: ${alt}`}>
      <img src={`${base}.png`} width={width} height={height} alt={alt} loading="lazy" decoding="async" />
    </a>
    <figcaption>{caption}
      <span className="figure-links">
        <a href={`${base}.png`} target="_blank" rel="noopener noreferrer">View full size</a>
        <a href={`${base}.svg`} download>Download chart (SVG)</a>
        <a href={`${base}.csv`} download>Download example data (CSV)</a>
      </span>
    </figcaption>
  </figure>;
}

function PriorityExplorer() {
  const [statusId, setStatusId] = useState('not_implemented');
  const [confidence, setConfidence] = useState(data.priorityExample.confidence);
  const [weight, setWeight] = useState(data.priorityExample.weight);
  const status = data.statuses.find((item) => item.id === statusId) ?? data.statuses[0];
  const priority = computePolicyGapPriority(status.score, confidence, weight, data.priorityExample.businessImpact);

  const reset = () => {
    setStatusId('not_implemented');
    setConfidence(data.priorityExample.confidence);
    setWeight(data.priorityExample.weight);
  };

  return <div className="policy-priority-demo" role="group" aria-labelledby="priority-example-title">
    <div className="policy-priority-controls">
      <p className="eyebrow">Interactive example</p>
      <h3 id="priority-example-title">Try the priority formula</h3>
      <label htmlFor="policy-priority-status">Finding status</label>
      <select id="policy-priority-status" value={statusId} onChange={(event) => setStatusId(event.currentTarget.value)}>
        {data.statuses.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
      </select>
      <label htmlFor="policy-priority-confidence">Model-reported confidence <span>{confidence.toFixed(2)}</span></label>
      <input id="policy-priority-confidence" type="range" min="0" max="1" step="0.05" value={confidence}
        onChange={(event) => setConfidence(Number(event.currentTarget.value))} />
      <label htmlFor="policy-priority-weight">Example control weight <span>{weight.toFixed(1)}</span></label>
      <input id="policy-priority-weight" type="range" min="0.5" max="3" step="0.1" value={weight}
        onChange={(event) => setWeight(Number(event.currentTarget.value))} />
      <button type="button" className="btn btn-outline" onClick={reset}>Reset example</button>
    </div>
    <div className="policy-priority-result">
      <span>Gap priority</span>
      <output htmlFor="policy-priority-status policy-priority-confidence policy-priority-weight" aria-live="polite">{priority.toFixed(4)}</output>
      <p>{status.score === null ? 'Not-applicable controls are excluded.' : status.score === 1 ? 'A fully implemented control has no gap to prioritise.' : `Status score: ${status.score}. Business impact is fixed at 1 in this example.`}</p>
      <p className="policy-example-note">A formula demonstration using example inputs. Model-reported confidence is not a measured accuracy score.</p>
    </div>
  </div>;
}

export default function PolicyGapStudy() {
  return <>
    <StudySection id="overview" title="Connect policy requirements with supporting evidence">
      <p>Reviewing cybersecurity policies means finding relevant passages for many framework requirements, checking what each passage actually supports and recording the gaps. PolicyGap brings those steps into a single assessment workflow.</p>
      <p>We developed the project as a four-person team for the AI Technologies Summer School 2026 competition, which I attended as part of my M1 at Université Paris-Saclay. I implemented the application code across the React interface, backend API and RAG pipeline.</p>
      <div className="case-callout"><h3>The assessment workflow</h3><p>A reviewer uploads policy documents, selects frameworks and runs an assessment. Each finding brings together a control, a proposed status, retrieved evidence, a gap summary and a recommendation. Reviewers can inspect those findings before exporting a report.</p></div>
      <div className="case-table-wrap" role="region" aria-label="Framework families supported by PolicyGap" tabIndex={0}>
        <table className="case-table">
          <caption>The three framework families covered by the documented assessment workflow.</caption>
          <thead><tr><th scope="col">Framework</th><th scope="col">Organisation of requirements</th></tr></thead>
          <tbody>{data.frameworks.map((row) => <tr key={row.name}><th scope="row">{row.name}</th><td>{row.organisation}</td></tr>)}</tbody>
        </table>
      </div>
    </StudySection>

    <StudySection id="demo" title="Watch the 1-minute demo">
      <p id="demo-description">A 60-second screen recording of PolicyGap, from uploading policy documents to reviewing assessment results. This recording has no audio.</p>
      <figure className="policy-demo">
        <DemoPlayer />
        <figcaption>
          <span>Recorded prototype walkthrough</span>
          <a href={demo.backupUrl} className="text-link" target="_blank" rel="noopener noreferrer">Watch on Google Drive <LinkExternalIcon width={14} height={14} /></a>
        </figcaption>
      </figure>
      <details className="figure-data policy-demo-walkthrough">
        <summary>Read the demo walkthrough</summary>
        <ol>
          <li>Open a workspace and upload sample policy documents.</li>
          <li>Start a NIST CSF assessment and follow its processing progress.</li>
          <li>Review the assessment score, NIST function breakdown and control-level findings, including implementation statuses and priority gaps.</li>
        </ol>
      </details>
    </StudySection>

    <StudySection id="architecture" title="An application around the retrieval pipeline">
      <figure className="policy-system-figure">
        <div className="policy-system-flow" role="group" aria-label="React interface connects to the FastAPI assessment service, which coordinates retrieval and LLM classification">
          <div><span className="eyebrow">Interface</span><h3>React</h3><p>Workspaces, document upload, assessments and reviewer decisions.</p></div>
          <div><span className="eyebrow">Application</span><h3>FastAPI</h3><p>Authenticated routes, background assessments and report export.</p></div>
          <div><span className="eyebrow">Retrieval &amp; AI</span><h3>MiniLM + Groq</h3><p>Embed documents and controls, retrieve evidence and classify findings.</p></div>
        </div>
        <div className="policy-storage"><span>SQLite: users, workspaces, findings and reviews</span><span>ChromaDB: document vectors in workspace collections</span></div>
        <figcaption>Application architecture adapted from the technical documentation, section 3.</figcaption>
      </figure>
      <p>The interface follows the review process: a dashboard lists workspaces; a workspace contains its documents and assessments; an assessment view exposes findings, evidence and reviewer actions. The API starts the assessment as a background task, while the interface polls its status.</p>
      <p>SQLite preserves relationships between documents, controls, findings and review records. ChromaDB stores the chunk embeddings used for evidence search. Control embeddings are cached so later assessments can reuse them.</p>
    </StudySection>

    <StudySection id="pipeline" title="From uploaded files to control-level findings">
      <Workflow steps={[
        { title: 'Extract and chunk the documents', text: 'PDF, DOCX and TXT parsers extract text. The chunker uses an approximate 400-token window with 80 tokens of overlap, implemented through character counts and word-aligned cuts.' },
        { title: 'Embed the evidence and requirements', text: 'The all-MiniLM-L6-v2 model produces 384-dimensional vectors. Document chunks enter a workspace-specific ChromaDB collection; framework controls use the same embedding model.' },
        { title: 'Retrieve evidence for all controls', text: 'A batch vector query retrieves up to five nearby chunks per control. A cosine-distance threshold of 0.65 filters distant matches before classification.' },
        { title: 'Check relevance and classify', text: 'Keyword and domain checks filter weak matches. The classifier sends evidence and requirements to Llama 3.3 through Groq, using batched requests and a shared rate gate.' },
        { title: 'Validate and preserve the result', text: 'The response parser recovers structured output where possible and checks evidence excerpts. Findings retain the status, confidence, gap summary and recommendation.' },
        { title: 'Prioritise and review the gaps', text: 'A scoring function ranks findings by status, control weight, confidence and business impact. The interface makes evidence available for human decisions and report export.' },
      ]} />
      <MethodFigure name="policygap-chunking" width={1820} height={823}
        alt="Three illustrative 1600-character chunk windows: 0 to 1600, 1280 to 2880, and 2560 to 4160. Neighbouring windows share 320 characters, equivalent to the documented 80-token approximation."
        caption="Nominal chunk windows from the documented 400/80-token configuration, using four characters per token. Actual lengths and offsets vary with word-aligned cuts. This is a method illustration." />
      <p>Overlap keeps nearby context available across chunk boundaries. The sizes are estimates based on character length, so they should not be read as exact model-token counts.</p>
    </StudySection>

    <StudySection id="scoring" title="Make gap priorities inspectable">
      <p>Each finding receives a status score. The gap-priority formula combines the missing portion of a control with its weight, business impact and model-reported confidence. Higher values move a gap earlier in the review list.</p>
      <div className="policy-formula" role="math" aria-label="Priority equals business impact times control weight times one minus status score times zero point five plus zero point five times confidence">
        Priority = impact × weight × (1 − status score) × (0.5 + 0.5 × confidence)
      </div>
      <div className="case-table-wrap" role="region" aria-label="PolicyGap statuses, status scores and priority examples" tabIndex={0}>
        <table className="case-table">
          <caption>Example from the documented scoring design: impact = 1, weight = 1, confidence = 0.9. Priority is a relative ranking score.</caption>
          <thead><tr><th scope="col">Status</th><th scope="col">Status score</th><th scope="col">Example priority</th><th scope="col">Meaning</th></tr></thead>
          <tbody>{data.statuses.map((row) => <tr key={row.id}><th scope="row">{row.label}</th><td>{row.score === null ? 'Excluded' : row.score.toFixed(1)}</td><td>{computePolicyGapPriority(row.score, data.priorityExample.confidence).toFixed(3)}</td><td>{row.meaning}</td></tr>)}</tbody>
        </table>
      </div>
      <MethodFigure name="policygap-priority" width={1820} height={1015}
        alt="Formula chart with impact and weight fixed at one. As confidence increases from zero to one, priority for an unimplemented control rises from 0.5 to 1, and partial priority rises from 0.25 to 0.5. Implemented controls stay at zero. At confidence 0.9 the first two priorities are 0.95 and 0.475."
        caption="An explanation of the formula, with impact and weight fixed at one. Not-applicable controls receive zero priority and are excluded from framework scoring. The curves are calculated examples." />
      <PriorityExplorer />
      <p>The confidence factor ranges from 0.5 to 1. As a result, a low-confidence missing control retains some priority. A finding marked for human review receives zero implementation credit until a reviewer resolves it.</p>
    </StudySection>

    <StudySection id="review" title="Keep reviewers close to the evidence">
      <p>The assessment page combines a score overview with expandable control-level findings. A reviewer can inspect the retrieved excerpt, model-reported confidence, gap summary and recommendation before deciding how to handle the finding.</p>
      <div className="policy-review-actions" role="list" aria-label="Available reviewer decisions">
        <div role="listitem"><h3>Accept</h3><p>Record agreement with the proposed finding.</p></div>
        <div role="listitem"><h3>Override</h3><p>Change the status and its numeric score, with reviewer notes.</p></div>
        <div role="listitem"><h3>Reject</h3><p>Record disagreement with the proposed finding.</p></div>
      </div>
      <p>Review records preserve the decision, notes, reviewer and timestamp. The DOCX export assembles an assessment overview, executive summary, NIST function breakdown, priority gaps and a full findings table. Evidence excerpts and reviewer decisions stay attached to the findings.</p>
    </StudySection>

    <StudySection id="limitations" title="Scope and lessons from the prototype">
      <ul>
        <li>Retrieval quality affects every later step. The five retrieved chunks and relevance filters determine what evidence reaches the classifier; a missed passage can become a false gap.</li>
        <li>Structured generation still needs validation. The parser and human-review fallback handle responses that cannot be used directly.</li>
        <li>Batching, cached embeddings and rate-limit coordination reduce repeated work and help manage hosted-model limits.</li>
        <li>A document can state a policy without proving that an organisation follows it in practice. The application supports evidence review against selected requirements.</li>
      </ul>
      <p>The supplied documentation explains the implementation but does not provide a labelled evaluation set or measured accuracy benchmark. The charts on this page explain the design; they are not experimental performance results.</p>
      <details className="figure-data">
        <summary>Prototype limitations</summary>
        <p>The charts illustrate the documented chunking and priority-scoring design. Configuration settings can vary between versions.</p>
        <p>Up to five passages are retrieved per control, but only the first two are sent to the language model, with each excerpt limited to 400 characters and each requirement to 150 characters. Relevant context may therefore be omitted.</p>
        <p>Unresolved model findings can fall back to a not-implemented status. Reviewers can inspect and override them, but unresolved cases are not consistently preserved as a separate status.</p>
        <p>The overall assessment score averages applicable findings. It is separate from the gap-priority formula illustrated above.</p>
      </details>
    </StudySection>
  </>;
}
