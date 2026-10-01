import { FOUNDER } from '@/content/home';
import { Gated } from '@/components/editorial/Gated';

export const Founder = () => (
  <section id="about" aria-labelledby="about-title" className="clarity-section bg-parchment">
    <div className="container">
      <h2 id="about-title" tabIndex={-1} className="clarity-heading">{FOUNDER.h2}</h2>
      <p className="mt-5 max-w-measure text-body">{FOUNDER.body1}</p>
      <div className="clarity-team mt-8">
        {FOUNDER.people.map((person) => (
          <article key={person.name}>
            <h3 className="text-[1.625rem] leading-tight">{person.name}</h3>
            <p className="mt-2 text-small font-medium text-azure-700">{person.role}</p>
            <p className="mt-3 max-w-measure text-body">{person.summary}</p>
            <details className="mt-4 clarity-bio">
              <summary>Read {person.name.split(' ')[0]}’s background</summary>
              {person.bio.split('\n\n').map((paragraph) => (
                <p key={paragraph} className="mt-3 max-w-measure text-small">{paragraph}</p>
              ))}
              <ul className="mt-4 list-disc space-y-1 pl-5 text-small">
                {person.credentials.map((credential) => <li key={credential}>{credential}</li>)}
              </ul>
              {person.cases && <ul className="mt-4 space-y-2 text-small" aria-label="Reported cases">
                {person.cases.map((item) => <li key={item.cite}>{item.name} {item.cite}</li>)}
              </ul>}
            </details>
          </article>
        ))}
      </div>
      <Gated id={FOUNDER.body2Gate} block className="mt-7 max-w-measure text-small text-graphite">{FOUNDER.body2}</Gated>
    </div>
  </section>
);
