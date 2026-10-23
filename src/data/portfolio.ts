// Portfolio summary content; detailed project pages are in caseStudies.ts.
import { caseStudies } from './caseStudies';
import nlpResults from './nlpResults.json';

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  status?: string;
  location?: string;
  roles?: { title: string; period: string }[];
  highlights: string[];
  links?: { label: string; url: string }[];
}

export interface SkillGroup {
  category: string;
  items: string[];
  secondary?: boolean;
}

export interface EducationItem {
  degree: string;
  field?: string;
  institution: string;
  period: string;
  activity?: { title: string; description: string; url: string };
}

export interface Certification {
  name: string;
  hidden?: boolean;
  issuer?: string;
  details?: string;
  url?: string;
  credentialId?: string;
  linkLabel?: string;
  vendor?: 'microsoft' | 'databricks' | 'cncf' | 'edx' | 'maven' | 'credly';
}

export interface Publication {
  title: string;
  url?: string;
  venue?: string;
}

export interface Project {
  title: string;
  period?: string;
  context?: string;
  /** Two or three sentences: the problem and what was built. */
  description: string;
  /** One supported outcome or scope figure, labelled to distinguish them. */
  result?: string;
  resultLabel?: string;
  preview?: 'policygap' | 'vlm' | 'nlp' | 'ir' | 'shacl';
  tech: string[];
  /** Main stages of the system, shown as a small diagram on the card. */
  pipeline?: string[];
  repo?: string;
  live?: string;
  caseStudy?: string;
  event?: { label: string; url: string };
}

const availability =
  '6-month final-year internship from March 2027 in AI, ML, Data Science or Data Engineering';

const summerSchool = {
  name: 'AI Technologies Summer School 2026',
  url: 'https://ai.lnu.edu.ua/',
};

export const profile = {
  name: 'Salma Alkhalily',
  title: 'AI & Data Science Engineer',
  tagline:
    'I build machine learning and NLP systems, with a focus on information retrieval, RAG and knowledge graphs.',
  location: 'Paris, France',
  availability,
  email: 'salma.alkhalily96@gmail.com',
  cv: '/Salma-Alkhalily-CV.pdf',
  github: 'https://github.com/SalmaAlkhalily',
  linkedin: 'https://www.linkedin.com/in/salmaalkhalily',
  summerSchool,
  facts: [
    { label: 'Studying', value: 'M2 Data, Knowledge & Hybrid AI (DKAI), Université Paris-Saclay' },
    { label: 'Focus', value: 'Machine Learning · NLP · RAG · Knowledge Graphs' },
    { label: 'Open to', value: availability },
    { label: 'Languages', value: 'Arabic (native) · English · French' },
  ],
  focusAreas: [
    { title: 'Machine learning & NLP', description: 'Text classification, regression and model evaluation.' },
    { title: 'Information retrieval & RAG', description: 'Retrieving scientific papers and grounding policy analysis in evidence.' },
    { title: 'Knowledge & hybrid AI', description: 'Knowledge graphs, constraint programming and explainable AI.' },
  ],
  bio: `I'm Salma, an M2 student in Data, Knowledge and Hybrid Artificial Intelligence (DKAI) at Université Paris-Saclay, based in Paris. My background includes 2+ years in software development and implementation, working on web, mobile and desktop applications.

I earned my BSc in Information Technology Engineering at Damascus University, specialising in Software Engineering. My coursework included algorithms, data structures, databases, information retrieval, information systems security and web applications.

At Blue Smart Apps, I built the ListedNearMe Android app with Kotlin, Jetpack Compose and Firebase, from business requirements through design and implementation. I also contributed to the iOS app using Swift and to the web version.

My M1 Data Science studies covered machine learning, NLP, information retrieval and large-scale data processing. In M2, I study knowledge engineering, graph analytics, constraint programming, data mining, hybrid and explainable AI.

Through my M1 programme, I attended the ${summerSchool.name}. Our four-person team developed PolicyGap for its project competition, using RAG to find gaps between policy objectives and supporting evidence.

My other projects include the Scientific Article Information Retrieval Challenge, an NLP project on detecting human, AI-generated and mixed text, and SHACL-based RDF validation. I also contributed to a group research project examining how face accessories affect vision-language model evaluation. I'm seeking a six-month final-year internship from March 2027 in AI, Machine Learning, Data Science or Data Engineering.`,
};

