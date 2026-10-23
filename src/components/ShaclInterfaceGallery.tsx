const screens = [
  {
    id: 'keys', title: '1. Select RDF data and discover keys',
    src: 'shacl-key-interface.png', width: 835, height: 755,
    description: 'Select an RDF dataset, convert it to N-Triples when needed, then generate and save its keys.',
    alt: 'Key-generation interface with an RDF file selector, input preview and generated-key output area.',
  },
  {
    id: 'shapes', title: '2. Generate shapes with mapped properties',
    src: 'shacl-mapped-shapes-interface.png', width: 829, height: 908,
    description: 'Choose saved keys and a property-mapping file. Generate shapes that use the target dataset’s property names, then save them for validation.',
    alt: 'Shape-generation interface in With Equivalent mode, with separate keys, mapping and generated-shape areas.',
  },
  {
    id: 'validation', title: '3. Validate the target dataset',
    src: 'shacl-mapped-validation-interface.png', width: 830, height: 907,
    description: 'Load target data, mappings and shapes, then inspect validation findings and export the results.',
    alt: 'Validation interface in With Equivalent mode, showing data, mappings, shapes and validation output areas.',
  },
];

export default function ShaclInterfaceGallery() {
  return <div className="shacl-interface-gallery">
    {screens.map((screen, index) => <details className="shacl-interface-panel" key={screen.id} open={index === 0}>
      <summary>{screen.title}</summary>
      <p>{screen.description}</p>
      <figure className="report-figure">
        <a href={`/images/projects/${screen.src}`} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${screen.alt}`}>
          <img src={`/images/projects/${screen.src}`} width={screen.width} height={screen.height} alt={screen.alt} loading="lazy" decoding="async" />
        </a>
        <figcaption>Interface before files are loaded. <a href={`/images/projects/${screen.src}`} target="_blank" rel="noopener noreferrer">Open full-size image</a></figcaption>
      </figure>
    </details>)}
  </div>;
}
