import type { Metadata } from "next";
import Button from "@/components/Button";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import JourneyTimeline from "@/components/journey/JourneyTimeline";
import Reveal from "@/components/Reveal";
import StandFor from "@/components/StandFor";
import RouteTicker from "@/components/poster/RouteTicker";
import Starburst from "@/components/poster/Starburst";
import WaveDivider from "@/components/poster/WaveDivider";

export const metadata: Metadata = {
  title: "About Us — Mumbai Dabbawala",
  description:
    "Six generations of dabbawalas carried lunch across Mumbai. Now the same tiffin crosses an ocean to Perth. 135+ years, from 1890 to 2026.",
};

/**
 * The gallery's tiling. Five columns, so the spans must sum to a multiple of five:
 * 4 + 2 + 1 + 1 + 2 + (5 x 1) = 15, i.e. three full rows for ten frames.
 * Declared in placement order — plain row flow packs it with no holes.
 */
const GALLERY = [
  { n: "01", span: "lg:col-span-2 lg:row-span-2" },
  { n: "02", span: "lg:col-span-2" },
  { n: "03", span: "" },
  { n: "04", span: "" },
  { n: "05", span: "lg:col-span-2" },
  { n: "06", span: "" },
  { n: "07", span: "" },
  { n: "08", span: "" },
  { n: "09", span: "" },
  { n: "10", span: "" },
];