export const skills: SkillGroup[] = [
  {
    category: 'AI & Data Science',
    items: [
      'Python',
      'Machine Learning',
      'scikit-learn',
      'NLP',
      'PyTorch',
      'Transformers',
      'RAG',
      'Vector Search',
    ],
  },
  {
    category: 'Knowledge & Big Data',
    items: ['Apache Spark', 'Apache Hadoop', 'RDF', 'SPARQL', 'SHACL', 'Apache Jena', 'Information Retrieval'],
  },
  {
    category: 'Software Engineering',
    items: ['Java', 'Kotlin', 'Laravel', 'REST APIs', 'Git', 'Docker'],
  },
  {
    category: 'Mobile, Web & Desktop',
    secondary: true,
    items: ['Android', 'Jetpack Compose', 'iOS (Swift, SwiftUI)', 'Firebase', 'Web Development', 'JavaFX', 'PHP', 'OOP', 'Design Patterns', 'UML'],
  },
  {
    category: 'Data & Tools',
    secondary: true,
    items: [
      'Text Classification',
      'Regression',
      'TF-IDF',
      'Hugging Face',
      'XGBoost',
      'LLMs',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'Optuna',
      'Imbalanced-learn',
      'TextBlob',
      'Textstat',
      'SQL',
      'Oracle',
      'MongoDB',
      'Redis',
      'LaTeX',
    ],
  },
  {
    category: 'Languages',
    items: ['Arabic (native)', 'English (professional working)', 'French (professional working)'],
  },
];

// Featured projects. Older or smaller work goes in projectArchive.
export const projects: Project[] = [
  {
    title: 'PolicyGap',
    caseStudy: caseStudies.policygap.path,
    preview: 'policygap',
    context: 'M1 · AI Technologies Summer School · Team of 4',
    event: { label: 'Summer school', url: 'https://ai.lnu.edu.ua/' },
    repo: 'https://github.com/SalmaAlkhalily/ai-compliance',
    period: 'Jun 2026 - Jul 2026',
    description:
      'PolicyGap uses retrieval-augmented generation to find gaps between policy objectives and supporting evidence. I wrote the complete codebase, from embeddings and vector search to LLM analysis and structured reports, for our four-person team at the M1 summer school project competition.',
    resultLabel: 'Implementation scope',
    result: '3 framework families · PDF, DOCX & TXT inputs',
    tech: ['Python', 'FastAPI', 'React', 'ChromaDB', 'RAG', 'Groq'],
    pipeline: ['Policy documents', 'Embeddings', 'Vector search', 'LLM analysis', 'Gap report'],
  },
  {
    title: caseStudies.vlm.title,
    preview: 'vlm',
    caseStudy: caseStudies.vlm.path,
    context: 'M2 · Data Readiness and Evaluation in AI · Group research project',
    repo: 'https://github.com/SalmaAlkhalily/examining-the-effect-of-face-accessories-on-vlm-evaluation',
    description:
      'We studied how caps, glasses and masks change vision-language model outputs for the same face. In this M2 group research project, I worked on human review and the subjective track, and analysed data and evaluation results across the subjective and objective tracks.',
    resultLabel: 'Study scale',
    result: '720 identities · 2,880 images',
    tech: ['Vision-Language Models', 'Human Evaluation', 'Data Analysis', 'MiniCPM', 'SigLIP2'],
    pipeline: ['Portraits + accessories', 'VLM evaluation', 'Human review', 'Subjective + objective analysis'],
  },
  {
    title: 'Detecting Human, AI-Generated and Mixed Text',
    preview: 'nlp',
    caseStudy: caseStudies.nlp.path,
    context: 'M1 · Natural Language Processing · Group project',
    repo: 'https://github.com/SalmaAlkhalily/NLP-Project-AI-Detection',
    period: 'Jan 2026 - Feb 2026',
    description:
      'Our M1 NLP group compared classical models with transformers to classify human, AI-generated and mixed text and estimate the human-written share. We shared the work, including class balancing, model tuning and error analysis.',
    resultLabel: 'Saved test result',
    result: `${nlpResults.classification.find((row) => row.model === 'Tuned XGBoost')!.f1Macro.toFixed(4)} macro F1 · TF-IDF + source distance`,
    tech: ['Python', 'NLP', 'TF-IDF', 'Transformers', 'PyTorch', 'scikit-learn'],
    pipeline: ['Text', 'TF-IDF + transformers', 'Class: human, AI, mixed', 'Human-written share'],
  },
  {
    title: 'Scientific Article Information Retrieval Challenge',
    preview: 'ir',
    caseStudy: caseStudies.ir.path,
    context: 'M1 · Information Retrieval · Team of 3',
    repo: 'https://github.com/naghamabuwarda/IR_Challenge',
    description:
      'We combined lexical retrieval, dense embeddings and metadata to find cited papers in a corpus of 20,000 scientific articles. I contributed throughout this three-person M1 course project, from retrieval experiments to the final eight-signal fusion.',
    resultLabel: 'Challenge result',
    result: '1st place at the submission deadline',
    tech: ['Python', 'BM25', 'TF-IDF', 'GTE-large', 'BGE-small', 'Score Fusion'],
    pipeline: ['Query paper', 'Dense + sparse + metadata', 'Normalise scores', 'Weighted fusion', 'Top 100 papers'],
  },
  {
    title: 'Key-based SHACL generation and validation',
    preview: 'shacl',
    caseStudy: caseStudies.shacl.path,
    context: 'M1 · TER research project · Individual project',
    repo: 'https://github.com/SalmaAlkhalily/Key-Based-SHACL-Shape-Generation-and-Validation-for-RDF-Datasets-with-Property-Mapping-Support',
    period: 'Mar 2025 - May 2025',
    description:
      'I built this M1 TER project in full under Professor Fatiha Sais. The JavaFX tool generates SHACL shapes from RDF keys, maps properties across datasets and reports validation violations.',
    resultLabel: 'Validation scope',
    result: '2 scenarios · shared and mapped properties',
    tech: ['Apache Jena', 'RDF', 'SHACL', 'JavaFX'],
    pipeline: ['RDF keys', 'SHACL shapes', 'Validate sources', 'Violation report'],
  },
];

