import Image from "next/image";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import Starburst from "@/components/poster/Starburst";
import { NEVER_JUST_LUNCH } from "@/data/home";

/**
 * "EVERY DABBA, EVERY DAY. It's Never Just Lunch."
 *
 * Four paragraphs and no other content — so the section is built as a ladder rather than
 * a grid of equal cards: the doc's first line is the argument and the rest qualify it, and
 * a 2×2 grid would flatten that into four interchangeable tiles. The photo column takes
 * the short side of a φ split, which leaves the reading column at a comfortable measure
 * without a max-width fighting the grid.
 */
export default function NeverJustLunch() {
  return (
    <section className="relative bg-paper pb-phi-6 pt-phi-5 sm:pt-phi-6">
      <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl">
          <p className="font-script text-3xl text-brand-orange">Every dabba, every day</p>
          <h2 className="poster-stack mt-2 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
            <span
              className="poster text-[28px] text-brand-red sm:text-[46px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              It&rsquo;s Never
            </span>
            <span
              className="poster text-[28px] text-brand-green-dark sm:text-[46px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              Just Lunch.
            </span>
          </h2>
        </Reveal>

        <div className="mt-phi-5 grid gap-phi-4 lg:grid-cols-[1fr_1.618fr] lg:items-start lg:gap-phi-5">
          <Reveal className="relative">
            {/* net-08 is the only portrait frame in the set (600×900); the aspect matches
                it so `object-cover` has nothing to crop away. */}
            <div className="relative aspect-[2/3] overflow-hidden rounded-[32px] shadow-[0_18px_44px_-26px_rgba(42,24,16,0.5)]">
              <Image
                src="/images/about/net-08.jpg"
                alt="A Mumbai dabbawala at work"
                fill
                sizes="(min-width: 1024px) 34vw, 92vw"
                className="object-cover"
              />
            </div>

            <Starburst
              className="absolute -bottom-5 -right-3 h-[104px] w-[104px] rotate-[-9deg] sm:-right-5 sm:h-[128px] sm:w-[128px]"
              fill="var(--color-brand-red)"
            >
              <div className="px-3">
                <span className="block font-poster text-lg uppercase leading-[0.9] text-brand-cream sm:text-2xl">
                  Packed
                  <br />
                  By Hand
                </span>
                <span className="mt-0.5 block font-script text-xs leading-none text-brand-yellow sm:text-sm">
                  never a machine
                </span>
              </div>
            </Starburst>
          </Reveal>

          <Reveal delay={90}>
            {/* The first beat is the claim; it gets poster scale and the rest follow it
                down a hairline, numbered, so the order reads as an argument. */}
            <p className="max-w-measure-wide font-display text-phi-4 font-bold leading-snug text-ink sm:text-[30px]">
              {NEVER_JUST_LUNCH[0]}
            </p>

            <ol className="mt-phi-4 space-y-phi-3 border-l-2 border-brand-red/15 pl-phi-3 sm:pl-phi-4">
              {NEVER_JUST_LUNCH.slice(1).map((beat, i) => (
                <li key={beat} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[29px] top-1 h-3.5 w-3.5 rounded-full bg-brand-red sm:-left-[42px]"
                  />
                  <span className="text-phi-0 font-bold uppercase tracking-[0.18em] text-brand-orange">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 max-w-measure-wide text-phi-2 leading-relaxed text-ink/70">
                    {beat}
                  </p>
                </li>
              ))}
            </ol>

            <Button href="/regional-food-stories" variant="outline" size="md" className="mt-phi-4">
              Read The Food Stories
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
