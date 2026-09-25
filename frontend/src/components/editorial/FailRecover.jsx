import { Gated } from '@/components/editorial/Gated';
import { cn } from '@/lib/utils';

// "Where the record fails" (dashed graphite rule) and "Where VeriCase comes in" (solid azure rule).
// A reader skimming the page can read only these pairs and follow the argument.
export const FailRecover = ({ fail, recover, recoverGate, onInk = false, className }) => {
  const recoverText = recoverGate ? <Gated id={recoverGate}>{recover}</Gated> : recover;
  return (
    <div className={cn('grid gap-6 sm:grid-cols-2 sm:gap-10', className)}>
      <div className="fail-rule pl-5">
        <p className={cn('font-mono text-label font-medium uppercase', onInk ? 'text-mist' : 'text-graphite')}>Where the record fails</p>
        <p className={cn('mt-2 text-body', onInk ? 'text-parchment/90' : 'text-ink')}>{fail}</p>
      </div>
      <div className="recover-rule pl-5">
        <p className={cn('font-mono text-label font-medium uppercase', onInk ? 'text-azure-300' : 'text-azure-700')}>Where VeriCase comes in</p>
        <p className={cn('mt-2 text-body', onInk ? 'text-parchment' : 'text-navy')}>{recoverText}</p>
      </div>
    </div>
  );
};
