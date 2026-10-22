import { skills } from '../data/portfolio';
import SectionTitle from './SectionTitle';
import { CompassIcon } from './icons';

export default function Skills() {
  return (
    <section id="skills" style={{ background: 'var(--color-bg-subtle)' }}>
      <div className="container">
        <SectionTitle
          eyebrow="Practice Areas"
          title="Skills & Expertise"
          subtitle="Tools, methods and languages I work with"
          icon={<CompassIcon />}
        />
        <dl className="skill-list">
          {skills.map((group) => (
            <div key={group.category} className="grid">
              <dt className="span-3">{group.category}</dt>
              <dd className="span-9">{group.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
