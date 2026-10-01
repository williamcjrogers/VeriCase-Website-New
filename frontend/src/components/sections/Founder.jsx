import { FOUNDER } from '@/content/home';
import { Gated } from '@/components/editorial/Gated';

export const Founder = () => (
  <section id="about" aria-labelledby="about-title" className="clarity-section bg-parchment">
    <div className="container">
      <h2 id="about-title" tabIndex={-1} className="clarity-heading">Built by construction disputes practitioners.</h2>
      <p className="mt-5 max-w-measure text-body">VeriCase was founded by William Rogers MCIArb and Warren Kemp, bringing construction claims and legal experience to the same product.</p>
      <div className="clarity-founders mt-8">
        {FOUNDER.founders.map((founder) => (
          <article key={founder.name}>
            <h3 className="text-[1.625rem] leading-tight">{founder.name}</h3>
            <p className="mt-3 max-w-measure text-body">{founder.summary}</p>
            <details className="mt-4 clarity-bio">
              <summary>Read {founder.name.split(' ')[0]}’s background</summary>
              <p className="mt-3 max-w-measure text-small">{founder.bio}</p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-small">
                {founder.credentials.map((credential) => <li key={credential}>{credential}</li>)}
              </ul>
              {founder.cases && <ul className="mt-4 space-y-2 text-small" aria-label="Reported cases">
                {founder.cases.map((item) => <li key={item.cite}>{item.name} {item.cite}</li>)}
              </ul>}
            </details>
          </article>
        ))}
      </div>
      <Gated id={FOUNDER.body2Gate} block className="mt-7 max-w-measure text-small text-graphite">{FOUNDER.body2}</Gated>
    </div>
  </section>
);
