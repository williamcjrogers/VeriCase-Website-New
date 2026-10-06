import { Placeholder } from '@/components/editorial/Gated';
import { keepDates } from '@/lib/format';
import { cn } from '@/lib/utils';

// A note's body: one paragraph, or several (an array), each with any {{TOKEN}} shown as an owner
// placeholder and its dates kept on one line. `className` styles each paragraph, `gap` each one
// after the first.
export const NoteBody = ({ body, className, gap = 'mt-2' }) =>
  [].concat(body).map((paragraph, k) => (
    <p key={k} className={cn(className, k > 0 && gap)}>
      {String(paragraph)
        .split(/(\{\{[A-Z0-9_]+\}\})/g)
        .map((part, i) => {
          const m = part.match(/^\{\{([A-Z0-9_]+)\}\}$/);
          return m ? <Placeholder key={i} token={m[1]} /> : <span key={i}>{keepDates(part)}</span>;
        })}
    </p>
  ));
