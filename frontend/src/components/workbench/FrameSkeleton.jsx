// The frame an app mock arrives in: the window's azure strip over a paper body, the same size as
// the mock, shown until its chunk loads. (Plain markup, so the first chunk carries no mock code.)
// data-skeleton lets a wrapper reserve height only while the frame is showing.
export const FrameSkeleton = () => (
  <div aria-hidden="true" data-skeleton className="absolute inset-0 overflow-hidden rounded-md border border-rule-strong/70 bg-paper shadow-paper">
    <div className="h-10 bg-azure-500" />
  </div>
);
