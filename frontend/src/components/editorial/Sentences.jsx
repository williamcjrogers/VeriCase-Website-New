// Sets a title of several sentences one sentence per line, so that no line breaks mid-sentence
// ("Many threads. One order of events." reads as two lines, never "Many threads. One / order").
// A single sentence renders as plain text. (No lookbehind: older Safari cannot parse it.)
export const Sentences = ({ text }) => {
  const parts = String(text)
    .replace(/([.!?])\s+(?=[A-Z])/g, '$1\n')
    .split('\n');
  if (parts.length < 2) return text;
  return parts.map((s) => (
    <span key={s} className="block">
      {s}
    </span>
  ));
};
