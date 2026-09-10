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
      <section className="grain graph-paper relative overflow-hidden bg-brand-cream pb-phi-5 pt-24 sm:pb-phi-5">
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

              `left-[80%]` and `top-[42px]` are the client's own numbers, and from `sm` up
              they land where they should: the seal sits past the end of "Taste All Five",
              only its rim crossing the final letters, and its label clear of them by a few
              pixels.

              Mobile cannot take the same `top`. The heading nearly fills the width there
              (the first line spans 68..322 of a 350px box), so 80% falls INSIDE the text
              rather than past it, and at `top-[42px]` all three of the seal's labels
              measured 34px behind the letters — the "2026 disappeared" problem again. So
              mobile keeps the seal just above the line instead: `top-[6px]` against
              `pt-[112px]`, which clears it by 5px.

              Both numbers are arithmetic, not taste. A rotated square's box is bigger than
              the square: at 92px and -12deg it measures 109px and hangs 8.5px past each
              edge, so a `top` of 6 puts the rect's bottom at 106.5 and the padding has to
              beat that. It is also why `getBoundingClientRect().top` reads 10px lower than
              the `top` you set at `sm`. */}
          <div className="relative pt-[112px] sm:pt-[102px]">
            <Starburst
              className="absolute left-[80%] top-[6px] z-0 h-[92px] w-[92px] -translate-x-1/2 -rotate-12 sm:top-[42px] sm:h-[108px] sm:w-[108px]"
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
                className="poster text-[46px] text-brand-red sm:text-[68px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                Taste All Five
              </span>
              <span
                className="poster text-[46px] text-brand-green-dark sm:text-[68px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                Regions
              </span>
            </h2>
          </div>

          <p className="mx-auto mt-5 max-w-measure text-phi-2 leading-relaxed text-ink/70">
            Rotating dishes across the 15-day menu — real variety, never the same thing twice
            in a row.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/menu" variant="orange" size="lg">
              Explore Regional Menus
            </Button>
            <Button href="/plans" variant="paper" size="lg">
              Order Your Dabba
            </Button>
          </div>

          <RouteTicker className="mx-auto mt-10 max-w-sm text-ink/70" />
        </Reveal>
      </section>
    </div>
  );
}
