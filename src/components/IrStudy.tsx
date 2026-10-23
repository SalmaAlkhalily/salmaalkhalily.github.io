import results from '../data/irResults.json';
import { StudySection, Workflow } from './ProjectStudyContent';

function NotebookFigure({ name, width, height, alt, caption, section, downloads = false }: {
  name: string; width: number; height: number; alt: string; caption: string; section: string; downloads?: boolean;
}) {
  const base = `/images/projects/${name}`;
  return <figure className="report-figure">
    <a href={`${base}.png`} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${alt}`}>
      <img src={`${base}.png`} width={width} height={height} alt={alt} loading="lazy" decoding="async" />
    </a>
    <figcaption>{caption}
      <span className="figure-links">
        <a href={`${base}.png`} target="_blank" rel="noopener noreferrer">View full size</a>
        <a href={results.source.notebookUrl} target="_blank" rel="noopener noreferrer">Notebook, {section}</a>
        {downloads && <><a href={`${base}.svg`} download>Download chart (SVG)</a><a href={`${base}.csv`} download>Download data (CSV)</a></>}
      </span>
    </figcaption>
  </figure>;
}

export default function IrStudy() {
  return <>
    <StudySection id="overview" title="Retrieve the papers a scientific article cites">
      <p>The query is a scientific paper. The task is to rank documents from a shared corpus of 20,000 papers, with relevance defined by the query paper’s citations. A paper can look topically similar and still fall outside the citation-based gold set.</p>
      <p>We completed this challenge as a three-person group project for the M1 Information Retrieval course at Université Paris-Saclay. I contributed throughout the project, from retrieval experiments to the final system. Our group ranked first at the submission deadline.</p>
      <div className="case-callout"><h3>The challenge output</h3><p>Return exactly 100 ranked document IDs for each query in a JSON submission. The notebook evaluates on 100 public queries with gold citations, then generates a submission for a separate set of 100 held-out queries.</p></div>
      <p>Available fields include title, abstract, full text, section boundaries, research domain, venue and year. We compared short title–abstract representations with body and full-text representations, then combined scores from different retrieval methods.</p>
    </StudySection>

    <StudySection id="experiments" title="From single retrievers to hybrid experiments">
      <div className="case-panels">
        <div><span className="eyebrow">Sparse retrieval</span><h3>TF-IDF and BM25</h3><p>We started with TF-IDF cosine similarity over titles and abstracts. BM25 experiments used both BM25Okapi and a vectorised CountVectorizer implementation, comparing short text with body text and tuning term-frequency and length-normalisation parameters.</p></div>
        <div><span className="eyebrow">Dense retrieval</span><h3>Embeddings and document chunks</h3><p>Precomputed MiniLM embeddings supplied the dense baseline. We explored SPECTER2 with a proximity adapter and chunk-level scoring, and later used GTE-large and BGE-small as complementary dense signals.</p></div>
      </div>
      <h3>Combining ranked lists and scores</h3>
      <p>Reciprocal Rank Fusion combined rankings without needing comparable score scales. Score interpolation instead combined per-query normalised similarities. A three-way mixture of MiniLM, body BM25 and TF-IDF used weights of 0.6, 0.3 and 0.1 in the saved run.</p>
      <p>We also tested a cross-encoder on the top 100 RRF candidates and explored paragraph-level reranking. In the saved document-level reranking run, NDCG@10 fell from 0.5525 for the first-stage RRF to 0.4582. The selected fusion system therefore does not depend on this reranker.</p>
      <h3>Testing the value of metadata</h3>
      <p>An intermediate TF-IDF experiment placed 90 same-domain candidates first, then filled the remaining ten positions with the highest-scoring unseen candidates. Its saved NDCG@10 was 0.6423, compared with 0.4841 for the plain TF-IDF baseline. The later weighted fusion uses domain matching as a soft scoring signal.</p>
    </StudySection>

    <StudySection id="fusion" title="The selected eight-signal system">
      <div className="ir-signal-flow" role="group" aria-label="Dense, sparse and metadata signals combine into a final ranking">
        <div><span className="eyebrow">Dense</span><strong>GTE-large + BGE</strong></div>
        <div><span className="eyebrow">Sparse</span><strong>BM25 + TF-IDF</strong></div>
        <div><span className="eyebrow">Metadata</span><strong>Domain + venue</strong></div>
        <p>Normalise per query → weighted sum → top 100 papers</p>
      </div>
      <Workflow steps={[
        { title: 'Build title–abstract, body and full-text representations', text: 'Body sections come from the supplied chunk boundaries. The selected full-text construction joins title and abstract with body chunks at least 100 characters long.' },
        { title: 'Compute the eight score matrices', text: 'Two dense similarities, four lexical scores and two binary metadata matches produce a score for every query–document pair.' },
        { title: 'Normalise and optimise weights', text: 'Min–max scaling maps each signal to [0, 1] per query. Coordinate descent adjusts one non-negative weight at a time, renormalises the weight vector and keeps changes that improve public-set NDCG@10.' },
        { title: 'Rank and generate the submission', text: 'A weighted sum produces final document scores. The held-out pipeline rebuilds the signals, applies the learned weights and checks the top-100 JSON format.' },
      ]} />
      <NotebookFigure name="ir-fusion-weights" width={1820} height={1066} section="§8.6" downloads
        alt="Eight active fusion weights: GTE-large 0.308, domain 0.228, full-query TF-IDF 0.120, BGE 0.119, title–abstract TF-IDF 0.095, full BM25 0.066, body BM25 0.042, venue 0.022."
        caption="Weights transcribed from the saved GTE-large run, rounded to three decimals. GTE-large has the largest weight, followed by domain matching. A weight is not an isolated measure of a signal’s contribution." />
      <details className="figure-data">
        <summary>View the signal definitions and weights</summary>
        <div className="case-table-wrap" role="region" aria-label="Eight active retrieval signals" tabIndex={0}>
          <table className="case-table">
            <caption>Active signals in the notebook’s final score dictionary.</caption>
            <thead><tr><th scope="col">Signal</th><th scope="col">Weight</th><th scope="col">Representation</th></tr></thead>
            <tbody>{results.weights.map((row) => <tr key={row.signal}><th scope="row">{row.signal}</th><td>{row.weight.toFixed(3)}</td><td>{row.description}</td></tr>)}</tbody>
          </table>
        </div>
      </details>
    </StudySection>

    <StudySection id="results" title="Saved evaluation results">
      <p>The selected run reaches NDCG@10 of 0.7501, Recall@100 of 0.9181 and MAP of 0.6656 on the 100 public queries. The table and chart below use saved notebook outputs; these experiments were not rerun for the portfolio.</p>
      <NotebookFigure name="ir-retrieval-comparison" width={1820} height={1064} section="§7–8" downloads
        alt="Public-query NDCG@10 comparison: TF-IDF 0.4841, tuned body BM25 0.5171, dense MiniLM 0.5073, RRF 0.5525, three-way interpolation 0.5916, domain-filtered TF-IDF 0.6423, eight-signal fusion 0.7501."
        caption="Selected retrieval experiments evaluated on the same 100 public queries. The fusion weights were also tuned on that public set; this chart is not a held-out test comparison." />
      <div className="case-table-wrap" role="region" aria-label="Retrieval model evaluation scores" tabIndex={0}>
        <table className="case-table">
          <caption>Public-query evaluation. NDCG@10 measures top-ten ranking quality, Recall@100 measures citation coverage in the top hundred, and MAP averages precision across relevant hits.</caption>
          <thead><tr><th scope="col">System</th><th scope="col">NDCG@10</th><th scope="col">Recall@100</th><th scope="col">MAP</th></tr></thead>
          <tbody>{results.comparison.map((row) => <tr key={row.model}><th scope="row">{row.model}</th><td>{row.ndcg10.toFixed(4)}</td><td>{row.recall100.toFixed(4)}</td><td>{row.map.toFixed(4)}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="case-callout"><h3>Competition result and local evaluation</h3><p>Our group’s first-place position refers to the challenge at the submission deadline. The notebook’s notes report a Codabench score of 0.7547. That reported competition score is separate from the 0.7501 saved public-query evaluation shown here.</p></div>
    </StudySection>

    <StudySection id="error-analysis" title="Finding the papers is only part of the problem">
      <p>The notebook computes per-query NDCG@10 and recall, then inspects the weakest queries. Three queries have no citation-gold hit in the top ten; one has no gold hit anywhere in the top hundred. Looking at these separately distinguishes candidate-retrieval failures from ranking failures.</p>
      <NotebookFigure name="ir-query-ndcg-distribution" width={790} height={490} section="§10.1"
        alt="Saved histogram of NDCG@10 across 100 queries, with a mean near 0.750, many high-scoring queries and a small group of low-scoring failures."
        caption="Original saved notebook figure. The average hides variation across queries, including three with NDCG@10 equal to zero." />
      <div className="case-table-wrap" role="region" aria-label="Three zero top-ten score examples" tabIndex={0}>
        <table className="case-table">
          <caption>All three examples have NDCG@10 = 0. Recall@100 shows whether the gold papers reached the candidate list.</caption>
          <thead><tr><th scope="col">Query</th><th scope="col">Recall@100</th><th scope="col">Observed failure</th></tr></thead>
          <tbody>{results.failures.map((row) => <tr key={row.query}><th scope="row">{row.query}</th><td>{row.recall100.toFixed(2)}</td><td>{row.explanation}</td></tr>)}</tbody>
        </table>
      </div>
      <p>Broad domain matching helps identify a field but cannot reliably distinguish its subtopics. For the microRNA query, all three cited papers appear in the top hundred yet none reaches the top ten. More candidates alone would not fix that ordering problem.</p>
    </StudySection>

    <StudySection id="limitations" title="What we learned and what remains limited">
      <ul>
        <li>Document representation matters: tuned body-text BM25 outperformed the title–abstract variant in the saved comparison.</li>
        <li>Lexical, dense and metadata scores capture different evidence. Normalising their scales made score-level fusion possible.</li>
        <li>Metadata helps only when the same fields are available and reliable at retrieval time. Strong domain matching can still favour the wrong subtopic.</li>
        <li>The public set has only 100 queries, and optimising weights on it can overfit. Small per-domain samples make some domain averages unstable.</li>
        <li>Citation-based gold labels define this challenge’s notion of relevance; they do not exhaust every scientifically useful or topically related paper.</li>
      </ul>
      <p>The other notebooks explore differential evolution, five-fold cross-validation, ensembles and citation-context retrieval. Those are separate experiment branches, not extra components silently added to the eight-signal run above.</p>
      <details className="figure-data">
        <summary>Source version and experiment labels</summary>
        <p>This page uses repository commit <code>{results.source.commit.slice(0, 7)}</code>. The main notebook has older headings and plot labels referring to nine or ten signals, but its active fusion dictionary contains eight; the extra Nomic signal is commented out.</p>
        <p>The saved held-out generation cell encodes title and abstract for GTE-large, while the public evaluation encodes full query text. The query representation changes between those two stages.</p>
        <p>The saved score and weight outputs are used when nearby markdown discusses a different iteration. The 0.7547 competition score comes from the notebook notes, rather than a saved platform evaluation export.</p>
      </details>
    </StudySection>
  </>;
}
