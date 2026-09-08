import Link from "next/link";
import Reveal from "@/components/Reveal";
import { TESTIMONIALS } from "@/data/home";

/** Filled and empty stars, drawn rather than typed, so the rating renders as artwork. */
function Rating({ stars }: { stars: number }) {
  return (
    <p className="flex gap-0.5" aria-label={`${stars} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="15"
          height="15"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={i < stars ? "text-brand-orange" : "text-brand-red/20"}
        >
          <path
            d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.2-5.9 3.2 1.2-6.5L2.5 9.5l6.6-.9 2.9-6Z"
            fill="currentColor"
          />
        </svg>
      ))}
    </p>
  );
}

/**
 * "WHAT OUR CUSTOMERS SAY — Taste. Home. Reliability. In Their Words."
 *
 * Quote, rating and attribution are the doc's. The doc's "✅ Verified Customer" tick is
 * not printed: it asserts that each review has been verified, which is a claim the site
 * can't yet stand behind — the same reason the accuracy statistics are held back — and
 * the launch it sits above hasn't happened. Restore it once the client confirms the
 * reviews are real and consented.
 */
export default function Testimonials() {
  return (
    <section className="grain graph-paper relative overflow-hidden bg-brand-cream pb-phi-6 pt-phi-6">
      <div className="relative mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-script text-3xl text-brand-orange">What our customers say</p>
          <h2 className="poster-stack mx-auto mt-3 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
            <span
              className="poster text-[26px] text-brand-red sm:text-[44px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              Taste. Home. Reliability.
            </span>
            <span
              className="poster text-[26px] text-brand-green-dark sm:text-[44px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              In Their Words.
            </span>
          </h2>
        </Reveal>

        <div className="mt-phi-5 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((review, i) => (
            <Reveal key={review.name} delay={i * 80}>
              <figure className="flex h-full flex-col rounded-[28px] border border-brand-red/12 bg-paper p-phi-3 shadow-[0_8px_26px_-20px_rgba(42,24,16,0.28)] transition-transform duration-500 hover:-translate-y-1.5 sm:p-phi-4">
                <Rating stars={review.stars} />

                <blockquote className="mt-phi-3 flex-1">
                  <p className="font-display text-phi-3 font-bold leading-snug text-ink">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </blockquote>

                <figcaption className="mt-phi-3 border-t border-brand-red/10 pt-phi-2">
                  <span className="block text-phi-1 font-bold uppercase tracking-[0.14em] text-brand-red">
                    {review.name}
                  </span>
                  <span className="block text-phi-0 font-bold uppercase tracking-[0.16em] text-ink/45">
                    {review.suburb}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140} className="mt-phi-5 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-red px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-cream transition-transform duration-300 hover:-translate-y-0.5"
          >
            Share Your Dabba Story
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
