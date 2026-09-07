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
          { value: "99.9%", label: "Six Sigma\naccuracy" },
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

      {/* ───── What We Stand For ───── */}
      <section className="relative w-full bg-brand-cream px-5 py-20 text-center sm:px-8 sm:py-28">
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

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink/70 sm:text-base">
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
      <section className="relative w-full bg-white px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange">
            Life of a Dabbawala
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-brand-red sm:text-4xl">
            The People Behind Every Dabba.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/70 sm:text-base">
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

      <section className="relative w-full bg-white px-5 pb-28 pt-12 text-center sm:px-8">
        <Reveal className="mx-auto max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange">
            Across the Ocean · 2026
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-brand-red sm:text-4xl">
            The Mumbai Dabbawala Arrives in Perth
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink/70 sm:text-base">
            The world&rsquo;s most disciplined food network expands beyond Indian shores for
            the first time. Bringing daily homestyle tiffin service, multi-regional culinary
            heritage, and six generations of six-sigma punctuality to the streets of Perth.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
