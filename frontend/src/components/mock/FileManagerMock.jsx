import { useId } from 'react';
import { Switch } from '@/components/ui/switch';
import { EvidenceChip } from '@/components/mock/EvidenceChip';
import { Gated, isShown } from '@/components/editorial/Gated';
import { WORKBENCH } from '@/content/sampleMatter';

const FM = WORKBENCH.fileManager;
const TOTAL_LABEL = WORKBENCH.ledger[1][0]; // "Attachments extracted", as the ledger names it
const TOTAL = FM.counts.reduce((sum, [, n]) => sum + n, 0);
const FILE_HEADS = ['Name', 'Type', 'From', 'Size'];
const FILE_LIST_LABEL = 'Extracted attachments in the sample';
// The exhibits the files came from, in date order, for the Source sheet's previous and next.
const SOURCES = [...new Set(FM.files.map((f) => f.from))].sort();

// The rows File Manager lists: the extracted attachments, then any noise that Show Noise reveals.
const rowsFor = (noise) => [
  ...FM.files.map((f) => ({ ...f, key: f.name })),
  ...(noise ? FM.noise.map((n) => ({ key: n.name, name: n.name, type: 'Images', note: n.note, noise: true })) : []),
];

// A file's name, with the Noise label and its note when it has been set aside as noise.
const FileName = ({ row }) => (
  <>
    <span className="wb-filename">{row.name}</span>
    {row.noise && (
      <>
        <span className="wb-noise">{FM.noiseLabel}</span>
        <span className="wb-noise-note">({row.note})</span>
      </>
    )}
  </>
);

// File Manager: extracted attachments counted by type, and Show Noise for what was set aside.
export const FileManagerMock = ({ noise, onNoise }) => {
  const headId = useId();
  const switchId = useId();
  const rows = rowsFor(noise);
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="wb-files-head">
        <h3 id={headId} className="wb-files-title">
          {FM.heading}
        </h3>
        {isShown('G5_showNoise') && (
          <Gated id="G5_showNoise" as="div" className="flex items-center">
            <div className="flex items-center gap-2.5">
              <Switch id={switchId} checked={noise} onCheckedChange={onNoise} className="wb-switch" />
              <label htmlFor={switchId} className="cursor-pointer text-caption font-medium text-navy">
                {FM.showNoise}
              </label>
            </div>
          </Gated>
        )}
      </div>

      <dl className="wb-kpis" aria-labelledby={headId}>
        {FM.counts.map(([type, n]) => (
          <div key={type} className="wb-kpi">
            <dt>{type}</dt>
            <dd>{n}</dd>
          </div>
        ))}
        <div className="wb-kpi wb-kpi-total">
          <dt>{TOTAL_LABEL}</dt>
          <dd>{TOTAL}</dd>
        </div>
      </dl>

      <div className="wb-files-list">
        <table className="wb-table wb-files-table">
          <caption className="sr-only">{FILE_LIST_LABEL}</caption>
          <thead>
            <tr>
              {FILE_HEADS.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className={row.noise ? 'wb-row-in wb-noise-row' : undefined}>
                <td>
                  <FileName row={row} />
                </td>
                <td>{row.type}</td>
                <td>{row.from && <EvidenceChip id={row.from} list={SOURCES} />}</td>
                <td className="wb-mono">{row.size}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="wb-stack wb-files-stack" aria-label={FILE_LIST_LABEL}>
          {rows.map((row) => (
            <li key={row.key} className={row.noise ? 'wb-stack-item wb-row-in wb-noise-row' : 'wb-stack-item'}>
              <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <FileName row={row} />
              </p>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-meta text-graphite">
                <span>{row.type}</span>
                {row.size && <span className="wb-mono">{row.size}</span>}
                {row.from && <EvidenceChip id={row.from} list={SOURCES} />}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
