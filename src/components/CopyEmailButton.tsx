import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/portfolio';
import { CheckIcon, CopyIcon } from './icons';

export default function CopyEmailButton({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();
  const mounted = useRef(false);
  const copyAttempt = useRef(0);
  const copied = status === 'copied';

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      copyAttempt.current++;
      clearTimeout(resetTimer.current);
    };
  }, []);

  const copy = async () => {
    const attempt = ++copyAttempt.current;
    clearTimeout(resetTimer.current);
    setStatus('idle');
    try {
      await navigator.clipboard.writeText(profile.email);
      if (!mounted.current || attempt !== copyAttempt.current) return;
      setStatus('copied');
      resetTimer.current = setTimeout(() => setStatus('idle'), 2000);
    } catch {
      if (mounted.current && attempt === copyAttempt.current) setStatus('failed');
    }
  };

  return <>
    <button type="button" className={compact ? 'copy-email-icon' : 'btn btn-outline'} onClick={copy}
      aria-label={compact ? (copied ? 'Email address copied' : 'Copy email address') : undefined}
      title={compact ? 'Copy email address' : undefined}>
      {copied ? <CheckIcon width={16} height={16} /> : <CopyIcon width={16} height={16} />}
      {!compact && (copied ? 'Copied' : 'Copy email')}
    </button>
    <span className={status === 'failed' ? 'copy-email-feedback' : 'sr-only'} role="status">
      {copied ? 'Email address copied to clipboard' : status === 'failed' ? 'Couldn’t copy. Select the email address to copy it.' : ''}
    </span>
  </>;
}
