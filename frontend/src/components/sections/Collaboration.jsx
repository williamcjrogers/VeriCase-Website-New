import { Scale, HardHat, Building2 } from 'lucide-react';
import { COLLABORATION, IN_BRIEF } from '@/content/home';
import { CapabilityFeatures, SectionIntroduction } from './CapabilityDetails';
import { LanesExample } from './examples/LanesExample';
import { DiscussionCostExample } from './DiscussionCostExample';

// One compact cost illustration supports the shared-record workflow, with its qualifications,
// source and calculator. The audience follows the complete solution as a separate section.
const C = COLLABORATION;
const audienceIcons = [Scale, HardHat, Building2];

export const Collaboration = () => (
  <section id="collaboration" aria-labelledby="collaboration-title" className="clarity-section capability-explanation collaboration-section solution-chapter solution-surface-ivory bg-parchment">
    <div className="container">
      <div className="capability-explanation-grid">
        <SectionIntroduction id="collaboration" h2={C.h2} lead={C.lead} leadGate={C.leadGate} />
        <CapabilityFeatures steps={C.steps} label="Working on one record together" mobileLabel="Working with your team" leadIn={C.leadIn} headingAs="h4" />
      </div>
      <DiscussionCostExample headingAs="h4" />
      <LanesExample headingAs="h4" />
    </div>
  </section>
);

export const CollaborationAudience = () => (
  <section className="clarity-section collaboration-audience-section" aria-labelledby="collaboration-audience-title">
    <div className="container">
      <div className="collaboration-audience">
        <header className="collaboration-audience-heading">
          <p className="collaboration-audience-label">{IN_BRIEF.audience.label}</p>
          <h2 id="collaboration-audience-title">{IN_BRIEF.audience.title} <span>{IN_BRIEF.audience.emphasis}</span></h2>
          <p className="collaboration-audience-introduction">{IN_BRIEF.audience.introduction}</p>
        </header>
        <ul className="collaboration-audience-groups">
          {IN_BRIEF.audience.groups.map((group, index) => {
            const Icon = audienceIcons[index];
            return (
              <li key={group.title} className="collaboration-audience-group">
                <span className="collaboration-audience-icon"><Icon size={22} aria-hidden="true" /></span>
                <h3>{group.title}</h3>
                <p>{group.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </section>
);
