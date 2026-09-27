// The Research demonstration's height in px from each layout width in px (up to the next entry),
// measured on the production build at every width from 320 to 1440 px. The skeleton takes its
// height from this table once the page has hydrated, so nothing shifts when the demonstration
// mounts. Re-measure whenever the demonstration's copy or layout changes.
export const DEMO_HEIGHTS = [
  [320, 3322], [321, 3300], [325, 3273], [327, 3246], [329, 3189], [331, 3166],
  [336, 3111], [342, 3084], [343, 3057], [348, 3009], [355, 2963], [358, 2936],
  [365, 2889], [369, 2870], [370, 2847], [372, 2825], [376, 2798], [381, 2774],
  [382, 2750], [389, 2723], [394, 2696], [396, 2666], [410, 2639], [413, 2617],
  [415, 2559], [418, 2510], [425, 2454], [429, 2427], [430, 2400], [431, 2384],
  [442, 2366], [460, 2337], [471, 2309], [473, 2282], [487, 2255], [505, 2228],
  [542, 2201], [544, 2149], [558, 2122], [568, 2089], [572, 2070], [597, 2043],
  [603, 2020], [620, 1997], [640, 1974], [663, 1947], [665, 1923], [674, 1900],
  [706, 1843], [718, 1815], [735, 1786], [749, 1759], [768, 1724], [771, 1673],
  [784, 1651], [787, 1631], [839, 1574], [894, 1549], [907, 1527], [1024, 1657],
  [1054, 1600], [1100, 1575], [1135, 1553],
];

export const demoHeightAt = (width) => {
  let h = DEMO_HEIGHTS[0][1];
  for (const [from, height] of DEMO_HEIGHTS) {
    if (width < from) break;
    h = height;
  }
  return h;
};
