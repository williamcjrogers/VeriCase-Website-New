import { CircleCheck, CloudUpload, Mail } from 'lucide-react';
import { UPLOAD_EXAMPLE as U } from '@/content/examples';
import { useFigurePlay } from '../illustrationKit';
import { AppButton, AppFrame } from './AppFrame';

// Add Evidence: the drop zone with the formats it takes, then a mailbox passing through the four
// steps the application names, then what it holds once ready. Nothing is typed: the steps take a
// turn of 380 each after the kit's wait of 320 (the file, four steps, the result), settling 420
// after the last; the duration adds 300.
const PARTS = 1 + U.steps.length + 1;
export const UPLOAD_DURATION = 320 + (PARTS - 1) * 380 + 420 + 300;

export const UploadExample = ({ id = 'upload-example', play: shared }) => {
  const [ref, playClass, play] = useFigurePlay(shared, { duration: UPLOAD_DURATION });
  return (
    <AppFrame id={id} className="upload-example" title={U.title} view={U.view} caption={U.caption} play={play} playClass={playClass} figureRef={ref}>
      <div className="upload-drop">
        <span className="app-icon-tile"><CloudUpload aria-hidden="true" /></span>
        <p className="app-h">{U.heading}</p>
        <p className="app-quiet" style={{ margin: 0 }}>{U.intro}</p>
        <AppButton primary>Select files</AppButton>
        <ul className="upload-formats" aria-label="Formats">
          {U.formats.map((f) => <li key={f}>.{f}</li>)}
        </ul>
      </div>
      <div className="upload-file app-card" data-appear style={{ '--i': 0 }}>
        <p className="upload-file-name" style={{ margin: 0 }}><Mail aria-hidden="true" />{U.file.name}<span className="app-quiet">{U.file.size}</span></p>
        <ol className="upload-steps" role="list">
          {U.steps.map((step, k) => (
            <li key={step.name} data-appear style={{ '--i': k + 1 }}>
              <CircleCheck aria-hidden="true" />
              <span className="upload-step-name">{step.name}</span>
              <span className="upload-step-text">{step.text}</span>
            </li>
          ))}
        </ol>
        <dl className="upload-result" data-appear style={{ '--i': PARTS - 1 }}>
          {U.result.map((r) => (
            <div key={r.label}><dt>{r.label}</dt><dd>{r.value}</dd></div>
          ))}
        </dl>
      </div>
    </AppFrame>
  );
};
