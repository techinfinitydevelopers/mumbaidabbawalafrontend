"use client";

import { useEffect, useState } from "react";
import { REVIEW_DECK } from "@/data/home";

/**
 * The reviews as an overlapping deck: three cards abreast, the middle one tilted, scaled
 * up and brought to the front, with the deck cycling so every review takes its turn in
 * the centre.
 *
 * Layout is a single-cell CSS grid with every card stacked in that one cell, which is
 * what makes the deck work without measuring anything: the cards are centred on each
 * other, they all take the same height, and transforms don't affect layout, so the tilt
 * and the scale can't reflow the page.
 *
 * That height is set rather than left to the copy, because the section has to hold one
 * screen — see `Testimonials`. It is capped against `svh`, so a short viewport gets a
 * shorter card and the quote type shrinks with it; the two clamps are tuned together so
 * the longest review in the doc still sets in four lines at the smallest size.
 *
 * It can be driven three ways: the arrows, the dots, or clicking either shoulder card to
 * bring it to the centre.
 *
 * Everything that moves is `transform` and `opacity` only — both stay on the compositor.
 * `box-shadow` is deliberately NOT animated (it repaints every frame); one shadow value
 * is used for all cards and `scale()` shrinks it on the two side cards for free, which is
 * also why the centre card reads as the one lifted off the page.
 */

/** How long each review holds the centre. */
const AUTOPLAY_MS = 4200;

/**
 * Signed distance from the active card, wrapped to the shorter way round the deck, so
 * card 0 sits to the right of the last card rather than N slots away.
 */
function offsetFrom(index: number, active: number, count: number) {
  let d = index - active;
  if (d > count / 2) d -= count;
  if (d < -count / 2) d += count;
  return d;
}

/**
 * Where a card sits, given its distance from the centre. `--deck-x` is the shoulder
 * offset and is set responsively on the track, so one rule covers every breakpoint.
 * Anything two or more slots out is parked off to its side and faded, ready to slide in.
 */
function slotStyle(d: number): React.CSSProperties {
  if (d === 0) {
    return {
      transform: "translateX(0) rotate(-6.5deg) scale(1.06)",
      zIndex: 30,
      opacity: 1,
    };
  }

  if (d === -1 || d === 1) {
    const side = d;
    return {
      transform: `translateX(calc(var(--deck-x) * ${side})) rotate(${side * 2.5}deg) scale(0.9)`,
      zIndex: 20,
      opacity: 1,
    };
  }

  const side = d < 0 ? -1 : 1;
  return {
    transform: `translateX(calc(var(--deck-x) * ${side * 2})) rotate(${side * 4}deg) scale(0.82)`,
    zIndex: 10,
    opacity: 0,
    // invisible but still in the layer: without this it would keep catching clicks
    // meant for whatever is under it, which only shows up once the deck holds >3
    pointerEvents: "none",
  };
}

/**
 * Filled and empty stars, drawn rather than typed, so the rating renders as artwork.
 * A yellow sticker on the red panel, tilted like the reference card's.
 */
function Rating({ stars }: { stars: number }) {
  return (
    <p
      // self-start, or the flex column stretches the sticker to the card's full width
      className="-rotate-2 inline-flex self-start gap-0.5 rounded-full bg-brand-yellow px-2.5 py-1"
      aria-label={`${stars} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={i < stars ? "text-brand-red" : "text-brand-red/25"}
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

export default function ReviewDeck() {
  const count = REVIEW_DECK.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // One card can't rotate, and a reader who has asked for less motion shouldn't be
    // handed a carousel that moves on its own — they still get the deck, and the arrows.
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [paused, count]);

  const step = (delta: number) => setActive((i) => (i + delta + count) % count);

  return (
    <div
      // Hovering or tabbing into the deck stops the rotation, so a review can't slide
      // away mid-sentence while it is being read.
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* py- leaves room for the centre card's tilt and scale to overhang the cell
          without the section's overflow clipping its corners. */}
      <div className="grid grid-cols-1 grid-rows-1 [--deck-x:60%] py-[min(48px,5.2svh)] sm:[--deck-x:70%] lg:[--deck-x:78%]">
        {REVIEW_DECK.map((review, i) => {
          const d = offsetFrom(i, active, count);

          return (
            <figure
              key={`${review.name}-${review.suburb}`}
              // every card is in the same grid cell: same height, centred, stacked
              className="relative col-start-1 row-start-1 flex h-[clamp(230px,36svh,340px)] w-[264px] flex-col justify-self-center rounded-[30px] bg-paper p-3.5 shadow-[0_18px_44px_-26px_rgba(42,24,16,0.5)] transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform motion-reduce:transition-none sm:w-[300px] lg:w-[344px]"
              style={slotStyle(d)}
            >
              {/* Clicking a shoulder card brings it to the centre.
                  It is an overlay button rather than a handler on the <figure>, because a
                  <figure> is not focusable or keyboard-operable and a <button> may not wrap
                  a <blockquote>. Only the two shoulders get one: the centre card has none,
                  so its quote stays selectable, and the parked cards get none either, so
                  they never take a tab stop while invisible. */}
              {Math.abs(d) === 1 && (
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show the review from ${review.name}`}
                  className="absolute inset-0 z-10 cursor-pointer rounded-[30px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
                />
              )}

              {/* the red panel sits where the reference card's photo does — the frame is
                  the pale thing and the panel is the dark thing, which is what makes the
                  quote carry at deck scale on a cream ground. */}
              <div className="flex flex-1 flex-col overflow-hidden rounded-[22px] bg-brand-red p-[min(21px,2.4svh)]">
                <Rating stars={review.stars} />

                <blockquote className="mt-phi-3 flex-1">
                  <p className="font-display text-[min(20px,2.1svh)] font-bold leading-snug text-brand-cream">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </blockquote>
              </div>

              {/* the frame's footer, as on the reference card: a dot, then the name */}
              <figcaption className="flex items-center gap-2.5 px-2 pb-1 pt-3">
                <span
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 rounded-full bg-brand-orange"
                />
                <span className="text-phi-0 font-bold uppercase tracking-[0.16em] text-ink/55">
                  {review.name} · {review.suburb}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {count > 1 && (
        <div className="mt-phi-2 flex items-center justify-center gap-phi-3">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous review"
            className="grid h-10 w-10 place-items-center rounded-full border-2 border-brand-red/25 text-brand-red transition-colors duration-300 hover:border-brand-red hover:bg-brand-red hover:text-brand-cream"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M14 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {REVIEW_DECK.map((review, i) => (
              <button
                key={`${review.name}-${review.suburb}`}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show the review from ${review.name}`}
                aria-current={i === active || undefined}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  i === active ? "w-7 bg-brand-red" : "w-2.5 bg-brand-red/25 hover:bg-brand-red/50"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next review"
            className="grid h-10 w-10 place-items-center rounded-full border-2 border-brand-red/25 text-brand-red transition-colors duration-300 hover:border-brand-red hover:bg-brand-red hover:text-brand-cream"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M10 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
