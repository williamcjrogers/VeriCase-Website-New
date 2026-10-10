// Where the home page and the footer link to the two cost calculators. Kept apart from the
// calculators' own words (content/calculators.js), which load only with the calculator pages.
export const CALCULATOR_GATE = 'G15_calculators';

// Where the site links to the calculators.
export const CALCULATOR_LINKS = {
  collaboration: { text: 'Estimate the cost of discussing the evidence on your own matter', href: '/discussion-cost' },
  research: {
    eyebrow: 'Cost calculator',
    title: 'What does the evidence cost your team?',
    text: 'Estimate the professional time spent finding, reading, discussing and bundling evidence. Every rate and reduction shows its basis.',
    link: 'Open the evidence cost calculator',
    href: '/evidence-cost',
  },
  footer: { title: 'Calculators', discussion: 'Cost of discussing the evidence', evidence: 'Cost of the evidence to your team' },
};