export const projectArchive: Project[] = [
  {
    title: 'ListedNearMe',
    live: 'https://listednearme.com/',
    period: 'Apr 2020 - Mar 2023',
    description: 'Local marketplace app for buying and selling used products nearby.',
    tech: ['Mobile', 'Google Maps API', 'Google Billing'],
  },
  {
    title: 'OURAMAZONE',
    caseStudy: caseStudies.ouramazone.path,
    repo: caseStudies.ouramazone.repo,
    description: 'E-commerce backend prototype built from Spring Boot microservices.',
    tech: ['Spring Boot', 'Spring Cloud', 'RabbitMQ', 'Zipkin'],
  },
  {
    title: 'Creative Multiplication for Children',
    description: 'Cross-platform app that teaches mental arithmetic through staged games and tests.',
    tech: ['JavaFX', 'Java', 'Laravel API'],
  },
  {
    title: 'Tasty Healthy Food',
    description: 'Web app that suggests daily dishes based on health conditions and calorie needs.',
    tech: ['Web Application', 'Database'],
  },
  {
    title: 'Internet Download Manager',
    caseStudy: caseStudies.downloader.path,
    repo: 'https://github.com/SalmaAlkhalily/files-downloader',
    description: 'Multi-connection HTTP download manager with a progress table and pause, resume and cancel controls.',
    tech: ['Java', 'Swing', 'Multithreading'],
  },
  {
    title: 'Automate DFA',
    caseStudy: caseStudies.dfa.path,
    repo: 'https://github.com/SalmaAlkhalily/automate-dfa',
    description: 'Desktop tool for defining and testing deterministic finite automata, with diagrams for bundled examples.',
    tech: ['Java', 'Swing', 'Automata Theory'],
  },
  {
    title: 'Phone Generator',
    caseStudy: caseStudies.phone.path,
    repo: 'https://github.com/SalmaAlkhalily/phone-generator',
    description: 'Desktop client utility for generating sequential phone-number lists and exporting vCard contacts.',
    tech: ['Java', 'Desktop Application'],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: 'Software Engineer (Remote)',
    company: 'Blue Smart Apps',
    // Dates and roles verified from Salma's LinkedIn experience, 23 October 2026.
    period: 'Apr 2020 – Mar 2023',
    location: 'Damascus, Syria',
    roles: [
      { title: 'Full-stack Developer', period: 'Apr 2020 – Mar 2023' },
      { title: 'Android Developer', period: 'Oct 2020 – Mar 2023' },
      { title: 'iOS Developer', period: 'Aug 2021 – Jun 2022' },
    ],
    links: [{ label: 'ListedNearMe website', url: 'https://listednearme.com/' }],
    highlights: [
      'Designed and implemented functional and non-functional requirements from business stakeholders.',
      'Built the ListedNearMe Android app with Kotlin and Jetpack Compose, backed by Firebase and Firebase Functions.',
      'Contributed to the ListedNearMe iOS app using Swift and to its web version.',
      'Integrated web APIs including Google Maps, Algolia and Google Analytics.',
    ],
  },
  {
    role: 'Freelance Software Engineer',
    company: 'Freelance',
    period: 'Mar 2020 – Sep 2022',
    highlights: ['Developed desktop applications using Java.'],
  },
];

