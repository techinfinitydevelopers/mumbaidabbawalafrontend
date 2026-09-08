/**
 * Home page copy, taken verbatim from "V2 Mumbai Dabbawala - Website Content.pdf",
 * section 1 (Home Page). Emoji bullets in the source are dropped — the components draw
 * icons in the brand palette instead, which render the same on every OS.
 */

/** The hero video. One constant so swapping the film is a one-line change. */
export const HERO_VIDEO = {
  src: "/videos/hero.mp4",
  /** First frame, written out of the file itself. Replace it whenever `src` changes. */
  poster: "/images/hero-video-poster.jpg",
  width: 1920,
  height: 1080,
};

/** "EVERY DABBA, EVERY DAY. It's Never Just Lunch." — four beats, in the doc's order. */
export const NEVER_JUST_LUNCH: string[] = [
  "A dabba isn’t a delivery. It’s a mother’s recipe, a grandmother’s spice mix, a lunchbox packed with a little more care than it needed to have.",
  "For generations, the dabba has carried something no restaurant meal can — the exact taste of a home you miss, on a day you needed reminding of it.",
  "Freshly prepared. Carefully packed. Delivered as it matters — because it does.",
  "From a Mumbai kitchen to a Perth desk, the promise hasn’t changed: food that tastes as someone made it for you, not just for the day.",
];

/** "WHY THE DABBA?" — the four values, wording unchanged. */
export type Value = { name: string; copy: string };

export const WHY_THE_DABBA: Value[] = [
  {
    name: "Trust",
    copy: "Millions have relied on the dabba to arrive, every single day, without fail. That trust wasn’t built overnight — it was earned, one delivery at a time.",
  },
  {
    name: "Discipline",
    copy: "There’s no shortcut to consistency. Every dabba follows the same care, the same standards, the same attention — whether it’s day one or day 50,000.",
  },
  {
    name: "People",
    copy: "Behind every dabba is a person who takes pride in getting it right. Not an algorithm. Not a black box. A human being who cares that your lunch arrives the way it should.",
  },
  {
    name: "Home",
    copy: "At the heart of it all is one simple idea: everyone deserves a taste of home, even on the busiest of days.",
  },
];

/** "PERTH — WHERE THE LEGACY LANDS" — who the launch is for. */
export const PERTH_AUDIENCES: { who: string; copy: string }[] = [
  { who: "For Students", copy: "away from home, craving something familiar." },
  { who: "For Professionals", copy: "too busy to cook, too particular to settle for less." },
  { who: "For Families", copy: "who want fewer nights spent over the stove." },
  {
    who: "For Anyone Who Loves Indian Food",
    copy: "done properly, delivered daily.",
  },
];

/**
 * "WHAT OUR CUSTOMERS SAY" — quotes, ratings and attributions exactly as the doc gives
 * them. The doc also puts a "Verified Customer" tick under each one; that badge is a
 * claim about verification, so it is not printed here — the same governance note that
 * holds back the accuracy statistics applies. Restore it once the client confirms these
 * are real, consented reviews.
 */
export type Testimonial = { stars: number; text: string; name: string; suburb: string };

export const TESTIMONIALS: Testimonial[] = [
  {
    stars: 5,
    text: "Feels exactly like the tiffin my mum used to pack. Never late, never wrong order.",
    name: "Priya",
    suburb: "Parramatta",
  },
  {
    stars: 5,
    text: "Switched my whole team at work onto the Corporate Dabba plan. Everyone’s obsessed with the South Indian Thursdays.",
    name: "Arjun",
    suburb: "Melbourne CBD",
  },
  {
    stars: 4,
    text: "Great variety across the 15-day menu — my only wish is more Rajasthani dishes!",
    name: "Meera",
    suburb: "Box Hill",
  },
];
