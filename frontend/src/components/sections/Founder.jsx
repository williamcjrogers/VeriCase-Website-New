import { ChapterHeader } from '@/components/editorial/ChapterHeader';
import { Declaration } from '@/components/editorial/Declaration';
import { Gated } from '@/components/editorial/Gated';
import { Plate } from '@/components/editorial/Plate';
import { Rich } from '@/components/editorial/Rich';
import { FOUNDER } from '@/content/home';
import { MEDIA, PLATE_NUMBERS } from '@/content/media';
import { fill } from '@/lib/format';

// Who is behind it: the founder, the practitioners' equity, and the declaration of interest,
// which always comes before the United Infrastructure account.
export const Founder = () => (
  <section id="about" aria-labelledby="about-title" className="bg-paper py-16 md:py-24 lg:py-32">
    <div className="container">
      <ChapterHeader id="about" title={FOUNDER.h2} />

      <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-5 lg:col-start-3">
          <p className="text-lead text-ink">{FOUNDER.body1}</p>
          <Gated id={FOUNDER.body2Gate} block className="mt-5">
            <p className="text-body text-ink">{FOUNDER.body2}</p>
          </Gated>

          <ul className="mt-8 border-l-2 border-brass-400 pl-5 font-mono text-[0.8125rem] leading-7 text-ink" aria-label="Credentials">
            {FOUNDER.credentials.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>

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
        </div>

        <div className="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-9">
          {MEDIA.founderPhoto ? (
            <figure className="m-0 border border-brass-400 p-2">
              <img src={MEDIA.founderPhoto.src} alt={MEDIA.founderPhoto.alt} className="block aspect-[4/5] w-full object-cover grayscale-[20%]" loading="lazy" decoding="async" />
            </figure>
          ) : (
            <Plate
              src={MEDIA.siteOffice.src}
              lqip={MEDIA.siteOffice.lqip}
              ratio={MEDIA.siteOffice.ratio}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 60vw, 100vw"
              alt={FOUNDER.plate.alt}
              caption={fill(FOUNDER.plate.caption, { n: PLATE_NUMBERS.founder })}
              className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]"
            />
          )}
        </div>
      </div>
    </div>
  </section>
);
