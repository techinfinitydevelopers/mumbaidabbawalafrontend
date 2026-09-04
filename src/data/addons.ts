/**
 * Add-ons, taken from the reference the user supplied — items, availability and prices all
 * come from that screenshot, not from the content PDF (which still carries $XX.XX
 * placeholders). Confirm against the real price list before launch.
 *
 * Availability rides on each item rather than grouping them, so they can share one slider
 * without a group of one sitting alone.
 */
export type Addon = {
  name: string;
  price: string;
  src: string;
  note: string;
  availability: string;
};

export const ADDONS: Addon[] = [
  {
    name: "Extra Protein",
    price: "$4.00",
    src: "/images/items/addon-protein.png",
    note: "Paneer or chicken tikka",
    availability: "Mon–Thu · Free Fri",
  },
  {
    name: "Extra Rice",
    price: "$1.50",
    src: "/images/items/addon-rice.png",
    note: "Steamed basmati",
    availability: "Mon–Thu · Free Fri",
  },
  {
    name: "Extra Roti",
    price: "$2.00",
    src: "/images/items/addon-roti.png",
    note: "Two pieces, fresh off the tawa",
    availability: "Mon–Thu · Free Fri",
  },
  {
    name: "Papad / Chivda / Fry",
    price: "$1.00",
    src: "/images/items/addon-papad.png",
    note: "Something crisp on the side",
    availability: "Mon–Thu · Free Fri",
  },
  {
    name: "Sweet (Gulab Jamun)",
    price: "$3.00",
    src: "/images/items/addon-sweet.png",
    note: "Warm, in cardamom syrup",
    availability: "Mon–Thu · Free Fri",
  },
  {
    name: "Raita / Curd / Chaas",
    price: "$1.50",
    src: "/images/items/addon-raita.png",
    note: "To cool the plate down",
    availability: "Every day",
  },
];
