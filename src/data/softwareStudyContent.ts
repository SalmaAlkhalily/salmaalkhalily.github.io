export const softwareDetails = {
  ouramazone: {
    overview: 'I developed OURAMAZONE with Inas Nasri. The project explores how separate services cooperate around an e-commerce domain, with distinct modules for user, catalogue and order logic.',
    image: 'ouramazone-eureka-interface.png', width: 1520, height: 564,
    alt: 'Running Spring Eureka dashboard showing system status and an initially empty service registry.',
    caption: 'The project’s Eureka dashboard running locally. This capture shows discovery infrastructure before business services register; it is not a storefront.',
    steps: [
      { title: 'Discover services', text: 'Eureka provides a registry; gateway and Zuul modules provide routing infrastructure.' },
      { title: 'Handle business requests', text: 'Separate modules expose user, product, order, search and inventory operations through HTTP endpoints.' },
      { title: 'Coordinate and observe', text: 'RabbitMQ sender/receiver code supports messaging, while Sleuth and Zipkin dependencies support distributed tracing.' },
    ],
    implementation: [
      'The spring-cloud directory contains nine service modules: amazone-user, amazone-product, amazone-order, amazoneInventory, amazoneSearch, amazoneUsers, eureka, gateway and eureka-amazone-consumer-zuul. This includes two user-related modules.',
      'The product controller exposes catalogue listing, lookup, creation and deletion endpoints. The inventory module has repositories for inventories and orders. Service properties assign separate ports and include service-discovery configuration.',
      'The runnable modules inherit Spring Boot 2.1.6 and Spring Cloud Greenwich.SR2 from the nested parent POM. The repository root has a different, older parent and module list, so individual service POMs are the useful build entry points.',
    ],
    limitations: 'This is a backend prototype. A local run verified the Eureka dashboard, GET /users and GET /products. The screenshot shows the registry before those business services registered. RabbitMQ, Zipkin, checkout behaviour and the complete distributed workflow were not validated in this review. No production scalability or reliability result is claimed.',
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
      'DownloadManager keeps the download list and creates HttpDownloader instances. Downloader implements observable transfer state, while DownloadManagerGUI observes updates. DownloadTableModel and ProgressRenderer handle the tabular presentation.',
      'HTTP downloading splits work across connections; the manager defaults to eight connections per download. The project uses Java’s network and file APIs without a web backend.',
      'Some download-core files retain an MIT copyright notice crediting Luu Gia Thuy. Those existing attributions remain in the repository; this page does not claim that all underlying download logic is original work.',
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
      { title: 'Save and reload', text: 'The editor stores an Elements object; the test window loads that definition from a selected file.' },
      { title: 'Test an input', text: 'The tester checks symbols against the alphabet and follows the transition rules to determine acceptance.' },
    ],
    implementation: [
      'Select is the entry menu. DFA_Automate builds the automaton definition, Elements stores its data and TestAutomata reads it through ObjectInputStream. The interface is built with Swing and NetBeans form layouts.',
      'The repository also includes three example diagram windows. Their images are selected for specific example filenames; the code does not provide a general graph-layout engine for every automaton the user creates.',
    ],
    limitations: 'The source compiled and the creation form opened on Java 11. The capture shows an empty definition, not a completed acceptance test. The saved format uses Java serialization, and the bundled visualisations cover specific examples.',
  },
  phone: {
    overview: 'I developed this client utility with Yara. It creates sequential number lists from user-supplied prefixes and keeps the last generated suffix locally so a later batch can continue the sequence.',
    image: 'phone-generator-interface.png', width: 760, height: 434,
    alt: 'Phone Generator form with country name, country code, starting digits, length and count fields.',
    caption: 'The generation form opened from the running application. No personal contacts or client data were loaded.',
    steps: [
      { title: 'Configure a batch', text: 'Supply a country name, code, starting digits, length parameter and requested count.' },
      { title: 'Generate sequential values', text: 'GeneratingProcess increments the suffix, pads it and writes the new list and continuation state to local files.' },
      { title: 'Review and export', text: 'ViewGeneratedPhones displays generated values and provides a vCard 2.1 export action for importing contacts into other software.' },
    ],
    implementation: [
      'Settings opens the generation interface. Generate collects parameters and calls GeneratingProcess. The latter reads the previous sequence value from a country-specific file and writes the next batch.',
      'The implementation pads the numeric suffix to the supplied length before adding the code and starting digits. That detail matters when choosing the desired final number length. ViewGeneratedPhones handles the table and VCF export.',
      'Files are stored under a Phone Generator directory in the user’s documents area, with separate files for each country’s last value and new batch.',
    ],
    limitations: 'The source compiled and the form opened on Java 11. A syntactically generated sequence does not establish that a number exists or is assigned to a subscriber. Full batch generation, continuation and import into a contacts app were not validated in this review.',
  },
};
