"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { DABBA_CARRIES, type CarriesToken, type ChipTone } from "@/data/home";

/**
 * "More than a meal…" — the client's statement line as one very wide row that pans left
 * as you scroll past it, in the manner of the techinfinity band they sent.
 *
 * How the scrub works, and why it is built this way:
 *
 *  - The section is a tall **scroll track**; the visible band is a `position: sticky`
 *    child one viewport high. Sticky does the pinning, so no JS holds an element in
 *    place, there is nothing to fight the browser's scroll anchoring, and no layout is
 *    written per frame.
 *  - The only things JS writes on scroll are one `translate3d` on the row and one
 *    `scaleX` on the progress rule. Both are compositor properties, so the pan never
 *    triggers layout or paint.
 *  - The track's height is **derived from the row**, not guessed: however wide the
 *    sentence sets at the current type size, the section is exactly tall enough to pan
 *    all of it at `PAN_PER_PX`. Change the copy or the type and the pacing holds.
 *  - No `requestAnimationFrame` loop. Scroll events already fire at frame rate, and a
 *    rAF loop would keep spinning while the band is nowhere near the viewport.
 *
 * The edge mask is what makes it read as a *reveal* rather than a slide: words fade up
 * as they arrive from the right and fade out again at the left, so the row has no hard
 * ends. The row's `px-[16vw]` leading and trailing space is sized to clear that fade, so
 * the first word is fully lit at rest and the last one still is when the pan finishes.
 *
 * Under `prefers-reduced-motion: reduce` there is no track, no sticky and no scrub — the
 * sentence simply wraps and sits still, chips and stickers intact. Note that the wrapped
 * row measures no overflow, so `scrubbing` keys off the motion preference and NOT off
 * `travel`; deciding it from `travel` would leave the row wrapped, measure 0, and the
 * scrub could never switch itself on.
 */

/** Row pixels panned per pixel scrolled. Higher = a shorter section, a faster pan. */
const PAN_PER_PX = 1.6;

/** Chip grounds, primary palette only — see the note on `DABBA_CARRIES`. */
const CHIP: Record<ChipTone, string> = {
  orange: "bg-brand-orange text-ink",
  green: "bg-brand-green text-ink",
  cream: "bg-brand-cream text-ink",
  red: "bg-brand-red text-brand-cream",
  yellow: "bg-brand-yellow text-ink",
  forest: "bg-brand-green-dark text-brand-cream",
};

const GLYPHS = {
  heart: "M12 20.5C6.5 16.8 3 13.8 3 10.2A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 9 2.6c0 3.6-3.5 6.6-9 10.3Z",
  house: "M3.5 10.8 12 4l8.5 6.8M5.6 12.4V20h12.8v-7.6M10 20v-4.4h4V20",
  parcel: "M3.5 8.2 12 4.2l8.5 4V16L12 20l-8.5-4V8.2ZM12 20V9.4M3.5 8.2 12 12l8.5-3.8",
} as const;

const MASK =
  "linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)";

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
    // the reference drops a snapshot into the line; the pale border and the tilt are what
    // make it read as a photo pinned to the sentence rather than as an inline image
    return (
      <span
        aria-hidden="true"
        className="relative block h-[1.5em] w-[2em] shrink-0 overflow-hidden rounded-[3px] border-[0.09em] border-paper bg-ink shadow-[0_0.14em_0.34em_-0.2em_rgba(0,0,0,0.7)]"
        style={{ rotate: `${art.tilt}deg` }}
      >
        <Image src={art.src} alt="" fill sizes="140px" className="object-cover grayscale" />
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
      className={`w-auto shrink-0 drop-shadow-[0_0.16em_0.2em_rgba(0,0,0,0.55)] ${art.h}`}
      style={{ rotate: `${art.tilt}deg` }}
    />
  );
}

export default function DabbaCarries() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  /** How far the row has to travel: its own content width minus what fits on screen. */
  const [travel, setTravel] = useState(0);

  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );

  const scrubbing = !reduced;

  const measure = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    setTravel(Math.max(0, row.scrollWidth - row.clientWidth));
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    if (!scrubbing || !row) {
      setTravel(0);
      return;
    }

    measure();

    // the row's width tracks the viewport (the type is set in vw), and jumps again when
    // the display webfont lands and the metrics change under it
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    document.fonts?.ready.then(measure).catch(() => {});

    return () => observer.disconnect();
  }, [measure, scrubbing]);

  useEffect(() => {
    if (!scrubbing || travel <= 0) return;

    const onScroll = () => {
      const track = trackRef.current;
      const row = rowRef.current;
      if (!track || !row) return;

      // how far through the sticky span we are: 0 at the top, 1 when it lets go
      const span = track.offsetHeight - window.innerHeight;
      const raw = span <= 0 ? 0 : -track.getBoundingClientRect().top / span;
      const progress = Math.min(1, Math.max(0, raw));

      row.style.transform = `translate3d(${(-travel * progress).toFixed(2)}px, 0, 0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [travel, scrubbing]);

  return (
    <section
      ref={trackRef}
      className="grain relative overflow-hidden bg-ink"
      // tall enough to pan the whole row, and no taller
      style={
        scrubbing && travel > 0
          ? { height: `calc(100svh + ${Math.round(travel / PAN_PER_PX)}px)` }
          : undefined
      }
    >
      <div
        className={`flex flex-col justify-center ${
          scrubbing ? "sticky top-0 h-[100svh]" : "py-phi-6"
        }`}
      >
        <p className="mb-phi-4 px-5 text-center font-script text-[min(30px,3.4svh)] text-brand-orange sm:px-8">
          What a dabba carries
        </p>

        <div
          className={scrubbing ? "overflow-hidden" : "px-5 sm:px-8 lg:px-12"}
          style={scrubbing ? { maskImage: MASK, WebkitMaskImage: MASK } : undefined}
        >
          <div ref={rowRef} className={`will-change-transform ${scrubbing ? "px-[16vw]" : ""}`}>
            <p
              className={`flex items-center gap-x-[0.3em] gap-y-[0.35em] font-display text-[clamp(24px,4.4vw,56px)] font-bold leading-[1.25] text-brand-cream ${
                scrubbing ? "flex-nowrap whitespace-nowrap" : "flex-wrap justify-center"
              }`}
            >
              {DABBA_CARRIES.map((token, i) => (
                // index keys: the array is static and never reorders
                <span key={i} className="flex shrink-0 items-center gap-x-[0.3em]">
                  {token.chip ? (
                    <span
                      className={`rounded-[0.34em] px-[0.3em] pb-[0.1em] pt-[0.04em] ${CHIP[token.chip]}`}
                    >
                      {token.word}
                    </span>
                  ) : (
                    <span>{token.word}</span>
                  )}
                  {token.art && <Art art={token.art} />}
                </span>
              ))}
            </p>
          </div>
        </div>

        {scrubbing && (
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
