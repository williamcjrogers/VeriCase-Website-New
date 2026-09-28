import { lazy } from 'react';
import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { Declaration } from '@/components/editorial/Declaration';
import { Gated, isShown } from '@/components/editorial/Gated';
import { Plate } from '@/components/editorial/Plate';
import { Rich } from '@/components/editorial/Rich';
import { FOUNDER } from '@/content/home';
import { MEDIA, PLATE_NUMBERS } from '@/content/media';
import { fill } from '@/lib/format';

const Valuation = lazy(() => import(/* webpackChunkName: "plate-valuation" */ '@/components/plates/Valuation').then((m) => ({ default: m.Valuation })));

// Who is behind it: co-founders William Rogers & Warren Kemp, the practitioners' equity,
// and the declaration of interest, which always comes before the United Infrastructure account.
export const Founder = () => (
  <section id="about" aria-labelledby="about-title" className="bg-paper py-16 md:py-24 lg:py-32 border-t border-rule">
    <div className="container">
      <ChapterHeader id="about" title={FOUNDER.h2} />

      <div className="mt-8 max-w-measure-wide">
        <p className="text-lead text-ink">{FOUNDER.body1}</p>
      </div>

      {/* Co-Founders Grid */}
      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {FOUNDER.founders.map((f) => (
          <article key={f.name} className="relative rounded-sm border border-rule-strong/50 bg-parchment/60 p-6 sm:p-8">
            <div className="border-b border-rule pb-4">
              <h3 className="font-display text-h3 font-medium text-navy">{f.name}</h3>
              <p className="mt-1 font-mono text-label font-medium uppercase text-brass-700">{f.role}</p>
              {f.email && (
                <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.8125rem] text-navy">
                  <a href={`mailto:${f.email}`} className="text-brass-700 hover:underline">
                    {f.email}
                  </a>
                  <span className="text-graphite">{f.tel}</span>
                </div>
              )}
            </div>

            <p className="mt-4 text-small leading-relaxed text-ink">{f.bio}</p>

            <div className="mt-6 border-t border-rule pt-4">
              <p className="font-mono text-label font-medium uppercase text-graphite">Credentials & Track Record</p>
              <ul className="mt-3 space-y-1.5 border-l-2 border-brass-400 pl-4 font-mono text-[0.8125rem] leading-snug text-ink" aria-label={`Credentials for ${f.name}`}>
                {f.credentials.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

            {f.cases && (
              <div className="mt-6 border-t border-rule pt-4">
                <p className="font-mono text-label font-medium uppercase text-brass-700">Reported Authorities (TCC)</p>
                <ul className="mt-2 space-y-2">
                  {f.cases.map((cs) => (
                    <li key={cs.cite} className="text-small text-ink">
                      <span className="font-serif italic text-navy">{cs.name}</span>
                      <span className="block font-mono text-[0.75rem] text-graphite">{cs.cite}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-6">
          <Gated id={FOUNDER.body2Gate} block>
            <p className="text-body text-ink">{FOUNDER.body2}</p>
          </Gated>

          {/* The declaration and the closing caveat belong to the account: all three go together. */}
          {isShown(FOUNDER.accountGate) && (
            <>
              <Declaration label={FOUNDER.declaration.label} className="mt-10">
                {FOUNDER.declaration.text}
              </Declaration>

              <Gated id={FOUNDER.accountGate} block className="mt-10">
                <h3 className="text-h3 font-medium text-navy">{FOUNDER.h3}</h3>
                <p className="mt-4 text-body text-ink">
                  <Rich text={FOUNDER.account} />
                </p>
              </Gated>
              <p className="mt-6 max-w-measure text-small text-graphite">{FOUNDER.closing}</p>
            </>
          )}
        </div>

        <div className="col-span-12 sm:col-span-8 lg:col-span-5 lg:col-start-8">
          {MEDIA.founderPhoto ? (
            <figure className="m-0 border border-brass-400 p-2">
              <img src={MEDIA.founderPhoto.src} alt={MEDIA.founderPhoto.alt} className="block aspect-[4/5] w-full object-cover grayscale-[20%]" loading="lazy" decoding="async" />
            </figure>
          ) : (
            <Plate
              src={MEDIA.siteOffice.src}
              drawing={Valuation}
              lqip={MEDIA.siteOffice.lqip}
              ratio={MEDIA.siteOffice.ratio}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 60vw, 100vw"
              alt={MEDIA.siteOffice.src ? FOUNDER.plate.alt : FOUNDER.plate.drawn.alt}
              caption={fill(MEDIA.siteOffice.src ? FOUNDER.plate.caption : FOUNDER.plate.drawn.caption, { n: PLATE_NUMBERS.founder })}
              className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]"
            />
          )}
        </div>
      </div>
    </div>
  </section>
);
