/**
 * Blog posts.
 *
 * Extracted from the earlier Mumbai Dabbawala UI at
 * https://mumbai-dabbawala-ui.vercel.app/blog — category, month, headline and
 * standfirst for all ten cards. Two things to know about that source:
 *
 *  1. Its own intro says "Dummy posts written for this demo, not a live editorial
 *     feed", so this is placeholder copy awaiting real editorial.
 *  2. Its post pages 404, so no article bodies exist to extract. `excerpt` is the
 *     whole of what the source carries; nothing here is invented to fill gaps.
 *
 * The source dates it only to the month, so `month` is the display value and
 * `sort` (first of that month) exists purely to order the list.
 */

export type BlogCategory =
  | "Operations"
  | "Talks"
  | "Press"
  | "Product"
  | "Training"
  | "Milestones"
  | "Community";

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  /** As printed on the card, e.g. "Jan 2026" */
  month: string;
  /** First of the month — for ordering only, never displayed */
  sort: string;
  title: string;
  excerpt: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "the-code-on-every-lid",
    category: "Operations",
    month: "Jan 2026",
    sort: "2026-01-01",
    title: "The code on every lid, decoded",
    excerpt:
      "Four characters get a tiffin across three train lines and into the right hands by lunchtime — no phone call, no app, no address written anywhere on the box.",
  },
  {
    slug: "a-seminar-in-a-college-hall",
    category: "Talks",
    month: "Dec 2025",
    sort: "2025-12-01",
    title: "What a logistics class asked us in a college hall last month",
    excerpt:
      "A management college booked a two-hour seminar expecting a talk about supply chains. Most of the questions were about trust, not logistics.",
  },
  {
    slug: "what-the-coverage-gets-right-and-wrong",
    category: "Press",
    month: "Nov 2025",
    sort: "2025-11-01",
    title: "What the old newspaper coverage still gets right — and wrong",
    excerpt:
      "The New York Times wrote about the network back in 2007. Reading it again now, most of it still holds — a couple of details don’t.",
  },
  {
    slug: "building-the-app-behind-the-relay",
    category: "Product",
    month: "Oct 2025",
    sort: "2025-10-01",
    title: "Building the app behind a system that has never needed one",
    excerpt:
      "A mobile app for a network that has run on handwritten codes since 1890 raises an obvious question: why now, and what does it actually need to do?",
  },
  {
    slug: "inside-a-training-batch",
    category: "Training",
    month: "Sep 2025",
    sort: "2025-09-01",
    title: "Inside a training batch, from the coding test to the first solo route",
    excerpt:
      "New dabbawalas don’t start on a route alone. They shadow, get tested on the coding system, and only then get handed a crate of their own.",
  },
  {
    slug: "another-year-on-the-relay",
    category: "Milestones",
    month: "Aug 2025",
    sort: "2025-08-01",
    title: "Another year on the relay, and the same coding system still holds",
    excerpt:
      "The network marks another year of the daily run — same coding system it started with, still moving lunch across the city on time.",
  },
  {
    slug: "the-roti-bank-runs-on-the-same-network",
    category: "Community",
    month: "Jul 2025",
    sort: "2025-07-01",
    title: "The Roti Bank runs on the same network that carries your lunch",
    excerpt:
      "Surplus food collection didn’t need a new fleet or a new system — it just needed the relay that was already running twice a day.",
  },
  {
    slug: "what-digital-dabbawala-actually-means",
    category: "Product",
    month: "Jun 2025",
    sort: "2025-06-01",
    title: "What “Digital Dabbawala” actually means, since it isn’t an app",
    excerpt:
      "The name sounds like a tech product. What it actually is turns out to be closer to a booking desk than a piece of software.",
  },
  {
    slug: "a-look-inside-the-centralised-kitchen",
    category: "Operations",
    month: "May 2025",
    sort: "2025-05-01",
    title: "A look inside the centralised kitchen option, and who actually uses it",
    excerpt:
      "Most tiffins still come from home kitchens. The centralised kitchen exists for the households and offices that don’t have one to send from.",
  },
  {
    slug: "a-day-with-a-dabbawala-recap",
    category: "Community",
    month: "Apr 2025",
    sort: "2025-04-01",
    title: "What actually happens on “A Day With a Dabbawala”",
    excerpt:
      "Corporate teams book it expecting a photo opportunity. Most of them come back saying the sorting station was the part that stuck.",
  },
];

/** Newest first — the order the source listed them in. */
export const POSTS_BY_DATE = [...BLOG_POSTS].sort((a, b) => b.sort.localeCompare(a.sort));

/** The lead story, and the three the sidebar promotes beside it. */
export const FEATURED_POST = POSTS_BY_DATE[0];
export const MOST_POPULAR = POSTS_BY_DATE.slice(1, 4);

/** Everything below the lead — what the filterable grid works through. */
export const LISTED_POSTS = POSTS_BY_DATE.slice(1);

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Operations",
  "Talks",
  "Press",
  "Product",
  "Training",
  "Milestones",
  "Community",
];

export function postBySlug(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
