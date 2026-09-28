import { useEffect, useRef, useState } from 'react';
import { Copy, Mail } from 'lucide-react';
import { CONTACT_EMAIL, DEMO_MAILTO } from '@/lib/site';
import { CTA_LABEL, CTA_MICROCOPY, DEMONSTRATION } from '@/content/home';
import { cn } from '@/lib/utils';

// "Book a demonstration": a mailto with the subject and body prefilled, an optional
// "Copy email address" button (confirmed in a status line beside it) and the confidentiality
// microcopy. No form submits anything. The compact form is for the header band: the same
// mailto and copy fallback, with the copy button reduced to an icon and the confirmation
// announced rather than shown, so the band keeps its height.
export const DemoCTA = ({ onInk = false, withCopy = false, compact = false, microcopy = CTA_MICROCOPY, className, align = 'start' }) => {
  const plain = useRef(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(false), 4000);
    return () => clearTimeout(t);
  }, [copied]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
    } catch {
      // Clipboard unavailable: select the plain address so it can be copied by hand.
      const el = plain.current;
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };
  if (compact) {
    return (
      <div className={cn('flex items-center gap-1 sm:gap-2', className)}>
        <a href={DEMO_MAILTO} className={cn('vc-btn vc-btn-primary max-sm:px-3 max-sm:text-[0.875rem]', onInk && 'vc-btn-on-ink')}>
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
        {withCopy && (
          <span role="status" className="sr-only">
            {copied ? DEMONSTRATION.copied : ''}
          </span>
        )}
        <span ref={plain} className="sr-only">
          {CONTACT_EMAIL}
        </span>
      </div>
    );
  }
  return (
    <div className={cn('flex flex-col gap-3', align === 'center' && 'items-center text-center', className)}>
      <div className={cn('flex flex-wrap items-center gap-3', align === 'center' && 'justify-center')}>
        <a href={DEMO_MAILTO} className={cn('vc-btn vc-btn-primary', onInk && 'vc-btn-on-ink')}>
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
          <span role="status" className={cn('text-caption font-medium', onInk ? 'text-azure-300' : 'text-azure-700')}>
            {copied ? DEMONSTRATION.copied : ''}
          </span>
        )}
      </div>
      {microcopy && <p className={cn('max-w-[34rem] text-caption', onInk ? 'text-mist' : 'text-graphite')}>{microcopy}</p>}
      {withCopy && (
        <p className={cn('text-caption', onInk ? 'text-mist' : 'text-graphite')}>
          Or write to{' '}
          <a ref={plain} href={`mailto:${CONTACT_EMAIL}`} className={cn('underline underline-offset-2', onInk ? 'text-azure-300' : 'text-azure-700')}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}
    </div>
  );
};
