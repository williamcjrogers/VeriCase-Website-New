import { COLLABORATION } from '@/content/home';
import { CALCULATOR_GATE, CALCULATOR_LINKS } from '@/content/calculatorLinks';
import { Gated } from '@/components/editorial/Gated';

const C = COLLABORATION.costExample;
export const DiscussionCostExample = ({ headingAs: Heading = 'h3' }) => (
  <Gated id="G13_collabStats">
    <aside className="discussion-cost-example" aria-labelledby="discussion-cost-title">
      <div className="discussion-cost-context">
        <Heading id="discussion-cost-title">{C.title}</Heading>
        <p>{C.basis}</p>
      </div>
      <dl className="discussion-cost-figures">
        {C.figures.map((figure) => (
          <div key={figure.label}><dt>{figure.label}</dt><dd>{figure.value}</dd></div>
        ))}
      </dl>
      <div className="discussion-cost-links">
        <a href="/notes#note-3">{C.sourceLabel}</a>
        <Gated id={CALCULATOR_GATE}><a href={CALCULATOR_LINKS.collaboration.href}>{C.linkLabel}</a></Gated>
      </div>
    </aside>
  </Gated>
);
