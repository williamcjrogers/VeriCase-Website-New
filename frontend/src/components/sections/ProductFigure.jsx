import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Expand, X } from 'lucide-react';

// Crop coordinates refer to unchanged, synthetic application captures.
// The inspector keeps the same crop, excluding historical navigation.
export const PRODUCT_VIEWS = {
  reader: {
    file: 'document-reader-qa-2026-09-06.png', width: 1440, height: 760,
    crop: [244, 76, 1196, 684], title: 'Read the document beside the file record',
    alt: 'Application capture showing a selected construction agreement alongside its file list. The document is labelled synthetic test document.',
    caption: 'Document reader, September 2026. Illustrative records in a captured application view.',
  },
  search: {
    file: 'files-search-qa-2026-09-05.png', width: 1440, height: 1000,
    crop: [484, 76, 948, 766], title: 'See the matching passage in context',
    alt: 'File search for retention showing matching text highlighted beside the document names, with folders, file sizes and dates.',
    caption: 'File search, September 2026. The highlighted matches and document records are illustrative.',
  },
  export: {
    file: 'report-export-qa-2026-09-12.png', width: 1440, height: 1107,
    crop: [272, 194, 896, 606], title: 'See report structure and source links in an export',
    alt: 'Illustrative report export with a source link, a distinct quoted passage and an event register. It explicitly contains no findings about a real dispute.',
    caption: 'Illustrative report export, September 2026. A sample of report formatting, containing no findings about a real dispute.',
  },
};

const Capture = ({ view, priority = false, onError }) => {
  const [x, y, width, height] = view.crop;
  return (
    <div className="product-crop" style={{ aspectRatio: `${width} / ${height}`, '--capture-width': `${width}px` }}>
      <img src={`/images/product/${view.file}`} alt={view.alt} width={view.width} height={view.height}
        loading={priority ? 'eager' : 'lazy'} fetchpriority={priority ? 'high' : 'auto'} decoding="async"
        onError={onError} draggable="false"
        style={{ width: `${view.width / width * 100}%`, maxWidth: 'none', left: `${-x / width * 100}%`, top: `${-y / height * 100}%` }} />
    </div>
  );
};

export const ProductFigure = ({ kind, priority = false }) => {
  const view = PRODUCT_VIEWS[kind];
  const [failed, setFailed] = useState(false);
  const fail = () => setFailed(true);
  // On a narrow screen start at the reader, with the file list still reachable by scrolling.
  const frame = (node) => {
    if (kind === 'reader' && node && node.clientWidth > 0 && node.clientWidth < 768) node.scrollLeft = 312;
  };
  return (
    <figure className={`product-figure product-figure-${kind}`}>
      <Dialog.Root>
        <div className="product-frame">
          {failed ? <p className="product-fallback" role="status">The image could not be loaded. {view.alt}</p> : (
            <div ref={frame} className="product-preview" tabIndex={0} role="region" aria-label={`${view.title}. Scroll to inspect the capture.`}>
              <Capture view={view} priority={priority} onError={fail} />
            </div>
          )}
          <div className="product-toolbar">
            <p>{view.title}</p>
            <Dialog.Trigger className="product-enlarge" aria-label={`${failed ? 'Read image description' : 'View larger'}: ${view.title}`}><Expand size={16} aria-hidden="true" />{failed ? 'Read description' : 'View larger'}</Dialog.Trigger>
          </div>
        </div>
        <figcaption>{view.caption}<span className="product-pan-hint"> Scroll within the image to inspect it.</span></figcaption>
        <Dialog.Portal>
          <Dialog.Overlay className="product-overlay" />
          <Dialog.Content className="product-inspector">
            <div className="product-inspector-heading">
              <Dialog.Title>{view.title}</Dialog.Title>
              <Dialog.Close className="product-close" aria-label="Close image"><X size={22} aria-hidden="true" /></Dialog.Close>
            </div>
            <Dialog.Description>{view.caption} Scroll to inspect the full-size capture.</Dialog.Description>
            <div ref={frame} className="product-inspector-scroll" tabIndex={0} role="region" aria-label="Full-size application capture">
              {failed ? <p className="product-fallback" role="status">The image could not be loaded. {view.alt}</p> : <Capture view={view} onError={fail} />}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </figure>
  );
};
