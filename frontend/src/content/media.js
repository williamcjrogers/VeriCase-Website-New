// Plates and film. `src` is the base path of a WebP set (`${src}-640.webp`, `-960`, `-1440`,
// `-1920`) and `lqip` a 24 px data URI. Each is null until its image has been curated and
// approved (gate G10); until then the plate keeps its size and shows a ruled stand-in.
export const MEDIA = {
  residentialFrame: { src: null, mobileSrc: null, lqip: null, ratio: '21 / 9', ratioMobile: '4 / 5' },
  archiveAisle: { src: null, lqip: null, ratio: '4 / 5' },
  caseRoom: { src: null, mobileSrc: null, lqip: null, ratio: '16 / 9', webm: null, mp4: null },
  bundle: { src: null, lqip: null, ratio: '3 / 2' },
  shelfGap: { src: null, lqip: null, ratio: '3 / 2' },
  diaryPage: { src: null, lqip: null, ratio: '3 / 4' },
};

// Plate numbers in page order: 1 (Chapter I), 2 (Chapter II), 3 (Chapter V), then the
// demonstration plate. The founder section's plate (the old Plate 4) was removed.
export const PLATE_NUMBERS = { demonstration: 4 };
