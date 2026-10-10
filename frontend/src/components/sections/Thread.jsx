import { Gated, isShown } from '@/components/editorial/Gated';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { cn } from '@/lib/utils';
import './thread.css';

// A section's steps as marked points on one brass thread, the way the chronology figure marks its
// entries on the record. The thread runs from the first step to a line that introduces the
// illustration below, and on wider screens drops on into that illustration's brass top rule, so
// the reader is carried from what the section says to what it shows.
//
// The text is always there. Only the thread is drawn: once, when it comes into view, from the top
// down, each point filling as the line reaches it. Reduced motion, print and pages without the
// script show it drawn.
export const Thread = ({ steps, label, leadIn, className, headingAs: Heading = 'h3' }) => {
  const [ref, drawn] = useInViewOnce({ threshold: 0.2 });
  const shown = steps.filter((step) => isShown(step.gate)).map((step) => (step.noteGate && !isShown(step.noteGate) ? { ...step, note: undefined } : step));
  return (
    <div ref={ref} className={cn('thread', drawn && 'is-drawn', leadIn && 'has-lead-in', className)} style={{ '--steps': shown.length }}>
      <ol className="thread-steps" role="list" aria-label={label}>
        {shown.map((step, i) => (
          <li key={step.title} className="thread-step" style={{ '--i': i }}>
            <Heading className="thread-title">{step.title}</Heading>
            <p className="thread-text">{step.gate ? <Gated id={step.gate}>{step.text}</Gated> : step.text}</p>
            {step.note && <p className="thread-note">{step.noteGate ? <Gated id={step.noteGate}>{step.note}</Gated> : step.note}</p>}
          </li>
        ))}
      </ol>
      {leadIn && <p className="thread-lead-in">{leadIn}</p>}
    </div>
  );
};
