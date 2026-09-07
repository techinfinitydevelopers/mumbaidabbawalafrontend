export type MilestonePlate =
  | { kind: "photo"; src: string; alt: string }
  | { kind: "seal"; icon: string; year: string; label: string; sub: string; tone: "trust" | "royal" | "perth" };

export type Milestone = {
  id: string;
  side: "left" | "right";
  year: string;
  tag: string;
  title: string;
  description: string;
  plate: MilestonePlate;
  /** scroll progress (0-1) at which this card starts revealing */
  triggerP: number;
  /** fixed px position down the 1650px-tall flight-corridor coordinate space */
  top: number;
};

export const MILESTONES: Milestone[] = [
  {
    id: "1890",
    side: "right",
    year: "1890",
    tag: "The First Delivery",
    title: "1890 — The First Delivery",
    description:
      "Mahadeo Havaji Bachche organised 100 dabbawalas to carry a Parsi banker's lunch—founding a delivery network that would outlast empires.",
    plate: {
      kind: "photo",
      src: "/images/journey/dish-marathi.gif",
      alt: "Steaming Maharashtrian Tiffin Meal",
    },
    triggerP: 0.14,
    top: 200,
  },
  {
    id: "1956",
    side: "left",
    year: "1956",
    tag: "Formalising the Trust",
    title: "1956 — Formalising the Trust",
    description:
      "Dabbawalas registered as a charitable trust, cementing mutual aid and hereditary succession from father to son.",
    plate: {
      kind: "seal",
      icon: "🏛️",
      year: "1956",
      label: "CHARITABLE TRUST",
      sub: "Mutual Aid",
      tone: "trust",
    },
    triggerP: 0.30,
    top: 430,
  },
  {
    id: "1998",
    side: "right",
    year: "1998",
    tag: "Global Benchmark",
    title: "1998 — Six Sigma, No Computers",
    description:
      "Forbes rated the network Six Sigma—one error in 16 million deliveries, achieved without a single barcode or computer.",
    plate: {
      kind: "photo",
      src: "/images/journey/dish-punjabi.gif",
      alt: "Rich Indian Community Dabba",
    },
    triggerP: 0.45,
    top: 660,
  },
  {
    id: "2003",
    side: "left",
    year: "2003",
    tag: "Global Acclaim",
    title: "2003 — The World Takes Notice",
    description:
      "Invited to the Royal Wedding and immortalised in Harvard Business School case studies on flawless logistics.",
    plate: {
      kind: "seal",
      icon: "👑",
      year: "2003",
      label: "ROYAL & HARVARD",
      sub: "Case Study",
      tone: "royal",
    },
    triggerP: 0.60,
    top: 890,
  },
  {
    id: "2026",
    side: "right",
    year: "2026",
    tag: "Perth Expansion",
    title: "2026 — Tradition Lands in Perth",
    description:
      "135 years of Bombay heritage arrives in Perth—fresh homestyle thalis, delivered daily to your doorstep.",
    plate: {
      kind: "seal",
      icon: "✈️",
      year: "2026",
      label: "PERTH LANDING",
      sub: "The Extension",
      tone: "perth",
    },
    triggerP: 0.75,
    top: 1120,
  },
];

/** Flight-string SVG geometry — a 1000×1650 coordinate space.
 *
 * Each S-curve segment uses vertical-tangent control points so curves
 * enter and leave each pin heading straight down, producing smooth
 * symmetric arcs. Wide left-right travel (x: 200 ↔ 800).
 *
 * After M5, the path sweeps smoothly LEFT before curving RIGHT into
 * the Perth landing pin (x:800, y:1590). */
export const FLIGHT_SVG = {
  viewBox: "0 0 1000 1650",
  path: [
    "M 180 80",                            // Mumbai start
    "C 360 80, 800 170, 800 270",          // entry swoop → M1 (Right)
    "C 800 385, 200 395, 200 500",         // S-curve → M2 (Left)
    "C 200 615, 800 625, 800 730",         // S-curve → M3 (Right)
    "C 800 845, 200 855, 200 960",         // S-curve → M4 (Left)
    "C 200 1075, 800 1085, 800 1190",      // S-curve → M5 (Right)
    "C 800 1295, 200 1305, 200 1400",      // ocean sweep arc (Left)
    "C 200 1495, 800 1505, 800 1590",      // landing curve → Perth (Right)
  ].join(" "),
  pins: [
    { cx: 180, cy: 80, r: 9, fill: "#AF1411" },   // Mumbai
    { cx: 800, cy: 270, r: 7, fill: "#F36220" },   // 1890
    { cx: 200, cy: 500, r: 7, fill: "#AF1411" },   // 1956
    { cx: 800, cy: 730, r: 7, fill: "#F36220" },   // 1998
    { cx: 200, cy: 960, r: 7, fill: "#AF1411" },   // 2003
    { cx: 800, cy: 1190, r: 7, fill: "#F36220" },  // 2026
    { cx: 800, cy: 1590, r: 9, fill: "#AF1411" },  // Perth
  ],
};
