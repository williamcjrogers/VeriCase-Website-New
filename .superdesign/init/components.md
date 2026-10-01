# Shared UI primitives

Baseline: released cf029e2, 01 October 2026. Local LandingPage, InBrief and SharedWorkspace edits and untracked CapabilityDetails are an unfinished, unapproved content-restoration draft. This analysis reproduces released HEAD and explicitly excludes that draft.

React 18, Create React App with CRACO, React Router 7, Tailwind 3 plus bespoke CSS; Radix-backed sheet/collapsible controls. DemoCTA provides email intent and copy-address fallback. Gated enforces publication state. Rich handles inline citations. Logo supplies the real wordmark; sheet/collapsible provide navigation and supplementary disclosures.

## frontend/src/components/editorial/DemoCTA.jsx
```jsx
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
// announced rather than shown, so the band keeps its height.
export const DemoCTA = ({ onInk = false, withCopy = false, compact = false, microcopy = CTA_MICROCOPY, className, align = 'start', placement, section }) => {
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
      trackDemonstration(placement, section, true);
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
          <span role="status" className={cn('text-caption font-medium', onInk ? 'text-azure-300' : 'text-azure-700')}>
            {copied ? DEMONSTRATION.copied : ''}
          </span>
        )}
      </div>
      {microcopy && <p className={cn('max-w-[34rem] text-caption', onInk ? 'text-mist' : 'text-graphite')}>{microcopy}</p>}
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

```

## frontend/src/components/editorial/Gated.jsx
```jsx
import { GATES, IS_PREVIEW } from '@/content/gates';
import { cn } from '@/lib/utils';

// Renders children unless the gate is struck. On previews, open gates are marked in place so the
// owner can review them in context; a production build with an open gate fails (lint-copy).
export const Gated = ({ id, children, as: Tag = 'span', className, block = false }) => {
  const g = GATES[id];
  if (!g) throw new Error(`Unknown gate: ${id}`);
  if (g.status === 'struck') return null;
  if (g.status === 'confirmed' || !IS_PREVIEW) return block ? <div className={className}>{children}</div> : <>{children}</>;
  const Wrap = block ? 'div' : Tag;
  return (
    <Wrap className={cn('vc-gate', block && 'vc-gate-block', className)} data-gate={g.gate} title={`Owner to confirm (${g.gate}): ${g.label}`}>
      {children}
      <span className="vc-gate-tag" aria-hidden="true">{g.gate}</span>
    </Wrap>
  );
};

export const isShown = (id) => !id || GATES[id]?.status !== 'struck';

// {{TOKEN}}: owner-supplied text. Visible on previews, and it blocks a production build.
export const Placeholder = ({ token }) => (
  <span className="vc-placeholder" data-token={token}>
    {`Owner to supply: ${token.replace(/_/g, ' ').toLowerCase()}`}
  </span>
);

```

