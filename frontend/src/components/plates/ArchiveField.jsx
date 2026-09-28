import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Sheet } from '@/components/plates/drawing';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/lib/utils';
import '@/components/plates/plates.css';

// Plate 2 (Chapter II): the record as it is kept and resolved.
// Six custodian mailboxes across sixteen months, threaded into chronological order,
// noise and near-duplicates set aside, isolating the four pivotal exhibits in the March 2025 dispute.

const W = 400;
const H = 500;

// Custodian columns across the sheet
const LANES = [
  { code: 'EA', role: 'Employer', x: 74 },
  { code: 'DM', role: 'Design', x: 126 },
  { code: 'SM', role: 'Site', x: 178 },
  { code: 'CM', role: 'Commercial', x: 230 },
  { code: 'PM', role: 'Package', x: 282 },
  { code: 'SO', role: 'Supplier', x: 334 },
];

const LABEL =
  'Illustrative drawing: the correspondence topology of the fictional sample matter across six custodians (EA, DM, SM, CM, PM, SO) from January 2024 to April 2025. Threaded correspondence networks link project milestones, while noise and near-duplicates are filtered. The dispute window of 03 March to 04 April 2025 isolates the four pivotal exhibits: EV-0131, EV-0138, EV-0147, and EV-0151.';

