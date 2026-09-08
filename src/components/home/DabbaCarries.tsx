"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { DABBA_CARRIES, type CarriesToken, type ChipTone } from "@/data/home";

/**
 * "More than a meal…" — the client's statement line, built to the two references they
 * sent: the composition comes from their own artwork (chips and stickers inline in the
 * sentence, on a dark ground) and the motion comes from the techinfinity band.
 *
 * The techinfinity band is a Framer Motion `whileInView` stagger - it plays once on a
 * timer and holds. That is where the *shape* of this motion comes from (pieces dropping
 * in from above, chips falling further than plain words, a slight over-scale settling),
 * but the trigger here is different on purpose: the client asked for the line to emerge
 * ON SCROLL, so the reveal is scrubbed rather than fired.
 *
 * So the section is a tall scroll track with a `position: sticky` child. As you scroll
 * through it the sentence writes itself in, word by word, left to right; the pin holds
 * until the last token has landed, and the completed line then holds for the rest of the
 * track. An earlier version panned the sentence sideways instead, which is why the line
 * never appeared to finish - the pan and the pin ended together, so the last words
 * arrived exactly as the section let go. Nothing pans now: the sentence wraps, sits
 * still, and is fully readable the moment it has landed.
 *
 * How the scrub is wired:
 *
 *  - progress `p` comes from the section's own rect, so it stays correct however the
 *    page reflows above it;
 *  - token `i` starts emerging at `(i / n) * SPREAD` and takes `WINDOW` of progress to
 *    arrive, which leaves the last ~15% of the track as a hold on the finished line;
 *  - each token gets `opacity` and a `translate3d` in `em`, so the travel scales with
 *    the type at every breakpoint;
 *  - JS writes those values DIRECTLY to the DOM, never through React state - 25 tokens
 *    re-rendering per scroll frame would be a re-render storm - and skips the whole pass
 *    when progress has not moved, which is every scroll event outside the band.
 *
 * `globals.css` deliberately puts no transition on the tokens: a transition would lag
 * behind the scrub and smear the reveal. Tokens are visible by default and JS takes them
 * away on mount, so with no JS, or under `prefers-reduced-motion: reduce`, the sentence
 * is simply there.
 *
 * Chips take the reference's proportions — a 0.28em radius and generous padding against
 * the type — and its gradient grounds, mapped onto the brand: the pastel pink and
 * lavender in the client's artwork are not brand colours, so those two become
 * brand-red → orange and green-dark → green.
 */

/** Gradient grounds, primary palette plus the two accent greens, as `[from, to]`. */
const CHIP: Record<ChipTone, { grad: string; text: string }> = {
  orange: { grad: "var(--color-brand-orange), var(--color-brand-yellow)", text: "text-ink" },
  green: { grad: "var(--color-brand-green), var(--color-brand-cream)", text: "text-ink" },
  cream: { grad: "var(--color-brand-cream), var(--color-paper)", text: "text-ink" },
  red: { grad: "var(--color-brand-red), var(--color-brand-orange)", text: "text-brand-cream" },
  yellow: { grad: "var(--color-brand-yellow), var(--color-brand-cream)", text: "text-ink" },
  forest: {
    grad: "var(--color-brand-green-dark), var(--color-brand-green)",
    text: "text-brand-cream",
  },
};

const GLYPHS = {
  heart: "M12 20.5C6.5 16.8 3 13.8 3 10.2A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 9 2.6c0 3.6-3.5 6.6-9 10.3Z",
  house: "M3.5 10.8 12 4l8.5 6.8M5.6 12.4V20h12.8v-7.6M10 20v-4.4h4V20",
  parcel: "M3.5 8.2 12 4.2l8.5 4V16L12 20l-8.5-4V8.2ZM12 20V9.4M3.5 8.2 12 12l8.5-3.8",
} as const;

/** Per-token tilt, so the chips look placed by hand rather than generated. */
const TILTS = [-2.2, 1.6, -1.2, 2.4, -1.8, 1.2, -2.6, 1.9, -1.4, 2.1, -2];

/** One sticker. Kept `aria-hidden` — the sentence already says everything. */
function Art({ art }: { art: NonNullable<CarriesToken["art"]> }) {
  if (art.kind === "glyph") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-[1.05em] w-[1.05em] shrink-0 text-brand-yellow"
      >
        <path d={GLYPHS[art.name]} />
      </svg>
    );
  }

  if (art.kind === "photo") {
    // the client's artwork drops a snapshot into the line; the pale border and the tilt
    // are what make it read as a photo pinned to the sentence rather than an inline image
    return (
      <span
        aria-hidden="true"
        className="relative block h-[1.5em] w-[2em] shrink-0 overflow-hidden rounded-[4px] border-[0.09em] border-paper bg-ink shadow-[0_0.14em_0.34em_-0.2em_rgba(0,0,0,0.7)]"
        style={{ rotate: `${art.tilt}deg` }}
      >
        <Image src={art.src} alt="" fill sizes="160px" className="object-cover grayscale" />
      </span>
    );
  }

  return (
    <Image
      src={art.src}
      alt={art.alt ?? ""}
      aria-hidden="true"
      width={220}
      height={220}
      // a light halo, not a drop shadow: the ground is ink, so a dark shadow does
      // nothing and the steel dabba and the Bell Tower would sink into it
      className={`w-auto shrink-0 drop-shadow-[0_0_0.26em_rgba(252,243,205,0.4)] ${art.h}`}
      style={{ rotate: `${art.tilt}deg` }}
    />
  );
}

