/**
 * The rotating menu, generated from the client's spreadsheet
 * (`Menu.16 August 2026.xlsx`) — 16 weekday menus plus 4 Friday specials.
 *
 * The sheet's second row classifies each column: bread, rice, dal/side, the veg and non-veg
 * mains, salad, chutney and mukhwas are "Grid" items included in the dabba; Veggie 2, Sides,
 * Papad, Drink/Raita/Curd and Dessert are marked "Add-on". That split is preserved here.
 *
 * NOTE: the content PDF calls this "The 15-Day Menu", but the sheet holds 16 weekday menus
 * (four weeks of Mon-Thu) plus 4 Friday specials. Worth confirming which is correct.
 */

export type MenuGrid = {
  bread: string;
  rice: string;
  /** dal or lentil on weekdays */
  dal?: string;
  /** the container side on Fridays */
  side?: string;
  veg: string;
  nonVeg: string;
  salad: string;
  chutney: string;
  mukhwas: string;
};

export type MenuDay = {
  image: string;
  cuisine: string;
  cuisineKey: string;
  grid: MenuGrid;
  /** chargeable extras, per the sheet's "Add-on" column marking */
  addOns: string[];
  pickle: string;
};

/** Mon-Thu rotation, in sheet order */
export const MENU_DAYS: MenuDay[] = [
  {
    image: "/images/days/day-01.png",
    cuisine: "Gujarati",
    cuisineKey: "gujarati",
    grid: {
      bread: "Fulka Roti",
      rice: "Steamed Rice",
      dal: "Tuvar Dal",
      veg: "Fansi Bateta Nu Shaak",
      nonVeg: "Egg Curry",
      salad: "Kachumber",
      chutney: "Green Chutney",
      mukhwas: "Roasted Saunf",
    },
    addOns: ["Sev Tameta Nu Shaak", "Khaman (Nylon)", "Papad Churi", "Chaas", "Mohanthal"],
    pickle: "Marcha-Gajar Nu Athanu",
  },
  {
    image: "/images/days/day-02.png",
    cuisine: "Gujarati",
    cuisineKey: "gujarati",
    grid: {
      bread: "Methi Thepla",
      rice: "Moong Dal Khichdi",
      dal: "Kadhi",
      veg: "Bateta Ni Suki Bhaji",
      nonVeg: "Egg Ghotala",
      salad: "Kobi-Gajar-Marcha Sambharo",
      chutney: "Dry Garlic Chutney",
      mukhwas: "Roasted Saunf",
    },
    addOns: ["Ringan Bateta Vatana Nu Shaak", "Idada(White Dhokla)", "Khichiya Churi", "Dahi Tikhari", "Lapsi"],
    pickle: "Chhundo",
  },
  {
    image: "/images/days/day-03.png",
    cuisine: "Gujarati",
    cuisineKey: "gujarati",
    grid: {
      bread: "Fulka Roti",
      rice: "Ghee Rice",
      dal: "Khatti-Meethi Dal",
      veg: "Kathiyawadi Ringan No Olo",
      nonVeg: "Egg Bhurji",
      salad: "Cucumber Salad",
      chutney: "Green Chutney",
      mukhwas: "Roasted Saunf",
    },
    addOns: ["Lasaniya Bateta", "Lilva Kachori", "Papad", "Chaas", "Gol Papdi"],
    pickle: "Gor Keri Nu Athanu",
  },
  {
    image: "/images/days/day-04.png",
    cuisine: "Punjabi",
    cuisineKey: "punjabi",
    grid: {
      bread: "Paratha",
      rice: "Ghee Jeera Rice",
      dal: "Dal Makhani",
      veg: "Paneer Butter masala",
      nonVeg: "Butter Chicken",
      salad: "Lachha Pyaz",
      chutney: "Dhania Chutney",
      mukhwas: "Roasted Saunf",
    },
    addOns: ["Punjabi Mixed Vegetable Sabzi", "Hara Bhara Kebab", "Amritsari Papad", "Masala Chaas", "Gajar Halwa"],
    pickle: "Gajar Achaar",
  },
  {
    image: "/images/days/day-05.png",
    cuisine: "Punjabi",
    cuisineKey: "punjabi",
    grid: {
      bread: "Kasturi Methi Paratha",
      rice: "Steamed Rice",
      dal: "Rajma",
      veg: "Paneer Tikka Masala",
      nonVeg: "Chicken Tikka Masala",
      salad: "Mooli-Gajar Salad",
      chutney: "Green Chilli Chutney",
      mukhwas: "Roasted Saunf",
    },
    addOns: ["Aloo Gobhi", "Dahi Bhalla", "Papad Churi", "Sweet Lassi", "Kala Jamun/Gulab Jamun"],
    pickle: "Punjabi Mango Pickle",
  },
  {
    image: "/images/days/day-06.png",
    cuisine: "Punjabi",
    cuisineKey: "punjabi",
    grid: {
      bread: "Ajwain Paratha",
      rice: "Green Peas Pulao",
      dal: "Kadi Pakoda",
      veg: "Palak Paneer",
      nonVeg: "Chicken Do Pyaza",
      salad: "Bharwan Hari Mirch",
      chutney: "Mint Chutney",
      mukhwas: "Roasted Saunf",
    },
    addOns: ["Chana", "Makke Di Tikki", "Fried Khichiya", "Kheera Raita", "Rice Kheer"],
    pickle: "Lemon Pickle",
  },
  {
    image: "/images/days/day-07.png",
    cuisine: "Maharashtrian",
    cuisineKey: "maharashtrian",
    grid: {
      bread: "Bhakri",
      rice: "Masale Bhaat",
      dal: "Katachi Amti",
      veg: "Methi Pithla",
      nonVeg: "Pandhra Rassa",
      salad: "Khamang Kakadi",
      chutney: "Thecha",
      mukhwas: "Ajwain Mix",
    },
    addOns: ["Matki Usal", "Kothimbir Vadi", "Tandul Papad", "Solkadhi", "Besan Ladoo"],
    pickle: "Kairi Lonche",
  },
  {
    image: "/images/days/day-08.png",
    cuisine: "Maharashtrian",
    cuisineKey: "maharashtrian",
    grid: {
      bread: "Chapati",
      rice: "Steamed Rice",
      dal: "Akhkhi Masoor Amti",
      veg: "Kandyachi Paat",
      nonVeg: "Chicken Kolhapuri",
      salad: "Khamang Kakadi",
      chutney: "Shengdanyachi Chutney",
      mukhwas: "Ajwain Mix",
    },
    addOns: ["Moong Usal Rassa", "Sabudana Vada", "Nachni Papad", "Plain Curd", "Ukadiche Modak"],
    pickle: "Lasun Lonche",
  },
  {
    image: "/images/days/day-09.png",
    cuisine: "Maharashtrian (Malvani)",
    cuisineKey: "malvani",
    grid: {
      bread: "Malvani Vade",
      rice: "Bhaat",
      dal: "Varan",
      veg: "Bharli Vangi",
      nonVeg: "Malvani Chicken",
      salad: "Gajar-Beet-Kakadi Koshimbir",
      chutney: "Lal Mirchi-Khobryachi Chutney",
      mukhwas: "Ajwain Mix",
    },
    addOns: ["Kala Vatana Usal", "Batata vada", "Sabudana Papad", "Solkadhi", "Tilache Ladoo"],
    pickle: "Limbache Lonche",
  },
  {
    image: "/images/days/day-10.png",
    cuisine: "Andhra",
    cuisineKey: "andhra",
    grid: {
      bread: "Roti",
      rice: "Steamed Rice",
      dal: "Dal (Pappu)",
      veg: "Gutti Vankaya Kura",
      nonVeg: "Pepper Kodi Kura",
      salad: "Green Salad",
      chutney: "Kobbari Pachadi",
      mukhwas: "Roasted Saunf",
    },
    addOns: ["Cabbage Kura", "Punugulu", "Papadam", "Lemon Juice", "Rava Kesari"],
    pickle: "Mamidi Kaya Pachadi",
  },
  {
    image: "/images/days/day-11.png",
    cuisine: "Andhra",
    cuisineKey: "andhra",
    grid: {
      bread: "Chapati",
      rice: "Tamarind Rice",
      dal: "Rasam",
      veg: "Mushroom Pepper Fry",
      nonVeg: "Chicken Chettinad",
      salad: "Kosambari",
      chutney: "Tomato Pachadi",
      mukhwas: "Roasted Saunf",
    },
    addOns: ["Carrot-Beans Kura", "Mysore Bonda", "Papadam", "Plain Curd", "Rice Payasam"],
    pickle: "Lemon Pickle",
  },
  {
    image: "/images/days/day-12.png",
    cuisine: "Kerala",
    cuisineKey: "kerala",
    grid: {
      bread: "Paratha",
      rice: "Lemon Rice",
      dal: "Parippu Curry",
      veg: "Avial",
      nonVeg: "Kerala Chicken Curry",
      salad: "Cucumber Salad",
      chutney: "Tomato Chutney",
      mukhwas: "Roasted Saunf",
    },
    addOns: ["Thoran (Beans/Cabbage/Carrot)", "Dal Vada", "Papadam", "Jal jeera", "Payasam"],
    pickle: "Garlic Pickle",
  },
  {
    image: "/images/days/day-13.png",
    cuisine: "Rajasthani",
    cuisineKey: "rajasthani",
    grid: {
      bread: "Missi Roti",
      rice: "Steamed Rice",
      dal: "Yellow Dal Tadka",
      veg: "Gatte Ki Sabzi",
      nonVeg: "Chichen Laal Maas",
      salad: "Kachumber Salad",
      chutney: "Corinder & Chilli",
      mukhwas: "Roasted Saunf",
    },
    addOns: ["Aloo Methi", "Aloo Pyaz Kachori", "Papad Churi", "Buttermilk", "Churma"],
    pickle: "Mango Pickle",
  },
  {
    image: "/images/days/day-14.png",
    cuisine: "Rajasthani",
    cuisineKey: "rajasthani",
    grid: {
      bread: "Phulka",
      rice: "Gatta Pulav",
      dal: "Panchmel Dal",
      veg: "Rajasthani Lal Paneer",
      nonVeg: "Chichen Bhuna",
      salad: "Carrot-Beetroot Salad",
      chutney: "Tamarind-Date Chutney",
      mukhwas: "Roasted Saunf",
    },
    addOns: ["Methi Mangodi", "Moong Dal Kachori", "Khakhra Churi", "Mint Raita", "Moongdal Halwa"],
    pickle: "Chunda",
  },
  {
    image: "/images/days/day-15.png",
    cuisine: "Awdhi",
    cuisineKey: "awadhi",
    grid: {
      bread: "Paratha",
      rice: "Ghee Jeera Rice",
      dal: "Dal Tadka",
      veg: "Paneer Makhani",
      nonVeg: "Chicken Korma",
      salad: "Sprouted Moong Salad",
      chutney: "Mint Chutney",
      mukhwas: "Roasted Saunf",
    },
    addOns: ["Navratan Korma", "Veg Kebab", "Fried Papad", "Shikanji", "Phirni"],
    pickle: "Carrot Pickle",
  },
  {
    image: "/images/days/day-16.png",
    cuisine: "Awdhi",
    cuisineKey: "awadhi",
    grid: {
      bread: "Phulka",
      rice: "Matar Pulao",
      dal: "Dhaba Style Dal",
      veg: "Paneer Mutter",
      nonVeg: "Murgh Musallam",
      salad: "Chickper Salad",
      chutney: "Green Chilli Chutney",
      mukhwas: "Roasted Saunf",
    },
    addOns: ["Malai Kofta", "Veg Galouti Kebab", "Potato Papad", "Beetroot Raita", "Kesar Phirni"],
    pickle: "Punjabi Mango Pickle",
  },
];