export const ArchiveField = ({ label = LABEL, activeStep = null, onSelectStep = null }) => {
  const [containerRef, inView] = useInViewOnce({ threshold: 0.1 });
  const [isPlaying, setIsPlaying] = useState(true);
  const [replayKey, setReplayKey] = useState(0);
  const [scanPhase, setScanPhase] = useState(0);

  const rawMsgs = useCountUp('47,832', { inView, duration: 1800 });
  const noiseFilter = useCountUp('-42.8%', { inView, duration: 1800 });
  const exhibitsCount = useCountUp('8 EXHIBITS', { inView, duration: 1400 });

  // Phase tracker for HUD status when running autonomously
  useEffect(() => {
    if (!isPlaying || activeStep !== null) return;
    const interval = setInterval(() => {
      setScanPhase((p) => (p + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, [isPlaying, activeStep, replayKey]);

  const handleReplay = useCallback(() => {
    setReplayKey((k) => k + 1);
    setScanPhase(0);
    setIsPlaying(true);
    if (onSelectStep) onSelectStep(null);
  }, [onSelectStep]);

  // Derived status text for header
  let statusText = 'SCANNING · 16 MO RECORD';
  if (activeStep !== null) {
    const stepNames = [
      '1. LOAD RECORD (ALL FORMATS)',
      '2. ONE RECORD PER MESSAGE',
      '3. READ WHAT WAS WRITTEN',
      '4. SET ASIDE NOISE (-42.8%)',
      '5. NARROW TO DISPUTE WINDOW',
      '6. CARDS OR TABLE (4 EXHIBITS)',
    ];
    statusText = stepNames[activeStep] || 'STEP SPOTLIGHT';
  } else if (!isPlaying) {
    statusText = 'SCAN PAUSED';
  } else {
    const phases = [
      'INGESTION · 6 CUSTODIANS (Q1)',
      'DE-DUPLICATION · NOISE REMOVAL',
      'DISPUTE WINDOW · 4 EXHIBITS',
      'CHRONOLOGY TIED · RESOLVED',
    ];
    statusText = phases[scanPhase] || 'SCANNING';
  }

  // Spotlight helpers mapping to C.items (0 to 5)
  const isCustodiansActive = activeStep === null || activeStep === 0 || activeStep === 1;
  const isThreadsActive = activeStep === null || activeStep === 1 || activeStep === 2;
  const isNoiseActive = activeStep === null || activeStep === 3;
  const isDisputeActive = activeStep === null || activeStep === 4 || activeStep === 5;
  const isExhibitsActive = activeStep === null || activeStep === 5;

  return (
    <div ref={containerRef} className="h-full w-full relative group">
      {/* Minimal Floating Precision HUD Controls */}
      <div className="plate-hud">
        <span className="plate-hud-status">
          <span className={cn('inline-block w-2 h-2 rounded-full', isPlaying ? 'bg-[#10B981] animate-pulse' : 'bg-[#9CA3AF]')} />
          <span className="text-[10px] font-semibold tracking-wider uppercase text-[#57534E]">
            {activeStep !== null ? 'Spotlight' : isPlaying ? 'Live' : 'Paused'}
          </span>
        </span>
        <div className="plate-hud-divider" />
        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          className="plate-hud-btn"
          title={isPlaying ? 'Pause scan' : 'Resume scan'}
          aria-label={isPlaying ? 'Pause scan' : 'Resume scan'}
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>
        <button
          type="button"
          onClick={handleReplay}
          className="plate-hud-btn"
          title="Replay animation"
          aria-label="Replay animation"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      <Sheet key={replayKey} viewBox={`0 0 ${W} ${H}`} label={label} className="dw">
        <defs>
          {/* Laser Scanner gradient sweep tail */}
          <linearGradient id="scannerGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C4A05A" stopOpacity="0" />
            <stop offset="60%" stopColor="#C4A05A" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#C4A05A" stopOpacity="0.28" />
          </linearGradient>

          {/* Active vector pulse marker */}
          <radialGradient id="pulseAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C4A05A" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#C4A05A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C4A05A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background sheet fill */}
        <rect x="0" y="0" width={W} height={H} fill="#FCFAF5" />

        {/* Outer border & corner crop marks */}
        <rect x="8" y="8" width={W - 16} height={H - 16} fill="none" stroke="#E2DDD2" strokeWidth="0.75" />
        <path d="M 8 18 H 14 M 8 18 V 12 M 392 18 H 386 M 392 18 V 12 M 8 482 H 14 M 8 482 V 488 M 392 482 H 386 M 392 482 V 488" stroke="#C4A05A" strokeWidth="0.8" fill="none" />

        {/* 1. Header / Classification */}
        <path d="M 16 16 H 384" stroke="#2B363B" strokeWidth="0.6" />
        <g>
          {/* Blinking green radar LED */}
          <circle cx="23" cy="25" r="2.5" fill="#10B981" className="anim-led" />
          <circle cx="23" cy="25" r="2.5" fill="none" stroke="#10B981" strokeWidth="0.8">
            <animate attributeName="r" values="2.5;7;7" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0;0" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x="31" y="27" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" fontWeight="600" fill="#0B2516" letterSpacing="0.06em">
            EVIDENTIAL TOPOLOGY
          </text>
        </g>
        <text x="215" y="27" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fontWeight="600" fill="#8C733E" letterSpacing="0.04em">
          {statusText}
        </text>
        <path d="M 16 34 H 384" stroke="#2B363B" strokeWidth="0.6" />

        {/* 2. Custodian Column Headers */}
        {LANES.map((lane) => {
          const isLanesActive = isCustodiansActive || (activeStep === 0);
          return (
            <g key={lane.code} opacity={isLanesActive ? 1 : 0.45} className="transition-opacity duration-300">
              <rect
                x={lane.x - 16}
                y={42}
                width={32}
                height={17}
                rx={2}
                fill={activeStep === 0 ? '#EAE3D2' : '#F4EFE6'}
                stroke={activeStep === 0 ? '#C4A05A' : '#2B363B'}
                strokeWidth={activeStep === 0 ? 1.2 : 0.8}
              />
              <text x={lane.x} y={54.5} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fontWeight="600" fill="#0B2516">
                {lane.code}
              </text>
              <text x={lane.x} y={69} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fill="#78716C">
                {lane.role}
              </text>
              {/* Vertical guideline track */}
              <line x1={lane.x} y1={74} x2={lane.x} y2={422} stroke={activeStep === 0 ? '#C4A05A' : '#E5DEC9'} strokeWidth={activeStep === 0 ? 1 : 0.75} strokeDasharray="3 3" />
            </g>
          );
        })}
        <path d="M 16 74 H 384" stroke="#D1C7B7" strokeWidth="0.75" />

        {/* 3. Left Time Axis Rail */}
        <line x1="44" y1="74" x2="44" y2="422" stroke="#2B363B" strokeWidth="0.8" />

        {/* Quarter Ticks & Labels */}
        {[
          { y: 98, label: "Q1 '24" },
          { y: 152, label: "Q2 '24" },
          { y: 206, label: "Q3 '24" },
          { y: 260, label: "Q4 '24" },
          { y: 310, label: "Q1 '25" },
        ].map((tick) => (
          <g key={tick.label}>
            <line x1="38" y1={tick.y} x2="44" y2={tick.y} stroke="#2B363B" strokeWidth="0.8" />
            <text x="34" y={tick.y + 3} textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="7" fill="#6B7280">
              {tick.label}
            </text>
            <line x1="44" y1={tick.y} x2="370" y2={tick.y} stroke="#F0EAE0" strokeWidth="0.5" />
          </g>
        ))}

        {/* 4. Background Correspondence Threads & Volume (2024 to early 2025) */}
        {/* Thread 1: Stage 4 Design (EA <-> DM) */}
        <g opacity={isThreadsActive ? 1 : 0.35} className="transition-opacity duration-300">
          <path d="M 74 98 H 126" stroke="#2B363B" strokeWidth="1" />
          <circle cx="74" cy="98" r="2.5" fill="#0B2516" />
          <circle cx="126" cy="98" r="2.5" fill="#0B2516" />
          <text x="134" y="96" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fill="#78716C">Stage 4 Cladding Design</text>
          {/* Animated data packet traveling between EA and DM */}
          {isPlaying && (
            <circle r="2.2" fill="#C4A05A">
              <animate attributeName="cx" values="74;126;74" dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="98;98;98" dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3.2s" repeatCount="indefinite" />
            </circle>
          )}
          {/* Replies & sub-messages */}
          <line x1="126" y1="98" x2="126" y2="108" stroke="#2B363B" strokeWidth="0.75" />
          <circle cx="126" cy="108" r="2" fill="#78716C" />
          <path d="M 126 108 H 74" stroke="#2B363B" strokeWidth="0.75" strokeDasharray="2 2" />
          <circle cx="74" cy="108" r="2" fill="#78716C" />
        </g>

        {/* Thread 2: Subcontract Procurement & Tender (DM -> CM -> PM) */}
        <g opacity={isThreadsActive ? 1 : 0.35} className="transition-opacity duration-300">
          <path d="M 126 148 H 230 V 154 H 282" fill="none" stroke="#2B363B" strokeWidth="1" />
          <circle cx="126" cy="148" r="2.5" fill="#0B2516" />
          <circle cx="230" cy="148" r="2.5" fill="#0B2516" />
          <circle cx="282" cy="154" r="2.5" fill="#0B2516" />
          <rect x="136" y="136" width="116" height="11" rx="2" fill="#FCFAF5" fillOpacity="0.95" />
          <text x="140" y="144" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fill="#78716C">Façade Sub-contract Tender</text>
          {/* Animated data packet on tender route */}
          {isPlaying && (
            <circle r="2.2" fill="#C4A05A">
              <animate attributeName="cx" values="126;230;282" dur="4s" repeatCount="indefinite" />
              <animate attributeName="cy" values="148;148;154" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="4s" repeatCount="indefinite" />
            </circle>
          )}
        </g>

        {/* Noise / De-duplicated Indicator Badge */}
        <g opacity={isNoiseActive ? 1 : 0.3} className="transition-opacity duration-300">
          {/* Rotating dashed rings indicating detection & elimination */}
          <circle cx="230" cy="172" r="3.5" fill="none" stroke="#A8A29E" strokeWidth="1" strokeDasharray="2 2">
            <animateTransform attributeName="transform" type="rotate" from="0 230 172" to="360 230 172" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle cx="334" cy="168" r="3.5" fill="none" stroke="#A8A29E" strokeWidth="1" strokeDasharray="2 2">
            <animateTransform attributeName="transform" type="rotate" from="0 334 168" to="-360 334 168" dur="6s" repeatCount="indefinite" />
          </circle>
          <rect
            x="238"
            y="166"
            width="90"
            height="12"
            rx="2"
            fill={activeStep === 2 ? '#EFE8DA' : '#F4EFE6'}
            stroke={activeStep === 2 ? '#C4A05A' : '#D1C7B7'}
            strokeWidth={activeStep === 2 ? 1 : 0.6}
          />
          <text x="242" y="175" fontFamily="IBM Plex Mono, monospace" fontSize="6" fill="#78716C" letterSpacing="0.04em">
            SET ASIDE: NEAR-DUPES
          </text>
          {/* Animated red strikethrough showing noise elimination */}
          <line x1="238" y1="172" x2="328" y2="172" stroke="#DC2626" strokeWidth="1" opacity="0.8">
            <animate attributeName="x2" values="238;328;328;238" keyTimes="0;0.35;0.85;1" dur="8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.35;0.85;1" dur="8s" repeatCount="indefinite" />
          </line>
        </g>

        {/* Thread 3: Technical Specifications & Extrusion Approvals (PM <-> SO <-> DM) */}
        <g opacity={isThreadsActive ? 1 : 0.35} className="transition-opacity duration-300">
          <path d="M 126 202 H 282 V 208 H 334" fill="none" stroke="#2B363B" strokeWidth="1" />
          <circle cx="126" cy="202" r="2.5" fill="#0B2516" />
          <circle cx="282" cy="202" r="2.5" fill="#0B2516" />
          <circle cx="334" cy="208" r="2.5" fill="#0B2516" />
          <rect x="136" y="190" width="144" height="11" rx="2" fill="#FCFAF5" fillOpacity="0.95" />
          <text x="140" y="198" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fill="#78716C">Bracket Specs & Extrusion Profile</text>
          {/* Traveling packet */}
          {isPlaying && (
            <circle r="2.2" fill="#C4A05A">
              <animate attributeName="cx" values="126;282;334" dur="4.2s" repeatCount="indefinite" begin="0.5s" />
              <animate attributeName="cy" values="202;202;208" dur="4.2s" repeatCount="indefinite" begin="0.5s" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="4.2s" repeatCount="indefinite" begin="0.5s" />
            </circle>
          )}
        </g>

        {/* Thread 4: Mock-up Inspection & Samples (EA <-> DM <-> SM) */}
        <g opacity={isThreadsActive ? 1 : 0.35} className="transition-opacity duration-300">
          <path d="M 74 246 H 178" stroke="#2B363B" strokeWidth="1" />
          <circle cx="74" cy="246" r="2.5" fill="#0B2516" />
          <circle cx="126" cy="246" r="2.5" fill="#0B2516" />
          <circle cx="178" cy="246" r="2.5" fill="#0B2516" />
          <text x="80" y="242" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fill="#78716C">Sample Mock-up Review</text>
          {/* Traveling packet */}
          {isPlaying && (
            <circle r="2.2" fill="#C4A05A">
              <animate attributeName="cx" values="74;126;178;74" dur="3.8s" repeatCount="indefinite" begin="1s" />
              <animate attributeName="cy" values="246;246;246;246" dur="3.8s" repeatCount="indefinite" begin="1s" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="3.8s" repeatCount="indefinite" begin="1s" />
            </circle>
          )}
        </g>

        {/* Thread 5: Delivery Sequence & Site Access (SM <-> PM <-> SO) */}
        <g opacity={isThreadsActive ? 1 : 0.35} className="transition-opacity duration-300">
          <path d="M 178 288 H 334" stroke="#2B363B" strokeWidth="1" />
          <circle cx="178" cy="288" r="2.5" fill="#0B2516" />
          <circle cx="282" cy="288" r="2.5" fill="#0B2516" />
          <circle cx="334" cy="288" r="2.5" fill="#0B2516" />
          <text x="186" y="284" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fill="#78716C">Delivery Schedule & Call-offs</text>
          {/* Traveling packet */}
          {isPlaying && (
            <circle r="2.2" fill="#C4A05A">
              <animate attributeName="cx" values="178;282;334" dur="3.6s" repeatCount="indefinite" begin="1.4s" />
              <animate attributeName="cy" values="288;288;288" dur="3.6s" repeatCount="indefinite" begin="1.4s" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="3.6s" repeatCount="indefinite" begin="1.4s" />
            </circle>
          )}
        </g>

        {/* Volume texture: discrete clean ticks representing active correspondence density */}
        <g opacity={activeStep === 0 ? 0.9 : 0.45}>
          {[
            // Q1-Q2 background traffic
            [74, 88], [126, 92], [126, 116], [178, 122], [230, 130], [282, 136],
            [74, 138], [126, 140], [178, 144], [282, 160], [334, 156],
            // Q3-Q4 background traffic
            [126, 186], [178, 192], [230, 194], [282, 196], [334, 190],
            [74, 218], [126, 224], [178, 230], [230, 236], [282, 232],
            [126, 268], [178, 272], [230, 276], [282, 274], [334, 268],
            // Early 2025
            [74, 302], [126, 306], [178, 308], [282, 304], [334, 302],
          ].map(([x, y], i) => (
            <line key={i} x1={x - 2.5} y1={y} x2={x + 2.5} y2={y} stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
          ))}
        </g>

        {/* 5. THE DISPUTE WINDOW (03 Mar to 04 Apr 2025) */}
        <g opacity={isDisputeActive ? 1 : 0.35} className="transition-opacity duration-300">
          {/* Focus zone highlight rectangle with animated gold border */}
          <rect
            x="42"
            y="322"
            width="338"
            height="96"
            rx="3"
            fill={activeStep === 3 ? '#F5EFE0' : '#0B2516'}
            fillOpacity={activeStep === 3 ? 0.3 : 0.04}
            stroke="#0B2516"
            strokeWidth="1"
            strokeDasharray="4 3"
            className="anim-dispute-border"
          />
          {/* Solid brass accent bar on the left */}
          <rect x="42" y="322" width="3.5" height="96" rx="1" fill="#C4A05A" />

          {/* Window Banner */}
          <text x="52" y="333" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" fontWeight="600" fill="#0B2516" letterSpacing="0.06em">
            DISPUTE WINDOW · 03 MAR TO 04 APR 2025
          </text>
          <text x="372" y="333" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="7" fontWeight="500" fill="#8C733E" letterSpacing="0.04em">
            4 CRITICAL EXHIBITS
          </text>

          {/* Exhibit 1: EV-0131 (03 Mar 2025) */}
          <g opacity={isExhibitsActive ? 1 : 0.45}>
            {/* Vector from EA to DM */}
            <line x1="74" y1="347" x2="126" y2="347" stroke="#0B2516" strokeWidth="1.5" />
            <polygon points="123,344 128,347 123,350" fill="#0B2516" />
            <circle cx="74" cy="347" r="3.5" fill="#0B2516" />
            <circle cx="126" cy="347" r="4.5" fill="#0B2516" stroke="#C4A05A" strokeWidth="1.5" />
            {/* Radar ping ring on evidence node */}
            {isPlaying && (
              <circle cx="126" cy="347" r="4.5" fill="none" stroke="#C4A05A" strokeWidth="1" className="anim-radar-ping" />
            )}
            {/* Animated instruction packet moving EA -> DM */}
            {isPlaying && (
              <circle r="2.5" fill="#C4A05A">
                <animate attributeName="cx" values="74;126" dur="2s" repeatCount="indefinite" />
                <animate attributeName="cy" values="347;347" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
            {/* Badge & Label */}
            <rect x="134" y="340" width="46" height="13" rx="2" fill="#0B2516" />
            <text x="138" y="350" fontFamily="IBM Plex Mono, monospace" fontSize="7" fontWeight="600" fill="#FCFAF5">
              EV-0131
            </text>
            <text x="186" y="350" fontFamily="IBM Plex Sans, sans-serif" fontSize="7" fontWeight="500" fill="#1A2721">
              03 Mar: Change instruction (EA → DM)
            </text>
          </g>

          {/* Exhibit 2: EV-0138 (12 Mar 2025) */}
          <g opacity={isExhibitsActive ? 1 : 0.45}>
            {/* Vector linking PM to SM and copied to DM */}
            <path d="M 282 368 H 178 V 364 H 126" fill="none" stroke="#0B2516" strokeWidth="1.2" />
            <circle cx="282" cy="368" r="3" fill="#0B2516" />
            <circle cx="126" cy="364" r="2.5" fill="#78716C" />
            <circle cx="178" cy="368" r="4.5" fill="#0B2516" stroke="#C4A05A" strokeWidth="1.5" />
            {/* Radar ping ring */}
            {isPlaying && (
              <circle cx="178" cy="368" r="4.5" fill="none" stroke="#C4A05A" strokeWidth="1" className="anim-radar-ping" style={{ animationDelay: '0.6s' }} />
            )}
            {/* Animated packet */}
            {isPlaying && (
              <circle r="2.5" fill="#C4A05A">
                <animate attributeName="cx" values="282;178;126" dur="2.4s" repeatCount="indefinite" begin="0.4s" />
                <animate attributeName="cy" values="368;368;364" dur="2.4s" repeatCount="indefinite" begin="0.4s" />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2.4s" repeatCount="indefinite" begin="0.4s" />
              </circle>
            )}
            {/* Badge & Label */}
            <rect x="186" y="361" width="46" height="13" rx="2" fill="#0B2516" />
            <text x="190" y="371" fontFamily="IBM Plex Mono, monospace" fontSize="7" fontWeight="600" fill="#FCFAF5">
              EV-0138
            </text>
            <text
              x="238"
              y="371"
              fontFamily="IBM Plex Sans, sans-serif"
              fontSize="7"
              fontWeight="500"
              fill="#1A2721"
              stroke="#F4F3ED"
              strokeWidth="2.5"
              paintOrder="stroke fill"
            >
              12 Mar: 16-wk lead time given
            </text>
          </g>

          {/* Exhibit 3: EV-0147 (26 Mar 2025) */}
          <g opacity={isExhibitsActive ? 1 : 0.45}>
            {/* Vector linking SO to PM */}
            <path d="M 334 389 H 282 V 391 H 178" fill="none" stroke="#0B2516" strokeWidth="1.2" />
            <circle cx="334" cy="389" r="3" fill="#0B2516" />
            <circle cx="178" cy="391" r="2.5" fill="#78716C" />
            <circle cx="282" cy="389" r="4.5" fill="#0B2516" stroke="#C4A05A" strokeWidth="1.5" />
            {/* Radar ping ring */}
            {isPlaying && (
              <circle cx="282" cy="389" r="4.5" fill="none" stroke="#C4A05A" strokeWidth="1" className="anim-radar-ping" style={{ animationDelay: '1.2s' }} />
            )}
            {/* Animated packet */}
            {isPlaying && (
              <circle r="2.5" fill="#C4A05A">
                <animate attributeName="cx" values="334;282;178" dur="2.6s" repeatCount="indefinite" begin="0.8s" />
                <animate attributeName="cy" values="389;389;391" dur="2.6s" repeatCount="indefinite" begin="0.8s" />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2.6s" repeatCount="indefinite" begin="0.8s" />
              </circle>
            )}
            <text
              x="236"
              y="391"
              textAnchor="end"
              fontFamily="IBM Plex Sans, sans-serif"
              fontSize="6.5"
              fontWeight="500"
              fill="#1A2721"
              stroke="#F4F3ED"
              strokeWidth="2"
              paintOrder="stroke fill"
            >
              26 Mar: Delivery conf. →
            </text>
            {/* Badge & Label */}
            <rect x="242" y="382" width="46" height="13" rx="2" fill="#0B2516" />
            <text x="246" y="392" fontFamily="IBM Plex Mono, monospace" fontSize="7" fontWeight="600" fill="#FCFAF5">
              EV-0147
            </text>
          </g>

          {/* Exhibit 4: EV-0151 (28 Mar 2025) - Notice under clause 2.24 */}
          <g opacity={isExhibitsActive ? 1 : 0.45}>
            {/* Prominent formal notice vector from CM directly to EA with animated flowing dashes */}
            <line x1="230" y1="410" x2="74" y2="410" stroke="#C4A05A" strokeWidth="2.2" strokeDasharray="6 3" className="anim-dash-flow" />
            <polygon points="78,407 72,410 78,413" fill="#C4A05A" />
            <circle cx="74" cy="410" r="4" fill="#0B2516" />
            <circle cx="230" cy="410" r="5" fill="#C4A05A" stroke="#0B2516" strokeWidth="1.5" />
            {/* Fast luminous projectile particle representing formal service of notice */}
            {isPlaying && (
              <circle r="3.2" fill="#C4A05A">
                <animate attributeName="cx" values="230;74" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="cy" values="410;410" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}
            {/* Double radiant ring pulse on target node (74, 410) */}
            {isPlaying && (
              <>
                <circle cx="74" cy="410" r="4" fill="none" stroke="#C4A05A" strokeWidth="1.2">
                  <animate attributeName="r" values="4;16;16" dur="1.8s" repeatCount="indefinite" begin="0.9s" />
                  <animate attributeName="opacity" values="1;0;0" dur="1.8s" repeatCount="indefinite" begin="0.9s" />
                </circle>
                <circle cx="230" cy="410" r="5" fill="none" stroke="#0B2516" strokeWidth="1">
                  <animate attributeName="r" values="5;14;14" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0;0" dur="1.8s" repeatCount="indefinite" />
                </circle>
              </>
            )}
            {/* Gold highlight badge */}
            <rect x="174" y="403" width="50" height="14" rx="2" fill="#C4A05A" />
            <text x="178" y="413.5" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" fontWeight="700" fill="#0B2516">
              EV-0151
            </text>
            <text x="168" y="413.5" textAnchor="end" fontFamily="IBM Plex Sans, sans-serif" fontSize="7" fontWeight="600" fill="#0B2516">
              28 Mar: Cl. 2.24 Notice →
            </text>
          </g>
        </g>

        {/* 6. Forensic Laser Scanner Sweeper Bar */}
        {isPlaying && activeStep === null && (
          <g className="anim-scan-beam" pointerEvents="none">
            {/* Laser beam */}
            <line x1="42" y1="0" x2="380" y2="0" stroke="#C4A05A" strokeWidth="1.5" opacity="0.9" />
            {/* Tail glow */}
            <rect x="42" y="-14" width="338" height="14" fill="url(#scannerGlow)" />
            {/* Scanner head dot on the left time axis rail */}
            <circle cx="44" cy="0" r="3.5" fill="#C4A05A" stroke="#FCFAF5" strokeWidth="1" />
            {/* Subtle scan tag */}
            <rect x="50" y="-9" width="46" height="8.5" rx="1.5" fill="#C4A05A" opacity="0.95" />
            <text x="73" y="-2.5" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="5.5" fontWeight="700" fill="#0B2516" letterSpacing="0.06em">
              SCAN HEAD
            </text>
          </g>
        )}

        {/* 7. Diagnostic Telemetry Footer */}
        <path d="M 16 426 H 384" stroke="#D1C7B7" strokeWidth="0.75" />
        <path d="M 16 428 H 384" stroke="#D1C7B7" strokeWidth="0.5" />

        {/* Metric 1 */}
        <rect
          x="18"
          y="434"
          width="114"
          height="42"
          rx="2"
          fill={activeStep === 0 ? '#F3EDE2' : '#F7F3EB'}
          stroke={activeStep === 0 ? '#C4A05A' : '#D1C7B7'}
          strokeWidth={activeStep === 0 ? 1 : 0.6}
        />
        <text x="26" y="451" fontFamily="IBM Plex Mono, monospace" fontSize="13" fontWeight="600" fill="#0B2516">
          {rawMsgs}
        </text>
        <text x="26" y="466" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fontWeight="500" fill="#78716C" letterSpacing="0.06em">
          RAW MSGS INGESTED
        </text>

        {/* Metric 2 */}
        <rect
          x="143"
          y="434"
          width="114"
          height="42"
          rx="2"
          fill={activeStep === 2 ? '#F3EDE2' : '#F7F3EB'}
          stroke={activeStep === 2 ? '#C4A05A' : '#D1C7B7'}
          strokeWidth={activeStep === 2 ? 1 : 0.6}
        />
        <text x="151" y="451" fontFamily="IBM Plex Mono, monospace" fontSize="13" fontWeight="600" fill="#8C733E">
          {noiseFilter}
        </text>
        <text x="151" y="466" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fontWeight="500" fill="#78716C" letterSpacing="0.06em">
          NOISE & DUPES REMOVED
        </text>

        {/* Metric 3 */}
        <rect
          x="268"
          y="434"
          width="114"
          height="42"
          rx="2"
          fill={activeStep === 4 ? '#F3EDE2' : '#F7F3EB'}
          stroke={activeStep === 4 ? '#C4A05A' : '#D1C7B7'}
          strokeWidth={activeStep === 4 ? 1 : 0.6}
        />
        <text x="276" y="451" fontFamily="IBM Plex Mono, monospace" fontSize="13" fontWeight="600" fill="#0B2516">
          {exhibitsCount}
        </text>
        <text x="276" y="466" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fontWeight="500" fill="#78716C" letterSpacing="0.06em">
          CHRONOLOGY TIED
        </text>

        {/* Bottom ledger stamp */}
        <line x1="18" y1="483" x2="382" y2="483" stroke="#E5DEC9" strokeWidth="0.5" />
        <text x="200" y="492" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" letterSpacing="0.12em" fill="#8C733E">
          VERICASE EVIDENTIAL RECORD · FORENSIC CHRONOLOGY ENGINE
        </text>
      </Sheet>
    </div>
  );
};
