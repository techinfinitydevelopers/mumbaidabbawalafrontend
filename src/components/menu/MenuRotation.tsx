"use client";

import { useMemo, useState } from "react";
import MenuDayCard, { type Diet } from "@/components/menu/MenuDayCard";
import Reveal from "@/components/Reveal";
import VegMark from "@/components/VegMark";
import { FRIDAY_SPECIALS, MENU_DAYS, menuForDate, type MenuDay } from "@/data/menu";

/**
 * The rotation grid with its filter bar.
 *
 * `range` defaults to the whole rotation, which renders identically on server and client.
 * The week views need today's date, so they're only ever computed after a click — that keeps
 * the date out of the cached server shell (see components/TomorrowDate.tsx).
 */

type Range = "all" | "this" | "next";

type Slot = { day: MenuDay; label: string; featured?: boolean; badge?: string };

const RANGES: { id: Range; label: string }[] = [
  { id: "all", label: "Full rotation" },
  { id: "this", label: "This week" },
  { id: "next", label: "Next week" },
];

const DIETS: { id: Diet; label: string; mark?: "veg" | "nonveg" }[] = [
  { id: "all", label: "All" },
  { id: "veg", label: "Veg", mark: "veg" },
  { id: "nonveg", label: "Non-Veg", mark: "nonveg" },
];

/** Mon–Fri of the week containing `from`, offset by whole weeks */
function weekSlots(weekOffset: number): Slot[] {
  const today = new Date();
  const monday = new Date(today);
  // getDay(): 0 = Sunday, so shift back to this week's Monday
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7) + weekOffset * 7);

  return Array.from({ length: 5 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const { menu, isFriday } = menuForDate(date);
    return {
      day: menu,
      label: date.toLocaleDateString("en-AU", { weekday: "short" }),
      badge: isFriday ? "Friday special" : undefined,
    };
  });
}

export default function MenuRotation() {
  const [cuisine, setCuisine] = useState("all");
  const [range, setRange] = useState<Range>("all");
  const [diet, setDiet] = useState<Diet>("all");

  const cuisines = useMemo(
    () => [...new Set([...MENU_DAYS, ...FRIDAY_SPECIALS].map((d) => d.cuisine))].sort(),
    []
  );

  const slots = useMemo<Slot[]>(() => {
    const base: Slot[] =
      range === "all"
        ? [
            { day: MENU_DAYS[0], label: "Tomorrow", featured: true, badge: "Next dabba" },
            ...MENU_DAYS.slice(1).map((day, i) => ({
              day,
              label: `Day ${String(i + 2).padStart(2, "0")}`,
            })),
            ...FRIDAY_SPECIALS.map((day, i) => ({
              day,
              label: `Friday ${i + 1}`,
              badge: "Friday special",
            })),
          ]
        : weekSlots(range === "next" ? 1 : 0);

    return cuisine === "all" ? base : base.filter((slot) => slot.day.cuisine === cuisine);
  }, [range, cuisine]);

  return (
    <div>
      {/* ── Filter bar ── */}
      <div className="no-print mt-8 flex flex-wrap items-center gap-3 rounded-[26px] border border-brand-red/10 bg-brand-red/5 p-3 sm:gap-4 sm:p-4">
        <label className="relative">
          <span className="sr-only">Filter by cuisine</span>
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="appearance-none rounded-[15px] border border-brand-red/15 bg-paper py-3 pl-5 pr-11 text-sm font-semibold text-ink shadow-sm outline-none transition-colors hover:border-brand-green focus-visible:border-brand-green"
          >
            <option value="all">All cuisines</option>
            {cuisines.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/60"
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </label>

        <div className="flex rounded-[15px] border border-brand-red/15 bg-paper p-1 shadow-sm">
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRange(r.id)}
              aria-pressed={range === r.id}
              className={`rounded-[11px] px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
                range === r.id
                  ? "bg-brand-red text-brand-cream"
                  : "text-ink/70 hover:text-brand-red"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex rounded-[15px] border border-brand-red/15 bg-paper p-1 shadow-sm">
          {DIETS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDiet(d.id)}
              aria-pressed={diet === d.id}
              className={`flex items-center gap-2 rounded-[11px] px-4 py-2 text-sm font-semibold transition-colors ${
                diet === d.id ? "bg-brand-cream text-brand-red" : "text-ink/70 hover:text-brand-red"
              }`}
            >
              {/* only a single-diet chip carries the mark; "All" makes no claim to mark */}
              {d.mark && <VegMark type={d.mark} className="h-3.5 w-3.5" />}
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      {slots.length === 0 ? (
        <p className="mt-10 rounded-[26px] border border-brand-red/10 bg-paper p-8 text-center text-sm text-ink/70">
          No {cuisine} days in this stretch of the rotation — try “Full rotation”.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5">
          {/* five across at xl: 20 cards fall into 4 clean rows, and a week view is one row */}
          {slots.map((slot, i) => (
            <Reveal key={`${slot.day.image}-${slot.label}`} delay={Math.min(i * 50, 400)} className="h-full">
              <MenuDayCard
                day={slot.day}
                label={slot.label}
                featured={slot.featured}
                badge={slot.badge}
                diet={diet}
              />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
