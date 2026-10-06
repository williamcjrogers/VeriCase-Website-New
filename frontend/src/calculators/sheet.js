import { ACTIVITIES } from './reductions';

// The timesheet both calculators draw: one square for a working day, or for a block of days so
// that there are never more than 520, coloured by activity, with the squares that could be freed
// hatched at the end of each activity's run. `acts` maps each activity to its hours (h) and its
// hours freed in the central case (fh), already multiplied by the number of matters.
export const timesheet = (acts, hoursPerDay) => {
  const days = (h) => h / hoursPerDay;
  const totalDays = ACTIVITIES.reduce((s, a) => s + days(acts[a].h), 0);
  const unit = [1, 2, 5, 10, 20, 50, 100, 200].find((u) => totalDays / u <= 520) || 500;
  const cells = Math.round(totalDays / unit);
  const per = ACTIVITIES.map((a) => ({ a, exact: days(acts[a].h) / unit }));
  per.forEach((p) => { p.n = Math.floor(p.exact); });
  let left = cells - per.reduce((s, p) => s + p.n, 0);
  per
    .slice()
    .sort((x, y) => y.exact - y.n - (x.exact - x.n))
    .forEach((p) => {
      if (left > 0) {
        p.n += 1;
        left -= 1;
      }
    });
  const squares = [];
  for (const p of per) {
    const act = acts[p.a];
    const freed = act.h > 0 ? Math.round((p.n * act.fh) / act.h) : 0;
    for (let i = 0; i < p.n; i += 1) squares.push({ a: p.a, freed: i >= p.n - freed });
  }
  const freedDays = ACTIVITIES.reduce((s, a) => s + days(acts[a].fh), 0);
  return { unit, squares, totalDays, freedDays };
};
