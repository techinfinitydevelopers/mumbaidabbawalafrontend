import Link from "next/link";
import Reveal from "@/components/Reveal";

/** The five promises, in the client's order and wording. */
const PILLARS = [
  {
    name: "Fresh",
    copy: "Prepared daily, never sitting around waiting to be reheated.",
  },
  {
    name: "Authentic",
    copy: "Real regional recipes, not a \u201cfusion\u201d version of them.",
  },
  {
    name: "Regional Variety",
    copy: "Five distinct cuisines, five distinct stories, all on rotation.",
  },
  {
    name: "Home-Style",
    copy: "Cooked the way it\u2019s cooked at home \u2014 because that\u2019s exactly what it is.",
  },
  {
    name: "Everyday Affordable",
    copy: "Good food shouldn\u2019t be a special occasion.",
  },
];

/**
 * The brand promise, sitting between the hero and the rotation grid.
 *
 * Deliberately light — numbered text, no cards and no photography — so it hands the
 * page over to the card grid below instead of competing with it.
 */
export default function FoodFirst() {
  return (
    <section className="relative bg-paper pb-16 pt-14 sm:pb-20 sm:pt-16">
      <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl">
          <p className="font-script text-3xl text-brand-orange">Why the food comes first</p>
          <h2 className="poster-stack mt-2 [--po:4px] sm:[--po:5px]">
            <span
              className="poster text-[30px] text-brand-red sm:text-[46px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              Food First.
            </span>
            <span
              className="poster text-[30px] text-brand-green-dark sm:text-[46px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              Everything Else Follows.
            </span>
          </h2>
        </Reveal>

        <dl className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.name} delay={i * 70}>
              <div className="border-t-2 border-brand-red/12 pt-4">
                <span className="font-poster text-sm leading-none text-brand-orange">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <dt className="mt-2 font-display text-lg font-bold leading-tight text-ink">
                  {pillar.name}
                </dt>
                <dd className="mt-1.5 text-[13px] leading-relaxed text-ink/65">{pillar.copy}</dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal
          delay={120}
          className="mt-14 flex flex-col gap-6 border-t-2 border-dashed border-brand-red/20 pt-10 lg:flex-row lg:items-center lg:justify-between"
        >
          <p className="max-w-2xl font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
            Food isn&rsquo;t a feature of Mumbai Dabbawala.{" "}
            <span className="text-brand-red">It&rsquo;s the entire reason we exist.</span>
          </p>
          <Link
            href="#rotation"
            className="shrink-0 rounded-full bg-brand-red px-7 py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-brand-cream transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-orange"
          >
            Explore Our Menu
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