/** Tokens start emerging across this much of the scroll; the rest is a hold. */
const SPREAD = 0.72;
/** How much progress one token takes to go from hidden to landed. */
const WINDOW = 0.16;

export default function DabbaCarries() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // reduced motion keeps the CSS rest state: the sentence is just there, all of it
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = ref.current;
    if (!section) return;

    const row = section.querySelector<HTMLElement>(".statement-row");
    const tokens = Array.from(section.querySelectorAll<HTMLElement>("[data-token]"));
    const n = tokens.length;
    if (!n) return;

    let last = -1;

    const paint = () => {
      const span = section.offsetHeight - window.innerHeight;
      const p =
        span <= 0 ? 1 : Math.min(1, Math.max(0, -section.getBoundingClientRect().top / span));

      // every scroll event outside the band lands on the same clamped 0 or 1, so this
      // guard makes those events a single float compare instead of 50 style writes
      if (Math.abs(p - last) < 0.0005) return;
      last = p;

      for (let i = 0; i < n; i++) {
        const token = tokens[i];
        const arrived = Math.min(1, Math.max(0, (p - (i / n) * SPREAD) / WINDOW));
        const drop = token.dataset.token === "chip" ? -2.6 : -0.7;

        token.style.opacity = arrived.toFixed(3);
        token.style.transform = `translate3d(0, ${((1 - arrived) * drop).toFixed(3)}em, 0)`;
      }

      if (row) {
        // the row settles out of a slight over-scale across the first quarter
        row.style.transform = `scale(${(1.05 - 0.05 * Math.min(1, p / 0.25)).toFixed(4)})`;
      }
    };

    paint();
    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);

    return () => {
      window.removeEventListener("scroll", paint);
      window.removeEventListener("resize", paint);
    };
  }, []);

  let chipIndex = 0;

  return (
    <section ref={ref} className="statement grain relative h-[240svh] bg-ink">
      {/* The track carries NO `overflow`. `overflow: hidden` on an ancestor makes that
          ancestor the sticky child's scroll container, and since it does not scroll, the
          child stops sticking and rides up with the section instead — which is exactly
          what was happening here. The clip belongs on the sticky child, where it also
          keeps a token still in the air from bleeding into the section above. */}
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-5 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1720px]">
        <p className="text-center font-script text-[min(30px,3.4svh)] text-brand-orange">
          What a dabba carries
        </p>

        <div className="statement-row mt-phi-4 origin-center">
          {/* The measure and the type are set together so the sentence breaks into three
                lines at desktop rather than six. The client's artwork sets it over two, but
                two would need ~2500px of line at this weight; three keeps it a statement
                rather than a paragraph, and it still holds one screen. */}
          <p className="mx-auto flex max-w-[86rem] flex-wrap items-center justify-center gap-x-[0.28em] gap-y-[0.44em] font-display text-[clamp(19px,2.5vw,36px)] font-bold leading-[1.32] text-brand-cream">
            {DABBA_CARRIES.map((token, i) => {
              const tilt = token.chip ? TILTS[chipIndex++ % TILTS.length] : 0;

              return (
                // index keys: the array is static and never reorders
                <span
                  key={i}
                  // the scrub reads this to know how far the piece should fall
                  data-token={token.chip ? "chip" : "word"}
                  className="statement-token flex shrink-0 items-center gap-x-[0.28em]"
                >
                  {token.chip ? (
                    <span
                      className={`rounded-[0.28em] px-[0.34em] pb-[0.12em] pt-[0.05em] shadow-[0_0.12em_0.3em_-0.14em_rgba(0,0,0,0.6)] ${CHIP[token.chip].text}`}
                      style={{
                        backgroundImage: `linear-gradient(86deg, ${CHIP[token.chip].grad})`,
                        rotate: `${tilt}deg`,
                      }}
                    >
                      {token.word}
                    </span>
                  ) : (
                    <span>{token.word}</span>
                  )}
                  {token.art && <Art art={token.art} />}
                </span>
              );
            })}
          </p>
          </div>
        </div>
      </div>
    </section>
  );
}
