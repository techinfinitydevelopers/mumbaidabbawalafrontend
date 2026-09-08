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
export type Testimonial = {
  stars: number;
  text: string;
  name: string;
  suburb: string;
  /** invented copy, present only for previewing the deck — see SHOW_PLACEHOLDER_REVIEWS */
  placeholder?: boolean;
};

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

/* ────────────────────────────────────────────────────────────────────────────────────
   PLACEHOLDER REVIEWS — INVENTED. NOT REAL CUSTOMERS. NOT REAL QUOTES.

   Added 2026-09-08 at the client’s request, purely so the review deck can be judged
   with more than the three reviews the content doc supplies. They are written to the
   same lengths and rating spread as the real ones so the layout behaves honestly, and
   they use Perth suburbs because that is the launch city.

   >>> SET `SHOW_PLACEHOLDER_REVIEWS` TO FALSE BEFORE THE SITE GOES LIVE. <<<

   Publishing invented testimonials as genuine is a misleading-conduct problem under
   Australian Consumer Law, and every one of these is invented.
   ──────────────────────────────────────────────────────────────────────────────────── */
export const SHOW_PLACEHOLDER_REVIEWS = true;

const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    stars: 5,
    text: "The Monthly Dabba means I’ve stopped thinking about lunch entirely. Best decision of my semester.",
    name: "Rohan",
    suburb: "Northbridge",
    placeholder: true,
  },
  {
    stars: 4,
    text: "Dal and roti still warm at 1pm out in Joondalup. I don’t know how they manage it.",
    name: "Sanjana",
    suburb: "Joondalup",
    placeholder: true,
  },
  {
    stars: 5,
    text: "My kids ask for the Gujarati Thursday instead of takeaway now. That’s the whole review.",
    name: "Kavita",
    suburb: "Canning Vale",
    placeholder: true,
  },
  {
    stars: 5,
    text: "Signed up for the three-day trial, forgot to cancel, and I’m very glad I forgot.",
    name: "Daniel",
    suburb: "Subiaco",
    placeholder: true,
  },
];

/**
 * What the deck actually renders: the doc’s reviews, plus the placeholders while the
 * flag above is on. Flipping the flag off leaves the three real ones and nothing else —
 * the deck handles any count.
 */
export const REVIEW_DECK: Testimonial[] = SHOW_PLACEHOLDER_REVIEWS
  ? [...TESTIMONIALS, ...PLACEHOLDER_TESTIMONIALS]
  : TESTIMONIALS;

/* ───── "More than a meal" — the scroll-panned statement band ───── */

/**
 * The full line, verbatim, supplied by the client on 2026-09-08:
 *
 *   "More than a meal, every dabba carries tradition, care, familiar flavours, and the
 *    feeling of home — freshly prepared, carefully packed, and delivered to Perth."
 *
 * It is tokenised because the band highlights individual words and drops artwork between
 * them. `chip` names a ground from the primary palette; the reference the client sent
 * used pastel pink and lavender, which are not brand colours, so those two map onto
 * brand-red and brand-green-dark. `art` puts a sticker after the word it sits on.
 *
 * NOTE for the client: "freshly prepared, carefully packed" also appears, near enough
 * word for word, as the third beat of the "It's Never Just Lunch" ladder further down
 * the page. Worth deciding which one keeps it.
 */
export type ChipTone = "orange" | "green" | "cream" | "red" | "yellow" | "forest";

export type CarriesToken = {
  word: string;
  /** highlight ground; plain words have none */
  chip?: ChipTone;
  /** sticker dropped in after this word */
  art?:
    | { kind: "image"; src: string; alt?: string; tilt: number; h: string }
    | { kind: "photo"; src: string; tilt: number }
    | { kind: "glyph"; name: "heart" | "house" | "parcel" };
};

export const DABBA_CARRIES: CarriesToken[] = [
  { word: "More" },
  { word: "than", chip: "orange" },
  { word: "a" },
  {
    word: "meal,",
    chip: "green",
    art: { kind: "image", src: "/images/items/butterchicken-bowl.png", tilt: -8, h: "h-[1.15em]" },
  },
  { word: "every" },
  {
    word: "dabba",
    chip: "cream",
    art: { kind: "image", src: "/images/items/tiffin-dabba.png", tilt: 6, h: "h-[1.45em]" },
  },
  { word: "carries" },
  {
    word: "tradition,",
    chip: "red",
    art: { kind: "photo", src: "/images/about/net-05.jpg", tilt: -5 },
  },
  { word: "care,", chip: "yellow", art: { kind: "glyph", name: "heart" } },
  { word: "familiar" },
  {
    word: "flavours,",
    chip: "forest",
    art: { kind: "image", src: "/images/cutouts/spice-chilli.png", tilt: 10, h: "h-[1.1em]" },
  },
  { word: "and" },
  { word: "the" },
  { word: "feeling" },
  { word: "of" },
  { word: "home", chip: "green", art: { kind: "glyph", name: "house" } },
  { word: "—" },
  { word: "freshly", chip: "cream" },
  {
    word: "prepared,",
    art: { kind: "image", src: "/images/cutouts/spice-curryleaf.png", tilt: -12, h: "h-[1.2em]" },
  },
  { word: "carefully", chip: "forest" },
  { word: "packed,", art: { kind: "glyph", name: "parcel" } },
  { word: "and" },
  { word: "delivered", chip: "green" },
  { word: "to" },
  {
    word: "Perth.",
    chip: "red",
    art: { kind: "image", src: "/images/stickers/run-perth.png", alt: "", tilt: 4, h: "h-[1.5em]" },
  },
];
