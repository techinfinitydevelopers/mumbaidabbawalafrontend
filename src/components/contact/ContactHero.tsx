import Button, { IconButton } from "@/components/Button";
import BrandIcon from "@/components/BrandIcon";
import Starburst from "@/components/poster/Starburst";
import { EMAIL, PHONE, PHONE_DISPLAY, SOCIALS } from "@/data/contact";

/**
 * The Contact hero.
 *
 * This is the one page that does NOT open on the shared `PageHero`, and deliberately.
 * `PageHero` leads with the dabba platter and three numbers — 135+ years, 5 cuisines, $0
 * delivery — which are the right opening for the pages that sell the food and the wrong
 * one here: on a contact page they are decoration in front of the thing the reader came
 * for. Six pages already open that way, too, so the platter carried no information at
 * all by the time you reached this one.
 *
 * So the hero's right-hand column is the routes themselves — the address, the number, the
 * five profiles — at a size you can actually hit, instead of stats. Everything else is
 * held in common with `PageHero` on purpose (cream printed ground, script kicker, stacked
 * Anton headline, starburst seal, the wave handing down to paper), so it reads as the
 * same site.
 *
 * Because the routes live up here now, the "For Customers" section below carries only the
 * four topics. They used to be in both places.
 */
export default function ContactHero() {
  return (
    <section className="grain graph-paper relative flex min-h-[86svh] flex-col justify-center overflow-hidden bg-brand-cream pb-[150px] pt-[104px] sm:pb-[180px]">
      <div className="relative z-10 mx-auto w-full max-w-[1720px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-phi-4 lg:grid-cols-[1.618fr_1fr] lg:items-center lg:gap-phi-5">
          {/* Copy */}
          <div>
            <p className="slide-in-right font-script text-xl text-brand-orange sm:text-4xl">
              We treat every message like a dabba
            </p>

            <h1
              className="poster-stack slide-in-right mt-1 [--po:3px] sm:[--po:7px]"
              style={{ animationDelay: "0.08s" }}
            >
              <span
                className="poster block text-[34px] leading-[0.95] text-brand-red sm:text-[66px] lg:text-[76px] xl:text-[88px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                Let&rsquo;s Talk
              </span>
              <span
                className="poster block text-[34px] leading-[0.95] text-brand-green-dark sm:text-[66px] lg:text-[76px] xl:text-[88px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                Dabba.
              </span>
            </h1>

            <p
              className="slide-in-right mt-phi-3 max-w-measure-wide text-phi-2 leading-relaxed text-ink/75"
              style={{ animationDelay: "0.16s" }}
            >
              Got a question about your plan, a meal, a delivery, or a corporate order?
              We&rsquo;re here — and we treat every message the way we treat every dabba:
              with care and without delay.
            </p>

            <div
              className="slide-in-right mt-phi-4 flex flex-wrap gap-3"
              style={{ animationDelay: "0.24s" }}
            >
              <Button
                href={`mailto:${EMAIL}?subject=${encodeURIComponent("Hello from the website")}`}
                variant="red"
                size="md"
              >
                Send Us a Message
              </Button>
              <Button href="#business" variant="outline" size="md">
                Corporate & Franchise
              </Button>
            </div>
          </div>

          {/* The routes, which is what a contact hero is actually for */}
          <div className="slide-in-left relative" style={{ animationDelay: "0.12s" }}>
            <div className="rounded-[28px] bg-paper p-phi-4 shadow-[0_18px_44px_-26px_rgba(42,24,16,0.5)] sm:p-phi-5">
              <p className="text-phi-0 font-bold uppercase tracking-[0.18em] text-brand-red">
                Reach us direct
              </p>

              <a
                href={`mailto:${EMAIL}`}
                className="mt-phi-3 block break-words font-display text-phi-3 font-bold leading-snug text-ink transition-colors duration-300 hover:text-brand-red sm:text-phi-4"
              >
                {EMAIL}
              </a>

              <a
                href={`tel:${PHONE}`}
                className="mt-phi-2 block font-display text-phi-3 font-bold leading-snug text-ink/75 transition-colors duration-300 hover:text-brand-red"
              >
                {PHONE_DISPLAY}
              </a>

              <p className="mt-phi-3 border-t border-brand-red/10 pt-phi-3 text-phi-0 font-bold uppercase tracking-[0.16em] text-ink/45">
                Or find us on
              </p>
              <div className="mt-phi-2 flex flex-wrap gap-2.5">
                {SOCIALS.map((s) => (
                  <IconButton
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    size={40}
                  >
                    <BrandIcon name={s.key} />
                  </IconButton>
                ))}
              </div>
            </div>

            <Starburst className="slide-in-left absolute -right-3 -top-8 z-20 h-[86px] w-[86px] rotate-[-9deg] sm:-right-6 sm:-top-10 sm:h-[118px] sm:w-[118px]">
              <div className="px-2 sm:px-4">
                <span className="block text-[7px] font-bold uppercase tracking-[0.2em] text-brand-cream/85 sm:text-[9px]">
                  Every
                </span>
                <span className="block font-poster text-xs uppercase leading-[0.9] text-brand-cream sm:text-xl">
                  Message
                  <br />
                  Read
                </span>
                <span className="mt-0.5 block font-script text-[10px] leading-none text-brand-yellow sm:text-base">
                  with care
                </span>
              </div>
            </Starburst>
          </div>
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
