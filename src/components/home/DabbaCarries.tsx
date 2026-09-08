"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { DABBA_CARRIES, type CarriesToken, type ChipTone } from "@/data/home";

/**
 * "More than a meal..." — the client's statement line, panned sideways by scroll.
 *
 * The composition comes from their own artwork (chips and stickers inline in the
 * sentence, on a dark ground); the horizontal scroll band is the shape they asked for,
 * after the techinfinity reference.
 *
 * ## The pin
 *
 * The section is a tall scroll track and the band is a `position: sticky` child one
 * viewport high, so sticky does the pinning — no JS holds anything in place and no layout
 * is written per frame.
 *
 * An earlier pass at this looked broken for a reason worth remembering: **sticky was
 * never sticking.** `overflow-x-hidden` on the home page wrapper made it a scroll
 * container, which silently disables `position: sticky` for everything inside it, so the
 * band rode up with the page while the row panned and the sentence never finished. The
 * wrapper is `overflow-x-clip` now (clips the same, creates no scroll container) and the
 * pin is verified holding at `top: 0` across the whole track.
 *
 * ## The holds
 *
 * The pan does NOT run the full length of the track. It starts after `HEAD` and finishes
 * at `1 - TAIL`:
 *
 *  - the head hold leaves the opening words still for a moment before anything moves;
 *  - the tail hold is the important one — it keeps "...and delivered to Perth." on screen
 *    after the pan completes, so the end of the line can actually be read. Without it the
 *    pan and the pin end together and the last words arrive exactly as the band lets go,
 *    which is what "the line never finishes" was.
 *
 * ## The rest
 *
 * The only things JS writes per scroll are one `translate3d` on the row and one `scaleX`
 * on the progress rule; both are compositor properties. There is no rAF loop — scroll
 * events already fire at frame rate, and a loop would keep spinning while the band is
 * nowhere near the viewport.
 *
 * The track's height is derived from the row: however wide the sentence sets at the
 * current type size, the section is exactly tall enough to pan all of it at `PAN_PER_PX`,
 * with the two holds accounted for. Change the copy or the type and the pacing holds.
 *
 * The edge mask is what makes words emerge rather than slide: they fade up as they arrive
 * from the right and fade out at the left, so the row has no hard ends. The row's
 * 14vw lead-in and lead-out clears that fade, so the first word is fully lit at rest and
 * the last one still is when the pan finishes.
 *
 * Under `prefers-reduced-motion: reduce` there is no track, no pin and no pan — the
 * sentence wraps and sits still, chips and stickers intact. Note that the wrapped row
 * measures no horizontal overflow, so `panning` keys off the motion preference and NOT
 * off `travel`: deciding it from `travel` would leave the row wrapped, measure 0, and the
 * pan could never switch itself on.
 */

/** Row pixels panned per pixel scrolled. Higher = a shorter section, a faster pan. */
const PAN_PER_PX = 2;
/** Share of the track spent still before the pan starts. */
const HEAD = 0.06;
/** Share of the track spent still after it finishes, holding the end of the line. */
const TAIL = 0.15;

/** Gradient chip grounds, primary palette plus the two accent greens. */
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

const MASK = "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)";