/** the Friday specials, on their own four-week cycle */
export const FRIDAY_SPECIALS: MenuDay[] = [
  {
    image: "/images/days/friday-1.png",
    cuisine: "Maharashtrian",
    cuisineKey: "maharashtrian",
    grid: {
      bread: "Butter Pav",
      rice: "Tawa Pulao",
      side: "Raita",
      veg: "Bhaji",
      nonVeg: "Chicken Kheema",
      salad: "Onion & Tomato",
      chutney: "Mint Chutney",
      mukhwas: "Ajwain Mix",
    },
    addOns: ["Grilled Vadapav", "Fried Papad", "Kokum Sharbat", "Gulab Jambun"],
    pickle: "Mango Pickle",
  },
  {
    image: "/images/days/friday-2.png",
    cuisine: "Punjabi",
    cuisineKey: "punjabi",
    grid: {
      bread: "Bhature",
      rice: "Veg Dum Biryani",
      side: "Mix Raita",
      veg: "Chole",
      nonVeg: "Chicken Dum Biryani",
      salad: "Laccha Onion",
      chutney: "Kahtti Mithi-dates & Tamrind",
      mukhwas: "Ajwain Mix",
    },
    addOns: ["Samosa", "Fried Papad", "Kesar Lassi", "Jalebi Rabri"],
    pickle: "Carrot Pickle",
  },
  {
    image: "/images/days/friday-3.png",
    cuisine: "Maharashtrian",
    cuisineKey: "maharashtrian",
    grid: {
      bread: "Pav",
      rice: "Masale Bhaat",
      side: "Mix Raita",
      veg: "Misal",
      nonVeg: "Tamda Rassa",
      salad: "Onion",
      chutney: "Garlic",
      mukhwas: "Ajwain Mix",
    },
    addOns: ["Batata Vada", "Fried Papad", "Solkadhi", "Shrikand"],
    pickle: "Raw Mango Pickle",
  },
  {
    image: "/images/days/friday-4.png",
    cuisine: "Tamilian",
    cuisineKey: "tamilian",
    grid: {
      bread: "Sambhar",
      rice: "Bisebilebath",
      side: "Mix Raita",
      veg: "Kanchipuram Idli",
      nonVeg: "Chicken Kothu Parotta",
      salad: "Tomato Onion Garlic Chutney",
      chutney: "Coconut Chutney",
      mukhwas: "Ajwain Mix",
    },
    addOns: ["Medu Vada", "Fried Papad", "Spiced Buttermilk", "Pinepale Sheera"],
    pickle: "Garlic Pickle",
  },
];

