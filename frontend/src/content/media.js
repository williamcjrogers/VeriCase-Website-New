// Plates and film. `src` is the base path of a WebP set (`${src}-640.webp`, `-960`, `-1440`,
// `-1920`) and `lqip` a 24 px data URI. Each is null until its image has been curated and
// approved (gate G10); until then the plate keeps its size and shows a ruled stand-in.
export const MEDIA = {
  // A founder photograph, if supplied, takes Plate 4's place and the plates after it renumber.
  founderPhoto: null,
  residentialFrame: { src: null, mobileSrc: null, lqip: null, ratio: '21 / 9', ratioMobile: '4 / 5' },
  archiveAisle: { src: null, lqip: null, ratio: '4 / 5' },
  caseRoom: { src: null, mobileSrc: null, lqip: null, ratio: '16 / 9', webm: null, mp4: null },
  siteOffice: { src: null, lqip: null, ratio: '4 / 5' },
  shelfGap: { src: null, lqip: null, ratio: '3 / 2' },
  diaryPage: { src: null, lqip: null, ratio: '3 / 4' },
};

// Plate numbers in page order: 1 (Chapter I), 2 (Chapter II), 3 (Chapter V), then the founder
// section's plate (omitted when a photograph is used). The demonstration panel carries no plate.
export const PLATE_NUMBERS = MEDIA.founderPhoto ? { founder: null } : { founder: 4 };
