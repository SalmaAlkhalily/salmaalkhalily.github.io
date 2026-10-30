import { profile } from '../data/portfolio';
import SectionTitle from './SectionTitle';
import { BookIcon } from './icons';

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <SectionTitle eyebrow="About" title="About me" icon={<BookIcon />} />
        <div className="about-copy">
          {profile.about.map((paragraph, index) => (
            <p key={index}>
              {paragraph.map((part) => typeof part === 'string'
                ? part
                : <a key={part.href} href={part.href}>{part.text}</a>)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
