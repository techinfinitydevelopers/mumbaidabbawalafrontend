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

/** An article body, as blocks — enough structure for a real editorial layout. */
export type BlogBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  /** As printed on the card, e.g. "Jan 2026" */
  month: string;
  /** First of the month — for ordering only, never displayed */
  sort: string;
  title: string;
  excerpt: string;
  /** Present only where the article has actually been written. */
  body?: BlogBlock[];
};

/**
 * One still life per category, generated for this site (objects only — a real
 * organisation's operations should not be illustrated with fabricated photographs
 * of its people).
 */
export const CATEGORY_IMAGE: Record<BlogCategory, string> = {
  Operations: "/images/blog/operations.jpg",
  Talks: "/images/blog/talks.jpg",
  Press: "/images/blog/press.jpg",
  Product: "/images/blog/product.jpg",
  Training: "/images/blog/training.jpg",
  Milestones: "/images/blog/milestones.jpg",
  Community: "/images/blog/community.jpg",
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
    // SEEDED SAMPLE COPY — written to show the article layout, not client-approved.
    // It stays at the level of what is publicly documented about the coding system and
    // avoids specifics that vary between groups. Needs editorial sign-off before launch.
    body: [
      {
        kind: "p",
        text: "There is no address on a dabba. There is no name, no phone number, and nothing that would help a stranger work out where the box is going. What there is, painted or marked on the lid, is a short code — a few characters and a number or two — and that is the entire routing system.",
      },
      {
        kind: "p",
        text: "It has to be short, because the code is read at speed. A tiffin changes hands several times between a kitchen and a desk, and at each handover the person taking it has about a second to look at the lid and decide which pile it belongs in.",
      },
      { kind: "h2", text: "What the marks actually carry" },
      {
        kind: "p",
        text: "Read together, the marks answer four questions, in roughly the order the box needs them answered:",
      },
      {
        kind: "list",
        items: [
          "Where it was collected — the suburb or the station it entered the network at.",
          "Which station it gets off at — the destination on the line.",
          "Which building, once it is off the train.",
          "Which floor, and which group of carriers is responsible for that stretch.",
        ],
      },
      {
        kind: "p",
        text: "Nothing in that list is about the customer. The code describes a route, not a person, which is why it survives a change of tenant, a change of desk, and a carrier who has never met the household that packed the box.",
      },
      { kind: "h2", text: "Why the sorting is the clever part" },
      {
        kind: "p",
        text: "The codes only work because of what happens between trains. Boxes arriving from dozens of suburbs are tipped out onto a platform, regrouped by destination station rather than by origin, and loaded again. A box that came in beside its neighbour from the same street leaves in a completely different crate.",
      },
      {
        kind: "quote",
        text: "The sorting is not a step in the delivery. The sorting is the delivery — everything before and after it is just carrying.",
      },
      {
        kind: "p",
        text: "That regrouping is also what keeps the system resilient. Nobody in the chain holds the whole route in their head. Each person only has to get a box to the next pile correctly, and the code tells them which pile that is.",
      },
      { kind: "h2", text: "What it means for Perth" },
      {
        kind: "p",
        text: "Perth is not Mumbai, and the delivery here runs on vans rather than local trains. What carries over is the discipline underneath the code: decide the route before the food moves, keep the label readable by anyone in the chain, and never make a handover depend on a conversation.",
      },
    ],
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
