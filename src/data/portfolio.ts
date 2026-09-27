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
  description: string;
  tech: string[];
}

export const profile = {
  name: 'Salma Alkhalily',
  title: 'AI & Data Science Engineer',
  tagline:
    'Machine learning, data science and knowledge engineering, built on a solid software engineering foundation.',
  location: 'Paris, France',
  github: 'https://github.com/salmaalkhalily',
  linkedin: 'https://www.linkedin.com/in/salmaalkhalily',
  facts: [
    { label: 'Studying', value: 'M2 Data, Knowledge & Hybrid AI (DKAI), Université Paris-Saclay' },
    { label: 'Focus', value: 'Machine Learning · NLP · RAG · Knowledge Graphs' },
    { label: 'Open to', value: '6-month final-year internship from 2027 in AI, ML, Data Science or Data Engineering' },
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
    items: ['Python', 'Machine Learning', 'scikit-learn', 'NLP', 'RAG', 'Vector Search', 'LLMs'],
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
    items: ['SQL', 'Oracle', 'MongoDB', 'Docker', 'LaTeX'],
  },
  {
    category: 'Languages',
    items: ['English (professional working)', 'French (professional working)'],
  },
];

export const projects: Project[] = [
  {
    title: 'PolicyGap - AITSS Project Competition',
    period: 'Jun 2026 - Jul 2026',
    description:
      'RAG-based system that analyses policy documents and identifies gaps between stated objectives and available evidence, using document embeddings, vector search and LLM-based analysis to produce structured results.',
    tech: ['RAG', 'Embeddings', 'Vector Search', 'LLMs'],
  },
  {
    title: 'Detecting Human, AI-Generated and Mixed Text',
    period: 'Jan 2026 - Feb 2026',
    description:
      'NLP project combining text classification (human, AI-generated or mixed content) with regression to predict the proportion of each text category.',
    tech: ['Python', 'NLP', 'Classification', 'Regression'],
  },
  {
    title: 'SHACL Shape Generation and Validation Tool',
    period: 'Mar 2024 - May 2024',
    description:
      'Generates SHACL shapes with uniqueness and sameAs rules from RDF keys and validates them against RDF sources with equivalent keys, producing detailed violation reports through a JavaFX interface.',
    tech: ['Apache Jena', 'RDF', 'SHACL', 'JavaFX'],
  },
  {
    title: 'ListedNearMe',
    period: 'Apr 2020 - Mar 2023',
    description:
      'Local marketplace app for buying and selling used products nearby: search by price and category, contact sellers, make offers, rate transactions and boost listings.',
    tech: ['Google Maps API', 'Google Billing', 'Mobile'],
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
    name: 'VI Summer School “Artificial Intelligence Technologies 2026”',
    issuer: 'Ivan Franko National University of Lviv · Jul 2026',
  },
];

export const publications: Publication[] = [];
