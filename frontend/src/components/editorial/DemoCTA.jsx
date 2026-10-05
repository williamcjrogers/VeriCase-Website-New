import { useEffect, useRef, useState } from 'react';
import { Copy, Mail } from 'lucide-react';
import { CONTACT_EMAIL, DEMO_MAILTO } from '@/lib/site';
import { CTA_LABEL, CTA_MICROCOPY, DEMONSTRATION } from '@/content/home';
import { trackDemonstration } from '@/lib/analytics';
import { cn } from '@/lib/utils';

// "Request a demonstration": a mailto with the subject and body prefilled, an optional
// "Copy email address" button (confirmed in a status line beside it) and the confidentiality
// microcopy. No form submits anything. The compact form is for the header band: the same
// mailto and copy fallback, with the copy button reduced to an icon and the confirmation
// announced rather than shown. Manual-copy guidance remains visible if copying fails.
export const DemoCTA = ({ onInk = false, withCopy = false, compact = false, microcopy = CTA_MICROCOPY, className, align = 'start', placement, section }) => {
  const plain = useRef(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const copyGuidance = "Copy the email address manually, then paste it into your email app.";
  useEffect(() => {
    if (!copyFailed || !plain.current) return;
    const selection = window.getSelection();
    if (!selection) return;
    const range = document.createRange();
    range.selectNodeContents(plain.current);
    selection.removeAllRanges();
    selection.addRange(range);
  }, [copyFailed]);
  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(false), 4000);
    return () => clearTimeout(t);
  }, [copied]);
  const copy = async () => {
    setCopied(false);
    setCopyFailed(false);
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      trackDemonstration(placement, section, true);
    } catch {
      setCopyFailed(true);
    }
  };
  if (compact) {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <div className="flex items-center gap-1 sm:gap-2">
        <a href={DEMO_MAILTO} onClick={() => trackDemonstration(placement, section)} className={cn('vc-btn vc-btn-primary max-sm:px-3 max-sm:text-[0.875rem]', onInk && 'vc-btn-on-ink')}>
          {CTA_LABEL}
        </a>
        {withCopy && (
          <button
            type="button"
            onClick={copy}
            aria-label={DEMONSTRATION.copy}
            title={DEMONSTRATION.copy}
            className={cn('vc-btn vc-btn-secondary w-11 shrink-0 px-0 max-sm:hidden', onInk && 'vc-btn-secondary-on-ink')}
          >
            <Copy className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        )}
        </div>
        {withCopy && (
          <span role="status" aria-atomic="true" className={copyFailed ? cn('text-caption', onInk ? 'text-mist' : 'text-graphite') : 'sr-only'}>
            {copyFailed ? copyGuidance : copied ? DEMONSTRATION.copied : ''}
          </span>
        )}
        {copyFailed && (
          <a ref={plain} href={`mailto:${CONTACT_EMAIL}`} className={cn('text-caption underline underline-offset-2 break-all', onInk ? 'text-azure-300' : 'text-azure-700')}>
            {CONTACT_EMAIL}
          </a>
        )}
      </div>
    );
  }
  return (
    <div className={cn('flex flex-col gap-3', align === 'center' && 'items-center text-center', className)}>
      <div className={cn('flex flex-wrap items-center gap-3', align === 'center' && 'justify-center')}>
        <a href={DEMO_MAILTO} onClick={() => trackDemonstration(placement, section)} className={cn('vc-btn vc-btn-primary', onInk && 'vc-btn-on-ink')}>
          <Mail className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          {CTA_LABEL}
        </a>
        {withCopy && (
          <button type="button" onClick={copy} className={cn('vc-btn vc-btn-secondary', onInk && 'vc-btn-secondary-on-ink')}>
            <Copy className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            {DEMONSTRATION.copy}
          </button>
        )}
        {withCopy && (
          <span role="status" aria-atomic="true" className={cn('text-caption font-medium', onInk ? 'text-azure-300' : 'text-azure-700')}>
            {copyFailed ? copyGuidance : copied ? DEMONSTRATION.copied : ''}
          </span>
        )}
      </div>
      {microcopy && <p className={cn('max-w-[30rem] text-caption', onInk ? 'text-mist' : 'text-graphite')}>{microcopy}</p>}
      {withCopy && (
        <p className={cn('text-caption', onInk ? 'text-mist' : 'text-graphite')}>
          Or write to{' '}
          <a ref={plain} href={`mailto:${CONTACT_EMAIL}`} onClick={() => trackDemonstration(placement, section)} className={cn('underline underline-offset-2', onInk ? 'text-azure-300' : 'text-azure-700')}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}
    </div>
  );
};
