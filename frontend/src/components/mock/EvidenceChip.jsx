import { recordPhrase } from '@/content/records';
import { useSourceSheet } from '@/components/mock/SourceSheet';
import { cn } from '@/lib/utils';

// A product citation. variant="chip" renders [EV-0138]; variant="superscript" renders the
// citation number. Either opens the fictional source in the Source sheet. `list` is the ordered
// set of exhibits the sheet's previous and next buttons move through.
export const EvidenceChip = ({ id, variant = 'chip', n, list, className }) => {
  const sheet = useSourceSheet();
  const open = (e) => sheet.open(id, list, e.currentTarget);

  if (variant === 'superscript') {
    return (
      <sup className="vc-sup">
        <button
          type="button"
          onClick={open}
          className={cn('superscript-ref is-cite', className)}
          aria-label={`Citation ${n}: open source ${id}, ${recordPhrase(id)}`}
        >
          {n}
        </button>
      </sup>
    );
  }
  return (
    <button
      type="button"
      onClick={open}
      className={cn('ev-chip', className)}
      aria-label={`${id}: open source, ${recordPhrase(id)}`}
    >
      [{id}]
    </button>
  );
};
