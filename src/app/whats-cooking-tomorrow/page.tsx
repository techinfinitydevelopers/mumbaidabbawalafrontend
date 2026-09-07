import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import TomorrowDate from "@/components/TomorrowDate";
import AddonSlider from "@/components/AddonSlider";
import WaveDivider from "@/components/poster/WaveDivider";
import VegMark from "@/components/VegMark";
import { ADDONS } from "@/data/addons";
import { DEFAULT_DAY, allergensFor, dishesFor, TOMORROW_TINS } from "@/data/tomorrow";

export const metadata: Metadata = {
  title: "What's Cooking Tomorrow — Mumbai Dabbawala",
  description:
    "Tomorrow's lunch, tonight's excitement. See exactly what's in tomorrow's dabba, add what you like, and order by 9:00 PM.",
};

const DISHES = dishesFor(DEFAULT_DAY);
const ALLERGENS = allergensFor(DEFAULT_DAY);

export default function WhatsCookingTomorrowPage() {
  return (
    <div className="overflow-x-hidden">
      <PageHero
        kicker="Tomorrow's lunch, tonight's excitement"
        titleTop="What's Cooking"
        titleBottom="Tomorrow"
        facts={[
          { value: "9PM", label: "Tonight's\norder cut-off" },
          { value: String(DISHES.length), label: "Dishes in\ntomorrow's dabba" },
          { value: DEFAULT_DAY.cuisine.split(" ")[0], label: "Regional\nthali" },
        ]}
        lead="There's something genuinely nice about knowing what you're eating tomorrow — especially when it's this good."
        primary={{ href: "/plans", label: "Order Tomorrow's Dabba" }}
        secondary={{ href: "/menu", label: "See the Full Rotation" }}
        seal={{ eyebrow: "Order by", lines: ["9:00", "PM"], script: "tonight" }}
        tins={TOMORROW_TINS}
      />

      {/* ───── Tomorrow's thali, in full ───── */}
      <section className="relative flex min-h-[100svh] flex-col justify-center bg-paper pb-phi-5 pt-phi-3 sm:pb-phi-6">
        <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-red">
                <TomorrowDate /> · {DEFAULT_DAY.cuisine}
              </p>
              <h2 className="poster mt-2 text-[34px] text-brand-red [--po:4px] sm:text-[54px] sm:[--po:5px]">
                Tomorrow&rsquo;s Thali
              </h2>
            </div>
            <Link
              href="/menu"
              className="rounded-full bg-brand-orange px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-cream transition-transform duration-300 hover:-translate-y-0.5"
            >
              Full Menu
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_1fr]">
            {/* Feature photo — absolutely filled, so the breakdown column sets the row
                height and the two sides always match */}
            <Reveal className="h-full">
              <figure className="relative h-full min-h-[360px] overflow-hidden rounded-[32px] bg-ink shadow-[0_26px_50px_-28px_rgba(42,24,16,0.7)]">
                <Image
                  src="/images/thali-tomorrow.jpg"
                  alt={`Tomorrow's ${DEFAULT_DAY.cuisine} thali`}
                  width={1200}
                  height={1500}
                  sizes="(min-width: 1024px) 50vw, 92vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-[22px] bg-paper/95 p-5 backdrop-blur-sm sm:inset-x-6 sm:bottom-6">
                  <div>
                    <p className="font-display text-xl font-bold leading-tight text-ink sm:text-2xl">
                      {DEFAULT_DAY.cuisine} Thali
                    </p>
                    <p className="mt-1 text-phi-1 text-ink/65">
                      {DEFAULT_DAY.grid.veg} · {DEFAULT_DAY.grid.bread}
                    </p>
                  </div>
                  <span className="flex shrink-0 items-center gap-2 rounded-full bg-brand-green/20 px-3.5 py-2 text-phi-0 font-bold uppercase tracking-[0.16em] text-brand-green-dark">
                    Veg or non-veg
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            {/* Breakdown + allergens */}
            <div className="flex flex-col gap-5">
              <Reveal delay={90}>
                <div className="h-full rounded-[32px] border border-brand-red/10 bg-paper p-5 shadow-[0_18px_36px_-26px_rgba(42,24,16,0.55)] sm:p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-green-dark">
                    Thali breakdown
                  </p>

                  <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {DISHES.map((dish) => (
                      <li key={dish.role} className="flex items-baseline gap-2.5">
                        {dish.role === "Veg option" || dish.role === "Non-veg option" ? (
                          <VegMark
                            type={dish.role === "Veg option" ? "veg" : "nonveg"}
                            className="mt-0.5 h-3.5 w-3.5"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red"
                          />
                        )}
                        <span className="min-w-0">
                          <span className="block text-[9.5px] font-bold uppercase tracking-[0.14em] text-ink/45">
                            {dish.role}
                          </span>
                          <span className="block font-display text-[14px] font-bold leading-tight text-ink">
                            {dish.name}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  {DEFAULT_DAY.pickle && (
                    <p className="mt-4 border-t border-brand-red/10 pt-3 text-[12px] text-ink/65">
                      <span className="font-bold uppercase tracking-[0.14em] text-ink/45">
                        Pickle ·{" "}
                      </span>
                      {DEFAULT_DAY.pickle}
                    </p>
                  )}
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="h-full rounded-[32px] border border-brand-red/10 bg-paper p-5 shadow-[0_18px_36px_-26px_rgba(42,24,16,0.55)] sm:p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-green-dark">
                    Allergen safety
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {ALLERGENS.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-brand-red/15 bg-brand-cream px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-ink/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 flex items-start gap-2.5 rounded-2xl bg-brand-red/8 p-4 text-[12px] font-bold uppercase leading-relaxed tracking-[0.1em] text-brand-red">
                    <span aria-hidden="true">⚠</span>
                    This thali contains: {ALLERGENS.join(", ")}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Add-ons ───── */}
      <section className="grain graph-paper relative overflow-hidden bg-brand-cream pb-phi-6 pt-phi-6 sm:pb-phi-6">
        <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-red">
              Make it yours
            </p>
            <h2 className="poster mt-2 text-[34px] text-brand-red [--po:4px] sm:text-[54px] sm:[--po:5px]">
              Add-ons
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70">
              Top up any day&rsquo;s thali with a real extra — priced individually, on top of
              your plan.
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <AddonSlider items={ADDONS} />
          </Reveal>

          {DEFAULT_DAY.addOns.length > 0 && (
            <Reveal className="mt-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-green-dark">
                Also available tomorrow
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {DEFAULT_DAY.addOns.map((extra) => (
                  <span
                    key={extra}
                    className="rounded-full border border-brand-red/15 bg-paper px-4 py-2 text-[12px] font-semibold text-ink/75"
                  >
                    {extra}
                  </span>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ───── From the kitchen ───── */}
      <section className="grain graph-paper-light relative overflow-hidden bg-brand-red pb-phi-6 pt-phi-7 sm:pt-phi-8 sm:pb-phi-6">
        <WaveDivider tone="bg-brand-cream" />

        <Reveal className="relative z-20 mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="font-script text-3xl text-brand-yellow">From the kitchen</p>
          <p className="mt-4 font-display text-xl leading-relaxed text-brand-cream sm:text-2xl">
            &ldquo;Spices go in stages, never all at once — it&rsquo;s how the flavour holds
            up on the journey.&rdquo;
          </p>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-cream/80">
            — Chef, Mumbai Dabbawala kitchen
          </p>

          <Link
            href="/plans"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-red shadow-[0_16px_30px_-14px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Order Tomorrow&rsquo;s Dabba
          </Link>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-cream/75">
            Order by tonight, 9:00 PM
          </p>
        </Reveal>
      </section>
    </div>
  );
}
