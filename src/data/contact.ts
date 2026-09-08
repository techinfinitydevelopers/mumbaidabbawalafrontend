/**
 * The one place the brand's contact details and profile URLs live, so the footer and
 * the blog rail can't drift apart.
 *
 * The TikTok URL the client supplied carried `?_r=1&_t=…` — a share-session tracking
 * pair, not part of the profile address — so it is stored clean.
 */

export const EMAIL = "hello@mumbaidabbawala.com.au";

/** E.164 for the `tel:` href; `PHONE_DISPLAY` is how it's printed. */
export const PHONE = "+61469860839";
export const PHONE_DISPLAY = "+61 469 860 839";

export type SocialKey = "instagram" | "facebook" | "youtube" | "linkedin" | "tiktok";

export const SOCIALS: { key: SocialKey; label: string; href: string }[] = [
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/mumbaidabbawalaau/",
  },
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61592772927793",
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@mumbaidabbawalaau",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/mumbaidabbawalaau/",
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@mumbaidabbawalaau",
  },
];

/* ───── Contact page copy, verbatim from the content doc (section 9) ───── */

/** "Get in touch by topic" — the doc's four customer routes. */
export const CUSTOMER_TOPICS: string[] = [
  "Orders & Plans",
  "Meal & Menu Questions",
  "Corporate Meals",
  "Partnerships & Franchise Enquiries",
];

/** "Beyond the Dabba: Corporate & Global Dabbawala" — four business routes. */
export const BUSINESS_TOPICS: { name: string; copy: string }[] = [
  { name: "Corporate Meal Partnerships", copy: "feeding your workplace, done right" },
  { name: "Franchise & Licensing", copy: "bring the Dabbawala model to new markets" },
  { name: "Training & Knowledge Sharing", copy: "the principles behind a 135-year system" },
  { name: "Global Expansion", copy: "where Mumbai Dabbawala is headed next" },
];

/**
 * The photo wall beside the waitlist, in two columns that scroll past each other.
 *
 * These are the `about/net-*` documentary set — the only real photographs of the
 * dabbawalas in the project. Split so each column carries a mix of portrait and
 * landscape, which is what keeps a two-column wall from reading as a grid.
 */
export const WALL_LEFT = ["net-08", "net-03", "net-06", "net-01", "net-10"];
export const WALL_RIGHT = ["net-05", "net-04", "net-07", "net-09", "net-02"];

/** The launch date, as the rest of the site states it. */
export const LAUNCH_DATE = "14 September 2026";