export const education: EducationItem[] = [
  {
    degree: 'M2 Data, Knowledge and Hybrid Artificial Intelligence (DKAI)',
    field: 'Knowledge engineering, graph analytics, constraint programming, data mining, hybrid & explainable AI, adaptive & agentic AI, neurosymbolic AI',
    institution: 'Université Paris-Saclay',
    period: 'Sep 2026 - Present',
  },
  {
    degree: 'M1 Data Science',
    field: 'Hands-on machine learning with scikit-learn, machine learning algorithms & hands-on NLP, mathematics for data science, large-scale distributed data processing, distributed systems for massive data management, information retrieval',
    institution: 'Université Paris-Saclay',
    period: 'Sep 2025 - Jul 2026',
    activity: {
      title: 'Artificial Intelligence Technologies Summer School 2026',
      description: 'Attended as part of my M1 master\'s programme and participated in the project competition with our team project, PolicyGap.',
      url: 'https://ai.lnu.edu.ua/',
    },
  },
  {
    degree: 'BSc Information Technology Engineering',
    field: 'Software Engineering · GPA 15.4/20 · Algorithms, data structures & databases, information retrieval systems, information systems security, web applications, programming languages',
    institution: 'Damascus University',
    period: 'Oct 2015 - Nov 2020',
  },
];

export const certifications: Certification[] = [
  {
    name: 'Participation in the 6th Summer School “Artificial Intelligence Technologies 2026”',
    url: '/images/certificates/summer-school-participation.jpg',
    linkLabel: 'View certificate',
    issuer: 'Ivan Franko National University of Lviv · Issued Jul 2026 · Credential ID №AIT-2026-0497',
    details:
      'Completed the summer school as part of my M1 master\'s programme at Université Paris-Saclay: 120 hours / 4 ECTS credits. I also participated in its project competition with PolicyGap.',
  },
  {
    name: 'AI Technologies Summer School 2026 — PolicyGap Project Competition',
    url: '/images/certificates/summer-school-policygap-competition.jpg',
    linkLabel: 'View certificate',
    issuer: 'Ivan Franko National University of Lviv · Issued Jul 2026',
    details:
      'Participated in the summer school project competition during M1 with PolicyGap, developed by our team of four. I wrote the entire codebase.',
  },
  {
    name: 'Getting Started with Git and GitHub',
    issuer: 'IBM · Coursera · Issued Jan 2024',
    credentialId: 'ARBK5C3CRRUS',
    url: 'https://www.coursera.org/account/accomplishments/records/ARBK5C3CRRUS',
  },
  {
    name: 'Python for Data Science, AI & Development',
    issuer: 'IBM · Coursera · Issued Jan 2024',
    credentialId: 'G7NRB8VKSTPW',
    url: 'https://www.coursera.org/account/accomplishments/records/G7NRB8VKSTPW',
  },
  {
    name: 'Mental arithmetic training certificate · 05/2022 - Present',
    hidden: true,
    issuer: 'This certificate qualifies me to train children at foundational levels in the SD Math programme',
  },
];

export const publications: Publication[] = [];
