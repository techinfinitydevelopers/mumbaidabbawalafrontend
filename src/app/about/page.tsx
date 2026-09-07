import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import JourneyTimeline from "@/components/journey/JourneyTimeline";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About Us — Mumbai Dabbawala",
  description:
    "Six generations of dabbawalas carried lunch across Mumbai. Now the same tiffin crosses an ocean to Perth. 135+ years, from 1890 to 2026.",
};

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

      {/* ───── 135+ years — the About lead from the content doc, which was missing ───── */}
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
      <section className="relative w-full bg-brand-cream px-5 py-phi-6 text-center sm:px-8 sm:py-phi-6">
        <Reveal className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full bg-brand-red/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-red">
            What We Stand For
          </span>

          <p className="mt-6 font-display text-xl font-bold text-ink sm:text-2xl">
            {["Fresh", "Authentic", "Affordable", "Convenient", "Reliable", "Personal"].map(
              (word, i, arr) => (
                <span key={word}>
                  <span className={i % 2 === 0 ? "text-brand-red" : "text-brand-green-dark"}>
                    {word}
                  </span>
                  {i < arr.length - 1 && <span className="mx-2 text-brand-orange">·</span>}
                </span>
              ),
            )}
          </p>

          <h2 className="mt-4 font-script text-3xl text-brand-orange sm:text-4xl">
            Six words. One promise. Every single dabba.
          </h2>

          <p className="mx-auto mt-5 max-w-measure text-phi-2 leading-relaxed text-ink/70 sm:text-phi-3">
            We don&rsquo;t just deliver meals — we deliver on a set of values that don&rsquo;t
            change, no matter how big we get or how far from Mumbai we travel.
          </p>

          <a
            href="#journey"
            className="mt-8 inline-block rounded-full bg-brand-red px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-cream shadow-[0_14px_26px_-12px_rgba(175,20,17,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Our Story
          </a>
        </Reveal>
      </section>

      {/* ───── Life of a Dabbawala — photo gallery ───── */}
      <section className="relative w-full bg-white px-5 py-phi-6 sm:px-8 sm:py-phi-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange">
            Life of a Dabbawala
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-brand-red sm:text-4xl">
            The People Behind Every Dabba.
          </h2>
          <p className="mx-auto mt-4 max-w-measure text-phi-2 leading-relaxed text-ink/70 sm:text-phi-3">
            Long before an app or a delivery van, it was a person — carrying, sorting,
            delivering, without fail, day after day. This gallery isn&rsquo;t about logistics.
            It&rsquo;s about the people who&rsquo;ve made &ldquo;on time, every time&rdquo; a
            promise kept for 135 years — their mornings, their routines, their quiet pride in a
            job most people never think twice about.
          </p>
          <a
            href="#dabbawala-gallery"
            className="mt-8 inline-block rounded-full border-2 border-brand-red px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-red transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-red hover:text-brand-cream"
          >
            View Gallery
          </a>
        </Reveal>

        <div
          id="dabbawala-gallery"
          className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5"
        >
          {Array.from({ length: 10 }, (_, i) => {
            const n = String(i + 1).padStart(2, "0");
            return (
              <div
                key={n}
                className={`relative aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_16px_32px_-18px_rgba(42,24,16,0.5)] ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-[3/4]" : ""
                }`}
              >
                <Image
                  src={`/images/about/net-${n}.jpg`}
                  alt="A Mumbai dabbawala at work"
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative w-full bg-white px-5 pb-phi-6 pt-phi-4 text-center sm:px-8">
        <Reveal className="mx-auto max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange">
            Across the Ocean · 2026
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-brand-red sm:text-4xl">
            The Mumbai Dabbawala Arrives in Perth
          </h2>
          <p className="mx-auto mt-4 max-w-measure text-phi-2 leading-relaxed text-ink/70 sm:text-phi-3">
            The network steps beyond Indian shores for the first time — bringing daily
            homestyle tiffin service, five regional cuisines, and six generations of
            practice to the streets of Perth.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
