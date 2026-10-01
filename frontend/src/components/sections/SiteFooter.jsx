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
      <h2 className="eyebrow hidden md:block">{title}</h2>
      <CollapsibleTrigger className="flex h-12 w-full items-center justify-between text-left md:hidden">
        <span className="eyebrow">{title}</span>
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
