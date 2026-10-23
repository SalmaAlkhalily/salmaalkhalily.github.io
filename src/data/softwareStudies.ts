import type { CaseStudy } from './caseStudies';

const owner = 'https://github.com/SalmaAlkhalily/';
const contents = [
  { id: 'overview', label: 'Overview' }, { id: 'interface', label: 'Interface' },
  { id: 'workflow', label: 'How it works' }, { id: 'implementation', label: 'Design choices' },
  { id: 'limitations', label: 'Scope & limits' }, { id: 'sources', label: 'Resources' },
];
function study(slug: string, title: string, introduction: string, repository: string,
  team: string, technologies: string[], facts: CaseStudy['facts']): CaseStudy {
  return {
    path: `/projects/${slug}.html`, title, shortTitle: title, category: 'Software engineering · Earlier work',
    introduction, description: `${title} by Salma Alkhalily: workflow, design choices${slug === 'phone-generator' ? ' and a real interface capture.' : ' and scope.'}`,
    repo: owner + repository, team, institution: false, archive: true, technologies, facts,
    contents: slug === 'phone-generator' ? contents : contents.filter((item) => item.id !== 'interface'),
  };
}

export const softwareStudies = {
  ouramazone: study('ouramazone', 'OURAMAZONE',
    'An e-commerce backend split into Spring Boot services for users, products, orders, inventory and search, with service discovery and messaging.',
    'distributed-systems-amazon-microservices-eureka-server',
    'Developed with Inas Nasri', ['Java', 'Spring Boot', 'Spring Cloud', 'Eureka', 'RabbitMQ', 'Zipkin', 'H2'],
    [{ value: '6', label: 'business-service modules' }, { value: '3', label: 'discovery & routing modules' }, { value: 'REST', label: 'service interfaces' }]),
  downloader: study('internet-download-manager', 'Internet Download Manager',
    'A Swing desktop application for managing HTTP downloads, tracking progress and controlling transfers through pause, resume and cancel actions.',
    'files-downloader',
    'Desktop software project', ['Java', 'Swing', 'HTTP', 'Multithreading', 'Observer pattern'],
    [{ value: 'HTTP', label: 'accepted URL protocol' }, { value: '8', label: 'default HTTP connections per download' }, { value: 'Swing', label: 'desktop interface' }]),
  dfa: study('automate-dfa', 'Automate DFA',
    'A desktop tool for defining deterministic finite automata, saving their transition rules and testing whether input strings are accepted.',
    'automate-dfa',
    'Educational desktop project', ['Java', 'Swing', 'Automata Theory', 'Serialization'],
    [{ value: '5', label: 'automaton-definition inputs' }, { value: 'DFA', label: 'deterministic state transitions' }, { value: 'Java', label: 'saved automaton objects' }]),
  phone: study('phone-generator', 'Phone Generator',
    'A desktop utility for creating sequential phone-number lists and exporting contacts as vCard files, developed as a custom client solution.',
    'phone-generator',
    'Client project · Developed with Yara', ['Java', 'Swing', 'File I/O', 'vCard'],
    [{ value: '5', label: 'generation parameters' }, { value: '2.1', label: 'vCard export version' }, { value: 'Local', label: 'sequence-state storage' }]),
};

export type SoftwareStudyKey = keyof typeof softwareStudies;
export function isSoftwareStudyKey(key: string): key is SoftwareStudyKey {
  return Object.prototype.hasOwnProperty.call(softwareStudies, key);
}
