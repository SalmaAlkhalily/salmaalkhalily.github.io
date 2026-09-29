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
  description: string;
  tech: string[];
  url?: string;
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
      'NLP project that prepares and analyses paired human and generated text, then combines classification (human, AI-generated or mixed content) with regression to predict the proportion of each text category. The project compares classical machine learning and transformer-based models with imbalance handling, hyperparameter tuning and detailed evaluation.',
    tech: [
      'Python',
      'Pandas',
      'NLP',
      'TF-IDF',
      'Transformers',
      'Classification',
      'Regression',
      'PyTorch',
      'scikit-learn',
    ],
  },
  {
    title: 'Scientific Article Information Retrieval Challenge',
    description:
      'Information retrieval system for finding relevant scientific papers from a 20,000-document corpus using citation-based relevance. The project compares TF-IDF, BM25 and dense retrieval, then improves results with SPECTER2 embeddings, hybrid multi-signal fusion, cross-encoder reranking and evaluation with ranking metrics including NDCG, MAP, MRR, precision and recall.',
    tech: [
      'Python',
      'Information Retrieval',
      'TF-IDF',
      'BM25',
      'Dense Retrieval',
      'SPECTER2',
      'Cross-Encoder Reranking',
      'NDCG',
      'MAP',
    ],
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
  {
    title: 'Cross-platform for Creative Multiplication for Children',
    description:
      'Educational cross-platform application built with JavaFX, Java and a Laravel API. It teaches mental arithmetic to children through a placement test, six stages of games and tests, videos, and a parent section to track progress and communicate with the administrator.',
    tech: ['JavaFX', 'Java', 'Laravel API', 'Educational Software'],
  },
  {
    title: 'Tasty healthy food - web Application',
    description:
      'Web application with a food database and reference, analytical and design studies, implementation, testing and documentation to help users choose their daily dishes in a healthy way while taking their diseases and required calories into account.',
    tech: ['Web Application', 'Database', 'Health & Nutrition', 'Testing'],
  },
  {
    title: 'Phone Generator - Desktop Application',
    description:
      'Java desktop application developed for a German customer to generate and save phone numbers based on country key, length, and desired quantity to the mobile phone\'s phonebook.',
    tech: ['Java', 'Desktop Application', 'Phonebook Integration'],
  },
  {
    title: 'OURAMAZONE - Distributed Microservices E-commerce Platform',
    description:
      'Distributed e-commerce platform built with Spring Boot microservices, including user, product, order, inventory and search services. The platform demonstrates service discovery, API gateways, load balancing, circuit breakers, distributed tracing, message queuing, persistence, caching and monitoring.',
    tech: [
      'Java',
      'Spring Boot',
      'Spring Cloud',
      'Microservices',
      'Eureka',
      'API Gateway',
      'Hystrix',
      'RabbitMQ',
      'Zipkin',
      'Maven',
    ],
  },
  {
    title: 'Internet Download Manager',
    description:
      'Java desktop download manager with a Swing graphical interface for HTTP/HTTPS and FTP downloads. It supports multi-threaded downloading, real-time progress tracking, pause and resume, download queues, file management, and download history.',
    tech: ['Java', 'Swing', 'HTTP/HTTPS', 'FTP', 'Multithreading', 'Observer Pattern'],
  },
  {
    title: 'Automate DFA - Deterministic Finite Automata',
    description:
      'Java Swing desktop application for creating, visualizing and testing Deterministic Finite Automata. Users can add new DFAs, test existing DFA files, and visualize automata transitions through a graphical interface.',
    tech: ['Java', 'Swing', 'Automata Theory', 'DFA Visualization'],
    url: 'https://github.com/SalmaAlkhalily/automate-dfa',
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
