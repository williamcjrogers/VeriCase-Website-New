# Shared page layout

Baseline: released cf029e2, 01 October 2026. Local LandingPage, InBrief and SharedWorkspace edits and untracked CapabilityDetails are an unfinished, unapproved content-restoration draft. This analysis reproduces released HEAD and explicitly excludes that draft.

SiteHeader is the sticky navigation used on all routes; SiteFooter repeats navigation, contact and legal information. There is no separate sidebar or app-shell component. App injects routing, consent and metadata.

## frontend/src/components/sections/SiteHeader.jsx
```jsx
import { trackDemonstration } from '@/lib/analytics';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { List } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Logo, LogoMark } from '@/components/brand/Logo';
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
          'sticky top-0 z-40 border-b bg-[#0B2516]/95 backdrop-blur-[6px] transition-colors duration-200 text-[#FCFAF5]',
          scrolled ? 'border-[#1A3828] shadow-md' : 'border-transparent'
        )}
      >
      <a href="#main" className="skip-link">
        {HEADER.skip}
      </a>
      <div className="container flex h-14 items-center justify-between gap-2 lg:h-16">
        <a
          href={onHome ? '#top' : '/'}
          onClick={onHome ? onSectionClick('top') : undefined}
          aria-label={HEADER.logoAlt}
          className="-mx-1 flex h-11 min-w-11 shrink-0 items-center rounded-sm px-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BF9B58]"
        >
          <Logo tone="reversed" decorative className="hidden h-7 w-auto min-[480px]:block sm:h-8" />
          <LogoMark decorative className="h-7 w-7 min-[480px]:hidden" color="#C4A05A" />
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
                    className="group relative inline-flex h-11 items-center px-3 text-small font-medium text-[#E8DCC8] hover:text-white"
                  >
                    {s.nav}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3 bottom-1 h-0.5 origin-left bg-[#C4A05A] transition-transform duration-200 ease-settle',
                        current ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:bg-[#C4A05A]/70'
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
            className="hidden h-11 items-center rounded-sm px-3 text-small font-medium text-[#E8DCC8] underline-offset-4 hover:text-white hover:underline sm:inline-flex"
          >
            {HEADER.signIn}
          </a>
          <a
            href={DEMO_MAILTO} onClick={() => trackDemonstration('header', 'top')}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#BF9B58] px-4 py-2 text-small font-medium text-[#0B2516] transition-colors hover:bg-[#d4b06a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BF9B58] max-sm:px-3 max-sm:text-[0.875rem]"
          >
            {CTA_LABEL}
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label={HEADER.contents}
                className="inline-flex h-11 min-w-[44px] items-center justify-center gap-2 rounded-sm border border-transparent px-2 text-small font-medium text-[#E8DCC8] hover:border-[#1A3828] hover:text-white sm:border-[#1A3828] sm:px-3 xl:hidden"
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

```

