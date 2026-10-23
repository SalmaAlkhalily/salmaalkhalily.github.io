import { skills, type SkillGroup } from '../data/portfolio';
import SectionTitle from './SectionTitle';
import { CompassIcon } from './icons';

function SkillList({ groups }: { groups: SkillGroup[] }) {
  return <dl className="skill-list">
    {groups.map((group) => <div key={group.category} className="grid">
      <dt className="span-3">{group.category}</dt>
      <dd className="span-9">{group.items.join(' · ')}</dd>
    </div>)}
  </dl>;
}

export default function Skills() {
  return (
    <section id="skills" style={{ background: 'var(--color-bg-subtle)' }}>
      <div className="container">
        <SectionTitle
          eyebrow="Skills"
          title="Tools & methods"
          subtitle="Tools I use in AI projects and software development."
          icon={<CompassIcon />}
        />
        <SkillList groups={skills.filter((group) => !group.secondary)} />
        <details className="additional-skills">
          <summary>More development and data tools</summary>
          <SkillList groups={skills.filter((group) => group.secondary)} />
        </details>
      </div>
    </section>
  );
}
