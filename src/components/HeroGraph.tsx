/**
 * Welcome illustration for the hero panel: a small knowledge graph linking
 * Salma's initials to her focus areas. Colors come from the theme variables,
 * so it follows light and dark mode.
 */
const center = { x: 180, y: 100 };

// Listed clockwise so neighbouring topics share a dashed outer edge.
const topics = [
  { label: 'ML', x: 64, y: 30 },
  { label: 'NLP', x: 296, y: 30 },
  { label: 'RAG', x: 318, y: 100 },
  { label: 'Constraint programming', x: 262, y: 170 },
  { label: 'Knowledge graphs', x: 94, y: 170 },
  { label: 'IR', x: 40, y: 100 },
].map((topic) => ({ ...topic, width: topic.label.length * 6.8 + 26 }));

// Small unlabeled nodes give the drawing the texture of a larger graph.
const minor = [
  { x: 180, y: 12, link: 0 },
  { x: 350, y: 56, link: 1 },
  { x: 180, y: 192, link: 4 },
];

export default function HeroGraph({ initials }: { initials: string }) {
  return (
    <svg className="hero-graph" viewBox="0 0 360 200" role="img"
      aria-label="Illustration: a small knowledge graph linking Salma to machine learning, NLP, information retrieval, RAG, knowledge graphs and constraint programming.">
      <g className="hero-graph-edges">
        {topics.map((topic) => <line key={topic.label} x1={center.x} y1={center.y} x2={topic.x} y2={topic.y} />)}
        {topics.map((topic, index) => {
          const next = topics[(index + 1) % topics.length];
          return <line key={`${topic.label}-${next.label}`} className="hero-graph-dashed" x1={topic.x} y1={topic.y} x2={next.x} y2={next.y} />;
        })}
        {minor.map((node) => <line key={`${node.x}-${node.y}`} x1={node.x} y1={node.y} x2={topics[node.link].x} y2={topics[node.link].y} />)}
      </g>
      {minor.map((node) => <circle key={`${node.x}-${node.y}`} className="hero-graph-minor" cx={node.x} cy={node.y} r={3.5} />)}
      {topics.map((topic) => (
        <g key={topic.label} className="hero-graph-topic">
          <rect x={topic.x - topic.width / 2} y={topic.y - 13} width={topic.width} height={26} rx={13} />
          <text x={topic.x} y={topic.y} dominantBaseline="central" textAnchor="middle">{topic.label}</text>
        </g>
      ))}
      <circle className="hero-graph-center" cx={center.x} cy={center.y} r={32} />
      <text className="hero-graph-initials" x={center.x} y={center.y} dominantBaseline="central" textAnchor="middle">
        {initials}
      </text>
    </svg>
  );
}
