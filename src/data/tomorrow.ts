import { TIN_SLOTS, type Piece } from "@/components/regional/HeroPlatter";
import { MENU_DAYS, type MenuDay } from "@/data/menu";

/**
 * Tomorrow's dabba.
 *
 * The rotation itself lives in `menu.ts` (generated from the client's spreadsheet). The
 * *displayed* day has to be resolved on the client, because this Next build caches the
 * server shell and a server-picked day would freeze — see `components/TomorrowDate.tsx`.
 * `MENU_DAYS[0]` is the build-time fallback and what the menu page features.
 */

/** allergen guesses per ingredient keyword — the sheet doesn't carry allergen columns yet */
const ALLERGEN_HINTS: { match: RegExp; tag: string }[] = [
  { match: /paneer|dahi|curd|raita|chaas|lassi|makhani|butter|malai|kheer|halwa|rabri|shrikand|payasam|phirni|kadhi/i, tag: "Dairy" },
  { match: /roti|paratha|phulka|thepla|naan|bhature|pav|puri|kachori|vada|samosa|bhakri|khakhra|jalebi/i, tag: "Gluten" },
  { match: /peanut|shengdanya|badam|kaju|pista|nut|churma|ladoo|halwa|sheera/i, tag: "Nuts" },
  { match: /mustard|sarson|rai|thecha|achaar|pickle|lonche|athanu|chhundo|chunda/i, tag: "Mustard" },
  { match: /til|sesame|khichiya/i, tag: "Sesame" },
];

/** every dish in the dabba, in the order the sheet lists them */
export function dishesFor(day: MenuDay) {
  const grid = day.grid;
  const rows: { name: string; role: string }[] = [
    { name: grid.bread, role: "Indian bread" },
    { name: grid.rice, role: "Rice dish" },
    { name: grid.dal ?? grid.side ?? "", role: grid.dal ? "Dal / lentil" : "Side" },
    { name: grid.veg, role: "Veg option" },
    { name: grid.nonVeg, role: "Non-veg option" },
    { name: grid.salad, role: "Salad" },
    { name: grid.chutney, role: "Chutney" },
    { name: grid.mukhwas, role: "Mukhwas" },
  ];
  return rows.filter((row) => row.name);
}

/** allergens across a day's dabba, derived from the dish names */
export function allergensFor(day: MenuDay) {
  const text = [...dishesFor(day).map((d) => d.name), day.pickle, ...day.addOns].join(" ");
  return ALLERGEN_HINTS.filter((hint) => hint.match.test(text)).map((hint) => hint.tag);
}

/** the hero's container ring, filled with a day's five headline dishes */
export function tinsFor(day: MenuDay): Piece[] {
  const sources = [
    "/images/items/tin-dal-tadka.ef55563d.png",
    "/images/items/tin-chole.359a3cf0.png",
    "/images/items/tin-jeera-rice.5eb76e1f.png",
    "/images/items/tin-paratha-tomorrow.cf114616.png",
    day.image,
  ];
  const names = [
    day.grid.dal ?? day.grid.side ?? "",
    day.grid.nonVeg,
    day.grid.rice,
    day.grid.salad,
    day.grid.veg,
  ];
  return sources.map((src, i) => ({
    src,
    alt: `A dabba container of ${names[i]}`,
    ...TIN_SLOTS[i],
  }));
}

/** build-time default: the same day the menu page features */
export const DEFAULT_DAY = MENU_DAYS[0];
export const TOMORROW_TINS = tinsFor(DEFAULT_DAY);
