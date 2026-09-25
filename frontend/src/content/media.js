// Plates and film. `src` is the base path of a WebP set (`${src}-640.webp`, `-960`, `-1440`,
// `-1920`) and `lqip` a 24 px data URI. Each is null until its image has been curated and
// approved (gate G10); until then the plate keeps its size and shows a ruled stand-in.
export const MEDIA = {
  residentialFrame: { src: null, mobileSrc: null, lqip: null, ratio: '21 / 9', ratioMobile: '4 / 5' },
  archiveAisle: { src: null, lqip: null, ratio: '4 / 5' },
  caseRoom: { src: null, lqip: null, ratio: '16 / 9', webm: null, mp4: null },
  siteOffice: { src: null, lqip: null, ratio: '4 / 5' },
  bundle: { src: null, lqip: null, ratio: '3 / 2' },
  shelfGap: { src: null, lqip: null, ratio: '3 / 2' },
  diaryPage: { src: null, lqip: null, ratio: '3 / 4' },
};
