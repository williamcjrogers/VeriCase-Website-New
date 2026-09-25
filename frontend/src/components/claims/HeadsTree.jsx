import { useId } from 'react';
import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CLAIMS_BUILDER } from '@/content/sampleMatter';
import { plural } from '@/lib/format';

// A head's number in mono brass beside its title.
const Head = ({ n, title }) => (
  <>
    <span className="cb-n">{n}</span>
    <span>{title}</span>
  </>
);

// The Heads of Claim as a disclosure tree: nested lists whose parent heads are buttons with
// aria-expanded. The section being drafted is marked current, with its count of exhibits.
export const HeadsTree = ({ label, open, onOpen, cited }) => {
  const id = useId();
  return (
    <div role="group" aria-labelledby={id}>
      <h3 id={id} className="cb-label">
        {label}
      </h3>
      <ul className="cb-tree">
        {CLAIMS_BUILDER.tree.map((head) => (
          <li key={head.n}>
            {head.children.length ? (
              <Collapsible open={open.includes(head.n)} onOpenChange={(o) => onOpen(head.n, o)}>
                <CollapsibleTrigger className="cb-node">
                  <ChevronRight className="cb-chevron" strokeWidth={1.5} aria-hidden="true" />
                  <Head n={head.n} title={head.title} />
                </CollapsibleTrigger>
                <CollapsibleContent className="cb-collapse">
                  <ul className="cb-leaves">
                    {head.children.map((leaf) => (
                      <li key={leaf.n} className="cb-leaf" aria-current={leaf.active ? 'true' : undefined}>
                        <Head n={leaf.n} title={leaf.title} />
                        {leaf.active && <span className="cb-count">{plural(cited, 'exhibit')}</span>}
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <p className="cb-node cb-node-leaf">
                <span aria-hidden="true" />
                <Head n={head.n} title={head.title} />
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
