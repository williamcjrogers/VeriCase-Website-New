import { lazy } from 'react';
import { LazyMount } from '@/components/editorial/LazyMount';
import { CASE_ROOM } from '@/content/home';
import { MEDIA } from '@/content/media';

const AmbientVideo = lazy(() =>
  import(/* webpackChunkName: "ambient-video" */ '@/components/editorial/AmbientVideo').then((m) => ({ default: m.AmbientVideo }))
);

// PENDING shared change: `mobileSrc: null` in MEDIA.caseRoom (src/content/media.js), as
// residentialFrame has, for a portrait poster on phones. Until then it reads as undefined and
// the one poster serves every width.
const media = MEDIA.caseRoom;

// True once Plate 3 is approved, so that its caption is shown only with its image.
export const HAS_PLATE = Boolean(media.src);

// The header band of Chapter V. Once Plate 3 is approved (MEDIA.caseRoom.src) the case-room film,
// or its poster where the film may not play, sits behind the header under a flat navy scrim, with
// its pause control; it loads as the band comes near. Until then the band is the ink ground with
// rain on the glass, drawn in code and decorative, so no image or video renders without a source.
export const CaseBand = ({ children }) => (
  <div className={HAS_PLATE ? 'cr-band has-media' : 'cr-band'}>
    {HAS_PLATE ? (
      <LazyMount className="absolute inset-0" skeleton={<span className="cr-scrim absolute inset-0" aria-hidden="true" />}>
        <AmbientVideo
          webm={media.webm}
          mp4={media.mp4}
          poster={`${media.src}-1440.webp`}
          posterMobile={media.mobileSrc ? `${media.mobileSrc}-640.webp` : undefined}
          alt={CASE_ROOM.plate.alt}
          labels={CASE_ROOM.video}
          className="absolute inset-0"
          overlayClassName="cr-scrim"
        />
      </LazyMount>
    ) : (
      <div className="cr-rain" aria-hidden="true" />
    )}
    <div className="relative">{children}</div>
  </div>
);
