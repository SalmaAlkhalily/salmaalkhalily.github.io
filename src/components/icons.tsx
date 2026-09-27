import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

/* ------------ Section / decorative icons (thin line) ------------ */

export function BookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19a1 1 0 0 1 1 1v15.5A1.5 1.5 0 0 1 18.5 21H6a2 2 0 0 1-2-2V4.5Z" />
      <path d="M4 17.5A1.5 1.5 0 0 1 5.5 16H20" />
      <path d="M8 7h8M8 11h6" />
    </svg>
  );
}

export function ScrollIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3h11a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H8" />
      <path d="M4 5v13a3 3 0 0 0 3 3h9" />
      <path d="M11 8h6M11 12h4" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-2 5-5 2 2-5 5-2Z" />
    </svg>
  );
}

export function QuillIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20c6-1 10-4 13-9 1.5-2.5 2-4.5 3-8-4.5.8-7.5 2.5-10.5 5.5S5 14 4 20Z" />
      <path d="M4 20c2-3 5-5 8-6" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 14.4 9l5.6.5-4.3 3.8L17 19l-5-3-5 3 1.3-5.7L4 9.5 9.6 9 12 3.5Z" />
    </svg>
  );
}

export function GraduationIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m3 9 9-4 9 4-9 4-9-4Z" />
      <path d="M7 11v4c0 1 2 2.5 5 2.5s5-1.5 5-2.5v-4" />
      <path d="M20 10v5" />
    </svg>
  );
}

export function EnvelopeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

/* ------------ Meta icons for timeline/education (small) ------------ */

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 21V6l8-3 8 3v15" />
      <path d="M4 21h16" />
      <path d="M9 10h1M14 10h1M9 14h1M14 14h1M9 18h1M14 18h1" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12 4 4 10-10" />
    </svg>
  );
}

/* ------------ Brand icons ------------ */

export function GitHubIcon(props: IconProps) {
  return (
    <svg {...base} {...props} strokeWidth={0} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.55 9.55 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base} {...props} strokeWidth={0} fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-.95 1.83-1.94 3.77-1.94C21.6 8.7 22 11 22 14v7h-4v-6.2c0-1.48-.03-3.39-2.06-3.39-2.07 0-2.39 1.62-2.39 3.28V21h-4V9Z" />
    </svg>
  );
}

export function LinkExternalIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 5h5v5" />
      <path d="M19 5 10 14" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}