/** Per-chip tilt, so they look placed by hand rather than generated. */
const TILTS = [-2.2, 1.6, -1.2, 2.4, -1.8, 1.2, -2.6, 1.9, -1.4, 2.1, -2];

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

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
  const trackRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  /** How far the row has to travel: its content width minus what fits on screen. */
  const [travel, setTravel] = useState(0);

  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );

  const panning = !reduced;

  /**
   * Travel is measured from the line's OWN box, not from `row.scrollWidth`.
   *
   * `scrollWidth` proved unreliable for this shape twice over: it does not count the
   * trailing padding of overflowing content, and it did not pick up a trailing flex
   * spacer either, so the measurement came back ~14vw short both times and the pan
   * stopped early with "Perth." sitting inside the right-hand fade. With `w-max` on the
   * line, its `offsetWidth` IS the full content width, spacers included, and there is
   * nothing to infer.
   */
  const measure = useCallback(() => {
    const row = rowRef.current;
    const line = lineRef.current;
    if (!row || !line) return;
    setTravel(Math.max(0, line.offsetWidth - row.clientWidth));
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    if (!panning || !row) {
      setTravel(0);
      return;
    }

    measure();

    // the row's width tracks the viewport (the type is set in vw), and jumps again when
    // the display webfont lands and the metrics change under it
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    if (lineRef.current) observer.observe(lineRef.current);
    document.fonts?.ready.then(measure).catch(() => {});

    return () => observer.disconnect();
  }, [measure, panning]);

  useEffect(() => {
    if (!panning || travel <= 0) return;

    let last = -1;

    const paint = () => {
      const track = trackRef.current;
      const row = rowRef.current;
      if (!track || !row) return;

      const span = track.offsetHeight - window.innerHeight;
      const p =
        span <= 0 ? 1 : Math.min(1, Math.max(0, -track.getBoundingClientRect().top / span));

      // every scroll event outside the band lands on the same clamped 0 or 1, so this
      // guard makes those events a single float compare instead of two style writes
      if (Math.abs(p - last) < 0.0004) return;
      last = p;

      // the pan occupies the middle of the track; the head and the tail are still
      const panned = Math.min(1, Math.max(0, (p - HEAD) / (1 - HEAD - TAIL)));

      row.style.transform = `translate3d(${(-travel * panned).toFixed(2)}px, 0, 0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${panned.toFixed(4)})`;
    };

    paint();
    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);

    return () => {
      window.removeEventListener("scroll", paint);
      window.removeEventListener("resize", paint);
    };
  }, [travel, panning]);

  let chipIndex = 0;

  return (
    <section
      ref={trackRef}
      className="statement grain relative bg-ink"
      // tall enough to pan the whole row plus the two holds, and no taller
      style={
        panning && travel > 0
          ? { height: `calc(100svh + ${Math.round(travel / (PAN_PER_PX * (1 - HEAD - TAIL)))}px)` }
          : undefined
      }
    >
      {/* NO `overflow` on the track. `overflow: hidden` on an ancestor makes that ancestor
          the sticky child's scroll container, and since it does not scroll, the child
          stops sticking and rides up with the section instead. The clip belongs here, on
          the sticky child. */}
      <div
        className={`flex flex-col justify-center overflow-hidden ${
          panning ? "sticky top-0 h-[100svh]" : "py-phi-7"
        }`}
      >
        <p className="px-5 text-center font-script text-[min(30px,3.4svh)] text-brand-orange sm:px-8">
          What a dabba carries
        </p>

        <div
          className={`mt-phi-4 ${panning ? "overflow-hidden" : "px-5 sm:px-8 lg:px-12"}`}
          style={panning ? { maskImage: MASK, WebkitMaskImage: MASK } : undefined}
        >
          <div ref={rowRef} className="statement-row">
            <p
              ref={lineRef}
              className={`flex items-center gap-x-[0.28em] gap-y-[0.44em] font-display text-[clamp(22px,3.4vw,46px)] font-bold leading-[1.32] text-brand-cream ${
                panning
                  ? "w-max flex-nowrap whitespace-nowrap"
                  : "mx-auto max-w-[86rem] flex-wrap justify-center"
              }`}
            >
              {/* Lead-in and lead-out as real flex children, not padding on the row.
                  `scrollWidth` does not count the TRAILING padding of overflowing
                  content, so with `px-[14vw]` the measured travel came up ~14vw short and
                  the pan stopped early, leaving "Perth." sitting inside the right-hand
                  fade exactly when it was supposed to be readable. As children they are
                  always measured. They also size the clearance for the mask: 14vw against
                  an 8% fade means the first and last words are fully lit at the two
                  holds. */}
              {panning && <span aria-hidden="true" className="w-[14vw] shrink-0" />}

              {DABBA_CARRIES.map((token, i) => {
                const tilt = token.chip ? TILTS[chipIndex++ % TILTS.length] : 0;

                return (
                  // index keys: the array is static and never reorders
                  <span key={i} className="flex shrink-0 items-center gap-x-[0.28em]">
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

              {panning && <span aria-hidden="true" className="w-[14vw] shrink-0" />}
            </p>
          </div>
        </div>

        {panning && (
          <div className="mt-phi-5 px-5 sm:px-8 lg:px-12">
            <span
              aria-hidden="true"
              className="mx-auto block h-px w-full max-w-measure bg-brand-cream/15"
            >
              <span
                ref={barRef}
                className="block h-px w-full origin-left scale-x-0 bg-brand-yellow"
              />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
