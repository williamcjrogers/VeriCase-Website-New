import { Sheet, r2 } from '@/components/plates/drawing';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { useCountUp } from '@/hooks/useCountUp';
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

export const ArchiveField = ({ label = LABEL }) => {
  const [containerRef, inView] = useInViewOnce({ threshold: 0.1 });
  const rawMsgs = useCountUp('47,832', { inView, duration: 1800 });
  const noiseFilter = useCountUp('-42.8%', { inView, duration: 1800 });
  const exhibitsCount = useCountUp('8 EXHIBITS', { inView, duration: 1400 });

  return (
    <div ref={containerRef} className="h-full w-full">
      <Sheet viewBox={`0 0 ${W} ${H}`} label={label} className="dw">
    {/* Background sheet fill */}
    <rect x="0" y="0" width={W} height={H} fill="#FCFAF5" />

    {/* Outer border & corner crop marks */}
    <rect x="8" y="8" width={W - 16} height={H - 16} fill="none" stroke="#E2DDD2" strokeWidth="0.75" />
    <path d="M 8 18 H 14 M 8 18 V 12 M 392 18 H 386 M 392 18 V 12 M 8 482 H 14 M 8 482 V 488 M 392 482 H 386 M 392 482 V 488" stroke="#C4A05A" strokeWidth="0.8" fill="none" />

    {/* 1. Header / Classification */}
    <path d="M 16 16 H 384" stroke="#2B363B" strokeWidth="0.6" />
    <text x="20" y="27" fontFamily="IBM Plex Mono, monospace" fontSize="8" fontWeight="600" fill="#6B7280" letterSpacing="0.1em">
      EVIDENTIAL TOPOLOGY · 6 CUSTODIANS
    </text>
    <text x="380" y="27" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="8" fontWeight="500" fill="#8C733E" letterSpacing="0.06em">
      16 MO · 47.8K MSG
    </text>
    <path d="M 16 34 H 384" stroke="#2B363B" strokeWidth="0.6" />

    {/* 2. Custodian Column Headers */}
    {LANES.map((lane) => (
      <g key={lane.code}>
        <rect x={lane.x - 16} y={42} width={32} height={17} rx={2} fill="#F4EFE6" stroke="#2B363B" strokeWidth="0.8" />
        <text x={lane.x} y={54.5} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fontWeight="600" fill="#0B2516">
          {lane.code}
        </text>
        <text x={lane.x} y={69} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fill="#78716C">
          {lane.role}
        </text>
        {/* Vertical guideline track */}
        <line x1={lane.x} y1={74} x2={lane.x} y2={422} stroke="#E5DEC9" strokeWidth="0.75" strokeDasharray="3 3" />
      </g>
    ))}
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
    <g>
      <path d="M 74 98 H 126" stroke="#2B363B" strokeWidth="1" />
      <circle cx="74" cy="98" r="2.5" fill="#0B2516" />
      <circle cx="126" cy="98" r="2.5" fill="#0B2516" />
      <text x="134" y="96" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fill="#78716C">Stage 4 Cladding Design</text>
      {/* Replies & sub-messages */}
      <line x1="126" y1="98" x2="126" y2="108" stroke="#2B363B" strokeWidth="0.75" />
      <circle cx="126" cy="108" r="2" fill="#78716C" />
      <path d="M 126 108 H 74" stroke="#2B363B" strokeWidth="0.75" strokeDasharray="2 2" />
      <circle cx="74" cy="108" r="2" fill="#78716C" />
    </g>

    {/* Thread 2: Subcontract Procurement & Tender (DM -> CM -> PM) */}
    <g>
      <path d="M 126 148 H 230 V 154 H 282" fill="none" stroke="#2B363B" strokeWidth="1" />
      <circle cx="126" cy="148" r="2.5" fill="#0B2516" />
      <circle cx="230" cy="148" r="2.5" fill="#0B2516" />
      <circle cx="282" cy="154" r="2.5" fill="#0B2516" />
      <text x="140" y="144" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fill="#78716C">Façade Sub-contract Tender</text>
    </g>

    {/* Noise / De-duplicated Indicator Badge */}
    <g>
      <circle cx="230" cy="172" r="3" fill="none" stroke="#A8A29E" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="228" y1="170" x2="232" y2="174" stroke="#A8A29E" strokeWidth="1" />
      <circle cx="334" cy="168" r="3" fill="none" stroke="#A8A29E" strokeWidth="1" strokeDasharray="2 2" />
      <rect x="238" y="166" width="90" height="12" rx="2" fill="#F4EFE6" stroke="#D1C7B7" strokeWidth="0.6" />
      <text x="242" y="175" fontFamily="IBM Plex Mono, monospace" fontSize="6" fill="#78716C" letterSpacing="0.04em">
        SET ASIDE: NEAR-DUPES
      </text>
    </g>

    {/* Thread 3: Technical Specifications & Extrusion Approvals (PM <-> SO <-> DM) */}
    <g>
      <path d="M 126 202 H 282 V 208 H 334" fill="none" stroke="#2B363B" strokeWidth="1" />
      <circle cx="126" cy="202" r="2.5" fill="#0B2516" />
      <circle cx="282" cy="202" r="2.5" fill="#0B2516" />
      <circle cx="334" cy="208" r="2.5" fill="#0B2516" />
      <text x="140" y="198" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fill="#78716C">Bracket Specs & Extrusion Profile</text>
    </g>

    {/* Thread 4: Mock-up Inspection & Samples (EA <-> DM <-> SM) */}
    <g>
      <path d="M 74 246 H 178" stroke="#2B363B" strokeWidth="1" />
      <circle cx="74" cy="246" r="2.5" fill="#0B2516" />
      <circle cx="126" cy="246" r="2.5" fill="#0B2516" />
      <circle cx="178" cy="246" r="2.5" fill="#0B2516" />
      <text x="80" y="242" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fill="#78716C">Sample Mock-up Review</text>
    </g>

    {/* Thread 5: Delivery Sequence & Site Access (SM <-> PM <-> SO) */}
    <g>
      <path d="M 178 288 H 334" stroke="#2B363B" strokeWidth="1" />
      <circle cx="178" cy="288" r="2.5" fill="#0B2516" />
      <circle cx="282" cy="288" r="2.5" fill="#0B2516" />
      <circle cx="334" cy="288" r="2.5" fill="#0B2516" />
      <text x="186" y="284" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fill="#78716C">Delivery Schedule & Call-offs</text>
    </g>

    {/* Volume texture: discrete clean ticks representing active correspondence density */}
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

    {/* 5. THE DISPUTE WINDOW (03 Mar to 04 Apr 2025) */}
    {/* Focus zone highlight rectangle */}
    <rect x="42" y="322" width="338" height="96" rx="3" fill="#0B2516" fillOpacity="0.04" stroke="#0B2516" strokeWidth="1" strokeDasharray="4 3" />
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
    <g>
      {/* Vector from EA to DM */}
      <line x1="74" y1="347" x2="126" y2="347" stroke="#0B2516" strokeWidth="1.5" />
      <polygon points="123,344 128,347 123,350" fill="#0B2516" />
      <circle cx="74" cy="347" r="3.5" fill="#0B2516" />
      <circle cx="126" cy="347" r="4.5" fill="#0B2516" stroke="#C4A05A" strokeWidth="1.5" />
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
    <g>
      {/* Vector linking PM to SM and copied to DM */}
      <path d="M 282 368 H 178 V 364 H 126" fill="none" stroke="#0B2516" strokeWidth="1.2" />
      <circle cx="282" cy="368" r="3" fill="#0B2516" />
      <circle cx="126" cy="364" r="2.5" fill="#78716C" />
      <circle cx="178" cy="368" r="4.5" fill="#0B2516" stroke="#C4A05A" strokeWidth="1.5" />
      {/* Badge & Label */}
      <rect x="186" y="361" width="46" height="13" rx="2" fill="#0B2516" />
      <text x="190" y="371" fontFamily="IBM Plex Mono, monospace" fontSize="7" fontWeight="600" fill="#FCFAF5">
        EV-0138
      </text>
      <text x="238" y="371" fontFamily="IBM Plex Sans, sans-serif" fontSize="7" fontWeight="500" fill="#1A2721">
        12 Mar: 16-wk lead time given
      </text>
    </g>

    {/* Exhibit 3: EV-0147 (26 Mar 2025) */}
    <g>
      {/* Vector linking SO to PM */}
      <path d="M 334 389 H 282 V 391 H 178" fill="none" stroke="#0B2516" strokeWidth="1.2" />
      <circle cx="334" cy="389" r="3" fill="#0B2516" />
      <circle cx="178" cy="391" r="2.5" fill="#78716C" />
      <circle cx="282" cy="389" r="4.5" fill="#0B2516" stroke="#C4A05A" strokeWidth="1.5" />
      {/* Badge & Label */}
      <rect x="290" y="382" width="46" height="13" rx="2" fill="#0B2516" />
      <text x="294" y="392" fontFamily="IBM Plex Mono, monospace" fontSize="7" fontWeight="600" fill="#FCFAF5">
        EV-0147
      </text>
      <text x="341" y="392" fontFamily="IBM Plex Sans, sans-serif" fontSize="6.5" fontWeight="500" fill="#1A2721">
        26 Mar: Delivery conf.
      </text>
    </g>

    {/* Exhibit 4: EV-0151 (28 Mar 2025) - Notice under clause 2.24 */}
    <g>
      {/* Prominent formal notice vector from CM directly to EA */}
      <line x1="230" y1="410" x2="74" y2="410" stroke="#C4A05A" strokeWidth="2" />
      <polygon points="78,407 72,410 78,413" fill="#C4A05A" />
      <circle cx="74" cy="410" r="4" fill="#0B2516" />
      <circle cx="230" cy="410" r="5" fill="#C4A05A" stroke="#0B2516" strokeWidth="1.5" />
      {/* Gold highlight badge */}
      <rect x="174" y="403" width="50" height="14" rx="2" fill="#C4A05A" />
      <text x="178" y="413.5" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" fontWeight="700" fill="#0B2516">
        EV-0151
      </text>
      <text x="168" y="413.5" textAnchor="end" fontFamily="IBM Plex Sans, sans-serif" fontSize="7" fontWeight="600" fill="#0B2516">
        28 Mar: Cl. 2.24 Notice →
      </text>
    </g>

    {/* 6. Diagnostic Telemetry Footer */}
    <path d="M 16 426 H 384" stroke="#D1C7B7" strokeWidth="0.75" />
    <path d="M 16 428 H 384" stroke="#D1C7B7" strokeWidth="0.5" />

    {/* Metric 1 */}
    <rect x="18" y="434" width="114" height="42" rx="2" fill="#F7F3EB" stroke="#D1C7B7" strokeWidth="0.6" />
    <text x="26" y="451" fontFamily="IBM Plex Mono, monospace" fontSize="13" fontWeight="600" fill="#0B2516">
      {rawMsgs}
    </text>
    <text x="26" y="466" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fontWeight="500" fill="#78716C" letterSpacing="0.06em">
      RAW MSGS INGESTED
    </text>

    {/* Metric 2 */}
    <rect x="143" y="434" width="114" height="42" rx="2" fill="#F7F3EB" stroke="#D1C7B7" strokeWidth="0.6" />
    <text x="151" y="451" fontFamily="IBM Plex Mono, monospace" fontSize="13" fontWeight="600" fill="#8C733E">
      {noiseFilter}
    </text>
    <text x="151" y="466" fontFamily="IBM Plex Mono, monospace" fontSize="6.5" fontWeight="500" fill="#78716C" letterSpacing="0.06em">
      NOISE & DUPES REMOVED
    </text>

    {/* Metric 3 */}
    <rect x="268" y="434" width="114" height="42" rx="2" fill="#F7F3EB" stroke="#D1C7B7" strokeWidth="0.6" />
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

