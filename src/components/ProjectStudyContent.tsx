import type { ReactNode } from 'react';
import projectResults from '../data/projectResults.json';
import HumanReviewFlow from './HumanReviewFlow';
import ShaclInterfaceGallery from './ShaclInterfaceGallery';

export function StudySection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} className="case-section" aria-labelledby={`${id}-title`}><h2 id={`${id}-title`}>{title}</h2>{children}</section>;
}

export function Workflow({ steps }: { steps: { title: string; text: string }[] }) {
  return <ol className="case-workflow">{steps.map((step, index) => <li key={step.title}>
    <span className="workflow-index" aria-hidden>{String(index + 1).padStart(2, '0')}</span>
    <div><h3>{step.title}</h3><p>{step.text}</p></div>
  </li>)}</ol>;
}

function StudyFigure({ src, alt, caption, width, height, downloads = [] }: {
  src: string; alt: string; caption: string; width: number; height: number;
  downloads?: { href: string; label: string }[];
}) {
  return <figure className="report-figure">
    <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${alt}`}>
      <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
    </a>
    <figcaption>{caption}
      <span className="figure-links">
        <a href={src} target="_blank" rel="noopener noreferrer">View full size</a>
        {downloads.map((item) => <a href={item.href} key={item.href} download>{item.label}</a>)}
      </span>
    </figcaption>
  </figure>;
}

function PropertyMappingDiagram() {
  return <figure className="mapping-figure">
    <div className="mapping-diagram">
      <div className="mapping-dataset"><span className="eyebrow">Source dataset</span><strong>Book key</strong><code>hasAuthor</code><code>hasTitle</code></div>
      <div className="mapping-connection"><span aria-hidden>→</span><span>Supplied property mapping</span></div>
      <div className="mapping-dataset"><span className="eyebrow">Target dataset</span><strong>Equivalent key</strong><code>author</code><code>title</code></div>
    </div>
    <figcaption>The property names change; the key still combines author and title.</figcaption>
  </figure>;
}

function AccuracyChangesTable() {
  return <details className="figure-data">
    <summary>View all 18 accuracy changes as a table</summary>
    <div className="case-table-wrap" role="region" aria-label="All accessory accuracy changes" tabIndex={0}>
      <table className="case-table">
        <caption>Changes from the original image, in percentage points, for 720 paired identities. Significance and confidence intervals are shown in the chart above.</caption>
        <thead><tr><th scope="col">Attribute</th><th scope="col">Accessory</th><th scope="col">MiniCPM-V 4.6</th><th scope="col">SigLIP 2</th></tr></thead>
        <tbody>{projectResults.accuracyChanges.rows.map((row) => <tr key={`${row.attribute}-${row.accessory}`}>
          <th scope="row">{row.attribute}</th><td>{row.accessory}</td><td>{row.miniCPM.toFixed(1).replace('-', '−')}</td><td>{row.siglip.toFixed(1).replace('-', '−')}</td>
        </tr>)}</tbody>
      </table>
    </div>
    <a className="text-link" href="/images/projects/vlm-accuracy-changes.csv" download>Download accuracy data (CSV)</a>
  </details>;
}

export function ShaclStudy() {
  return <>
    <StudySection id="overview" title="Reusing validation rules across RDF datasets">
      <p>Two datasets can describe the same kind of resource while using different property names. A book dataset might use <code>hasAuthor</code> and <code>hasTitle</code>; another might use <code>author</code> and <code>title</code>. Rediscovering keys for every dataset repeats work, while applying the original shapes unchanged can target the wrong properties.</p>
      <p>I completed the entire project for my M1 TER at Université Paris-Saclay under Professor Fatiha Sais. I built a JavaFX tool to convert RDF files, run external key discovery, generate SHACL shapes and inspect validation findings. Property mappings let the same discovered keys be tested on structurally similar datasets with different vocabularies.</p>
      <div className="case-callout"><h3>What counts as a key?</h3><p>A key is a set of properties whose combined values distinguish resources in a dataset. A key discovered in one dataset may fail in another, so reuse still requires validation.</p></div>
    </StudySection>

    <StudySection id="workflow" title="From RDF files to validation results">
      <Workflow steps={[
        { title: 'Convert the input to N-Triples', text: 'Apache Jena handles Turtle, RDF/XML and N-Quads inputs. N-Quads are merged into a single graph when exported to the triple-based format required by SAKey.' },
        { title: 'Discover keys with SAKey', text: 'The application runs the external Scalable Almost Key Discovery tool. With n = 1, it yields 0-almost keys, used here as strict uniqueness keys. Non-key outputs are discarded.' },
        { title: 'Generate SHACL shapes', text: 'Each discovered key becomes a node shape with property constraints. The generation uses either the original property names or their supplied mappings.' },
        { title: 'Validate the target dataset', text: 'Apache Jena checks the data graph against the shapes. The validation output identifies affected resources and keys, explains each violation and counts findings by constraint.' },
      ]} />
    </StudySection>

    <StudySection id="interface" title="Explore the application interface">
      <p>The JavaFX interface follows three stages: discover keys, generate shapes and validate data. Each screen below shows the controls before input files are loaded. The property-mapping mode adds a mapping file to adapt shapes to another vocabulary.</p>
      <p>Expand a stage to see its interface, or open the image at full size.</p>
      <ShaclInterfaceGallery />
    </StudySection>

    <StudySection id="property-mapping" title="Two ways to reuse a discovered key">
      <PropertyMappingDiagram />
      <div className="case-panels">
        <div><span className="eyebrow">Scenario 1</span><h3>The same property names</h3><p>Datasets with the same property structure reuse the discovered keys and generated shapes. Validation checks whether the keys remain effective on the new data.</p></div>
        <div><span className="eyebrow">Scenario 2</span><h3>Equivalent properties with different names</h3><p>A supplied mapping translates the key properties before shapes are generated for the target dataset. Key discovery does not need to run again.</p></div>
      </div>
      <div className="case-table-wrap" role="region" aria-label="Property mapping example" tabIndex={0}>
        <table className="case-table">
          <caption>Book example: translate the properties, keep the key’s structure.</caption>
          <thead><tr><th scope="col">Source dataset</th><th scope="col">Target dataset</th></tr></thead>
          <tbody>
            <tr><td><code>hasAuthor</code></td><td><code>author</code></td></tr>
            <tr><td><code>hasTitle</code></td><td><code>title</code></td></tr>
            <tr><td><code>{'{hasAuthor, hasTitle}'}</code></td><td><code>{'{author, title}'}</code></td></tr>
          </tbody>
        </table>
      </div>
      <p>These mappings are inputs to the workflow. The project does not automatically infer that two properties have the same meaning.</p>
    </StudySection>

    <StudySection id="validation" title="What the tool checks">
      <p>The generated shapes combine property constraints with SPARQL-based duplicate checks. They specify string datatype constraints and a single required value for each key property, along with two checks for repeated key values.</p>
      <dl className="case-definitions">
        <div><dt>Uniqueness</dt><dd>Detect distinct resources that share the same values for every property in a key.</dd></div>
        <div><dt>Identity links</dt><dd>Generate an <code>owl:sameAs</code> rule for duplicate resources and a constraint that flags duplicates missing the expected link.</dd></div>
        <div><dt>Property structure</dt><dd>Check datatype and cardinality constraints for the resources selected by each shape, including missing values and more than one value where <code>maxCount = 1</code>.</dd></div>
      </dl>
      <p>The generated SPARQL targets select resources that share key values. The shapes also include an <code>owl:sameAs</code> rule, but Apache Jena's validation call does not execute that rule to create identity links.</p>
      <h3>Output that explains the failure</h3>
      <p>The JavaFX interface lets users run the workflow, view outputs and save them to files. Validation output includes the affected data instances, the key involved, an error message, a count for each breached constraint and the total findings.</p>
      <div className="case-table-wrap" role="region" aria-label="Validation findings example" tabIndex={0}>
        <table className="case-table">
          <caption>Nine validation findings from the building test sample. Counts are validation entries; one resource can appear under more than one constraint.</caption>
          <thead><tr><th scope="col">Finding</th><th scope="col">Count</th><th scope="col">Meaning</th></tr></thead>
          <tbody>
            <tr><th scope="row">Duplicate key values</th><td>4</td><td>Two resources share the same combination of key-property values.</td></tr>
            <tr><th scope="row">Missing <code>owl:sameAs</code></th><td>4</td><td>Duplicate resources lack the expected identity link.</td></tr>
            <tr><th scope="row">Invalid cardinality</th><td>1</td><td>A resource has two values for a property constrained to at most one.</td></tr>
          </tbody>
        </table>
      </div>
    </StudySection>

    <StudySection id="evaluation" title="From discovered keys to reusable shapes">
      <p>I evaluated key discovery and shape generation on three RDF datasets. Each discovered key produced one SHACL shape. Validation used constructed subsets with duplicates, testing both original property names and mapped equivalents.</p>
      <div className="case-table-wrap" role="region" aria-label="Key discovery and shape generation results" tabIndex={0}>
        <table className="case-table">
          <caption>Dataset size and generated keys and shapes in the project evaluation.</caption>
          <thead><tr><th scope="col">Dataset</th><th scope="col">Triples</th><th scope="col">Properties</th><th scope="col">Keys</th><th scope="col">Shapes</th></tr></thead>
          <tbody>
            <tr><th scope="row">YAGO Buildings</th><td>114,743</td><td>16</td><td>40</td><td>40</td></tr>
            <tr><th scope="row">OAEI Restaurants1</th><td>1,130</td><td>7</td><td>8</td><td>8</td></tr>
            <tr><th scope="row">Open Restaurant Applications</th><td>16,351</td><td>37</td><td>791</td><td>791</td></tr>
          </tbody>
        </table>
      </div>
      <p>Format-conversion checks preserved triple, property and class counts for Open Restaurant Applications and small FOAF Person examples. The restaurant dataset retained 16,351 triples, 37 properties and one class after conversion from RDF/XML to N-Triples.</p>
      <p>These results describe the tested datasets. A generated shape still needs validation on each target dataset; the number of shapes alone does not measure data quality.</p>
    </StudySection>

    <StudySection id="scope" title="Scope and limits of the implementation">
      <p>The evaluation covers three source datasets and small constructed validation subsets. It does not establish an advantage over other shape-generation tools or performance across all RDF datasets.</p>
      <ul>
        <li>The key-discovery setup assumes input instances belong to a single class.</li>
        <li>Property equivalences must be supplied before validating a dataset with different property names.</li>
        <li>Converting N-Quads to N-Triples merges named graphs, so graph names are not preserved.</li>
        <li>Before validation, the prototype lowercases property names and normalises the sample data to an example namespace and string values. This changes the original RDF representation.</li>
        <li>A key discovered in the source data is a candidate for the target data, not a guarantee of uniqueness there.</li>
      </ul>
    </StudySection>
  </>;
}

export function VlmStudy() {
  return <>
    <StudySection id="overview" title="The same face, a different accessory">
      <p>Would a vision-language model give the same answer about a face after glasses, a cap or a mask were added? Our group studied whether these edits change attribute recognition, shift occupation associations and affect demographic groups differently.</p>
      <p>This was a group assignment for the M2 Data Readiness and Evaluation in AI course at Université Paris-Saclay, supervised by Adrian Popescu. I worked on human review and the subjective track, and analysed data and evaluation results across the subjective and objective tracks.</p>
      <StudyFigure src="/images/projects/vlm-accessory-example.png" width={872} height={264}
        alt="One synthetic identity shown as an original portrait and with a generated mask, cap and glasses."
        caption="One of the study’s synthetic identities and its three accessory edits. The editing process aimed to preserve the rest of the portrait." />
    </StudySection>

    <StudySection id="experiment" title="A balanced, paired-image experiment">
      <p>We sampled 720 synthetic identities from a dataset of 9,000 metadata-matched portraits. The sample contains 30 identities in each of 24 cells: four dataset ethnicity labels, two gender labels and three ages (25, 40 and 55). These are source-dataset categories used for the audit.</p>
      <Workflow steps={[
        { title: 'Select balanced original portraits', text: 'Match image identifiers to metadata and filter candidates flagged as already wearing glasses, while retaining 30 identities per cell.' },
        { title: 'Create three accessory edits per identity', text: 'FLUX.2 [klein] 4B adds glasses, a baseball cap or a surgical mask. The evaluation set contains 720 originals and 2,160 edited images.' },
        { title: 'Evaluate two model families', text: 'MiniCPM-V 4.6 generates fixed-choice answers; SigLIP 2 scores image-text associations. Each original and edited image receives the same task prompts and inference settings.' },
        { title: 'Compare changes within each identity', text: 'Measure original-to-edit differences, then test whether those changes vary across the dataset’s demographic groups.' },
      ]} />
      <div className="case-panels">
        <div><span className="eyebrow">Objective track</span><h3>Attribute recognition</h3><p>Predict the dataset’s age, gender and ethnicity labels. MiniCPM uses fixed-choice questions; SigLIP selects the option with the highest mean score across four text templates. Accuracy is measured against metadata.</p></div>
        <div><span className="eyebrow">Subjective track</span><h3>Occupation associations</h3><p>Measure changes for software engineer, nurse and construction worker prompts. MiniCPM gives a five-point rating; SigLIP uses a job score relative to a neutral person prompt.</p></div>
      </div>
      <div className="case-callout"><h3>What the subjective scores mean</h3><p>Job suitability cannot be determined from a face. These prompts audit the models’ stereotypes; they do not measure a person’s ability or support using such scores in recruitment.</p></div>
      <h3>Statistical analysis</h3>
      <p>We used exact McNemar tests for paired accuracy changes, exact sign tests for subjective score shifts and Kruskal–Wallis tests for differences in effects between groups. Confidence intervals use 5,000 bootstrap resamples over identities. We evaluated significance before correction and with a Bonferroni sensitivity check.</p>
      <p>A separate pilot of eight identities and 40 images tested the pipeline and prompts. Early MiniCPM-V 2.6 JSON answers often abstained or broke the format; the final setup used MiniCPM-V 4.6 with forced-choice letters. Pilot results were excluded from the main evaluation.</p>
    </StudySection>

    <StudySection id="human-review" title="Checking the generated images">
      <p>Reviewers compared a random subset of edits with their originals. Four checks covered accessory presence, natural placement, preservation of the portrait and visual defects. Each check allowed Yes, No or Uncertain, followed by an overall Accept, Reject or Uncertain decision.</p>
      <HumanReviewFlow />
      <StudyFigure src="/images/projects/vlm-human-review.png" width={1748} height={867}
        alt="Acceptance of reviewed generated edits: masks 89.1 percent, 270 of 303; caps 86.8 percent, 263 of 303; glasses 100 percent, 84 of 84."
        caption="Acceptance in the reviewed subset. The remaining decisions combine rejected and uncertain cases; separate counts are unavailable."
        downloads={[{ href: '/images/projects/vlm-human-review.svg', label: 'Download chart (SVG)' }, { href: '/images/projects/vlm-human-review.csv', label: 'Download data (CSV)' }]} />
      <div className="case-table-wrap" role="region" aria-label="Human review acceptance rates" tabIndex={0}>
        <table className="case-table">
          <caption>Acceptance rates in the reviewed subset, not the full set of generated images.</caption>
          <thead><tr><th scope="col">Accessory</th><th scope="col">Reviewed</th><th scope="col">Accepted</th><th scope="col">Acceptance</th></tr></thead>
          <tbody>
            {projectResults.humanReview.rows.map((row) => <tr key={row.accessory}><th scope="row">{row.accessory}</th><td>{row.reviewed}</td><td>{row.accepted}</td><td>{(100 * row.accepted / row.reviewed).toFixed(1)}%</td></tr>)}
          </tbody>
        </table>
      </div>
      <p>Rejected examples included mask straps entering the ears and caps that removed hair or appeared beneath it. The review log recorded the image, accessory, reviewer, timestamp and decision, with notes for rejected or uncertain cases.</p>
    </StudySection>

    <StudySection id="results" title="What changed when accessories were added">
      <h3>Masks produced the largest age-accuracy drop</h3>
      <p>All 18 paired accuracy effects were negative; 13 were significant before correction and 10 remained significant after the Bonferroni check. Masks reduced age accuracy by 17.2 percentage points for MiniCPM-V 4.6 and 17.6 points for SigLIP 2.</p>
      <div className="case-table-wrap" role="region" aria-label="Age accuracy without accessories and with masks" tabIndex={0}>
        <table className="case-table">
          <caption>Age accuracy across the 720 identities. Changes are in percentage points.</caption>
          <thead><tr><th scope="col">Model</th><th scope="col">Original</th><th scope="col">Mask</th><th scope="col">Change</th></tr></thead>
          <tbody>
            <tr><th scope="row">MiniCPM-V 4.6</th><td>86.5%</td><td>69.3%</td><td>−17.2 pp</td></tr>
            <tr><th scope="row">SigLIP 2</th><td>55.7%</td><td>38.1%</td><td>−17.6 pp</td></tr>
          </tbody>
        </table>
      </div>
      <StudyFigure src="/images/projects/vlm-attribute-accuracy.png" width={1395} height={549}
        alt="Accuracy-change chart: masks lower age accuracy by 17.2 points for MiniCPM and 17.6 for SigLIP; caps also reduce ethnicity and gender accuracy."
        caption="Paired accuracy changes with 95% bootstrap confidence intervals. Stars denote exact McNemar tests: * p < 0.05, ** p < 0.01, *** p < 0.001; hollow points are not significant at 0.05." />
      <AccuracyChangesTable />
      <h3>Errors were directional and uneven across groups</h3>
      <p>With a cap, MiniCPM labelled 13.3% of women as male, compared with 1.1% without an accessory; SigLIP’s corresponding rates were 10.0% and 0.8%. Caps and masks caused the largest ethnicity-accuracy losses for identities labelled Indian in the source dataset. These are model errors against synthetic-dataset metadata.</p>
      <h3>Occupation scores followed accessory stereotypes</h3>
      <p>For SigLIP 2, a mask increased the neutral-adjusted nurse score for all 720 identities, by an average of 3.32 logits. A cap raised the construction-worker score for 716 identities. MiniCPM rated most originals as “very suitable”, creating a ceiling effect, but still showed a consistent glasses–software engineer association.</p>
      <StudyFigure src="/images/projects/vlm-job-score-shifts.png" width={1395} height={399}
        alt="Occupation-association heatmaps for MiniCPM and SigLIP. SigLIP masks increase nurse scores for every identity, and caps raise construction-worker scores for almost all identities."
        caption="The first value is the net percentage rated higher minus lower; Δ is the mean score change. MiniCPM rating points and SigLIP logits are different units. Stars denote exact sign tests using the thresholds above; outlined cells mark stereotype-linked pairs." />
    </StudySection>

    <StudySection id="limitations" title="How to interpret the findings">
      <p>The study shows accessory sensitivity in these two models on a controlled synthetic dataset. It does not establish how every VLM behaves on real photographs.</p>
      <ul>
        <li><strong>Editing drift:</strong> only edited images pass through FLUX. Originals are 256 × 256 pixels and edits 512 × 512. A no-edit pilot showed shifts of a similar size to some small accessory effects; the main study has no full-scale no-edit control.</li>
        <li><strong>Sampled quality review:</strong> human checks covered a subset of edits, so reported acceptance rates do not establish quality for every image.</li>
        <li><strong>Limited categories and prompts:</strong> the dataset uses four ethnicity labels, binary gender and three ages. These labels are not self-identification. The evaluation uses one fixed wording and option order per task.</li>
        <li><strong>Model and score limits:</strong> two open model families were evaluated, and MiniCPM’s high suitability ratings compress the available scale. Tests are reported without multiple-comparison correction, alongside a sensitivity check.</li>
      </ul>
      <p>Future work includes broader model coverage, real photographs, a full-scale no-edit control, a human baseline and mitigation experiments.</p>
    </StudySection>
  </>;
}
