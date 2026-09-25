import { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { EmailArchive } from '@/components/icons';
import { Gated } from '@/components/editorial/Gated';
import { WORKBENCH } from '@/content/sampleMatter';
import { cn } from '@/lib/utils';

// Ledger rows that describe a capability still to be confirmed carry that owner gate.
const ROW_GATES = { 'Quoted passages folded': 'G5_quoted', 'Near-duplicates removed from review': 'G5_nearDup' };

// The ingestion ledger: what VeriCase did to the archive, as mono rows with brass leaders.
const Ledger = ({ className }) => (
  <dl className={cn('wb-ledger', className)}>
    {WORKBENCH.ledger.map(([label, n]) => (
      <div key={label} className="wb-ledger-row">
        <dt>{ROW_GATES[label] ? <Gated id={ROW_GATES[label]}>{label}</Gated> : label}</dt>
        <dd>{n}</dd>
      </div>
    ))}
  </dl>
);

// The left rail from 1024 px: the archive's name above its ledger.
export const LedgerRail = () => {
  const id = useId();
  return (
    <aside className="wb-rail" aria-labelledby={id}>
      <p id={id} className="wb-archive">
        <EmailArchive size={18} className="shrink-0 text-azure-700" />
        <span>{WORKBENCH.archive}</span>
      </p>
      <Ledger className="mt-4" />
    </aside>
  );
};

// Below 1024 px the ledger folds behind the archive's name, so the entries keep the space.
export const LedgerDisclosure = () => (
  <Collapsible className="wb-ledger-fold">
    <CollapsibleTrigger className="wb-fold-trigger group">
      <EmailArchive size={18} className="shrink-0 text-azure-700" />
      <span className="min-w-0 flex-1 break-words text-left">{WORKBENCH.archive}</span>
      <ChevronDown className="h-4 w-4 shrink-0 text-graphite transition-transform duration-200 ease-settle group-data-[state=open]:rotate-180" strokeWidth={1.5} aria-hidden="true" />
    </CollapsibleTrigger>
    <CollapsibleContent className="wb-collapse">
      <Ledger className="px-4 pb-3 pt-1" />
    </CollapsibleContent>
  </Collapsible>
);