/** accent per cuisine, drawing on both the primary and secondary brand palettes */
export const CUISINE_TONE: Record<string, { chip: string; bar: string }> = {
  gujarati: { chip: "bg-brand-yellow/30 text-[#7a5a00]", bar: "bg-brand-yellow" },
  punjabi: { chip: "bg-brand-red/10 text-brand-red", bar: "bg-brand-red" },
  maharashtrian: { chip: "bg-brand-orange/15 text-brand-orange", bar: "bg-brand-orange" },
  malvani: { chip: "bg-brand-green/25 text-brand-green-dark", bar: "bg-brand-green" },
  andhra: { chip: "bg-brand-green-dark/10 text-brand-green-dark", bar: "bg-brand-green-dark" },
  kerala: { chip: "bg-brand-green/25 text-brand-green-dark", bar: "bg-brand-green" },
  rajasthani: { chip: "bg-brand-red/10 text-brand-red", bar: "bg-brand-red" },
  awadhi: { chip: "bg-brand-orange/15 text-brand-orange", bar: "bg-brand-orange" },
  tamilian: { chip: "bg-brand-yellow/30 text-[#7a5a00]", bar: "bg-brand-yellow" },
};

/** the grid rows, in the order the sheet lists them */
export const GRID_ROWS: { key: keyof MenuGrid; label: string }[] = [
  { key: "bread", label: "Indian bread" },
  { key: "rice", label: "Rice dish" },
  { key: "dal", label: "Dal / lentil" },
  { key: "side", label: "Side" },
  { key: "veg", label: "Veg option" },
  { key: "nonVeg", label: "Non-veg option" },
  { key: "salad", label: "Salad" },
  { key: "chutney", label: "Chutney" },
  { key: "mukhwas", label: "Mukhwas" },
];

/**
 * Which menu lands on a given date. Anchored to the sheet's own date (16 August 2026) so the
 * rotation is deterministic: Fridays draw from the Friday specials on a four-week cycle,
 * every other day steps through the 16-day rotation.
 */
const ANCHOR = Date.UTC(2026, 7, 16);

export function menuForDate(date: Date): {
  menu: MenuDay;
  isFriday: boolean;
  index: number;
} {
  const day = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const elapsed = Math.floor((day - ANCHOR) / 86400000);

  if (date.getDay() === 5) {
    const week =
      (((Math.floor(elapsed / 7) % FRIDAY_SPECIALS.length) + FRIDAY_SPECIALS.length) %
        FRIDAY_SPECIALS.length);
    return { menu: FRIDAY_SPECIALS[week], isFriday: true, index: week };
  }

  const index = ((elapsed % MENU_DAYS.length) + MENU_DAYS.length) % MENU_DAYS.length;
  return { menu: MENU_DAYS[index], isFriday: false, index };
}
