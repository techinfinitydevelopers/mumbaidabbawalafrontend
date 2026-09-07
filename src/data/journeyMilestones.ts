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
  /** Fixed px position down the flight-corridor coordinate space, in steps of
   *  320. Cards are taller than that (421px) and so overlap slightly in time,
   *  which is fine — they sit on opposite sides, and the fade-out is what
   *  keeps a card off the fixed header, not the spacing. The card's pin on
   *  the flight path sits at `top + 154`. */
  top: number;
};

export const MILESTONES: Milestone[] = [
  {
    id: "1890",
    side: "right",
    year: "1890",
    tag: "The First Delivery",
    title: "1890 — The First Delivery",
    description: "100 dabbawalas began carrying one banker's lunch — a legacy was born.",
    plate: {
      kind: "photo",
      src: "/images/journey/dish-marathi.gif",
      alt: "Steaming Maharashtrian Tiffin Meal",
    },
    top: 260,
  },
  {
    id: "1998",
    side: "left",
    year: "1998",
    tag: "Global Benchmark",
    title: "1998 — Six Sigma, No Computers",
    description: "Six Sigma accuracy — one error in 16 million, zero computers.",
    plate: {
      kind: "photo",
      src: "/images/journey/dish-punjabi.gif",
      alt: "Rich Indian Community Dabba",
    },
    top: 580,
  },
  {
    id: "2003",
    side: "right",
    year: "2003",
    tag: "Global Acclaim",
    title: "2003 — The World Takes Notice",
    description: "Invited to the Royal Wedding. Studied at Harvard. The world took notice.",
    plate: {
      kind: "photo",
      src: "/images/journey/dish-gujarati.gif",
      alt: "Steaming Gujarati Thali",
    },
    top: 900,
  },
  {
    id: "2026",
    side: "left",
    year: "2026",
    tag: "Perth Expansion",
    title: "2026 — Tradition Lands in Perth",
    description: "135 years of heritage lands in Perth — fresh thalis, delivered daily.",
    plate: {
      kind: "photo",
      src: "/images/journey/dish-gujarati.gif",
      alt: "Steaming Gujarati Thali",
    },
    top: 1220,
  },
];
