import Image from "next/image";
import Link from "next/link";
import { CUISINE_TONE, type MenuDay } from "@/data/menu";

/**
 * One day of the rotation, in the reference's day-card shape: label and cuisine on top,
 * the dish photo in the middle, the dish name underneath.
 *
 * The `featured` card is the next dabba out of the kitchen, so it's inverted into brand red
 * and links through to the What's Cooking Tomorrow page.
 */
export type Diet = "all" | "veg" | "nonveg";

export default function MenuDayCard({
  day,
  label,
  featured = false,
  badge,
  diet = "all",
}: {
  day: MenuDay;
  /** "Day 01", "Friday 2" — whatever the rotation calls this slot */
  label: string;
  featured?: boolean;
  badge?: string;
  /** which main the card leads with; every day carries both */
  diet?: Diet;
}) {
  const headline = diet === "nonveg" ? day.grid.nonVeg : day.grid.veg;
  const secondary = diet === "nonveg" ? day.grid.veg : day.grid.nonVeg;
  const tone = CUISINE_TONE[day.cuisineKey] ?? CUISINE_TONE.punjabi;

  const card = (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[26px] border transition-all duration-500 hover:-translate-y-1.5 ${
        featured
          ? "border-brand-red bg-brand-red shadow-[0_24px_44px_-22px_rgba(175,20,17,0.75)]"
          : // the green edge is the hover cue on ordinary days; the featured card keeps its red
            "border-brand-red/12 bg-paper shadow-[0_16px_32px_-24px_rgba(42,24,16,0.55)] hover:border-brand-green hover:shadow-[0_20px_38px_-22px_rgba(44,73,15,0.5)]"
      }`}
    >
      <div className="flex flex-col items-start gap-1 px-3.5 pt-3 sm:flex-row sm:items-start sm:justify-between sm:gap-2 sm:px-5 sm:pt-4">
        <span
          className={`font-poster text-base uppercase leading-none sm:text-xl ${
            featured ? "text-brand-yellow" : "text-brand-red"
          }`}
        >
          {label}
        </span>
        <span
          className={`max-w-full truncate rounded-full px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-[0.1em] sm:px-2.5 sm:py-1 sm:text-[9.5px] sm:tracking-[0.12em] ${
            featured ? "bg-brand-cream/20 text-brand-cream" : tone.chip
          }`}
        >
          {day.cuisine}
        </span>
      </div>

      <div className="relative mt-2 aspect-[5/4]">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-2xl"
          style={{
            background: featured
              ? "radial-gradient(circle, rgba(255,218,45,0.4) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(243,98,32,0.28) 0%, rgba(255,218,45,0.16) 45%, transparent 72%)",
          }}
        />
        <Image
          src={day.image}
          alt={headline}
          width={800}
          height={800}
          sizes="(min-width: 1280px) 20vw, (min-width: 640px) 40vw, 80vw"
          className="absolute left-1/2 top-1/2 h-auto w-[74%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_14px_18px_rgba(42,24,16,0.3)] transition-transform duration-500 group-hover:scale-107"
        />
        {badge && (
          <span className="absolute bottom-1 left-2.5 grid h-11 w-11 place-items-center rounded-full bg-brand-green-dark p-1 text-center text-[7px] font-bold uppercase leading-[1.15] tracking-[0.04em] text-brand-cream sm:left-4 sm:h-[52px] sm:w-[52px] sm:p-0 sm:text-[8px] sm:tracking-[0.06em]">
            {badge}
          </span>
        )}
      </div>

      <div
        className={`mt-auto border-t px-3.5 py-3 sm:px-5 sm:py-4 ${
          featured ? "border-brand-cream/20" : "border-brand-red/10"
        }`}
      >
        <h3
          className={`font-display text-[13px] font-bold leading-tight sm:text-[15px] ${
            featured ? "text-brand-cream" : "text-ink"
          }`}
        >
          {headline}
        </h3>
        <p
          className={`mt-1 text-[11px] leading-snug sm:text-[12px] ${
            featured ? "text-brand-cream/75" : "text-ink/60"
          }`}
        >
          {diet === "all" ? `${day.grid.bread} · ${day.grid.rice}` : `or ${secondary}`}
        </p>

        {featured && (
          <p className="mt-2.5 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-brand-yellow sm:mt-3 sm:text-[10px] sm:tracking-[0.16em]">
            See tomorrow&rsquo;s dabba
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
        )}
      </div>
    </article>
  );

  if (!featured) return card;

  return (
    <Link
      href="/whats-cooking-tomorrow"
      aria-label={`Tomorrow: ${headline} — see the full dabba`}
      className="block h-full rounded-[26px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
    >
      {card}
    </Link>
  );
}
