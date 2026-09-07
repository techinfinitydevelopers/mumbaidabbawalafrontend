/**
 * The four plans, copied from section 3 of "V2 Mumbai Dabbawala - Website Content".
 *
 * `price` is verbatim from that document, placeholders included: it ships `$XX.XX`,
 * `$XX.XX` and `$XXX.XX` for the three paid plans. Those are NOT filled in here —
 * inventing a price for a food subscription is the one thing on this page that would
 * actually mislead a customer. They render as-is, flagged on the page, until the
 * client supplies real figures.
 */

export type Plan = {
  slug: string;
  name: string;
  /** The qualifier after the em dash, e.g. "3-Day Taster" */
  variant: string;
  /** Verbatim from the content doc — a placeholder where the doc has one. */
  price: string;
  /** Whether `price` is still a placeholder, so the page can say so. */
  priceIsPlaceholder: boolean;
  unit: string;
  blurb: string;
  features: string[];
  cta: string;
  /** The doc marks Monthly as "Most Popular". */
  featured?: boolean;
};

export const PLANS: Plan[] = [
  {
    slug: "trial",
    name: "Trial Dabba",
    variant: "3-Day Taster",
    price: "$XX.XX",
    priceIsPlaceholder: true,
    unit: "/ 3 meals",
    blurb: "Not ready to commit? Try one cuisine, no strings attached.",
    features: ["Choice of 1 cuisine", "Veg or non-veg", "1 address"],
    cta: "Start Trial",
  },
  {
    slug: "weekly",
    name: "Weekly Dabba",
    variant: "5-Day Work Week",
    price: "$XX.XX",
    priceIsPlaceholder: true,
    unit: "/ week",
    blurb: "Monday to Friday, sorted — straight to your desk or door.",
    features: [
      "Up to 2 cuisines",
      "Veg, non-veg or mixed",
      "Pause anytime before Sunday 6pm",
    ],
    cta: "Choose Weekly",
  },
  {
    slug: "monthly",
    name: "Monthly Dabba",
    variant: "Most Popular",
    price: "$XXX.XX",
    priceIsPlaceholder: true,
    unit: "/ month",
    blurb: "Our most-loved plan, and the best value per meal.",
    features: [
      "Full 15-Day rotating menu",
      "All 5 cuisines",
      "Priority delivery",
      "1 free swap a week",
    ],
    cta: "Choose Monthly",
    featured: true,
  },
  {
    slug: "corporate",
    name: "Corporate Dabba",
    variant: "Bulk Workplace Delivery",
    price: "Custom pricing",
    priceIsPlaceholder: false,
    unit: "— request a quote",
    blurb: "For offices and teams who'd rather eat well than order chaos.",
    features: ["Volume pricing", "Single office delivery", "Dedicated coordinator"],
    cta: "Request Corporate Quote",
  },
];

/**
 * The doc's closing line, verbatim. "As previously specified" refers to terms held
 * outside this document — the actual zones and cut-off times still need supplying.
 */
export const PLAN_TERMS_NOTE =
  "Plan terms, delivery zones, and cut-off times as previously specified — GST-inclusive AUD throughout.";
