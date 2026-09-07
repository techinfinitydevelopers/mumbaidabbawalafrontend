import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import JourneyTimeline from "@/components/journey/JourneyTimeline";
import Reveal from "@/components/Reveal";
import RouteTicker from "@/components/poster/RouteTicker";
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

/**
 * The six words the content doc names, in its order.
 *
 * Tile grounds come from the primary palette only (red / cream / orange) — the brand
 * sheet reserves the secondary greens and yellow for icons and minimal accents, so
 * they appear on the glyphs and the poster shadow, never as a full ground.
 */
const VALUES: {
  word: string;
  icon: React.ReactNode;
  ground: string;
  text: string;
  glyph: string;
  shadow: string;
}[] = [
  {
    word: "Fresh",
    // sprout
    icon: (
      <>
        <path d="M12 20v-7" />
        <path d="M12 13c0-3.3-2.7-6-6-6 0 3.3 2.7 6 6 6Z" />
        <path d="M12 13c0-3.9 3.1-7 7-7 0 3.9-3.1 7-7 7Z" />
      </>
    ),
    ground: "bg-brand-red",
    text: "text-brand-cream",
    glyph: "text-brand-green",
    shadow: "rgba(42,24,16,0.55)",
  },
  {
    word: "Authentic",
    // stamp
    icon: (
      <>
        <path d="M4 20h16" />
        <path d="M6 16.5h12v-2H6v2Z" />
        <path d="M9.5 14.5c-1-2.6-2-3.6-2-5.5a4.5 4.5 0 0 1 9 0c0 1.9-1 2.9-2 5.5" />
      </>
    ),
    ground: "bg-brand-cream",
    text: "text-ink",
    glyph: "text-brand-green-dark",
    shadow: "var(--color-brand-yellow)",
  },
  {
    word: "Affordable",
    // price tag
    icon: (
      <>
        <path d="M13.5 3.5H20v6.5L10.5 19.5 4 13 13.5 3.5Z" />
        <circle cx="16.6" cy="7.4" r="1.3" />
      </>
    ),
    ground: "bg-brand-orange",
    text: "text-ink",
    glyph: "text-brand-green-dark",
    shadow: "var(--color-brand-yellow)",
  },
  {
    word: "Convenient",
    // clock
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3.5 2" />
      </>
    ),
    ground: "bg-brand-cream",
    text: "text-ink",
    glyph: "text-brand-green-dark",
    shadow: "var(--color-brand-yellow)",
  },
  {
    word: "Reliable",
    // shield with a tick
    icon: (
      <>
        <path d="M12 3.5l7 2.5v6c0 4-3 7-7 8.5-4-1.5-7-4.5-7-8.5V6l7-2.5Z" />
        <path d="M8.8 12.2l2.2 2.2 4.2-4.4" />
      </>
    ),
    ground: "bg-brand-red",
    text: "text-brand-cream",
    glyph: "text-brand-yellow",
    shadow: "rgba(42,24,16,0.55)",
  },
  {
    word: "Personal",
    // hand holding a tiffin
    icon: (
      <>
        <path d="M8.5 10.5V6.2A1.7 1.7 0 0 1 10.2 4.5h3.6a1.7 1.7 0 0 1 1.7 1.7v4.3" />
        <path d="M7 10.5h10v4H7v-4Z" />
        <path d="M4.5 17.5c2.5 2.5 6 3 7.5 3s5-.5 7.5-3" />
      </>
    ),
    ground: "bg-brand-orange",
    text: "text-ink",
    glyph: "text-brand-green-dark",
    shadow: "var(--color-brand-yellow)",
  },
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
              <a
                href="#journey"
                className="mt-8 inline-block rounded-full bg-brand-red px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-cream transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-orange"
              >
                Our Story
              </a>
            </Reveal>

            {/* A boarding pass rather than a plain box: two stubs either side of the
                site's dashed route rule, which is the motif the hero and the journey
                timeline already run on. The plane asset points nose-down unrotated,
                so it needs no transform on a vertical route. */}
            <Reveal delay={120} className="lg:self-start">
              <div className="grain graph-paper overflow-hidden rounded-[32px] border border-brand-red/12 bg-brand-cream shadow-[0_10px_30px_-20px_rgba(42,24,16,0.4)]">
                <div className="p-phi-3 text-center sm:p-phi-4">
                  <p className="text-phi-0 font-bold uppercase tracking-[0.22em] text-brand-red">
                    Departure
                  </p>
                  <p className="mt-1 font-poster text-[56px] leading-none text-brand-red sm:text-[72px]">
                    1890
                  </p>
                  <p className="mt-1 text-phi-0 font-bold uppercase tracking-[0.16em] text-ink/55">
                    The first delivery · Mumbai
                  </p>
                </div>

                {/* the perforation */}
                <div className="relative flex items-center gap-3 px-phi-3 text-brand-red/45 sm:px-phi-4">
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 -translate-x-1/2 rounded-full bg-paper"
                  />
                  <span className="ticker-rule" aria-hidden="true" />
                  <Image
                    src="/images/plane.webp"
                    alt=""
                    aria-hidden="true"
                    width={120}
                    height={120}
                    className="h-9 w-9 shrink-0 rotate-90 drop-shadow-[0_3px_5px_rgba(42,24,16,0.3)]"
                  />
                  <span className="ticker-rule" aria-hidden="true" />
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 translate-x-1/2 rounded-full bg-paper"
                  />
                </div>

                <div className="p-phi-3 text-center sm:p-phi-4">
                  <p className="text-phi-0 font-bold uppercase tracking-[0.22em] text-brand-green-dark">
                    Arrival
                  </p>
                  <p className="mt-1 font-poster text-[56px] leading-none text-brand-green-dark sm:text-[72px]">
                    2026
                  </p>
                  <p className="mt-1 text-phi-0 font-bold uppercase tracking-[0.16em] text-ink/55">
                    Perth · from 14 September
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───── What We Stand For ───── */}
      <section className="grain graph-paper relative overflow-hidden bg-brand-cream pb-phi-4 pt-phi-5 sm:pb-phi-5">
        <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-script text-3xl text-brand-orange">What we stand for</p>
            <h2 className="poster-stack mx-auto mt-2 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
              <span
                className="poster text-[30px] text-brand-red sm:text-[46px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                Six Words.
              </span>
              <span
                className="poster text-[30px] text-brand-green-dark sm:text-[46px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                One Promise.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-measure text-phi-2 leading-relaxed text-ink/70">
              We don&rsquo;t just deliver meals — we deliver on a set of values that
              don&rsquo;t change, no matter how big we get or how far from Mumbai we travel.
            </p>
          </Reveal>

          {/* The doc gives the six words and nothing else. Each tile makes its word the
              whole subject in poster type rather than propping it up with a made-up
              one-liner — colour, an icon and scale do the work the copy can't. */}
        </div>

        {/* One continuous line. `.rail` + `.rail-track` are the site's existing marquee
            (22s linear, paused on hover and on focus-within, and already switched off
            under prefers-reduced-motion). The track holds the six tiles twice because
            the keyframe travels -50%; the second set is aria-hidden so the values are
            not announced twice. It bleeds past the padded container on purpose — a
            marquee that stops at a margin reads as a broken row. */}
        <div className="rail relative mt-phi-4 overflow-hidden py-2 lg:mt-phi-3">
          <div className="rail-track flex gap-3 sm:gap-4">
            {[...VALUES, ...VALUES].map((value, i) => {
              const dup = i >= VALUES.length;
              return (
                <div
                  key={`${value.word}-${i}`}
                  aria-hidden={dup || undefined}
                  className={`flex min-h-[168px] w-[236px] shrink-0 flex-col justify-between overflow-hidden rounded-[28px] p-phi-3 shadow-[0_10px_30px_-20px_rgba(42,24,16,0.45)] sm:w-[268px] sm:p-phi-4 ${value.ground} ${value.text}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className={`shrink-0 ${value.glyph}`}
                    >
                      {value.icon}
                    </svg>
                    <span className="font-poster text-[22px] leading-none opacity-45">
                      {String((i % VALUES.length) + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <span
                    className="poster mt-phi-3 block text-[26px] leading-none [--po:3px] sm:text-[32px]"
                    style={{ ["--po-color" as string]: value.shadow }}
                  >
                    {value.word}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
          <Reveal delay={140} className="mt-phi-4 text-center lg:mt-phi-3">
            <p className="font-script text-3xl text-brand-red sm:text-4xl">Every single dabba.</p>
          </Reveal>
        </div>
      </section>

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
      <section className="grain graph-paper-light relative overflow-hidden bg-brand-red pb-phi-6 pt-phi-7 sm:pt-phi-8">
        <WaveDivider tone="bg-paper" textured={false} />

        <Reveal className="relative z-20 mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="font-script text-3xl text-brand-yellow">Across the ocean · 2026</p>
          <h2 className="poster-stack mt-3 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
            <span
              className="poster text-[28px] text-brand-yellow sm:text-[44px]"
              style={{ ["--po-color" as string]: "rgba(42,24,16,0.85)" }}
            >
              The Dabba Lands
            </span>
            <span
              className="poster text-[28px] text-brand-green sm:text-[44px]"
              style={{ ["--po-color" as string]: "rgba(42,24,16,0.6)" }}
            >
              In Perth.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-measure text-phi-2 leading-relaxed text-brand-cream/85">
            The network steps beyond Indian shores for the first time — bringing daily
            homestyle tiffin service, five regional cuisines, and six generations of practice
            to the streets of Perth.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/plans"
              className="rounded-full bg-brand-yellow px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-red shadow-[0_16px_30px_-14px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Order Your Dabba
            </Link>
            <Link
              href="/menu"
              className="rounded-full border-2 border-brand-cream/50 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-cream transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-cream/10"
            >
              See the Menu
            </Link>
          </div>

          <RouteTicker className="mx-auto mt-10 max-w-sm text-brand-cream" />
        </Reveal>
      </section>
    </div>
  );
}
