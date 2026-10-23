import results from '../data/nlpResults.json';
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
        <a href={results.source.notebookUrl} target="_blank" rel="noopener noreferrer">Notebook: {section}</a>
        {downloads ? <><a href={`${base}.svg`} download>Download chart (SVG)</a><a href={`${base}.csv`} download>Download data (CSV)</a></> : <a href={`${base}.csv`} download>Download counts (CSV)</a>}
      </span>
    </figcaption>
  </figure>;
}

export default function NlpStudy() {
  return <>
    <StudySection id="overview" title="Recognising authorship when a text can be mixed">
      <p>A text can contain both human writing and generated passages. We studied this through two tasks: assigning an authorship class and estimating how much of the text was written by a human.</p>
      <p>We completed this as a group project for the M1 Natural Language Processing course at Université Paris-Saclay. We shared the work across the project, comparing classical models with transformers and examining their errors on mixed texts.</p>
      <div className="case-panels">
        <div><span className="eyebrow">Classification</span><h3>Human, mixed or AI</h3><p>Predict one of three labels. Macro F1 gives each class equal weight, which helps assess performance when the AI class has fewer examples.</p></div>
        <div><span className="eyebrow">Regression</span><h3>Human-written share</h3><p>Predict a value from 0 to 1: zero for fully generated text, one for human text, and intermediate values for mixed writing.</p></div>
      </div>
    </StudySection>

    <StudySection id="data" title="Preparing the data and inspecting class balance">
      <p>The data preparation notebook starts from <code>{results.source.dataset}</code>, keeps English texts and pairs AI and mixed samples with human source texts through their topic IDs. The exploratory work examines writing domains, generation models, prompt types and semantic distance from the source.</p>
      <p>The main training notebook loads 27,107 texts across the following splits. AI-generated examples make up about a quarter of each split, with human and mixed texts accounting for most of the remainder.</p>
      <div className="case-table-wrap" role="region" aria-label="Main notebook dataset split and class counts" tabIndex={0}>
        <table className="case-table">
          <caption>Counts from the main notebook’s saved class-distribution output, before training-set oversampling.</caption>
          <thead><tr><th scope="col">Split</th><th scope="col">Human</th><th scope="col">Mixed</th><th scope="col">AI</th><th scope="col">Total</th></tr></thead>
          <tbody>{results.splits.map((row) => <tr key={row.split}><th scope="row">{row.split}</th><td>{row.human.toLocaleString('en-US')}</td><td>{row.mixed.toLocaleString('en-US')}</td><td>{row.ai.toLocaleString('en-US')}</td><td>{row.total.toLocaleString('en-US')}</td></tr>)}</tbody>
        </table>
      </div>
      <Workflow steps={[
        { title: 'Clean text for lexical features', text: 'Lowercase the text, remove URLs, filter characters and normalise whitespace. Fit the TF-IDF vocabulary on the training split, then transform validation and test texts with the same vocabulary.' },
        { title: 'Add distance from the paired source', text: 'The preparation code uses all-MiniLM-L6-v2 embeddings to compute one minus cosine similarity between the source and target text. Classical models receive this value alongside TF-IDF.' },
        { title: 'Balance the training examples', text: 'SMOTE increases the training representation of each class to 8,225 examples, for 24,675 examples in total. Validation and test counts stay unchanged. Transformer classification uses class-weighted loss.' },
      ]} />
    </StudySection>

    <StudySection id="models" title="Comparing lexical features with transformer fine-tuning">
      <h3>Classical models</h3>
      <p>We trained logistic regression, a calibrated linear SVM and a tuned XGBoost classifier. Their input combines 5,000 TF-IDF features with the source-distance value. Unigrams, bigrams and trigrams capture local word patterns; frequency thresholds filter very rare and very common terms.</p>
      <p>XGBoost tuning samples six parameter combinations with two-fold cross-validation, using macro F1 as the objective. The selected classifier uses a maximum depth of 6, a learning rate of 0.2 and a minimum child weight of 2.</p>
      <h3>DistilBERT and RoBERTa</h3>
      <p>We fine-tuned <code>distilbert-base-uncased</code> and <code>roberta-base</code> for three-class prediction. Both use a 512-token limit, dynamic padding and class-weighted cross-entropy. Training runs for up to four epochs, selecting a checkpoint by validation macro F1.</p>
      <div className="case-callout"><h3>The inputs differ</h3><p>The custom transformer trainer removes the cosine-distance feature before calling the model. The transformer scores therefore describe text-only models, while the classical scores include information from a paired source text. This affects how we interpret the comparison.</p></div>
    </StudySection>

    <StudySection id="classification" title="Classification results on the test split">
      <p>Tuned XGBoost has the highest saved macro F1, at 0.9121, with 92.03% accuracy on 2,711 test texts. RoBERTa leads the two text-only transformers with a macro F1 of 0.8436. These are saved notebook results; the models were not retrained for this page.</p>
      <NotebookFigure name="nlp-classification-comparison" width={1820} height={889} section="baseline and embedding model evaluation" downloads
        alt="Test macro F1: tuned XGBoost 0.9121, SVM 0.8796, logistic regression 0.8564, RoBERTa 0.8436, DistilBERT 0.8157. Classical models use TF-IDF plus source distance; transformers use text only."
        caption="Macro F1 gives equal weight to human, mixed and AI classes. Colours distinguish the input features used by each model family." />
      <div className="case-table-wrap" role="region" aria-label="Test classification metrics for five models" tabIndex={0}>
        <table className="case-table">
          <caption>Saved test metrics rounded to four decimals. Weighted F1 weights each class by its number of test examples.</caption>
          <thead><tr><th scope="col">Model</th><th scope="col">Input</th><th scope="col">Accuracy</th><th scope="col">Macro F1</th><th scope="col">Weighted F1</th></tr></thead>
          <tbody>{results.classification.map((row) => <tr key={row.model}><th scope="row">{row.model}</th><td>{row.input}</td><td>{row.accuracy.toFixed(4)}</td><td>{row.f1Macro.toFixed(4)}</td><td>{row.f1Weighted.toFixed(4)}</td></tr>)}</tbody>
        </table>
      </div>
    </StudySection>

    <StudySection id="error-analysis" title="Where mixed and generated writing overlap">
      <p>In the tuned XGBoost run, 100 mixed texts are predicted as AI and 109 AI texts are predicted as mixed. Together, these account for 209 of the 216 classification errors. The notebook inspects individual examples from both directions, as well as the few AI and mixed texts classified as human.</p>
      <NotebookFigure name="nlp-xgboost-confusion" width={661} height={490} section="XGBoost error analysis"
        alt="Tuned XGBoost confusion matrix. Actual human: 1008 human, 0 mixed, 0 AI. Actual mixed: 6 human, 914 mixed, 100 AI. Actual AI: 1 human, 109 mixed, 573 AI."
        caption="Original saved notebook figure. Rows are true classes and columns are predictions; most errors occur between mixed and AI text." />
      <details className="figure-data">
        <summary>View the confusion matrix as a table</summary>
        <div className="case-table-wrap" role="region" aria-label="Tuned XGBoost confusion matrix counts" tabIndex={0}>
          <table className="case-table">
            <caption>Counts transcribed from the saved figure above, on the same 2,711 test examples.</caption>
            <thead><tr><th scope="col">Actual class</th><th scope="col">Predicted human</th><th scope="col">Predicted mixed</th><th scope="col">Predicted AI</th></tr></thead>
            <tbody>{results.confusion.rows.map((row) => <tr key={row.actual}><th scope="row">{row.actual}</th><td>{row.human}</td><td>{row.mixed}</td><td>{row.ai}</td></tr>)}</tbody>
          </table>
        </div>
      </details>
      <p>The transformer reports show a different pattern: RoBERTa reaches AI recall of 0.96, while human and mixed recall are 0.78 and 0.80. That makes per-class analysis useful alongside the overall score.</p>
    </StudySection>

    <StudySection id="regression" title="Estimating how much of a text is human-written">
      <p>For mixed texts, the target is derived from the annotated AI character intervals: human-written share equals one minus the AI character count divided by total text length. Pure human and pure AI examples receive targets of 1 and 0.</p>
      <p>We compared weighted Ridge regression, tuned XGBoost regression and a RoBERTa regression head. Training weights use ten bins over the target range to give more weight to sparsely represented ratios. Predictions are clipped to [0, 1] for evaluation.</p>
      <NotebookFigure name="nlp-regression-comparison" width={1820} height={781} section="regression model comparison" downloads
        alt="Test RMSE, lower is better: tuned XGBoost 0.1720, RoBERTa 0.1767, Ridge regression 0.2295. XGBoost and Ridge use TF-IDF plus source distance; RoBERTa uses text only."
        caption="Root mean squared error on the human-share target. The different input features also apply to this regression comparison." />
      <div className="case-table-wrap" role="region" aria-label="Test regression metrics for three models" tabIndex={0}>
        <table className="case-table">
          <caption>Saved test results rounded to six decimals. Lower MSE, RMSE and MAE are better; higher R² is better.</caption>
          <thead><tr><th scope="col">Model</th><th scope="col">MSE</th><th scope="col">RMSE</th><th scope="col">MAE</th><th scope="col">R²</th></tr></thead>
          <tbody>{results.regression.map((row) => <tr key={row.model}><th scope="row">{row.model}</th><td>{row.mse.toFixed(6)}</td><td>{row.rmse.toFixed(6)}</td><td>{row.mae.toFixed(6)}</td><td>{row.r2.toFixed(6)}</td></tr>)}</tbody>
        </table>
      </div>
      <p>Tuned XGBoost has the lowest saved RMSE at 0.171984 and an R² of 0.817947. RoBERTa follows with an RMSE of 0.176742. The regression target describes character share; it does not locate the generated passages within a text.</p>
    </StudySection>

    <StudySection id="limitations" title="What the experiments taught us">
      <ul>
        <li>Mixed writing needs separate evaluation. Its errors can disappear inside an overall accuracy score, so we used macro F1, per-class reports and confusion matrices.</li>
        <li>Source distance requires access to a paired human text. Results that use it do not establish performance on arbitrary texts without a known source.</li>
        <li>Long inputs are truncated. The DistilBERT token-length check on 1,000 training texts found a 95th percentile of 623 tokens, beyond the 512-token input limit.</li>
        <li>The transformer logs show rising validation loss after epoch two, despite falling training loss. Validation-based checkpoint selection helps avoid selecting the final epoch automatically.</li>
      </ul>
      <details className="figure-data">
        <summary>Source versions and evaluation scope</summary>
        <p>This page uses commit <code>{results.source.commit.slice(0, 7)}</code>. The preparation notebook saves an earlier split of 13,492 / 1,687 / 1,687 examples, while the main notebook loads 21,685 / 2,711 / 2,711. The tables here consistently use the main notebook’s saved counts and scores.</p>
        <p>The preparation code uses random row splits, so it does not establish separation by topic or source text. XGBoost classification cross-validation also follows SMOTE resampling; applying resampling inside each fold would give a cleaner tuning estimate.</p>
        <p>The later transformer hyperparameter-search and final combined-comparison cells are commented out. This page compares the five classifiers with saved individual test outputs and makes no claim of an additional tuned transformer run.</p>
        <p>The human-share function uses fallback values when mixed-text interval parsing fails. Its regression scores evaluate that constructed target. Generalisation to other languages, domains and unseen generation models would need further evaluation.</p>
      </details>
    </StudySection>
  </>;
}
