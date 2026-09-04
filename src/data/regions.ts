export type DishCluster = {
  /** Largest piece — bread, baati, dosa. Sits lower-right. */
  main: string;
  /** Upper bowl. */
  top: string;
  /** Lower bowl, tucked under the main piece. */
  bottom: string;
  /** Optional fourth piece, used for the larger hero group. */
  extra?: string;
};

export type Region = {
  id: string;
  index: string;
  kicker: string;
  name: string;
  tagline: string;
  description: string;
  dishes: string[];
  cluster: DishCluster;
  tone: "orange" | "cream";
};

const items = (name: string) => `/images/items/${name}.png`;

export const HERO_CLUSTER: DishCluster = {
  main: items("tiffin-dabba"),
  top: items("dal-bowl"),
  bottom: items("roti-stack"),
  extra: items("raita-bowl"),
};

export const REGIONS: Region[] = [
  {
    id: "gujarati",
    index: "01",
    kicker: "Thali",
    name: "Gujarati",
    tagline: "Sweetness, With a Story",
    description:
      "Every dhokla, every bite of undhiyu, carries a little of Gujarat's festival calendar and its grandmothers' insistence on getting the balance of sweet and savoury just right.",
    dishes: ["Dhokla", "Undhiyu", "Kadhi", "Thepla"],
    cluster: {
      main: items("dhokla-stack"),
      top: items("kadhi-bowl"),
      bottom: items("thepla"),
    },
    tone: "orange",
  },
  {
    id: "punjabi",
    index: "02",
    kicker: "Thali",
    name: "Punjabi",
    tagline: "Generous, Like the People",
    description:
      "Rich gravies and tandoor-style breads, made the way Punjab has always fed its guests — like there's no such thing as “just enough.”",
    dishes: ["Butter Chicken", "Sarson ka Saag", "Makki di Roti"],
    cluster: {
      main: items("naan"),
      top: items("butterchicken-bowl"),
      bottom: items("saag-bowl"),
    },
    tone: "cream",
  },
  {
    id: "marathi",
    index: "03",
    kicker: "Thali",
    name: "Marathi",
    tagline: "Comfort, Coast to Kitchen",
    description:
      "From coconut-rich Konkan coast flavours to the peanut-and-jaggery warmth of puran poli, Marathi food is what a Sunday afternoon at home tastes like.",
    dishes: ["Konkan Fish Curry", "Puran Poli", "Sol Kadhi"],
    cluster: {
      main: items("puranpoli"),
      top: items("fishcurry-bowl"),
      bottom: items("solkadhi-glass"),
    },
    tone: "orange",
  },
  {
    id: "rajasthani",
    index: "04",
    kicker: "Thali",
    name: "Rajasthani",
    tagline: "Born of the Desert",
    description:
      "Dal Baati Churma, Gatte ki Sabzi — dishes shaped by Rajasthan's arid land, royal kitchens, and generations of tradition, kept alive because every recipe carries a story worth passing down.",
    dishes: ["Dal Baati Churma", "Gatte ki Sabzi", "Ker Sangri"],
    cluster: {
      main: items("baati-balls"),
      top: items("dal-bowl"),
      bottom: items("gatte-bowl"),
    },
    tone: "cream",
  },
  {
    id: "south-indian",
    index: "05",
    kicker: "Thali",
    name: "South Indian",
    tagline: "Tradition in Every Ferment",
    description:
      "The tang of dosa batter, the layered spice of sambar — recipes passed down not in cookbooks, but in kitchens, from one pair of hands to the next.",
    dishes: ["Dosa", "Idli", "Sambar", "Coconut Chutney"],
    cluster: {
      main: items("dosa-folded"),
      top: items("sambar-bowl"),
      bottom: items("idli-pair"),
    },
    tone: "orange",
  },
];
