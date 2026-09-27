import type { ReactNode } from 'react';

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export default function SectionTitle({ eyebrow, title, subtitle, icon }: SectionTitleProps) {
  return (
    <div className="section-title">
      <div className="section-kicker">
        {icon && <span className="section-icon">{icon}</span>}
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
