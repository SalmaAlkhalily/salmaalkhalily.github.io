// All site content lives here, based on Salma's CV (cv/Salma ALKHALILY.pdf).

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location?: string;
  highlights: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface EducationItem {
  degree: string;
  field?: string;
  institution: string;
  period: string;
}

export interface Certification {
  name: string;
  issuer?: string;
  details?: string;
  url?: string;
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
  /** Two or three sentences: the problem and what was built. */
  description: string;
  role?: string;
  /** One measurable outcome, e.g. a metric or ranking. */
  result?: string;
  tech: string[];
  /** Main stages of the system, shown as a small diagram on the card. */
  pipeline?: string[];
  repo?: string;
  live?: string;
}

const availability =
  '6-month final-year internship from 2027 in AI, ML, Data Science or Data Engineering';

export const profile = {
  name: 'Salma Alkhalily',
  title: 'AI & Data Science Engineer',
  tagline:
    'I build machine learning, NLP and retrieval systems, backed by 2+ years of professional software engineering.',
  location: 'Paris, France',
  availability,
  email: 'salma.alkhalily96@gmail.com',
  cv: '/Salma-Alkhalily-CV.pdf',
  github: 'https://github.com/SalmaAlkhalily',
  linkedin: 'https://www.linkedin.com/in/salmaalkhalily',
  facts: [
    { label: 'Studying', value: 'M2 Data, Knowledge & Hybrid AI (DKAI), Université Paris-Saclay' },
    { label: 'Focus', value: 'Machine Learning · NLP · RAG · Knowledge Graphs' },
    { label: 'Open to', value: availability },
    { label: 'Languages', value: 'English · French' },
  ],
  interests: [
    'Graph analytics & knowledge discovery',
    'Hybrid & explainable AI',
    'Adaptive & agentic AI',
    'Symbolic to neurosymbolic AI',
    'Retrieval-augmented generation',
  ],
  bio: `M2 student in Data, Knowledge and Hybrid Artificial Intelligence (DKAI) at Université Paris-Saclay, with professional experience in software development and implementation. My background combines strong software engineering with hands-on training in machine learning, data science, knowledge engineering and big data.

I have built web, mobile and desktop applications across different platforms, and I am now applying that engineering foundation to AI: retrieval-augmented generation, NLP, knowledge graphs and hybrid, explainable AI.`,
};

export const skills: SkillGroup[] = [
  {
    category: 'AI & Data Science',
    items: [
      'Python',
      'Machine Learning',
      'scikit-learn',
      'NLP',
      'Text Classification',
      'Regression',
      'TF-IDF',
      'PyTorch',
      'Transformers',
      'Hugging Face',
      'XGBoost',
      'RAG',
      'Vector Search',
      'LLMs',
    ],
  },
  {
    category: 'Knowledge & Big Data',
    items: ['Apache Spark', 'RDF', 'SHACL', 'Apache Jena', 'Information Retrieval'],
  },
  {
    category: 'Software Engineering',
    items: ['Java', 'Kotlin', 'PHP', 'Laravel', 'OOP', 'Design Patterns', 'UML', 'REST APIs', 'Git'],
  },
  {
    category: 'Mobile, Web & Desktop',
    items: ['Android', 'Jetpack Compose', 'iOS (Swift, SwiftUI)', 'Firebase', 'Web Development', 'JavaFX'],
  },
  {
    category: 'Data & Tools',
    items: [
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
      'Docker',
      'LaTeX',
    ],
  },
  {
    category: 'Languages',
    items: ['English (professional working)', 'French (professional working)'],
  },
];

// Featured projects (2-4). Older or smaller work goes in projectArchive.
export const projects: Project[] = [
  {
    title: 'PolicyGap - AITSS Project Competition',
    period: 'Jun 2026 - Jul 2026',
    description:
      'Policy documents often state objectives without the evidence to support them. PolicyGap is a RAG system that finds these gaps, combining document embeddings, vector search and LLM-based analysis to produce structured results.',
    tech: ['RAG', 'Embeddings', 'Vector Search', 'LLMs'],
    pipeline: ['Policy documents', 'Embeddings', 'Vector search', 'LLM analysis', 'Gap report'],
  },
  {
    title: 'Detecting Human, AI-Generated and Mixed Text',
    repo: 'https://github.com/SalmaAlkhalily/NLP-Project-AI-Detection',
    period: 'Jan 2026 - Feb 2026',
    description:
      'Classifies a text as human-written, AI-generated or mixed, and uses regression to estimate the share of each. Compares classical machine learning with transformer models, including imbalance handling and hyperparameter tuning.',
    tech: ['Python', 'NLP', 'TF-IDF', 'Transformers', 'PyTorch', 'scikit-learn'],
    pipeline: ['Text', 'TF-IDF + transformers', 'Class: human, AI, mixed', 'Share of each'],
  },
  {
    title: 'Scientific Article Information Retrieval Challenge',
    description:
      'Finds relevant scientific papers in a 20,000-document corpus using citation-based relevance. Compares TF-IDF, BM25 and dense retrieval, then adds SPECTER2 embeddings, hybrid fusion and cross-encoder reranking, evaluated with NDCG, MAP and MRR.',
    tech: ['Python', 'BM25', 'Dense Retrieval', 'SPECTER2', 'Cross-Encoder Reranking'],
    pipeline: ['Query paper', 'BM25 + SPECTER2', 'Hybrid fusion', 'Cross-encoder rerank', 'Ranked papers'],
  },
  {
    title: 'SHACL Shape Generation and Validation Tool',
    period: 'Mar 2024 - May 2024',
    description:
      'Generates SHACL shapes with uniqueness and sameAs rules from RDF keys, then validates RDF sources against them. Violations are reported in detail through a JavaFX interface.',
    tech: ['Apache Jena', 'RDF', 'SHACL', 'JavaFX'],
    pipeline: ['RDF keys', 'SHACL shapes', 'Validate sources', 'Violation report'],
  },
];

