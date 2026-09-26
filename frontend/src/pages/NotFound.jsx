import { useEffect } from 'react';
import { SiteHeader } from '@/components/sections/SiteHeader';
import { SiteFooter } from '@/components/sections/SiteFooter';
import { Plate } from '@/components/editorial/Plate';
import { CHAPTERS, CTA_LABEL, NOT_FOUND } from '@/content/home';
import { MEDIA } from '@/content/media';
import { DEMO_MAILTO } from '@/lib/site';

const HOME_TITLE = 'VeriCase | Evidence and chronology for construction disputes';

// Any unknown address. The build also prerenders this page to 404.html, with noindex.
export const NotFound = () => {
  useEffect(() => {
    document.title = NOT_FOUND.title;
    return () => {
      document.title = HOME_TITLE;
    };
  }, []);

  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="bg-parchment outline-none">
        <div className="container py-16 md:py-24">
          <div className="grid grid-cols-12 gap-x-6 gap-y-12">
            <div className="col-span-12 lg:col-span-5 lg:col-start-3">
              <div className="double-rule mb-5 max-w-[8rem]" aria-hidden="true" />
              <p className="ch-note">{NOT_FOUND.eyebrow}</p>
              <h1 className="mt-4 text-display font-medium text-balance">{NOT_FOUND.h1}</h1>
              <p className="mt-6 max-w-measure text-lead text-ink">{NOT_FOUND.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/" className="vc-btn vc-btn-secondary">
                  {NOT_FOUND.home}
                </a>
                <a href={DEMO_MAILTO} className="vc-btn vc-btn-primary">
                  {CTA_LABEL}
                </a>
              </div>
              <h2 className="mt-14 font-display text-[1.3125rem] font-medium leading-snug text-navy">{NOT_FOUND.listHeading}</h2>
              <ol className="mt-3 divide-y divide-rule border-y border-rule">
                {CHAPTERS.filter((c) => c.numeral).map((c) => (
                  <li key={c.id}>
                    <a href={`/#${c.id}`} className="flex min-h-[48px] items-baseline gap-3 py-2.5 hover:bg-parchment-300/60">
                      <span className="w-10 shrink-0 font-mono text-meta text-brass-700">{c.numeral}</span>
                      <span className="font-display text-[1.1875rem] leading-snug text-navy">{c.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <Plate
                src={MEDIA.shelfGap.src}
                lqip={MEDIA.shelfGap.lqip}
                ratio={MEDIA.shelfGap.ratio}
                sizes="(min-width: 1024px) 40vw, 100vw"
                alt={NOT_FOUND.plate.alt}
                caption={NOT_FOUND.plate.caption}
              />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
};
