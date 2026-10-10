// The stops of the lens and the stage at a given position. Kept free of imports: both the
// static figure and the lazily loaded controller use it, and anything the controller imports
// from the content files would keep all of that copy in the initial chunk.
export const STOPS = [0, 20, 40, 60, 80, 100];
export const INITIAL_X = 0;

// Stage index is min(5, floor(lensX / 20)); each operation completes before the stop named for it.
export const stageOf = (x) => Math.min(5, Math.floor(x / 20 + 1e-9));
