import { DomainIcon } from '@/components/icons';
import { INTEGRITY } from '@/content/home';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { cn } from '@/lib/utils';

// "The project record: mailboxes, …" becomes a title and its description.
const STAGES = INTEGRITY.positioning.stages.map((stage) => {
  const i = stage.indexOf(': ');
  return { title: stage.slice(0, i), text: stage.slice(i + 2) };
});
const VERICASE = 1;
const OUTSIDE = STAGES.length - 1;

// Fig. 11: where VeriCase sits. Four ruled stages on a navy spine, across on wide screens and
// down on narrow ones: the project record, VeriCase (azure, with the Lens glyph), the pack, and
// what lies outside VeriCase (dashed). The stages are the list itself; the spine draws once.
export const PositioningDiagram = () => {
  const [ref, inView] = useInViewOnce({ threshold: 0.35 });
  return (
    <div ref={ref} className={cn('ri-pos', inView && 'is-in')}>
      <span className="ri-spine" aria-hidden="true" />
      <ol className="ri-stages" role="list">
        {STAGES.map((stage, i) => (
          <li key={stage.title} className={cn('ri-stage', i === VERICASE && 'is-vericase', i === OUTSIDE && 'is-outside')}>
            <span className="ri-stage-head" aria-hidden="true">
              <span className="ri-stage-n">{i + 1}</span>
              {i === VERICASE && <DomainIcon name="ChronologyLens" size={22} className="ri-stage-icon" />}
            </span>
            <p className="ri-stage-title">
              {stage.title}
              <span className="sr-only">:</span>
            </p>
            <p className="ri-stage-text">{stage.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};
