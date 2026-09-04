import Link from "next/link";
import HeroPlatter, { type Piece } from "@/components/regional/HeroPlatter";
import Starburst from "@/components/poster/Starburst";
import RouteTicker from "@/components/poster/RouteTicker";

/**
 * The shared page hero: dabba group on the left, poster copy on the right, sized to fit
 * exactly one screen. Every top-level page uses this so the site opens the same way —
 * only the content changes.
 */

export type Fact = { value: string; label: string };
export type Seal = { eyebrow: string; lines: [string, string]; script: string };

export default function PageHero({
  kicker,
  titleTop,
  titleBottom,
  lead,
  facts,
  quote,
  primary,
  secondary,
  seal,
  tins,
}: {
  kicker: string;
  titleTop: string;
  titleBottom: string;
  /** optional paragraph under the headline, in place of a quote card */
  lead?: string;
  facts: Fact[];
  quote?: { name: string; text: string };
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  seal: Seal;
  tins?: Piece[];
}) {
  return (
    <section className="grain graph-paper relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-brand-cream pb-12 pt-20 sm:pb-24 sm:pt-24">
      <div className="relative z-10 mx-auto grid w-full max-w-[1720px] items-center gap-4 px-5 sm:px-8 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:px-12 2xl:px-16">
        {/* Food group */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[42%] h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(255,218,45,0.55) 0%, rgba(243,98,32,0.16) 45%, transparent 70%)",
            }}
          />
          <HeroPlatter
            className="slide-in-left relative mx-auto w-[82%] max-w-[560px] lg:w-[min(100%,80svh)] lg:max-w-[780px]"
            tins={tins}
          />

          <Starburst className="slide-in-left absolute left-[2%] top-[15%] z-30 hidden h-[118px] w-[118px] rotate-[-10deg] lg:block xl:h-[138px] xl:w-[138px]">
            <div className="px-5">
              <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-brand-cream/85">
                {seal.eyebrow}
              </span>
              <span className="block font-poster text-xl uppercase leading-[0.9] text-brand-cream xl:text-2xl">
                {seal.lines[0]}
                <br />
                {seal.lines[1]}
              </span>
              <span className="mt-0.5 block font-script text-base leading-none text-brand-yellow">
                {seal.script}
              </span>
            </div>
          </Starburst>
        </div>

        {/* Copy */}
        <div>
          <p className="slide-in-right font-script text-3xl text-brand-orange sm:text-4xl 2xl:text-5xl">
            {kicker}
          </p>

          <h1
            className="poster-stack slide-in-right mt-1 [--po:5px] sm:[--po:7px]"
            style={{ animationDelay: "0.08s" }}
          >
            <span
              className="poster whitespace-nowrap text-[40px] text-brand-red sm:text-[66px] lg:text-[76px] xl:text-[92px] 2xl:text-[104px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              {titleTop}
            </span>
            <span
              className="poster whitespace-nowrap text-[40px] text-brand-green-dark sm:text-[66px] lg:text-[76px] xl:text-[92px] 2xl:text-[104px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              {titleBottom}
            </span>
          </h1>

          <div
            className="slide-in-right mt-3 flex flex-wrap items-center gap-x-6 gap-y-2"
            style={{ animationDelay: "0.16s" }}
          >
            {facts.map((fact) => (
              <span key={fact.label} className="flex items-baseline gap-2">
                <span className="font-poster text-2xl text-brand-orange sm:text-3xl 2xl:text-4xl">
                  {fact.value}
                </span>
                <span className="whitespace-pre-line text-[11px] font-bold uppercase leading-[1.3] tracking-[0.16em] text-brand-green-dark">
                  {fact.label}
                </span>
              </span>
            ))}
          </div>

          {quote && (
            <div
              className="slide-in-right mt-5 hidden max-w-lg rounded-[24px] bg-paper p-5 shadow-[0_20px_40px_-22px_rgba(42,24,16,0.45)] sm:block 2xl:p-6"
              style={{ animationDelay: "0.24s" }}
            >
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-ink">
                {quote.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{quote.text}</p>
            </div>
          )}

          {lead && (
            <p
              className="slide-in-right mt-5 hidden max-w-lg text-sm leading-relaxed text-ink/75 sm:block sm:text-base"
              style={{ animationDelay: "0.24s" }}
            >
              {lead}
            </p>
          )}

          <div
            className="slide-in-right mt-5 flex flex-wrap gap-3"
            style={{ animationDelay: "0.32s" }}
          >
            <Link
              href={primary.href}
              className="rounded-full bg-brand-orange px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-cream shadow-[0_14px_26px_-12px_rgba(243,98,32,0.9)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {primary.label}
            </Link>
            <Link
              href={secondary.href}
              className="rounded-full bg-paper px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-red shadow-[0_14px_26px_-16px_rgba(42,24,16,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {secondary.label}
            </Link>
          </div>

          <RouteTicker
            className="slide-in-right mt-6 max-w-lg text-brand-red"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>

      <svg
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute bottom-0 left-0 z-10 h-[110px] w-full sm:h-[150px]"
      >
        <path
          d="M0,92 C170,150 300,44 520,62 C742,80 900,148 1120,116 C1268,94 1360,52 1440,36 L1440,150 L0,150 Z"
          fill="var(--color-paper)"
        />
      </svg>
    </section>
  );
}
