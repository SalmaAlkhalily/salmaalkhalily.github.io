interface PolicyGapLogoProps {
  variant: 'preview' | 'hero';
  alt: string;
}

export default function PolicyGapLogo({ variant, alt }: PolicyGapLogoProps) {
  // Preview cards span the mobile container, capped at 420px; desktop cards
  // have a 320px column. The hero uses a separate 180px / 140px logo slot.
  const sizes = variant === 'preview'
    ? '(max-width: 460px) calc(100vw - 40px), (max-width: 768px) 420px, 320px'
    : '(max-width: 768px) 140px, 180px';

  return <picture className={variant === 'hero' ? 'case-project-logo' : 'policygap-logo'}>
    <source type="image/webp" srcSet="/images/projects/policygap-logo-320.webp 320w, /images/projects/policygap-logo-640.webp 640w" sizes={sizes} />
    <img src="/images/projects/policygap-logo.png" width={1254} height={1254}
      loading={variant === 'preview' ? 'lazy' : 'eager'} decoding="async" alt={alt} />
  </picture>;
}
