import Button from "@/components/Button";
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
      <section className="relative bg-paper pb-phi-6 pt-2 sm:pb-phi-7">
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
          <p className="mx-auto mt-5 max-w-measure text-phi-2 leading-relaxed text-ink/70">
            A dabba isn&rsquo;t a delivery. It&rsquo;s a mother&rsquo;s recipe, carried state
            by state, kitchen by kitchen — five distinct cuisines across the 15-day menu.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-14">
          <RegionRail />
        </Reveal>

      </section>

      {/* ───── Closing CTA, styled after the "SOME TRADITIONS TRAVEL WELL" poster ───── */}
      <section className="grain graph-paper-light relative overflow-hidden bg-brand-red pb-phi-5 pt-phi-7 sm:pt-phi-8 sm:pb-phi-5">
        {/* untextured: the section above is plain `bg-paper` with no print, so carrying
            the grid through the curve put an isolated patch of it inside the 150px band
            and drew a hard horizontal edge along the band's top. `WaveDivider`'s own doc
            warns about exactly this - textured is only right when the section above is
            printed too. */}
        <WaveDivider tone="bg-paper" textured={false} />

        <Reveal className="relative z-20 mx-auto max-w-3xl px-5 text-center sm:px-8">
          {/* The seal tucks in BEHIND the word "Taste" at a tilt, rather than sitting clear
              above the block.
              Two things make that work: `z-0` here against `z-10` on the `h2`, so the
              letters cross over the seal's lower edge; and a `pt` sized so only that lower
              third is covered — the seal's own "1890 → 2026" stays readable above the
              letters. `poster-stack` gives its own children z-indexes (4/3/2), which order
              them against each other and not against anything outside, so the `h2` needs
              its own. */}
          <div className="relative pt-[74px] sm:pt-[84px]">
            <Starburst
              className="absolute left-[26%] top-[18px] z-0 h-[92px] w-[92px] -translate-x-1/2 -rotate-12 sm:left-[31%] sm:top-[20px] sm:h-[108px] sm:w-[108px]"
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

            <h2 className="poster-stack relative z-10 [--po:4px] sm:[--po:6px]">
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

          <p className="mx-auto mt-5 max-w-measure text-phi-2 leading-relaxed text-brand-cream/85">
            Rotating dishes across the 15-day menu — real variety, never the same thing twice
            in a row.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/menu" variant="yellow" size="lg">
              Explore Regional Menus
            </Button>
            <Button href="/plans" variant="outlineCream" size="lg">
              Order Your Dabba
            </Button>
          </div>

          <RouteTicker className="mx-auto mt-10 max-w-sm text-brand-cream" />
        </Reveal>
      </section>
    </div>
  );
}
