import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { NoteBody } from '@/components/editorial/NoteBody';
import { COLLABORATION } from './home';
import { noteByNumber } from './notes';

// The modelled cost in note 3 (rates verified by the owner, 06 October 2026): the minutes and
// rates for each role, in pence so that the sums are exact, and the cases the note states.
const ROLES = [
  { role: 'commercial manager', minutes: 10, pence: 4750 }, // derived from salary
  { role: 'solicitor', minutes: 12, pence: 30500 }, // HMCTS guideline, Grade C, London 1
  { role: 'partner', minutes: 3, pence: 57900 }, // HMCTS guideline, Grade A, London 1
  { role: 'counsel', minutes: 5, pence: 15000 }, // Attorney General's London A Panel
  { role: 'delay expert', minutes: 5, pence: 25373 }, // Bond Solon Expert Witness Survey 2025
  { role: 'quantum expert', minutes: 5, pence: 25373 },
];
const perRound = ROLES.reduce((sum, r) => sum + r.minutes * r.pence, 0) / 60; // pence, to the half
const pounds = (pence) => {
  const [whole, part] = (pence / 100).toFixed(2).split('.');
  return `£${whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${part}`;
};
const roundedTo100 = (pence) => `£${String(Math.round(pence / 10000) * 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

it('states each role’s minutes and rate, and adds them up correctly', () => {
  const note = [].concat(noteByNumber(3).body).join(' ');
  expect(ROLES.reduce((sum, r) => sum + r.minutes, 0)).toBe(40);
  expect(note).toContain('40 minutes of professional time');
  for (const r of ROLES) expect(note).toContain(`${r.minutes} minutes at ${pounds(r.pence).replace(/\.00$/, '')}`);
  expect(note).toContain(`That is ${pounds(Math.round(perRound))} a round`);
  expect(note).toContain(`${pounds(perRound * 120)} for 120 rounds in one adjudication`);
  expect(note).toContain(`${pounds(perRound * 900)} for 900 rounds`);
  expect(note).toContain(`${pounds((perRound * 300) / 2)} on a conservative case of 300 rounds at half the minutes`);
  expect(note).toContain(`${pounds(perRound * 2400)} on a high case of 2,400 rounds (600 documents, each discussed four times)`);
  expect(note).toContain(`${pounds(perRound * 900)} for 900 rounds (300 documents, each discussed three times)`);
  // A cost of time, never a saving; and the date the rates were checked.
  expect(note).toMatch(/not a measured saving/);
  expect(note).toMatch(/the rates are as checked on \d{2} [A-Z][a-z]+ \d{4}\./);
  expect(note).toMatch(/The minutes, the numbers of rounds, the overhead and the working week are our assumptions/);
});

it('shows the page’s figures as the note’s, rounded to the nearest £100', () => {
  const stat = COLLABORATION.stats.find((s) => s.text.includes('[[note:3]]'));
  expect(stat.figure).toBe(`About ${roundedTo100(perRound * 120)}`);
  expect(stat.label).toBe('Modelled cost, not a measured saving');
  expect(stat.text).toContain(`between about ${roundedTo100((perRound * 300) / 2)} and ${roundedTo100(perRound * 900)}`);
});

it('keeps the collaboration example consistent with the six-person model, without presenting a saving', () => {
  const [people, time, cost] = COLLABORATION.costExample.figures;
  expect(people.value).toBe(String(ROLES.length));
  expect(time.value).toBe(`${ROLES.reduce((sum, role) => sum + role.minutes, 0)} min`);
  expect(time.label).toContain('combined');
  expect(cost.value).toBe(`£${Math.round(perRound / 100)}`);
  expect(cost.label).toContain('per discussion round');
  expect(COLLABORATION.costExample.basis).toMatch(/Illustrative professional-time cost, not a measured saving/);
});

it('renders a note of several paragraphs, each date on one line', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  global.IS_REACT_ACT_ENVIRONMENT = true;
  act(() => root.render(<NoteBody body={noteByNumber(3).body} className="section-note-body" />));
  const paragraphs = container.querySelectorAll(':scope > p.section-note-body');
  expect(paragraphs).toHaveLength([].concat(noteByNumber(3).body).length);
  expect(container.textContent).toContain('01 January 2026');
  act(() => root.unmount());
});
