import irResults from './irResults.json';
import nlpResults from './nlpResults.json';
import policyGapData from './policyGapData.json';
import { softwareStudies } from './softwareStudies';

export interface CaseStudy {
  path: string;
  title: string;
  shortTitle: string;
  category: string;
  introduction: string;
  description: string;
  supervisor?: string;
  team: string;
  institution?: string | false;
  archive?: boolean;
  repo: string;
  report?: string;
  demo?: { src: string; poster: string; width: number; height: number; backupUrl: string };
  additionalSources?: { label: string; url: string; detail?: string }[];
  technologies: string[];
  facts: { value: string; label: string }[];
  contents: { id: string; label: string }[];
}

const vlmTitle = 'Examining the Effect of Face Accessories in VLM Face Evaluation';

export const caseStudies = {
  ...softwareStudies,
  policygap: {
    path: '/projects/policygap.html',
    title: 'PolicyGap: evidence-backed policy gap analysis',
    shortTitle: 'PolicyGap',
    category: 'M1 · AI Technologies Summer School 2026 · Project competition',
    introduction: 'A RAG application that compares cybersecurity policy documents with framework requirements, retrieves supporting evidence and helps reviewers inspect and prioritise gaps.',
    description: 'PolicyGap, an M1 summer school competition project: document ingestion, evidence retrieval, LLM findings, human review and gap scoring. Architecture and explanatory charts.',
    team: 'Group project · Team of 4',
    repo: policyGapData.source.repository,
    demo: {
      src: '/videos/policygap-demo.mp4',
      poster: '/images/projects/policygap-demo-poster.webp',
      width: 1920,
      height: 870,
      backupUrl: 'https://drive.google.com/file/d/1Z8wLoTA40ImgABdwph1qTX1In7jqzzrS/view',
    },
    additionalSources: [{ label: 'AI Technologies Summer School 2026', url: 'https://ai.lnu.edu.ua/', detail: 'Programme and project competition' }],
    technologies: ['Python', 'FastAPI', 'React', 'ChromaDB', 'Sentence Transformers', 'Groq', 'Llama 3.3', 'SQLAlchemy', 'SQLite', 'RAG'],
    facts: [
      { value: '3', label: 'framework families' },
      { value: '3', label: 'input formats: PDF, DOCX & TXT' },
      { value: 'Top 5', label: 'retrieved chunks per control' },
    ],
    contents: [
      { id: 'overview', label: 'Problem & context' },
      { id: 'demo', label: '1-minute demo' },
      { id: 'architecture', label: 'Architecture' },
      { id: 'pipeline', label: 'Evidence pipeline' },
      { id: 'scoring', label: 'Gap scoring' },
      { id: 'review', label: 'Human review & reports' },
      { id: 'limitations', label: 'Scope & lessons' },
      { id: 'sources', label: 'Resources' },
    ],
  },
  shacl: {
    path: '/projects/shacl-validation.html',
    title: 'Key-based SHACL shape generation and validation',
    shortTitle: 'SHACL validation',
    category: 'M1 Data Science · TER research project',
    introduction: 'A desktop tool that turns discovered RDF keys into reusable validation constraints, including when datasets use different names for the same properties.',
    description: 'Salma Alkhalily’s M1 TER project: RDF key discovery with SAKey, SHACL shape generation, property mappings and validation with Apache Jena.',
    supervisor: 'Professor Fatiha Sais',
    team: 'Individual research project',
    repo: 'https://github.com/SalmaAlkhalily/Key-Based-SHACL-Shape-Generation-and-Validation-for-RDF-Datasets-with-Property-Mapping-Support',
    technologies: ['Java', 'Apache Jena', 'SAKey', 'RDF', 'SHACL', 'SPARQL', 'JavaFX'],
    facts: [
      { value: '2', label: 'validation scenarios' },
      { value: 'SAKey', label: 'external key discovery' },
      { value: 'JavaFX', label: 'desktop interface' },
    ],
    contents: [
      { id: 'overview', label: 'Overview' },
      { id: 'workflow', label: 'Workflow' },
      { id: 'interface', label: 'Application interface' },
      { id: 'property-mapping', label: 'Property mapping' },
      { id: 'validation', label: 'Validation & outputs' },
      { id: 'evaluation', label: 'Evaluation results' },
      { id: 'scope', label: 'Scope & limits' },
      { id: 'sources', label: 'Resources' },
    ],
  },
  vlm: {
    path: '/projects/vlm-face-accessories.html',
    title: vlmTitle,
    shortTitle: vlmTitle,
    category: 'M2 · Data Readiness and Evaluation in AI',
    introduction: 'A paired-image study of how glasses, caps and masks change vision-language model outputs for the same synthetic face, across attribute recognition and subjective occupation associations.',
    description: 'A group research project on 720 synthetic identities and 2,880 images, evaluating accessory effects in MiniCPM-V 4.6 and SigLIP 2. Human review, methods and results.',
    supervisor: 'Adrian Popescu',
    team: 'Group research project · 5 authors',
    repo: 'https://github.com/SalmaAlkhalily/examining-the-effect-of-face-accessories-on-vlm-evaluation',
    report: '/reports/vlm-face-accessories-report.pdf',
    technologies: ['MiniCPM-V 4.6', 'SigLIP 2', 'FLUX.2', 'Python', 'Human review', 'Statistical analysis'],
    facts: [
      { value: '720', label: 'synthetic identities' },
      { value: '2,880', label: 'original + edited images' },
      { value: '2', label: 'model families evaluated' },
    ],
    contents: [
      { id: 'overview', label: 'Overview' },
      { id: 'experiment', label: 'Experiment design' },
      { id: 'human-review', label: 'Human review' },
      { id: 'results', label: 'Results' },
      { id: 'limitations', label: 'Limitations' },
      { id: 'sources', label: 'Resources' },
    ],
  },
  ir: {
    path: '/projects/scientific-article-retrieval.html',
    title: 'Scientific article information retrieval',
    shortTitle: 'Scientific article retrieval',
    category: 'M1 · Information Retrieval course challenge',
    introduction: 'Retrieving cited scientific papers from a 20,000-document corpus by combining lexical matching, dense embeddings and research metadata.',
    description: 'Scientific article retrieval challenge: sparse and dense baselines, eight-signal fusion, evaluation results and error analysis. An M1 group project by Salma Alkhalily and teammates.',
    team: 'Group project · Team of 3',
    repo: irResults.source.repository,
    technologies: ['Python', 'scikit-learn', 'Sentence Transformers', 'BM25', 'GTE-large', 'BGE-small', 'NumPy', 'Pandas'],
    facts: [
      { value: '20,000', label: 'candidate scientific papers' },
      { value: '100', label: 'public evaluation queries' },
      { value: '0.7501', label: 'public-set NDCG@10' },
    ],
    contents: [
      { id: 'overview', label: 'Challenge & contribution' },
      { id: 'experiments', label: 'Retrieval experiments' },
      { id: 'fusion', label: 'Eight-signal fusion' },
      { id: 'results', label: 'Results' },
      { id: 'error-analysis', label: 'Error analysis' },
      { id: 'limitations', label: 'Lessons & limits' },
      { id: 'sources', label: 'Resources' },
    ],
  },
  nlp: {
    path: '/projects/ai-text-detection.html',
    title: 'Detecting human, AI-generated and mixed text',
    shortTitle: 'Human, AI & mixed text detection',
    category: 'M1 · Natural Language Processing course',
    introduction: 'Classifying English texts by authorship and estimating their human-written share, with classical machine learning, fine-tuned transformers and analysis of mixed-text errors.',
    description: 'An M1 NLP group project comparing human, mixed and AI text classification and human-share regression. Methods, saved results, charts and error analysis.',
    team: 'Group project · Team of 3',
    repo: nlpResults.source.repository,
    technologies: ['Python', 'TF-IDF', 'scikit-learn', 'XGBoost', 'SMOTE', 'PyTorch', 'Hugging Face Transformers', 'DistilBERT', 'RoBERTa'],
    facts: [
      { value: '27,107', label: 'texts in the study' },
      { value: '3', label: 'authorship classes' },
      { value: '2', label: 'tasks: classification & regression' },
    ],
    contents: [
      { id: 'overview', label: 'Overview' },
      { id: 'data', label: 'Data & preparation' },
      { id: 'models', label: 'Model approaches' },
      { id: 'classification', label: 'Classification results' },
      { id: 'error-analysis', label: 'Mixed-text errors' },
      { id: 'regression', label: 'Human-share regression' },
      { id: 'limitations', label: 'Lessons & limits' },
      { id: 'sources', label: 'Resources' },
    ],
  },
} satisfies Record<string, CaseStudy>;

export type CaseStudyKey = keyof typeof caseStudies;

export function findCaseStudy(pathname: string): CaseStudyKey | undefined {
  return (Object.keys(caseStudies) as CaseStudyKey[]).find((key) => caseStudies[key].path === pathname);
}

const origin = 'https://salmaalkhalily.github.io';

export function getPageMetadata(pathname: string) {
  const caseKey = findCaseStudy(pathname);
  if (caseKey) {
    const study = caseStudies[caseKey];
    return { pathname: study.path, title: `${study.shortTitle} | Salma Alkhalily`, description: study.description, url: `${origin}${study.path}`, kind: 'Article' };
  }
  if (pathname === '/archive.html') {
    return { pathname, title: 'Project archive | Salma Alkhalily', description: 'Earlier mobile, web and desktop software projects by Salma Alkhalily.', url: `${origin}${pathname}`, kind: 'CollectionPage' };
  }
  return {
    pathname: '/', title: 'Salma Alkhalily | AI & Data Science Portfolio',
    description: "Salma Alkhalily's portfolio: AI, machine learning, NLP and data science projects, software engineering experience, and GitHub repositories. Paris, France.",
    url: `${origin}/`, kind: 'ProfilePage',
  };
}