export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      <PageHero
        kicker="1890 → 2026 · Some Traditions Travel Well"
        titleTop="Mumbai To Perth"
        titleBottom="Carried By Hand"
        facts={[
          { value: "135+", label: "Years of\npractice" },
          { value: "200k", label: "Daily Mumbai\ndeliveries" },
          { value: "5", label: "Regional\ncuisines" },
        ]}
        quote={{
          name: "Six Generations Of Punctuality",
          text: "“Six generations of dabbawalas carried lunch across Mumbai. Now the same tiffin crosses an ocean to bring homestyle tiffins to Western Australia.”",
        }}
        primary={{ href: "#journey", label: "Follow The Flight" }}
        secondary={{ href: "/chefs-corner", label: "Meet The Chefs" }}
        seal={{ eyebrow: "Cooked", lines: ["Fresh", "Daily"], script: "never reheated" }}
      />

      <JourneyTimeline />

      {/* ───── 135+ years — the About lead from the content doc ───── */}
      <section className="relative bg-paper pb-phi-6 pt-phi-5">
        <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-phi-4 lg:grid-cols-[1.618fr_1fr] lg:items-center">
            <Reveal>
              <p className="font-script text-3xl text-brand-orange">Studied for a reason</p>
              <h2 className="poster-stack mt-2 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
                <span
                  className="poster text-[26px] text-brand-red sm:text-[42px]"
                  style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
                >
                  135+ Years. Studied,
                </span>
                <span
                  className="poster text-[26px] text-brand-green-dark sm:text-[42px]"
                  style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
                >
                  Respected, Still Delivering.
                </span>
              </h2>
              <p className="mt-5 max-w-measure text-phi-2 leading-relaxed text-ink/70">
                The Mumbai Dabbawala system has been studied by institutions including
                Harvard Business School, for a level of reliability that&rsquo;s rare in any
                industry, anywhere in the world. We don&rsquo;t lead with the numbers — we
                lead with what they represent: a promise, kept, for well over a century.
              </p>
              <Button href="#journey" variant="red" size="lg" className="mt-8">
                Our Story
              </Button>
            </Reveal>

            {/* This column used to restate 1890 -> 2026, which the journey timeline
                directly above already tells in full — so it had nothing of its own to
                say and read as an empty slab. A photograph of the actual network does
                the job the heading needs: studied and respected, by people. */}
            <Reveal delay={120} className="lg:self-start">
              <figure className="relative mx-auto max-w-[460px] lg:mx-0">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_18px_44px_-24px_rgba(42,24,16,0.5)]">
                  <Image
                    src="/images/about/net-02.jpg"
                    alt="A dabbawala carrying a crate of tiffins along a Mumbai station platform"
                    fill
                    sizes="(min-width: 1024px) 420px, 90vw"
                    className="object-cover"
                  />
                </div>

                <Starburst
                  className="absolute -left-2 -top-3 h-[88px] w-[88px] rotate-[-8deg] sm:-left-5 sm:-top-5 sm:h-[104px] sm:w-[104px]"
                  fill="var(--color-brand-orange)"
                >
                  <div>
                    <span className="block font-poster text-sm leading-none text-brand-cream">
                      SINCE
                    </span>
                    <span className="block font-poster text-2xl leading-none text-brand-yellow">
                      1890
                    </span>
                  </div>
                </Starburst>

                <figcaption className="mt-phi-2 text-phi-0 font-bold uppercase tracking-[0.18em] text-ink/50">
                  Mumbai · the daily run
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <StandFor />

      {/* ───── Life of a Dabbawala ───── */}
      <section className="relative bg-paper pb-phi-6 pt-phi-5 sm:pb-phi-7">
        <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-script text-3xl text-brand-orange">Life of a dabbawala</p>
            <h2 className="poster-stack mt-2 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
              <span
                className="poster text-[28px] text-brand-red sm:text-[44px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                The People Behind
              </span>
              <span
                className="poster text-[28px] text-brand-green-dark sm:text-[44px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                Every Dabba.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-measure text-phi-2 leading-relaxed text-ink/70">
              Long before an app or a delivery van, it was a person — carrying, sorting,
              delivering, without fail, day after day. This gallery isn&rsquo;t about
              logistics. It&rsquo;s about the people who&rsquo;ve made &ldquo;on time, every
              time&rdquo; a promise kept for 135 years — their mornings, their routines, their
              quiet pride in a job most people never think twice about.
            </p>
          </Reveal>

          {/* Bento that actually tiles. Five columns give 5 cells a row, so the spans
              have to sum to a multiple of 5 or the last row ends in holes — which is
              what a 2x2 lead plus nine singles did (area 13, needing 15). One 2x2,
              two 2x1 and seven 1x1 is area 15 exactly: three full rows, no gaps.
              Below lg every frame is 1x1 in two columns, which tiles on its own. */}
          <div
            id="dabbawala-gallery"
            className="mt-phi-5 grid grid-cols-2 gap-3 sm:mt-phi-6 sm:gap-4 lg:grid-cols-5"
          >
            {GALLERY.map(({ n, span }, i) => (
              <Reveal key={n} delay={i * 50} className={span}>
                <div
                  className={`relative h-full overflow-hidden rounded-[24px] shadow-[0_10px_30px_-20px_rgba(42,24,16,0.45)] ${
                    span ? "aspect-[3/4] lg:aspect-auto" : "aspect-[3/4] lg:aspect-square"
                  }`}
                >
                  <Image
                    src={`/images/about/net-${n}.jpg`}
                    alt="A Mumbai dabbawala at work"
                    fill
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Perth, 2026 ───── */}
      <section className="grain graph-paper relative overflow-hidden bg-brand-cream pb-phi-6 pt-40">
        {/* `bg-paper`, because that is the section above. The wave paints whatever sits
            above it curving down — a red one here read as a stripe from nowhere, since
            nothing above this section is red. It only works on
            `whats-cooking-tomorrow`, where the Add-ons band above genuinely is red.

            The cost is that paper over cream is ~3% apart in luminance, so the curve is
            faint. Making it read means changing what sits above, not what the wave is
            painted with. */}
        <WaveDivider tone="bg-paper" textured={false} />

        <Reveal className="relative z-20 mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="font-script text-3xl text-brand-orange">Across the ocean · 2026</p>
          <h2 className="poster-stack mt-3 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
            <span
              className="poster text-[28px] text-brand-red sm:text-[44px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              The Dabba Lands
            </span>
            <span
              className="poster text-[28px] text-brand-green-dark sm:text-[44px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              In Perth.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-measure text-phi-2 leading-relaxed text-ink/70">
            The network steps beyond Indian shores for the first time — bringing daily
            homestyle tiffin service, five regional cuisines, and six generations of practice
            to the streets of Perth.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/plans" variant="orange" size="lg">
              Order Your Dabba
            </Button>
            <Button href="/menu" variant="paper" size="lg">
              See the Menu
            </Button>
          </div>

          <RouteTicker className="mx-auto mt-10 max-w-sm text-ink/70" />
        </Reveal>
      </section>
    </div>
  );
}
