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
              letters cross over the seal's lower edge; and a `pt` sized so ONLY the seal's
              spiky rim is covered, never its label. `poster-stack` gives its own children
              z-indexes (4/3/2), which order them against each other and not against
              anything outside, so the `h2` needs its own.

              The `pt` is arithmetic, not taste. The label block sits centred in the seal,
              so its bottom lands about `top + 0.75 × size`; the padding has to clear that.
              At `sm`: 12 + 0.75 × 108 = 93, and `pt-[102px]` leaves 9px under it. An
              earlier pass had the seal 8px lower against a smaller `pt`, which put the
              label's bottom 17px INSIDE the letters and swallowed "2026".

              `left` is arithmetic too. The heading is centred, so the glyphs start at a
              measured 23.3% of this box at `sm` and 13.7% on mobile, and the seal's own
              half-width is 7.7% and 15.6% of it. Wanting the rim to cross the "T" by about
              a third of the seal gives `centre = glyphStart − 0.4 × half`, and pulling it
              further left from there lands on 17% and 7%. Most of the seal sits in the
              clear space to the LEFT of the text rather than on top of it, with only its
              rim crossing the "T".

              There is a floor on how far left it can go: at `sm` a centre of 15% puts the
              seal's right edge 4px SHORT of the glyphs, and the overlap the whole effect
              depends on disappears. */}
          <div className="relative pt-[90px] sm:pt-[102px]">
            <Starburst
              className="absolute left-[7%] top-[10px] z-0 h-[92px] w-[92px] -translate-x-1/2 -rotate-12 sm:left-[17%] sm:top-[12px] sm:h-[108px] sm:w-[108px]"
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
