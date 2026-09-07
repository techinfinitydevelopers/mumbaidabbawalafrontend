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

/** The six words the content doc names, in its order. */
const VALUES = ["Fresh", "Authentic", "Affordable", "Convenient", "Reliable", "Personal"];

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
              <p className="mt-5 max-w-measure text-phi-2 leading-relaxed text-ink/70 sm:text-phi-3">
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

            <Reveal delay={120} className="lg:self-start">
              <div className="rounded-[32px] bg-brand-cream/60 p-phi-3 sm:p-phi-4">
                <p className="font-poster text-[56px] leading-none text-brand-red sm:text-[76px]">
                  1890
                </p>
                <p className="mt-1 text-phi-0 font-bold uppercase tracking-[0.2em] text-ink/50">
                  The first delivery, Mumbai
                </p>
                <span
                  aria-hidden="true"
                  className="mb-phi-3 mt-phi-3 block h-px w-full bg-brand-red/20"
                />
                <p className="font-poster text-[56px] leading-none text-brand-green-dark sm:text-[76px]">
                  2026
                </p>
                <p className="mt-1 text-phi-0 font-bold uppercase tracking-[0.2em] text-ink/50">
                  Perth, from 14 September
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───── What We Stand For ───── */}
      <section className="grain graph-paper relative overflow-hidden bg-brand-cream pb-phi-6 pt-phi-5 sm:pb-phi-7">
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
            <p className="mx-auto mt-5 max-w-measure text-phi-2 leading-relaxed text-ink/70 sm:text-phi-3">
              We don&rsquo;t just deliver meals — we deliver on a set of values that
              don&rsquo;t change, no matter how big we get or how far from Mumbai we travel.
            </p>
          </Reveal>

          {/* The doc gives the six words and nothing else, so they stand on their own
              rather than carrying invented one-liners underneath. */}
          <div className="mt-phi-5 grid grid-cols-2 gap-3 sm:mt-phi-6 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
            {VALUES.map((value, i) => (
              <Reveal key={value} delay={i * 60}>
                <div className="h-full rounded-[28px] border border-brand-red/12 bg-paper p-phi-3 text-center shadow-[0_8px_26px_-20px_rgba(42,24,16,0.28)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-green">
                  <span
                    className={`block font-poster text-[30px] leading-none ${
                      ["text-brand-red", "text-brand-orange", "text-brand-green-dark"][i % 3]
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-phi-2 block font-display text-phi-2 font-bold leading-tight text-ink sm:text-phi-3">
                    {value}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140} className="mt-phi-5 text-center">
            <p className="font-script text-3xl text-brand-red sm:text-4xl">Every single dabba.</p>
          </Reveal>
        </div>
      </section>

      {/* ───── Life of a Dabbawala ───── */}
      <section className="relative bg-paper pb-phi-6 pt-phi-5 sm:pb-phi-7">
        <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
          <Reveal className="max-w-3xl">
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
            <p className="mt-5 max-w-measure text-phi-2 leading-relaxed text-ink/70 sm:text-phi-3">
              Long before an app or a delivery van, it was a person — carrying, sorting,
              delivering, without fail, day after day. This gallery isn&rsquo;t about
              logistics. It&rsquo;s about the people who&rsquo;ve made &ldquo;on time, every
              time&rdquo; a promise kept for 135 years — their mornings, their routines, their
              quiet pride in a job most people never think twice about.
            </p>
          </Reveal>

          <div
            id="dabbawala-gallery"
            className="mt-phi-5 grid grid-cols-2 gap-3 sm:mt-phi-6 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5"
          >
            {Array.from({ length: 10 }, (_, i) => {
              const n = String(i + 1).padStart(2, "0");
              // the first frame runs two-up so the mosaic has somewhere to settle
              const lead = i === 0;
              return (
                <Reveal key={n} delay={i * 50} className={lead ? "col-span-2 row-span-2" : ""}>
                  <div
                    className={`relative h-full overflow-hidden rounded-[24px] shadow-[0_10px_30px_-20px_rgba(42,24,16,0.45)] ${
                      lead ? "aspect-square sm:aspect-[3/4]" : "aspect-[3/4]"
                    }`}
                  >
                    <Image
                      src={`/images/about/net-${n}.jpg`}
                      alt="A Mumbai dabbawala at work"
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </Reveal>
              );
            })}
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
          <p className="mx-auto mt-5 max-w-measure text-phi-2 leading-relaxed text-brand-cream/85 sm:text-phi-3">
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
