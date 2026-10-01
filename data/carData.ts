export interface CarSpec {
  id: string;
  category: string;
  label: string;
  value: string;
  unit?: string;
  note?: string;
}

export interface HudPhase {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  frameRange: [number, number]; // Frame numbers 1..240
  scrollRange: [number, number]; // 0..1 scroll range
  telemetry: {
    label: string;
    value: string;
  }[];
}

export interface EditorialFeature {
  id: string;
  tag: string;
  title: string;
  headline: string;
  description: string;
  details: {
    label: string;
    value: string;
  }[];
  layout: 'left-heavy' | 'right-heavy' | 'split-telemetry';
}

export const CAR_SPECS: CarSpec[] = [
  {
    id: "engine",
    category: "PROPULSION",
    label: "Engine",
    value: "4.0L twin-turbo V8",
    note: "Affalterbach hand-crafted twin-scroll architecture"
  },
  {
    id: "power",
    category: "PROPULSION",
    label: "Power",
    value: "585",
    unit: "HP",
    note: "430 kW maximum power output"
  },
  {
    id: "torque",
    category: "PROPULSION",
    label: "PROPULSION",
    value: "850",
    unit: "NM",
    note: "Peak torque available across broad RPM plateau"
  },
  {
    id: "acceleration",
    category: "DYNAMICS",
    label: "0–100 km/h",
    value: "4.5",
    unit: "SEC",
    note: "Standing launch sprint under test conditions"
  },
  {
    id: "weight",
    category: "STRUCTURE",
    label: "Weight",
    value: "[TO VERIFY]",
    note: "Official certification pending final homologation"
  },
  {
    id: "top-speed",
    category: "DYNAMICS",
    label: "Top speed",
    value: "[TO VERIFY]",
    note: "Electronic limitation under concept specification"
  }
];

export const HUD_PHASES: HudPhase[] = [
  {
    id: "phase-1",
    index: "01",
    title: "ORIGIN",
    subtitle: "G63, ICON OF THE OFF-ROAD",
    description: "Born from an uncompromising utilitarian brief. Forty-five years of monolithic silhouette, uncompromising ladder-frame integrity, and Austrian alpine pedigree.",
    frameRange: [1, 60],
    scrollRange: [0, 0.24],
    telemetry: [
      { label: "CHASSIS", value: "W463A / FULL LADDER" },
      { label: "COORDINATE", value: "GRAZ 47.0707° N" },
      { label: "STATUS", value: "CLOSED VEHICLE" }
    ]
  },
  {
    id: "phase-2",
    index: "02",
    title: "FORM",
    subtitle: "THE BOXY SILHOUETTE",
    description: "Angular geometry dictated solely by function. Vertical greenhouse, flat glazing, exposed door hinges, and high-mounted indicator housings.",
    frameRange: [61, 120],
    scrollRange: [0.25, 0.49],
    telemetry: [
      { label: "GEOMETRY", value: "90° MONOLITH" },
      { label: "GROUND CLEARANCE", value: "241 MM TESTED" },
      { label: "STATUS", value: "CAMERA ORBIT" }
    ]
  },
  {
    id: "phase-3",
    index: "03",
    title: "RITUAL",
    subtitle: "THE THEATRE OF ENTRY",
    description: "The unmistakable mechanical latch engagement. Push-button handles, military-spec door seals, and an acoustic signature engineered like a bolt action.",
    frameRange: [121, 180],
    scrollRange: [0.50, 0.74],
    telemetry: [
      { label: "DOOR LATCH", value: "PNEUMATIC / MECHANICAL" },
      { label: "INGRESS", value: "DOORS OPEN" },
      { label: "STATUS", value: "COCKPIT EXPOSED" }
    ]
  },
  {
    id: "phase-4",
    index: "04",
    title: "POWER",
    subtitle: "4.0L TWIN-TURBO V8, 585 HP / 850 NM",
    description: "Direct mechanical exposure. Twin turbochargers mounted inside the cylinder V for instant response, mated to a reinforced dual-range transfer case.",
    frameRange: [181, 240],
    scrollRange: [0.75, 1.0],
    telemetry: [
      { label: "CALIBRATION", value: "HOT INSIDE V" },
      { label: "PRESSURE", value: "1.5 BAR BOOST" },
      { label: "STATUS", value: "V8 REVEALED" }
    ]
  }
];

export const NAV_LINKS = [
  { label: "STORY", href: "#story" },
  { label: "DESIGN", href: "#design" },
  { label: "ENGINEERING", href: "#engineering" },
  { label: "SPECS", href: "#specs" },
  { label: "INQUIRE", href: "#inquire" }
];

export const EDITORIAL_FEATURES: EditorialFeature[] = [
  {
    id: "differential-locks",
    tag: "DRIVETRAIN ARCHITECTURE",
    title: "TRIPLE DIFFERENTIALS",
    headline: "THREE 100% MECHANICAL LOCKS. ZERO COMPROMISE.",
    description: "While contemporary off-road vehicles rely on electronic brake vectoring, the G63 preserves three electro-pneumatic mechanical differential locks: Center, Rear, and Front. Engaged in exact sequence, they lock all four wheels at equal rotational speed to conquer 100% (45-degree) gradients.",
    details: [
      { label: "CENTER LOCK", value: "100% MECHANICAL INTER-AXLE" },
      { label: "REAR AXLE", value: "100% TRANSVERSE RIGID" },
      { label: "FRONT AXLE", value: "100% STEER AXLE LOCK" },
      { label: "CLIMBING ABILITY", value: "100% / 45° INCLINE" }
    ],
    layout: "left-heavy"
  },
  {
    id: "acoustic-sidepipes",
    tag: "EXHAUST ARCHITECTURE",
    title: "SIDE-EXIT RESONANCE",
    headline: "TWIN SIDE PIPES. HAND-FABRICATED STAINLESS STEEL.",
    description: "Terminating immediately ahead of the rear wheels, the twin side exhaust pipes minimize underbody pipe routing, optimizing departure and breakover clearances while providing unfiltered acoustic feedback directly to the occupants.",
    details: [
      { label: "EXIT POSITION", value: "LATERAL / SUB-SILL" },
      { label: "MATERIAL", value: "T304 HIGH-GRADE STEEL" },
      { label: "VALVE CONTROL", value: "VARIABLE FLAP ACTUATION" },
      { label: "ACOUSTIC PROFILE", value: "CROSS-PLANE PULSE" }
    ],
    layout: "right-heavy"
  },
  {
    id: "chassis-geometry",
    tag: "STRUCTURAL RIGIDITY",
    title: "LADDER-FRAME CORE",
    headline: "CLOSED-SECTION HIGH-STRENGTH STEEL CHASSIS.",
    description: "The core chassis comprises two parallel longitudinal members linked by cross-struts, stamped from steel up to 3.4 mm thick. The body is mounted at eight points via rubber-isolated vibration dampers, isolating structural torsion from the passenger cell.",
    details: [
      { label: "STEEL THICKNESS", value: "UP TO 3.4 MM" },
      { label: "TORSIONAL RIGIDITY", value: "+55% VS PREDECESSOR" },
      { label: "FORDS DEPTH", value: "700 MM WATER & MUD" },
      { label: "LATERAL STABILITY", value: "UP TO 70% / 35°" }
    ],
    layout: "split-telemetry"
  }
];
