import { STATS } from '@/content/stats';

// Numbered source notes for the statistics shown in a section.
export const SourceNotes = ({ keys, idPrefix, className = '' }) => (
  <ol className={`space-y-1 text-[11px] sm:text-xs leading-relaxed text-gray-500 ${className}`}>
    {keys.map((key, index) => (
      <li key={key} id={`${idPrefix}-${index + 1}`} className="flex gap-2">
        <span className="font-semibold text-gray-600">{index + 1}.</span>
        <span>{STATS[key].source}</span>
      </li>
    ))}
  </ol>
);

export const NoteRef = ({ n, idPrefix }) => (
  <sup className="ml-0.5 align-super text-[0.6em] font-semibold">
    <a href={`#${idPrefix}-${n}`} className="text-gray-500 hover:text-gray-800" aria-label={`Source ${n}`}>
      {n}
    </a>
  </sup>
);