## frontend/src/components/sections/SiteFooter.jsx
```jsx
import { trackDemonstration } from '@/lib/analytics';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Logo } from '@/components/brand/Logo';
import { Rich } from '@/components/editorial/Rich';
import { HOME_NAV, FOOTER } from '@/content/home';
import { COMPANY, CONTACT_EMAIL, DEMO_MAILTO, SIGN_IN_URL, SITE } from '@/lib/site';
import { onSectionClick, sectionHref } from '@/lib/navigate';
import { cn } from '@/lib/utils';

// The prerendered page carries this year; the client moves it on if a new year has begun.
const BUILD_YEAR = 2026;

const linkClass = 'text-azure-300 underline-offset-4 hover:underline focus-visible:underline';

// A column heading on wide screens; below 768 px a 48 px disclosure button. The links stay in
// the document either way, so they work without JavaScript and are always indexed.
const Column = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border-b border-mist/20 md:border-0">
      <h2 className="font-sans text-small font-medium hidden md:block">{title}</h2>
      <CollapsibleTrigger className="flex h-12 w-full items-center justify-between text-left md:hidden">
        <span className="text-small font-medium">{title}</span>
        <ChevronDown className={cn('h-5 w-5 text-mist transition-transform duration-200', open && 'rotate-180')} strokeWidth={1.5} aria-hidden="true" />
      </CollapsibleTrigger>
      <CollapsibleContent forceMount className="max-md:data-[state=closed]:hidden">
        <ul className="space-y-1 pb-4 md:mt-4 md:space-y-2 md:pb-0">{children}</ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

const Item = ({ children }) => <li className="text-small leading-relaxed">{children}</li>;

export const SiteFooter = () => {
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const [year, setYear] = useState(BUILD_YEAR);
  useEffect(() => setYear(new Date().getFullYear()), []);
  const openCookies = () => window.dispatchEvent(new Event('vc-open-cookie-settings'));

  const contents = HOME_NAV;
  const about = HOME_NAV.find((m) => m.id === 'about');

  return (
    <footer className="on-ink bg-[#052314] text-parchment border-t border-[#1A3828]">
      <div className="container py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-12 lg:col-span-5">
            <a href={onHome ? '#top' : '/'} onClick={onHome ? onSectionClick('top') : undefined} aria-label="VeriCase home" className="inline-flex h-11 items-center">
              <Logo tone="reversed" decorative className="h-10 w-auto" />
            </a>
            <p className="mt-5 max-w-[30rem] text-small text-mist">{FOOTER.descriptor}</p>
          </div>

          <div className="grid md:col-span-12 md:grid-cols-3 md:gap-6 lg:col-span-7">
            <Column title={FOOTER.heads.contents}>
              {contents.map((c) => (
                <Item key={c.id}>
                  <a href={sectionHref(c.id, onHome)} onClick={onHome ? onSectionClick(c.id) : undefined} className={`${linkClass} inline-flex min-h-11 items-center`}>
                    <span>{c.title}</span>
                  </a>
                </Item>
              ))}
            </Column>
            <Column title={FOOTER.heads.company}>
              <Item>
                <a href={sectionHref(about.id, onHome)} onClick={onHome ? onSectionClick(about.id) : undefined} className={linkClass}>
                  {FOOTER.company.about}
                </a>
              </Item>
              <Item>
                <a href={DEMO_MAILTO} onClick={() => trackDemonstration('footer', 'top')} className={linkClass}>
                  {FOOTER.company.demo}
                </a>
              </Item>
              <Item>
                <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                  {CONTACT_EMAIL}
                </a>
              </Item>
              <Item>
                <a href={SIGN_IN_URL} className={linkClass}>
                  {FOOTER.company.signIn}
                </a>
              </Item>
            </Column>
            <Column title={FOOTER.heads.cookies}>
              <Item>
                <button type="button" onClick={openCookies} className={cn(linkClass, 'text-left')}>
                  {FOOTER.cookies.settings}
                </button>
              </Item>
              {SITE.legalPages.cookies && (
                <Item>
                  <a href="/cookies" className={linkClass}>
                    {FOOTER.cookies.notice}
                  </a>
                </Item>
              )}
              {SITE.legalPages.privacy && (
                <Item>
                  <a href="/privacy" className={linkClass}>
                    Privacy notice
                  </a>
                </Item>
              )}
            </Column>
          </div>
        </div>

        <div className="mt-14 border-t border-mist/25 pt-6 text-meta text-mist">
          {FOOTER.legal.map((line) => (
            <p key={line} className="mt-2 max-w-[62rem] first:mt-0">
              <Rich text={line} onInk />
            </p>
          ))}
          <p className="mt-2">
            © {year} {COMPANY.name}.
          </p>
        </div>
      </div>
    </footer>
  );
};

```

## frontend/src/App.js
```jsx
import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import { Cookies } from '@/pages/Cookies';
import { NotFound } from '@/pages/NotFound';
import { RouteMetadata } from '@/components/RouteMetadata';
import { SIGN_IN_URL } from '@/lib/site';

// Neither renders anything before hydration, so both load as their own chunks once the page
// has mounted (rendering a lazy component during the prerender would leave a client-only
// boundary for hydration to report).
const CookieConsent = lazy(() => import('@/components/CookieConsent').then((m) => ({ default: m.CookieConsent })));
const Toaster = lazy(() => import('@/components/ui/sonner').then((m) => ({ default: m.Toaster })));

// The routes the site serves. index.html uses the same list to decide whether the prerendered
// markup belongs to the page being opened (see public/index.html and src/index.js).
export const KNOWN_ROUTES = ['/', '/login', '/cookies', '/fileserver', '/Fileserver'];

// Hands the visitor on to the app's sign-in page or the file server.
const ExternalRedirect = ({ url, label }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-parchment">
      <div className="text-center" role="status">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-rule border-t-azure-500" aria-hidden="true" />
        <p className="text-caption text-graphite">{label}</p>
      </div>
    </div>
  );
};

// The router is injected so that the build can prerender with a StaticRouter.
function App({ Router = BrowserRouter, routerProps = {} }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <Router {...routerProps}>
      <RouteMetadata />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<ExternalRedirect url={SIGN_IN_URL} label="Redirecting to sign in…" />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/Fileserver" element={<ExternalRedirect url="https://files.veri-case.com" label="Redirecting to the file server…" />} />
        <Route path="/fileserver" element={<ExternalRedirect url="https://files.veri-case.com" label="Redirecting to the file server…" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {mounted && (
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>
      )}
      {mounted && (
        <Suspense fallback={null}>
          <Toaster position="bottom-center" offset="calc(var(--consent-h, 0px) + 16px)" />
        </Suspense>
      )}
    </Router>
  );
}

export default App;

```
