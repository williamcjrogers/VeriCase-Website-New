// Tailwind classes that restyle the shadcn toggle items for the mocks. They go through cn(), so
// tailwind-merge replaces the defaults they conflict with (size, radius, hover and on states).
export const SEG_ITEM =
  'relative z-[1] h-full min-w-[3.75rem] rounded-none bg-transparent px-2.5 text-[0.8125rem] sm:min-w-[4.5rem] sm:px-3.5 font-medium text-graphite hover:bg-transparent hover:text-navy data-[state=on]:bg-transparent data-[state=on]:text-navy';
export const MINI_ITEM =
  'h-7 min-w-0 rounded-sm px-2.5 text-xs font-medium text-graphite hover:bg-parchment hover:text-navy data-[state=on]:bg-parchment-300 data-[state=on]:text-navy';
export const PARTY_ITEM =
  'h-7 min-w-0 rounded-sm border border-dashed border-rule-strong bg-transparent px-2.5 text-[0.8125rem] font-medium text-graphite hover:bg-parchment hover:text-navy data-[state=on]:border-solid data-[state=on]:bg-parchment-300 data-[state=on]:text-navy';
