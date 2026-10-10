import { trackDemonstration } from '@/lib/analytics';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { List } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/brand/Logo';
import { DemoCTA } from '@/components/editorial/DemoCTA';
import { HOME_NAV, CTA_LABEL, HEADER } from '@/content/home';
import { DEMO_MAILTO, SIGN_IN_URL } from '@/lib/site';
import { focusSection, onSectionClick, sectionHref } from '@/lib/navigate';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/utils';

const ALL_IDS = HOME_NAV.map((s) => s.id);
const NAV = HOME_NAV;

// One sticky band: 64 px from 1024 px, 56 px below. The seven section links show from 1280 px;
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
    <>
      <header
        className={cn(
          'site-header sticky top-0 z-40 border-b transition-[background-color,color,border-color,box-shadow] duration-200 motion-reduce:transition-none',
          scrolled
            ? 'is-scrolled border-transparent text-white'
            : 'border-rule bg-paper/95 text-ink backdrop-blur-[6px]'
        )}
      >
      <a href="#main" className="skip-link">
        {HEADER.skip}
      </a>
      <div className="site-header-row container flex h-14 items-center justify-between gap-2 lg:h-16">
        <a
          href={onHome ? '#top' : '/'}
          onClick={onHome ? onSectionClick('top') : undefined}
          aria-label={HEADER.logoAlt}
          className="-mx-1 flex h-11 min-w-11 shrink-0 items-center rounded-sm px-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure-500"
        >
          <Logo tone={scrolled ? 'reversed' : 'positive'} decorative className="site-wordmark h-7 w-auto sm:h-8" />
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
                    className="group relative inline-flex h-11 items-center px-3 text-small font-medium text-graphite hover:text-navy"
                  >
                    {s.nav}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3 bottom-1 h-0.5 origin-left bg-azure-500 transition-transform duration-200 ease-settle',
                        current ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:bg-azure-500/60'
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
            className="header-sign-in hidden h-11 items-center rounded-md px-3 text-small font-medium text-graphite underline-offset-4 hover:text-navy hover:underline sm:inline-flex"
          >
            {HEADER.signIn}
          </a>
          <a
            href={DEMO_MAILTO} onClick={() => trackDemonstration('header', 'top')}
            className="header-demo inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-azure-700 px-4 py-2 text-small font-medium text-white shadow-sm transition-colors hover:bg-brass-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure-500 max-sm:px-3 max-sm:text-[0.875rem]"
          >
            {CTA_LABEL}
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label={HEADER.contents}
                className="header-menu inline-flex h-11 min-w-[44px] items-center justify-center gap-2 rounded-md border border-transparent px-2 text-small font-medium text-graphite hover:border-rule-strong hover:text-navy sm:border-rule sm:px-3 xl:hidden"
              >
                <List className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                <span className="header-menu-label">{HEADER.contents}</span>
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
                <ul className="divide-y divide-rule">
                  {HOME_NAV.map((item) => (
                    <SheetRow key={item.id} id={item.id} onHome={onHome} current={onHome && active === item.id} onChoose={choose(item.id)}>
                      <span className="text-body text-ink">{item.title}</span>
                    </SheetRow>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-rule px-6 pb-6 pt-5">
                <a href={SIGN_IN_URL} className="vc-link inline-flex min-h-[44px] items-center text-small font-medium">
                  {HEADER.signIn}
                </a>
                <DemoCTA placement="contents" section="top" withCopy className="mt-3" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
    </>
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
