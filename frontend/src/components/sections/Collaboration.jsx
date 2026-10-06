import { COLLABORATION, IN_BRIEF } from '@/content/home';
import { CALCULATOR_GATE, CALCULATOR_LINKS } from '@/content/calculatorLinks';
import { Gated } from '@/components/editorial/Gated';
import { Rich } from '@/components/editorial/Rich';
import { CapabilityFeatures, SectionIntroduction } from './CapabilityDetails';
import { DiscussionIllustration } from './DiscussionIllustration';
import { LanesIllustration } from './LanesIllustration';

// Collaboration (owner, 06 October 2026): one record discussed by everyone who needs it, from
// their own organisations, with the history kept on the record. Beneath the method, what the email
// relay costs, each figure with a note marker (the full notes are on /notes; the modelled figures
// are marked as estimates). The thread leads into two illustrations, shown in place at every width:
// the discussion kept with the record, then the same record discussed in lanes. The section closes
// on who VeriCase is for, set large.
const C = COLLABORATION;

export const Collaboration = () => (
  <section id="collaboration" aria-labelledby="collaboration-title" className="clarity-section capability-explanation collaboration-section bg-paper">
    <div className="container">
      <div className="capability-explanation-grid">
        <SectionIntroduction id="collaboration" h2={C.h2} issue={C.issue} method={C.method} className="has-figures">
          <Gated id="G13_collabStats" block>
            <ul className="section-figures" role="list" aria-label={C.statsName}>
              {C.stats.map((stat) => (
                <li key={stat.figure} className="section-figure">
                  <p className="section-figure-value">
                    {stat.figure}
                    {stat.label && <span className="section-figure-estimate">{stat.label}</span>}
                  </p>
                  <p className="section-figure-text"><Rich text={stat.text} /></p>
                </li>
              ))}
            </ul>
          </Gated>
          <Gated id={CALCULATOR_GATE} block>
            <p className="section-figures-link">
              <a className="vc-link" href={CALCULATOR_LINKS.collaboration.href}>{CALCULATOR_LINKS.collaboration.text}</a>
            </p>
          </Gated>
        </SectionIntroduction>
        <CapabilityFeatures steps={C.steps} label="Working on one record together" mobileLabel="Working with your team" leadIn={C.leadIn} />
      </div>
      <DiscussionIllustration />
      <LanesIllustration />
      <aside className="collaboration-audience" aria-labelledby="collaboration-audience-title">
        <h3 id="collaboration-audience-title" className="collaboration-audience-label">{IN_BRIEF.audience.label}</h3>
        <p className="collaboration-audience-text">
          <span className="collaboration-audience-lead">{IN_BRIEF.audience.lead}</span>{' '}
          <span className="collaboration-audience-rest">{IN_BRIEF.audience.rest}</span>
        </p>
      </aside>
    </div>
  </section>
);
