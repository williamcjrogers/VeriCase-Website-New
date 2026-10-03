import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Expand, X } from 'lucide-react';
import './product-mobile.css';

// Crop coordinates refer to unchanged, synthetic application captures.
// The inspector keeps the desktop crop, excluding historical navigation.
// Phone previews show a focal detail wholly within that approved crop.
export const PRODUCT_VIEWS = {
  reader: {
    file: 'document-reader-qa-2026-09-06.png', width: 1440, height: 760,
    mobileCrop: [640, 354, 496, 326],
    mobileTitle: 'Read the document',
    previewAlt: 'Application capture of a construction agreement labelled synthetic test document. The narrow preview focuses on the document; the larger view also shows its file list.',
    crop: [244, 76, 1196, 684], title: 'Read the document beside the file record',
    alt: 'Application capture showing a selected construction agreement alongside its file list. The document is labelled synthetic test document.',
    caption: 'Document reader, September 2026. Illustrative records in a captured application view.',
  },
  search: {
    file: 'files-search-qa-2026-09-05.png', width: 1440, height: 1000,
    mobileCrop: [756, 258, 304, 284],
    mobileTitle: 'See the matching passage',
    previewAlt: 'File search for retention showing highlighted matching text. The narrow preview focuses on the Match column; the larger view also shows document names, folders, file sizes and dates.',
    crop: [484, 76, 948, 766], title: 'See the matching passage in context',
    alt: 'File search for retention showing matching text highlighted beside the document names, with folders, file sizes and dates.',
    caption: 'File search, September 2026. The highlighted matches and document records are illustrative.',
  },
  export: {
    file: 'report-export-qa-2026-09-12.png', width: 1440, height: 1107,
    mobileCrop: [305, 428, 536, 174],
    mobileTitle: 'See source links and quoted passages',
    previewAlt: 'Illustrative report export showing a source document link and a distinct quoted passage. The narrow preview focuses on these details; the larger view includes an event register and a statement that the sample contains no findings about a real dispute.',
    crop: [272, 194, 896, 606], title: 'See report structure and source links in an export',
    alt: 'Illustrative report export with a source link, a distinct quoted passage and an event register. It explicitly contains no findings about a real dispute.',
    caption: 'Illustrative report export, September 2026. A sample of report formatting, containing no findings about a real dispute.',
  },
};

const cropStyles = (view, crop) => {
  const [x, y, width, height] = crop;
  return {
    ratio: `${width} / ${height}`,
    width: `${view.width / width * 100}%`,
    left: `${-x / width * 100}%`,
    top: `${-y / height * 100}%`,
  };
};

const Capture = ({ view, priority = false, onError, preview = false }) => {
  const desktop = cropStyles(view, view.crop);
  const mobile = cropStyles(view, view.mobileCrop);
  return (
    <div className={`product-crop${preview ? ' product-preview-crop' : ''}`} style={{
      aspectRatio: 'var(--preview-crop-ratio, var(--crop-ratio))',
      '--capture-width': `${view.crop[2]}px`,
      '--crop-ratio': desktop.ratio,
      '--image-width': desktop.width,
      '--image-left': desktop.left,
      '--image-top': desktop.top,
      ...(preview ? {
        '--mobile-crop-ratio': mobile.ratio,
        '--mobile-image-width': mobile.width,
        '--mobile-image-left': mobile.left,
        '--mobile-image-top': mobile.top,
      } : {}),
    }}>
      <img src={`/images/product/${view.file}`} alt={preview ? view.previewAlt : view.alt} width={view.width} height={view.height}
        loading={priority ? 'eager' : 'lazy'} fetchpriority={priority ? 'high' : 'auto'} decoding="async"
        onError={onError} draggable="false"
        style={{ width: 'var(--preview-image-width, var(--image-width))', maxWidth: 'none', left: 'var(--preview-image-left, var(--image-left))', top: 'var(--preview-image-top, var(--image-top))' }} />
    </div>
  );
};

export const ProductFigure = ({ kind, priority = false }) => {
  const view = PRODUCT_VIEWS[kind];
  const [failed, setFailed] = useState(false);
  const fail = () => setFailed(true);
  return (
    <figure className={`product-figure product-figure-${kind}`}>
      <Dialog.Root>
        <div className="product-frame">
          {failed ? <p className="product-fallback" role="status">The image could not be loaded. {view.alt}</p> : (
            <div className="product-preview">
              <Capture view={view} priority={priority} onError={fail} preview />
            </div>
          )}
          <div className="product-toolbar">
            <p><span className="product-desktop-title">{view.title}</span><span className="product-mobile-title">{view.mobileTitle}</span></p>
            <Dialog.Trigger className="product-enlarge" aria-label={`${failed ? 'Read image description' : 'View larger'}: ${view.title}`}><Expand size={16} aria-hidden="true" />{failed ? 'Read description' : 'View larger'}</Dialog.Trigger>
          </div>
        </div>
        <figcaption>{view.caption}{!failed && <span className="product-mobile-note"> Detail shown. Use View larger to inspect the wider capture.</span>}</figcaption>
        <Dialog.Portal>
          <Dialog.Overlay className="product-overlay" />
          <Dialog.Content className="product-inspector">
            <div className="product-inspector-heading">
              <Dialog.Title>{view.title}</Dialog.Title>
              <Dialog.Close className="product-close" aria-label="Close image"><X size={22} aria-hidden="true" /></Dialog.Close>
            </div>
            <Dialog.Description>{view.caption} Scroll to inspect the full-size capture.</Dialog.Description>
            <div className="product-inspector-scroll" tabIndex={0} role="region" aria-label="Full-size application capture">
              {failed ? <p className="product-fallback" role="status">The image could not be loaded. {view.alt}</p> : <Capture view={view} onError={fail} />}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </figure>
  );
};
