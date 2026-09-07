import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import Starburst from "@/components/poster/Starburst";
import RouteTicker from "@/components/poster/RouteTicker";
import RegionRail from "@/components/regional/RegionRail";
import WaveDivider from "@/components/poster/WaveDivider";

export const metadata: Metadata = {
  title: "Regional Food Stories — Mumbai Dabbawala",
  description:
    "Every region has a story. Every story tastes like something. Explore the five cuisines behind the Mumbai Dabbawala 15-day menu.",
};

export default function RegionalFoodStoriesPage() {
  return (
    <div className="overflow-x-hidden">
      <PageHero
        kicker="Five cuisines, one dabba"
        titleTop="Every Region"
        titleBottom="Has a Story"
        facts={[
          { value: "135+", label: "Years never\nmissing lunch" },
          { value: "5", label: "Regional\ncuisines" },
          { value: "15", label: "Day menu\nrotation" },
        ]}
        quote={{
          name: "Priya — Parramatta",
          text: "“Feels exactly like the tiffin my mum used to pack. Never late, never wrong order.”",
        }}
        primary={{ href: "/plans", label: "Order Now" }}
        secondary={{ href: "/menu", label: "Explore More" }}
        seal={{ eyebrow: "Always", lines: ["Free", "Delivery"], script: "every dabba" }}
      />

      {/* ───── Auto-scrolling region rail ───── */}
      <section className="relative bg-paper pb-24 pt-2 sm:pb-32">
        <Reveal className="mx-auto max-w-7xl px-5 text-center sm:px-8">
          <p className="font-script text-3xl text-brand-orange">Five cuisines, all on rotation</p>
          <h2 className="poster-stack mx-auto mt-3 max-w-4xl [--po:4px] sm:[--po:6px]">
            <span
              className="poster whitespace-nowrap text-[34px] text-brand-red sm:text-[58px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              Every Story Tastes
            </span>
            <span
              className="poster whitespace-nowrap text-[34px] text-brand-green-dark sm:text-[58px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              Like Something
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink/70 sm:text-base">
            A dabba isn&rsquo;t a delivery. It&rsquo;s a mother&rsquo;s recipe, carried state
            by state, kitchen by kitchen — five distinct cuisines across the 15-day menu.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-14">
          <RegionRail />
        </Reveal>

      </section>

      {/* ───── Closing CTA, styled after the "SOME TRADITIONS TRAVEL WELL" poster ───── */}
      <section className="grain graph-paper-light relative overflow-hidden bg-brand-red pb-14 pt-28 sm:pb-16">
        <WaveDivider tone="bg-paper" />

        <Reveal className="relative z-20 mx-auto max-w-3xl px-5 text-center sm:px-8">
          {/* the seal sits just above the word "Taste", not floating centred over the block */}
          <div className="relative pt-[92px] sm:pt-[106px]">
            <Starburst
              className="absolute left-[28%] top-0 z-30 h-[84px] w-[84px] -translate-x-1/2 sm:left-[34%] sm:h-[96px] sm:w-[96px]"
              fill="var(--color-brand-orange)"
            >
              <div>
                <span className="block font-poster text-base leading-none text-brand-yellow sm:text-lg">
                  1890
                </span>
                <span className="block text-[9px] font-bold tracking-[0.2em] text-brand-cream">
                  ↓
                </span>
                <span className="block font-poster text-base leading-none text-brand-yellow sm:text-lg">
                  2026
                </span>
              </div>
            </Starburst>

            <h2 className="poster-stack [--po:4px] sm:[--po:6px]">
              <span
                className="poster text-[46px] text-brand-yellow sm:text-[68px]"
                style={{ ["--po-color" as string]: "rgba(42,24,16,0.85)" }}
              >
                Taste All Five
              </span>
              <span
                className="poster text-[46px] text-brand-green sm:text-[68px]"
                style={{ ["--po-color" as string]: "rgba(42,24,16,0.6)" }}
              >
                Regions
              </span>
            </h2>
          </div>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-brand-cream/85 sm:text-base">
            Rotating dishes across the 15-day menu — real variety, never the same thing twice
            in a row.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/menu"
              className="rounded-full bg-brand-yellow px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-red shadow-[0_16px_30px_-14px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore Regional Menus
            </Link>
            <Link
              href="/plans"
              className="rounded-full border-2 border-brand-cream/50 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-cream transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-cream/10"
            >
              Order Your Dabba
            </Link>
          </div>

          <RouteTicker className="mx-auto mt-10 max-w-sm text-brand-cream" />
        </Reveal>
      </section>
    </div>
  );
}
