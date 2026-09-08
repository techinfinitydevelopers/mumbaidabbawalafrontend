import Link from "next/link";
import Reveal from "@/components/Reveal";
import ReviewDeck from "@/components/home/ReviewDeck";

/**
 * "WHAT OUR CUSTOMERS SAY — Taste. Home. Reliability. In Their Words."
 *
 * Heading and CTA are server-rendered; the reviews themselves are a client deck
 * (`ReviewDeck`) because they rotate.
 *
 * The section is built to hold one screen, so the heading, the deck, its controls and the
 * CTA are all visible together without scrolling. "One screen" has to be true at every
 * height, not just at 1080, so the pieces that would otherwise push it over are capped
 * against `svh` with `min()` — the width breakpoint picks the size it wants, and short
 * viewports take the smaller of the two.
 *
 * The 88px top padding is measured, not chosen: the fixed header is 82px tall and floats
 * over whatever is under it, so anything less puts the script kicker behind the nav. It
 * also has to stay small enough that the content box still clears the tallest content at
 * 768 — with `pb-12` that leaves 632px against a 625px block, so the section is exactly
 * one screen there rather than 17px over it.
 *
 * Quote, rating and attribution are the doc's. The doc's "✅ Verified Customer" tick is
 * not printed: it asserts that each review has been verified, which is a claim the site
 * can't yet stand behind — the same reason the accuracy statistics are held back — and
 * the launch it sits above hasn't happened. Restore it once the client confirms the
 * reviews are real and consented.
 */
export default function Testimonials() {
  return (
    <section className="grain graph-paper relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-brand-cream pb-12 pt-[88px]">
      <div className="relative mx-auto w-full max-w-[1720px] px-5 sm:px-8 lg:px-12">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-script text-[min(30px,3.4svh)] text-brand-orange">
            What our customers say
          </p>
          <h2 className="poster-stack mx-auto mt-3 [--po:4px] [--po-gap:12px] sm:[--po:5px]">
            <span
              className="poster text-[26px] text-brand-red sm:text-[min(44px,5svh)]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              Taste. Home. Reliability.
            </span>
            <span
              className="poster text-[26px] text-brand-green-dark sm:text-[min(44px,5svh)]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              In Their Words.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={90} className="mt-phi-2">
          <ReviewDeck />
        </Reveal>

        <Reveal delay={140} className="mt-phi-3 text-center">
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
