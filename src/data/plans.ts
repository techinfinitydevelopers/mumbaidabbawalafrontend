/**
 * The four plans, copied from section 3 of "V2 Mumbai Dabbawala - Website Content".
 */

export type Plan = {
  slug: string;
  name: string;
  /** The qualifier after the em dash, e.g. "3-Day Taster" */
  variant: string;
  /** Small lead-in shown before the price at a smaller size, e.g. "From" */
  pricePrefix?: string;
  price: string;
  unit: string;
  /** Small print under the price, e.g. "GST inclusive" — omit if there's nothing to add. */
  priceNote?: string;
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
    pricePrefix: "From",
    price: "$9.99",
    unit: "/ 1 order",
    priceNote: "GST inclusive",
    blurb: "Not ready to commit? Try one cuisine, no strings attached.",
    features: ["Choice of 1 cuisine", "Veg or non-veg", "1 address"],
    cta: "Start Trial",
  },
  {
    slug: "weekly",
    name: "Weekly Dabba",
    variant: "5-Day Work Week",
    pricePrefix: "From",
    price: "$25.00",
    unit: "/ 1 order",
    priceNote: "GST inclusive",
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
    variant: "",
    pricePrefix: "From",
    price: "$120.00",
    unit: "/ 1 order",
    priceNote: "GST inclusive",
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
    unit: "— request a quote",
    priceNote: "Quoted per office",
    blurb: "For offices and teams who'd rather eat well than order chaos.",
    features: ["Volume pricing", "Single office delivery", "Dedicated coordinator"],
    cta: "Request Corporate Quote",
  },
];

export const PLAN_TERMS_NOTE =
  "Plan terms, delivery zones, and cut-off times — GST-inclusive AUD throughout.";
