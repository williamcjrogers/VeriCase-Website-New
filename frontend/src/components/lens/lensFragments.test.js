// Fig. 1's data agrees with the copy deck: each operation completes before the stop named for
// it, each cast matches the counts its copy states, and the labels are the spec's words.
import { FOOT, FRAGMENTS, ROWS, THREADS, TRAY } from './lensFragments';
import { STOPS, stageOf, INITIAL_X } from './lensStages';
import { COVER } from '../../content/home';
import { WORKBENCH } from '../../content/sampleMatter';

const t = Object.fromEntries(FRAGMENTS.map((f) => [f.id, f.t]));
const desktop = FRAGMENTS;
const mobile = FRAGMENTS.filter((f) => !f.desktopOnly);
const count = (text, word) => Number(new RegExp(`(\\d+) ${word}`).exec(text)[1]);

describe('Fig. 1 fragments', () => {
  it('completes each operation before the stop named for it', () => {
    expect(STOPS).toEqual([0, 20, 40, 60, 80, 100]);
    expect(Math.max(t['EV-0131'], t['EV-0138'], ...THREADS.map((th) => th.t))).toBeLessThan(20);
    expect(Math.max(t['EV-0139'], t['EV-0144'])).toBeLessThan(40);
    expect(Math.max(t['N-3'], t['N-1'], t['N-2'])).toBeLessThan(60);
    expect(Math.max(t['EV-0147'], t['EV-0151'])).toBeLessThan(80);
  });

  it('keeps the thresholds of the spec, rising through the pile', () => {
    expect(FRAGMENTS.map((f) => f.t)).toEqual([6, 14, 24, 34, 44, 50, 56, 64, 72]);
  });

  it('uses the processing labels of the copy deck', () => {
    expect(FRAGMENTS.map((f) => f.chip)).toEqual([
      'Thread 1 · 3 messages',
      'Threaded by References header',
      'Quoted history folded (3)',
      'Scanned page read by OCR',
      'Near-duplicate: removed from review; original retained',
      'Automatic reply: hidden as noise',
      'Project Birch: excluded as another project',
      'Attachment extracted: Delivery_schedule.pdf',
      'Placed in order: 28 March 2025',
    ]);
  });

  it('leaves out the scan and the automatic reply on mobile only', () => {
    expect(desktop).toHaveLength(9);
    expect(mobile.map((f) => f.id)).toEqual(['EV-0131', 'EV-0138', 'EV-0139', 'N-3', 'N-2', 'EV-0147', 'EV-0151']);
    expect(mobile.every((f) => Array.isArray(f.m))).toBe(true);
  });

  it('keeps every desk item inside the field', () => {
    for (const f of FRAGMENTS) {
      expect(f.d[0] + (f.kind === 'scan' ? 18 : 28)).toBeLessThanOrEqual(99);
      if (f.m) expect(f.m[0] + 42).toBeLessThanOrEqual(99);
    }
  });
});

describe('Fig. 1 chronology', () => {
  it('lists the rows in date order, each revealed by its own fragment', () => {
    const dates = ROWS.map((r) => new Date(r.date).getTime());
    expect([...dates].sort((a, b) => a - b)).toEqual(dates);
    ROWS.forEach((r) => expect(r.t).toBe(t[r.ev]));
  });

  it('shows rows 1 to 4 processed in the prerendered mid state', () => {
    expect(stageOf(INITIAL_X)).toBe(2);
    expect(ROWS.filter((r) => r.t <= INITIAL_X).map((r) => r.n)).toEqual([1, 2, 3, 4]);
  });

  it('states the counts of each cast in its footer and tray', () => {
    const casts = {
      desktop: { rows: ROWS, aside: desktop.filter((f) => f.aside) },
      mobile: { rows: ROWS.filter((r) => !r.desktopOnly), aside: mobile.filter((f) => f.aside) },
    };
    for (const [cast, { rows, aside }] of Object.entries(casts)) {
      const foot = `${FOOT[cast].lead}${FOOT[cast].verified}`;
      const parties = new Set(rows.flatMap((r) => WORKBENCH.entryParties[r.ev]));
      expect(count(foot, 'entries')).toBe(rows.length);
      expect(count(foot, 'parties')).toBe(parties.size);
      expect(count(foot, 'set aside')).toBe(aside.length);
      expect(FOOT[cast].verified).toBe(`${rows.length} of ${rows.length} linked to source`);
      expect(TRAY[cast]).toHaveLength(aside.length);
      expect(TRAY[cast].map((s) => s.t)).toEqual(aside.map((f) => f.t));
    }
  });

  it('rebuilds the tray copy exactly from its parts', () => {
    const join = (segs) => `${segs[0].label} ${segs.map((s) => s.text).join(' · ')}`;
    expect(join(TRAY.desktop)).toBe(COVER.fig.trayDesktop);
    expect(join(TRAY.mobile)).toBe(COVER.fig.trayMobile);
    expect(`${FOOT.desktop.lead}${FOOT.desktop.verified}`).toBe(COVER.fig.footDesktop);
  });
});
