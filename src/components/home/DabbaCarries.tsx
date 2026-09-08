"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DABBA_CARRIES, type CarriesToken, type ChipTone } from "@/data/home";

/**
 * "More than a meal…" — the client's statement line, built to the two references they
 * sent: the composition comes from their own artwork (chips and stickers inline in the
 * sentence, on a dark ground) and the motion comes from the techinfinity band.
 *
 * That band turned out **not** to be a scroll scrub. It is a Framer Motion
 * `whileInView` stagger: the pieces drop in from above, the row settles out of a slight
 * over-scale, and it then holds — sampling its transform across 1200px of further scroll
 * gives identical values. An earlier version of this section scrubbed the sentence
 * sideways with scroll, which is why the line never appeared to finish: the pan and the
 * pin ended together, so the last words arrived exactly as the section let go.
 *
 * So there is no track, no pin and no pan. The whole sentence **wraps and sits still**,
 * complete and readable, and the animation is a one-shot entrance:
 *
 *  - chips fall `-3.1em`, plain words only `-0.7em`, both with the reference's `back.out`
 *    overshoot, so the highlights read as the event and the rest as supporting text;
 *  - the row settles from `scale(1.08)` to rest over 1s;
 *  - the stagger is per-token `transition-delay`, 38ms apart.
 *
 * All of that lives in `globals.css` under `.statement`, keyed off one `data-shown`
 * attribute, so the only JS here is the observer that sets it. Only `opacity` and
 * `transform` animate, so the cost does not grow with the length of the sentence, and
 * `prefers-reduced-motion: reduce` lands everything at rest with no transition.
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

export default function DabbaCarries() {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);

    // the sentence must never stay hidden if the observer never fires — a background
    // tab, a context with no scrolling. Same failsafe as `Reveal`.
    const failsafe = window.setTimeout(() => setShown(true), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  let chipIndex = 0;

  return (
    <section
      ref={ref}
      data-shown={shown}
      className="statement grain relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink py-phi-7"
    >
      <div className="mx-auto w-full max-w-[1720px] px-5 sm:px-8 lg:px-12">
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
                  className="statement-token flex shrink-0 items-center gap-x-[0.28em]"
                  style={{
                    // chips fall further than plain words, and the stagger runs
                    // left-to-right through the sentence
                    ["--drop" as string]: token.chip ? "-3.1em" : "-0.7em",
                    transitionDelay: `${i * 38}ms`,
                  }}
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
    </section>
  );
}
