const checks = [
  'Accessory present?',
  'Placement natural?',
  'Portrait preserved?',
  'Visual defects?',
];

export default function HumanReviewFlow() {
  return <figure className="vlm-review-flow" aria-labelledby="human-review-flow-title">
    <figcaption id="human-review-flow-title">Human review workflow</figcaption>
    <div className="vlm-review-process">
      <div className="vlm-review-pair" role="group" aria-label="Portraits compared in paired view">
        <div className="vlm-review-portrait"><strong>Original portrait</strong><span>Paired view</span></div>
        <div className="vlm-review-portrait"><strong>Generated portrait</strong><span>Paired view</span></div>
      </div>
      <span className="vlm-review-arrow" aria-hidden>→</span>
      <div className="vlm-review-evaluation">
        <ol className="vlm-review-checks" aria-label="Four human review checks">
          {checks.map((check, index) => <li key={check}>
            <span className="vlm-review-number" aria-hidden>{index + 1}</span>
            <strong>{check}</strong>
            <span className="vlm-review-answers">Yes / No / Uncertain</span>
          </li>)}
        </ol>
        <p className="vlm-review-outcome"><span>Review outcome</span><strong>Accept / Reject / Uncertain</strong></p>
      </div>
      <span className="vlm-review-arrow" aria-hidden>→</span>
      <div className="vlm-review-csv" role="group" aria-label="Combined CSV output">
        <strong>Combined CSV</strong>
        <span>One record per image-accessory pair</span>
        <span className="vlm-review-fields">Answers + decision + notes + reviewer + time</span>
      </div>
    </div>
  </figure>;
}
