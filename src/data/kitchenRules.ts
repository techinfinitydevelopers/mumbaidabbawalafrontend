export type KitchenRule = {
  rule: string;
  step: string;
  stepIcon: string;
  title: string;
  photo: string;
  photoAlt: string;
  quote: string;
  desc: string;
  footerIcon: string;
  footerLabel: string;
  footerTag: string;
  theme: "turmeric" | "basmati" | "citrus" | "curryleaf";
  spotlight?: boolean;
  hangDrop: number;
  swingDur: number;
  swingDelay: number;
};

export const KITCHEN_RULES: KitchenRule[] = [
  {
    rule: "RULE 01",
    step: "1/4",
    stepIcon: "📦",
    title: "Staged Spicing",
    photo: "/images/chefs-corner/recipe-spices.jpg",
    photoAlt: "Authentic Indian spices in traditional brass bowls",
    quote:
      "“Spices go in stages, never all at once — it’s how the flavour holds up on the journey.”",
    desc: "Whole spices bloom first in bubbling oil, ground masalas follow to absorb the heat, and delicate fragrant finishes seal the aromatics.",
    footerIcon: "⏱️",
    footerLabel: "Bloom First",
    footerTag: "Taste Lock ✓",
    theme: "turmeric",
    hangDrop: 18,
    swingDur: 4.4,
    swingDelay: 0,
  },
  {
    rule: "RULE 02",
    step: "2/4",
    stepIcon: "📦",
    title: "Rested Grain",
    photo: "/images/chefs-corner/recipe-rice.jpg",
    photoAlt: "Fluffy steamed long-grain basmati rice in a clay bowl",
    quote: "“Rice rests before packing — small step, big difference on arrival.”",
    desc: "Allowing steam to subside prevents trapped condensation from pooling at the bottom and turning fluffy grains soggy inside the sealed brass tin.",
    footerIcon: "⏱️",
    footerLabel: "10m Steam Cool",
    footerTag: "Fluffy Grains ✓",
    theme: "basmati",
    hangDrop: 34,
    swingDur: 5.1,
    swingDelay: -1.4,
  },
  {
    rule: "RULE 03",
    step: "3/4",
    stepIcon: "📦",
    title: "The Final Touch",
    photo: "/images/chefs-corner/recipe-lemon-coriander.jpg",
    photoAlt: "Fresh sliced lemons and emerald green coriander leaves",
    quote: "“Coriander and lemon go in last, right before the dabba seals.”",
    desc: "Locking in raw emerald freshness and crisp citrus zest at the final second ensures radiant aromas burst forth the exact moment the lid is unlatched.",
    footerIcon: "⏱️",
    footerLabel: "At The Latch",
    footerTag: "Citrus Zest ✓",
    theme: "citrus",
    hangDrop: 22,
    swingDur: 4.1,
    swingDelay: -2.8,
  },
  {
    rule: "🌿 SPOTLIGHT",
    step: "4/4",
    stepIcon: "★",
    title: "Curry Leaves",
    photo: "/images/chefs-corner/recipe-curry-leaves.png",
    photoAlt: "Fresh curry leaves crackling in hot ghee tadka",
    quote: "“A small step (tempering in hot oil) that changes an entire dish.”",
    desc: "When crackled in smoking oil, fresh Kadi Patta releases essential oils that form an invisible aromatic shield, keeping the dish vivid for hours.",
    footerIcon: "⚡",
    footerLabel: "Smoking Tadka",
    footerTag: "Soul of Dabba ✓",
    theme: "curryleaf",
    spotlight: true,
    hangDrop: 30,
    swingDur: 4.8,
    swingDelay: -0.9,
  },
];
