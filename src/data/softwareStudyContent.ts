export const softwareDetails = {
  ouramazone: {
    overview: 'I developed OURAMAZONE with Inas Nasri. The project explores how separate services cooperate around an e-commerce domain, with distinct modules for user, catalogue and order logic.',
    image: 'ouramazone-eureka-interface.png', width: 1520, height: 564,
    alt: 'Running Spring Eureka dashboard showing system status and an initially empty service registry.',
    caption: 'The project’s Eureka dashboard running locally. This capture shows discovery infrastructure before business services register; it is not a storefront.',
    steps: [
      { title: 'Discover services', text: 'Eureka provides a registry; gateway and Zuul modules provide routing infrastructure.' },
      { title: 'Handle business requests', text: 'Separate modules expose user, product, order, search and inventory operations through HTTP endpoints.' },
      { title: 'Coordinate and observe', text: 'RabbitMQ supports messaging, while Sleuth and Zipkin dependencies support distributed tracing.' },
    ],
    implementation: [
      'The backend separates user management, product catalogues, orders, inventory and search. Service discovery and routing connect these responsibilities.',
      'Products can be listed, looked up, created and deleted. Each service runs on its own port and uses shared discovery infrastructure.',
      'The application uses Spring Boot and Spring Cloud to organise its services.',
    ],
    limitations: 'This is a backend prototype. A local run verified the Eureka dashboard, GET /users and GET /products. RabbitMQ, Zipkin, checkout behaviour and the complete distributed workflow were not validated in this review. No production scalability or reliability result is claimed.',
  },
  downloader: {
    overview: 'This project brings download controls into a desktop interface: a URL field, a progress table and actions for each transfer. It separates the Swing interface from the code that manages network connections and download state.',
    image: 'download-manager-interface.png', width: 813, height: 662,
    alt: 'Internet Downloader window with a URL field, progress table and pause, resume, cancel and remove controls.',
    caption: 'The application launched from the repository source. The empty table shows the initial state before a download is added.',
    steps: [
      { title: 'Add a URL', text: 'The main window accepts an HTTP address and asks the download manager to create a transfer.' },
      { title: 'Track the transfer', text: 'Worker threads perform network work; the table model and progress renderer display URL, size, progress and status.' },
      { title: 'Control the download', text: 'Pause, resume and cancel actions update the selected transfer. The UI enables or disables controls according to its state.' },
    ],
    implementation: [
      'The interface displays the progress and state of each transfer while background workers manage network connections.',
      'HTTP downloads use up to eight connections by default. Java network and file APIs handle the transfers without a web backend.',
      'The project incorporates download logic credited to Luu Gia Thuy under the MIT licence; the original attribution is preserved in the repository.',
    ],
    limitations: 'The source compiled and the main interface launched on Java 11. The URL validator accepts http:// addresses and rejects https:// addresses. The FTP menu opens an unfinished form with a disabled Download button. Transfer speed and pause/resume behaviour across real servers were not benchmarked here; HTTP range support and server behaviour affect resumable transfers.',
  },
  dfa: {
    overview: 'Automate DFA connects a formal automaton definition with a small desktop workflow. Users can create an automaton or load a saved one, then provide input strings to test its transitions and acceptance conditions.',
    image: 'automate-dfa-interface.png', width: 674, height: 431,
    alt: 'DFA editor with fields for state count, alphabet, final states, start state and transition table, plus a save button.',
    caption: 'The real DFA creation form, opened from “Add New DFA” after launching the application.',
    steps: [
      { title: 'Define the automaton', text: 'Enter the number of states, alphabet, accepting states, start state and transition table.' },
      { title: 'Save and reload', text: 'Save the automaton definition locally and reload it in the test window.' },
      { title: 'Test an input', text: 'The tester checks symbols against the alphabet and follows the transition rules to determine acceptance.' },
    ],
    implementation: [
      'A Swing interface lets users define states, transitions and acceptance conditions, then save and reload an automaton.',
      'Three bundled examples include diagrams. Visualisation is limited to those examples; custom automata do not receive automatically generated diagrams.',
    ],
    limitations: 'The source compiled and the creation form opened on Java 11. A completed acceptance test was not validated in the local run. The saved format uses Java serialization, and the bundled visualisations cover specific examples.',
  },
  phone: {
    overview: 'I developed this client utility with Yara. It creates sequential number lists from user-supplied prefixes and keeps the last generated suffix locally so a later batch can continue the sequence.',
    image: 'phone-generator-interface.png', width: 760, height: 434,
    alt: 'Phone Generator form with country name, country code, starting digits, length and count fields.',
    caption: 'The generation form opened from the running application. No personal contacts or client data were loaded.',
    steps: [
      { title: 'Configure a batch', text: 'Supply a country name, code, starting digits, length parameter and requested count.' },
      { title: 'Generate sequential values', text: 'The application increments and pads each suffix, then saves the new list and continuation state locally.' },
      { title: 'Review and export', text: 'Review generated values and export vCard 2.1 contacts for importing into other software.' },
    ],
    implementation: [
      'The application saves the last sequence value for each country so later batches can continue from it.',
      'The length setting applies to the numeric suffix before the country code and starting digits are added. Generated numbers can be reviewed in a table and exported as vCard contacts.',
      'Generated lists and continuation values are saved locally in the documents area of the user account.',
    ],
    limitations: 'The source compiled and the form opened on Java 11. A syntactically generated sequence does not establish that a number exists or is assigned to a subscriber. Full batch generation, continuation and import into a contacts app were not validated in this review.',
  },
};
