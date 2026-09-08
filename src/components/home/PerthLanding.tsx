import Image from "next/image";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import RouteTicker from "@/components/poster/RouteTicker";
import { PERTH_AUDIENCES } from "@/data/home";

/**
 * "PERTH — WHERE THE LEGACY LANDS. Mumbai Dabbawala Is Coming to Perth."
 *
 * The four audience lines are a "who this is for" list, not four features, so they run as
 * a single stacked list with the audience set in poster type and the qualifier trailing
 * it — the shape the doc's own dashes imply. The route ticker reappears here because this
 * is the section that actually names both ends of the flight.
 */
export default function PerthLanding() {
  return (
    <section className="relative bg-paper pb-phi-6 pt-phi-6">
      <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-phi-4 lg:grid-cols-[1.618fr_1fr] lg:items-center lg:gap-phi-5">
          <Reveal>
            <p className="font-script text-3xl text-brand-orange">Where the legacy lands</p>
            <h2 className="poster-stack mt-2 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
              <span
                className="poster text-[26px] text-brand-red sm:text-[44px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                Mumbai Dabbawala
              </span>
              <span
                className="poster text-[26px] text-brand-green-dark sm:text-[44px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                Is Coming To Perth.
              </span>
            </h2>

            <p className="mt-5 max-w-measure-wide text-phi-2 leading-relaxed text-ink/70">
              A tradition that&rsquo;s fed a city of 20 million for 135 years is now feeding
              a city that&rsquo;s become home to thousands who miss the taste of theirs.
            </p>

            <ul className="mt-phi-4 divide-y divide-brand-red/10 border-y border-brand-red/10">
              {PERTH_AUDIENCES.map((item) => (
                <li
                  key={item.who}
                  className="flex flex-col gap-x-3 gap-y-0.5 py-phi-2 sm:flex-row sm:items-baseline"
                >
                  <span
                    className="poster shrink-0 text-[19px] leading-none text-brand-red [--po:2px] sm:text-[23px]"
                    style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
                  >
                    {item.who}
                  </span>
                  <span className="text-phi-1 leading-relaxed text-ink/65 sm:text-phi-2">
                    {item.copy}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-phi-3 max-w-measure-wide font-display text-phi-3 font-bold leading-snug text-brand-green-dark">
              This isn&rsquo;t just an expansion. It&rsquo;s Mumbai&rsquo;s most-loved food
              tradition, made for everyday life in Perth.
            </p>

            <div className="mt-phi-4 flex flex-wrap items-center gap-3">
              <Button href="/contact" variant="red" size="md">
                Check If We Deliver To You
              </Button>
              <Button href="/plans" variant="outline" size="md">
                See The Plans
              </Button>
            </div>
          </Reveal>

          <Reveal delay={90} className="relative">
            {/* square, because net-03 is 900×900 — a portrait frame would crop a third
                of it off. */}
            <div className="relative aspect-square overflow-hidden rounded-[32px] shadow-[0_18px_44px_-26px_rgba(42,24,16,0.5)]">
              <Image
                src="/images/about/net-03.jpg"
                alt="A Mumbai dabbawala at work"
                fill
                sizes="(min-width: 1024px) 34vw, 92vw"
                className="object-cover"
              />
            </div>

            <div className="mt-phi-3 rounded-[24px] bg-brand-cream/70 px-phi-3 py-phi-2">
              <RouteTicker className="text-brand-red" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