export const projectArchive: Project[] = [
  {
    title: 'ListedNearMe',
    period: 'Apr 2020 - Mar 2023',
    description: 'Local marketplace app for buying and selling used products nearby.',
    tech: ['Mobile', 'Google Maps API', 'Google Billing'],
  },
  {
    title: 'OURAMAZONE',
    description: 'Distributed e-commerce platform built from Spring Boot microservices.',
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
    repo: 'https://github.com/SalmaAlkhalily/files-downloader',
    description: 'Multi-threaded HTTP/HTTPS and FTP download manager with pause, resume and queues.',
    tech: ['Java', 'Swing', 'Multithreading'],
  },
  {
    title: 'Automate DFA',
    repo: 'https://github.com/SalmaAlkhalily/automate-dfa',
    description: 'Desktop tool for creating, testing and visualizing deterministic finite automata.',
    tech: ['Java', 'Swing', 'Automata Theory'],
  },
  {
    title: 'Phone Generator',
    repo: 'https://github.com/SalmaAlkhalily/phone-generator',
    description: 'Desktop app built for a client to generate phone numbers and save them to a phonebook.',
    tech: ['Java', 'Desktop Application'],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: 'Software Engineer (Remote)',
    company: 'Blue Smart Apps',
    period: 'Apr 2020 - Present',
    location: 'Damascus, Syria',
    highlights: [
      'Analyse, design and implement functional and non-functional requirements raised by business stakeholders.',
      'Build Android applications with Kotlin and Jetpack Compose, backed by Firebase and Firebase Functions.',
      'Integrate web APIs including Google Maps, Algolia and Google Analytics.',
    ],
  },
];

export const education: EducationItem[] = [
  {
    degree: 'M2 Data, Knowledge and Hybrid Artificial Intelligence (DKAI)',
    field: 'Graph analytics, hybrid & explainable AI, adaptive & agentic AI, neurosymbolic AI',
    institution: 'Université Paris-Saclay',
    period: 'Sep 2026 - Present',
  },
  {
    degree: 'M1 Data Science',
    field: 'Machine learning, NLP, large-scale distributed data processing, information retrieval',
    institution: 'Université Paris-Saclay',
    period: 'Sep 2025 - Jul 2026',
  },
  {
    degree: 'BSc Information Technology Engineering',
    field: 'Software Engineering · GPA 15.4/20',
    institution: 'Damascus University',
    period: 'Oct 2015 - Nov 2020',
  },
];

export const certifications: Certification[] = [
  {
    name: 'Participation in the 6th Summer School “Artificial Intelligence Technologies 2026”',
    issuer: 'Ivan Franko National University of Lviv · Issued Jul 2026 · Credential ID №AIT-2026-0497',
    details:
      'Successfully completed the VI Summer School “Artificial Intelligence Technologies 2026”, totaling 120 hours / 4 ECTS credits.',
  },
  {
    name: 'AI Technologies Summer School 2026 — PolicyGap Project Competition',
    issuer: 'Ivan Franko National University of Lviv · Issued Jul 2026',
    details:
      'Certificate confirming participation in the project competition with the project “PolicyGap”, as part of AI Technologies Summer School 2026.',
  },
  {
    name: 'Git and GitHub · 01/2024 - Present',
    issuer: 'IBM - Coursera',
  },
  {
    name: 'Python for Data Science, AI & Development · 01/2024 - Present',
    issuer: 'IBM - Coursera',
  },
  {
    name: 'Mental arithmetic training certificate · 05/2022 - Present',
    issuer: 'This certificate qualifies me to train children at foundational levels in the SD Math programme',
  },
];

export const publications: Publication[] = [];
