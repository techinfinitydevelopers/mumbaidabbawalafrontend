import Button from "@/components/Button";
import HeroPlatter, { type Dabba, type Piece } from "@/components/regional/HeroPlatter";
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
  dabba,
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
  dabba?: Dabba;
}) {
  return (
    <section className="grain graph-paper relative flex min-h-[100svh] flex-col justify-start lg:justify-center overflow-hidden bg-brand-cream pb-12 pt-16 sm:pb-24 sm:pt-24">
      <div className="relative z-10 mx-auto grid w-full max-w-[1720px] items-center gap-3 px-5 sm:gap-6 sm:px-8 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:px-12 2xl:px-16">
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
            className="slide-in-left relative mx-auto w-[52%] max-w-[240px] sm:w-[72%] sm:max-w-[460px] lg:w-[min(100%,80svh)] lg:max-w-[780px]"
            tins={tins}
            dabba={dabba}
          />

          <Starburst className="slide-in-left absolute left-[10%] top-[4%] z-30 h-[78px] w-[78px] rotate-[-10deg] sm:-left-[2%] sm:top-[2%] sm:h-[118px] sm:w-[118px] xl:h-[138px] xl:w-[138px]">
            <div className="px-2 sm:px-5">
              <span className="block text-[7px] font-bold uppercase tracking-[0.2em] text-brand-cream/85 sm:text-[9px]">
                {seal.eyebrow}
              </span>
              <span className="block font-poster text-xs uppercase leading-[0.9] text-brand-cream sm:text-xl xl:text-2xl">
                {seal.lines[0]}
                <br />
                {seal.lines[1]}
              </span>
              <span className="mt-0.5 block font-script text-[10px] leading-none text-brand-yellow sm:text-base">
                {seal.script}
              </span>
            </div>
          </Starburst>
        </div>

        {/* Copy */}
        <div>
          <p className="slide-in-right font-script text-xl text-brand-orange sm:text-4xl 2xl:text-5xl">
            {kicker}
          </p>

          <h1
            className="poster-stack slide-in-right mt-1 [--po:3px] sm:[--po:7px]"
            style={{ animationDelay: "0.08s" }}
          >
            <span
              className="poster block text-[26px] leading-[0.95] text-brand-red sm:text-[66px] lg:text-[76px] xl:text-[92px] 2xl:text-[104px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              {titleTop}
            </span>
            <span
              className="poster block text-[26px] leading-[0.95] text-brand-green-dark sm:text-[66px] lg:text-[76px] xl:text-[92px] 2xl:text-[104px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              {titleBottom}
            </span>
          </h1>

          <div
            className="slide-in-right mt-2 flex flex-wrap items-center gap-x-3.5 gap-y-1 sm:mt-3 sm:gap-x-6 sm:gap-y-2"
            style={{ animationDelay: "0.16s" }}
          >
            {facts.map((fact) => (
              <span key={fact.label} className="flex items-baseline gap-1 sm:gap-2">
                <span className="font-poster text-lg text-brand-orange sm:text-3xl 2xl:text-4xl">
                  {fact.value}
                </span>
                <span className="whitespace-pre-line text-[8.5px] font-bold uppercase leading-[1.25] tracking-[0.12em] text-brand-green-dark sm:text-[11px] sm:tracking-[0.16em]">
                  {fact.label}
                </span>
              </span>
            ))}
          </div>

          {quote && (
            <div
              className="slide-in-right mt-2.5 max-w-lg rounded-[14px] bg-paper p-3 shadow-[0_12px_24px_-14px_rgba(42,24,16,0.4)] sm:mt-5 sm:rounded-[24px] sm:p-5 2xl:p-6"
              style={{ animationDelay: "0.24s" }}
            >
              <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-ink sm:text-[13px]">
                {quote.name}
              </p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-ink/75 sm:mt-2 sm:text-sm">{quote.text}</p>
            </div>
          )}

          {lead && (
            <p
              className="slide-in-right mt-2.5 max-w-lg text-xs leading-relaxed text-ink/75 sm:mt-5 sm:text-base"
              style={{ animationDelay: "0.24s" }}
            >
              {lead}
            </p>
          )}

          <div
            className="slide-in-right mt-3 flex flex-wrap gap-2.5 sm:mt-5 sm:gap-3"
            style={{ animationDelay: "0.32s" }}
          >
            <Button href={primary.href} variant="orange" size="sm">
              {primary.label}
            </Button>
            <Button href={secondary.href} variant="paper" size="sm">
              {secondary.label}
            </Button>
          </div>

          <RouteTicker
            className="slide-in-right mt-3.5 max-w-lg text-brand-red sm:mt-6"
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
          d="M0,104 C300,52 620,44 900,80 C1180,116 1330,118 1440,106 L1440,150 L0,150 Z"
          fill="var(--color-paper)"
        />
      </svg>
    </section>
  );
}
