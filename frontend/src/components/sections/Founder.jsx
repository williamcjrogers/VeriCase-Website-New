import { FOUNDER } from '@/content/home';
import { Gated } from '@/components/editorial/Gated';

// Each person is one article: identity, biography, credentials, then matters or products. From
// 1024 px the two articles of a pair share their row heights (subgrid, see clarity.css), so
// the rows stay level across the pair; a phone reads each article in order.
export const Founder = () => (
  <section id="about" aria-labelledby="about-title" className="clarity-section bg-parchment">
    <div className="container team-container">
      <h2 id="about-title" tabIndex={-1} className="clarity-heading">{FOUNDER.h2}</h2>
      <p className="mt-5 max-w-measure text-body">{FOUNDER.body1}</p>
      <div className="clarity-team mt-10">
        {FOUNDER.people.map((person) => {
          const slug = person.name.split(' ')[0].toLowerCase();
          return (
            <article key={person.name} className="team-member" aria-labelledby={`team-${slug}`}>
              <div className="team-identity">
                <img className="team-portrait" src={person.photo.src} alt={person.photo.alt} width="220" height="220" loading="lazy" decoding="async" />
                <h3 id={`team-${slug}`} className="team-name">{person.name}</h3>
                <p className="team-role">{person.role}</p>
                {(person.email || person.tel) && (
                  <p className="team-contact">
                    {person.email && <a href={`mailto:${person.email}`}>{person.email}</a>}
                    {person.email && person.tel && <span aria-hidden="true"> &nbsp; </span>}
                    {person.tel && <a href={`tel:${person.tel.replace(/\(0\)/, '').replace(/[^+\d]/g, '')}`}>{person.tel}</a>}
                  </p>
                )}
              </div>
              <div className="team-cell">
                {person.bio.split('\n\n').map((paragraph) => (
                  <p key={paragraph} className="team-bio">{paragraph}</p>
                ))}
              </div>
              <div className="team-cell">
                <p className="eyebrow">Credentials and track record</p>
                <ul className="team-credentials" aria-label={`Credentials for ${person.name}`}>
                  {person.credentials.map((credential) => <li key={credential}>{credential}</li>)}
                </ul>
              </div>
              <div className="team-cell">
                <p className="eyebrow">{person.list.label}</p>
                <ul className="team-list" aria-label={`${person.list.label} for ${person.name}`}>
                  {person.list.items.map((item) => (
                    <li key={item.name}>
                      <span className="team-list-name">{item.name}</span>
                      <span className="team-list-detail">{item.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
      <Gated id={FOUNDER.body2Gate} block className="mt-10 max-w-measure text-small text-graphite">{FOUNDER.body2}</Gated>
    </div>
  </section>
);
