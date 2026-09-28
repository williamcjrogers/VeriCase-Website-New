import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { List } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Logo, LogoMark } from '@/components/brand/Logo';
import { BRAND_LINE, CHAPTERS, CTA_LABEL, END_MATTER, HEADER } from '@/content/home';
import { DEMO_MAILTO, SIGN_IN_URL } from '@/lib/site';
import { focusSection, onSectionClick, sectionHref } from '@/lib/navigate';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/utils';

const ALL_IDS = [...CHAPTERS, ...END_MATTER].map((s) => s.id);
const NAV = [...CHAPTERS, ...END_MATTER].filter((s) => s.nav);

// One sticky band: 64 px from 1024 px, 56 px below. The five section links show from 1280 px;
// below that a Contents sheet lists every chapter. It never reads AuthContext, so no session
// token can reach a URL.
export const SiteHeader = () => {
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pending = useRef(null);
  const active = useActiveSection(ALL_IDS, { enabled: onHome });

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  // A sheet link closes the sheet first; focus then moves to the chosen heading, not the trigger.
  const choose = (id) => (e) => {
    if (!onHome || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    pending.current = id;
    setOpen(false);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-parchment/95 backdrop-blur-[6px] transition-colors duration-200',
        scrolled ? 'border-rule' : 'border-transparent'
      )}
    >
      <a href="#main" className="skip-link">
        {HEADER.skip}
      </a>
      <div className="container flex h-14 items-center justify-between gap-3 lg:h-16">
        <a
          href={onHome ? '#top' : '/'}
          onClick={onHome ? onSectionClick('top') : undefined}
          aria-label={HEADER.logoAlt}
          className="-mx-1 flex h-11 shrink-0 items-center rounded-sm px-1"
        >
          <Logo decorative className="hidden h-[22px] w-auto min-[360px]:block sm:h-7" />
          <LogoMark decorative className="h-7 w-7 min-[360px]:hidden" />
        </a>

        <nav aria-label="Sections" className="hidden xl:block">
          <ul className="flex items-center">
            {NAV.map((s) => {
              const current = onHome && active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={sectionHref(s.id, onHome)}
                    onClick={onHome ? onSectionClick(s.id) : undefined}
                    aria-current={current ? 'location' : undefined}
                    className="group relative inline-flex h-11 items-center px-3 text-small font-medium text-ink hover:text-navy"
                  >
                    {s.nav}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3 bottom-1 h-0.5 origin-left bg-azure-500 transition-transform duration-200 ease-settle',
                        current ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:bg-rule-strong'
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={SIGN_IN_URL}
            className="hidden h-11 items-center rounded-sm px-3 text-small font-medium text-ink underline-offset-4 hover:text-navy hover:underline sm:inline-flex"
          >
            {HEADER.signIn}
          </a>
          <a href={DEMO_MAILTO} className="vc-btn vc-btn-primary max-sm:min-h-[40px] max-sm:px-3 max-sm:text-[0.875rem]">
            {CTA_LABEL}
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label={HEADER.contents}
                className="inline-flex h-11 min-w-[44px] items-center justify-center gap-2 rounded-sm border border-transparent px-2 text-small font-medium text-ink hover:border-rule-strong hover:text-navy sm:border-rule-strong sm:px-3 xl:hidden"
              >
                <List className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                <span className="hidden sm:inline">{HEADER.contents}</span>
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-full flex-col gap-0 overflow-y-auto border-l border-rule-strong bg-paper p-0 sm:max-w-[26rem]"
              overlayClassName="bg-ink-950/55"
              closeLabel={HEADER.close}
              closeClassName="vc-close right-2 top-2 text-ink opacity-100 focus:ring-azure-500 focus:ring-offset-0 data-[state=open]:bg-transparent"
              onCloseAutoFocus={(e) => {
                const id = pending.current;
                if (!id) return;
                pending.current = null;
                e.preventDefault();
                requestAnimationFrame(() => focusSection(id, { updateHash: true }));
              }}
            >
              <div className="border-b border-rule px-6 pb-4 pt-5">
                <SheetTitle className="font-display text-h3 font-medium text-navy">{HEADER.sheetTitle}</SheetTitle>
                <SheetDescription className="sr-only">{HEADER.sheetDescription}</SheetDescription>
              </div>
              <nav aria-label={HEADER.sheetTitle} className="flex-1 px-6 py-4">
                <ol className="divide-y divide-rule">
                  {CHAPTERS.map((c) => (
                    <SheetRow key={c.id} id={c.id} onHome={onHome} current={onHome && active === c.id} onChoose={choose(c.id)}>
                      <span className="w-12 shrink-0 font-mono text-meta text-brass-700">{c.numeral || c.sheetLabel}</span>
                      <span className="font-display text-[1.1875rem] leading-snug text-navy">{c.title}</span>
                    </SheetRow>
                  ))}
                </ol>
                <p className="eyebrow mt-7">{HEADER.endMatterLabel}</p>
                <ul className="mt-2 divide-y divide-rule">
                  {END_MATTER.map((m) => (
                    <SheetRow key={m.id} id={m.id} onHome={onHome} current={onHome && active === m.id} onChoose={choose(m.id)}>
                      <span className="text-body text-ink">{m.title}</span>
                    </SheetRow>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-rule px-6 pb-6 pt-5">
                <a href={SIGN_IN_URL} className="vc-link inline-flex min-h-[44px] items-center text-small font-medium">
                  {HEADER.signIn}
                </a>
                <a href={DEMO_MAILTO} className="vc-btn vc-btn-primary mt-3 w-full">
                  {CTA_LABEL}
                </a>
                <p className="mt-4 font-display text-[1.0625rem] italic text-graphite">{BRAND_LINE}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

const SheetRow = ({ id, onHome, current, onChoose, children }) => (
  <li>
    <a
      href={sectionHref(id, onHome)}
      onClick={onChoose}
      aria-current={current ? 'location' : undefined}
      className={cn(
        'flex min-h-[48px] items-baseline gap-3 py-2.5 pl-2 pr-1 -ml-2 hover:bg-parchment',
        current && 'bg-azure-50 shadow-[inset_3px_0_0_var(--vc-azure-500)]'
      )}
    >
      {children}
    </a>
  </li>
);