## frontend/src/components/editorial/Rich.jsx
```jsx
import { Fragment } from 'react';
import { NoteRef } from '@/components/editorial/NoteRef';
import { Placeholder } from '@/components/editorial/Gated';
import { EvidenceChip } from '@/components/mock/EvidenceChip';
import { keepDates } from '@/lib/format';

// Renders copy-deck strings with their inline markup:
//   [[note:n]] site note · [[ev:EV-0131]] citation chip · [[c:EV-0131]] numbered citation
//   (the number comes from `cites`, a map of exhibit to citation number) · *italic* · {{TOKEN}}
const TOKEN = /(\[\[(?:note|ev|c):[^\]]+\]\]|\*[^*\n]+\*|\{\{[A-Z0-9_]+\}\})/g;

// Punctuation that must stay on the line of the chip before it (a line never starts ", and").
const TRAILING = /^[.,;:]/;

export function Rich({ text, cites, citeList, onInk = false }) {
  if (!text) return null;
  const parts = String(text).split(TOKEN);
  // A chip keeps the punctuation that follows it: move it from the next part into the chip's span.
  for (let i = 0; i < parts.length - 1; i += 1) {
    if (/^\[\[ev:EV-\d{4}\]\]$/.test(parts[i]) && TRAILING.test(parts[i + 1] || '')) {
      parts[i] = `${parts[i]}${parts[i + 1][0]}`;
      parts[i + 1] = parts[i + 1].slice(1);
    }
  }
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        let m = part.match(/^\[\[note:(\d+)\]\]$/);
        if (m) return <NoteRef key={i} n={Number(m[1])} onInk={onInk} />;
        m = part.match(/^\[\[ev:(EV-\d{4})\]\]([.,;:]?)$/);
        if (m && m[2])
          return (
            <span key={i} className="whitespace-nowrap">
              <EvidenceChip id={m[1]} list={citeList} />
              {m[2]}
            </span>
          );
        if (m) return <EvidenceChip key={i} id={m[1]} list={citeList} />;
        m = part.match(/^\[\[c:(EV-\d{4})\]\]$/);
        if (m) {
          const n = cites ? cites[m[1]] : undefined;
          return n ? <EvidenceChip key={i} id={m[1]} variant="superscript" n={n} list={citeList} /> : null;
        }
        m = part.match(/^\*([^*]+)\*$/);
        if (m) return <em key={i}>{keepDates(m[1])}</em>;
        m = part.match(/^\{\{([A-Z0-9_]+)\}\}$/);
        if (m) return <Placeholder key={i} token={m[1]} />;
        return <Fragment key={i}>{keepDates(part)}</Fragment>;
      })}
    </>
  );
}

// Plain text for aria-labels, meta tags and the copy check: markup stripped.
export const plainText = (text) =>
  String(text)
    .replace(/\[\[note:\d+\]\]/g, '')
    .replace(/\[\[(?:ev|c):(EV-\d{4})\]\]/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1');

```

## frontend/src/components/brand/Logo.jsx
```jsx
import { cn } from '@/lib/utils';


// tone="positive": azure and navy on light grounds. tone="reversed": azure-300 and parchment on ink.
// Served as an SVG file (public/logo-*.svg, traced from the brand PNG) so its paths stay out of
// the JavaScript bundle; the width and height attributes reserve its box before it loads.
// `decorative` hides it from assistive technology where the enclosing link already names it.
export const Logo = ({ tone = 'positive', className, title = 'VeriCase', decorative = false }) => (
  <img
    src={tone === 'reversed' ? '/logo-reversed.svg' : '/logo-positive.svg'}
    alt={decorative ? '' : title}
    width="408"
    height="83"
    decoding="async"
    className={cn('block h-auto', className)}
  />
);

export const LogoMark = ({ className, title = 'VeriCase', decorative = false, color = 'currentColor' }) => (
  <svg
    viewBox="0 0 24 32"
    className={cn('block', className)}
    role={decorative ? undefined : 'img'}
    aria-label={decorative ? undefined : title}
    aria-hidden={decorative ? 'true' : undefined}
    focusable="false"
  >
    <text x="2" y="24" fontFamily="Newsreader, Georgia, serif" fontSize="24" fill={color}>V</text>
  </svg>
);

```

## frontend/src/components/ui/sheet.jsx
```jsx
import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva } from "class-variance-authority";
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref} />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

const SheetContent = React.forwardRef((
  { side = "right", className, overlayClassName, closeClassName, closeLabel = "Close", children, ...props },
  ref
) => (
  <SheetPortal>
    <SheetOverlay className={overlayClassName} />
    <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
      <SheetPrimitive.Close
        className={cn(
          "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
          closeClassName
        )}>
        <X className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        <span className="sr-only">{closeLabel}</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props} />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props} />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```

## frontend/src/components/ui/collapsible.jsx
```jsx
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

```

## frontend/src/lib/utils.js
```jsx
import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// The design system's named font sizes must not be mistaken for text colours when classes merge.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["masthead", "numeral", "display", "h2", "h3", "stat", "lead", "body", "small", "caption", "meta", "label"] },
      ],
    },
  },
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

```
