"use client";

import Image from "next/image";
import { IconButton } from "@/components/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Addon } from "@/data/addons";

/**
 * Horizontal add-on slider: a real scroll container with snap points, so it swipes on
 * touch and scrolls with the wheel, plus arrow buttons for pointer users.
 *
 * Arrow state is updated from scroll/resize callbacks rather than during an effect, so the
 * component doesn't set state while mounting.
 */
export default function AddonSlider({ items }: { items: Addon[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync]);

  const scrollByCards = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // one card plus its gap, so a click always lands on a snap point
    const card = el.querySelector("article");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: step * direction, behavior: reduced ? "instant" : "smooth" });
  };

  const hasOverflow = !(atStart && atEnd);

  return (
    <div className="relative">
      {hasOverflow && (
        <div className="pointer-events-none absolute -top-16 right-0 hidden gap-2 sm:flex">
          {(
            [
              { dir: -1 as const, label: "Previous add-ons", disabled: atStart, d: "M15 6l-6 6 6 6" },
              { dir: 1 as const, label: "Next add-ons", disabled: atEnd, d: "M9 6l6 6-6 6" },
            ]
          ).map((btn) => (
            <IconButton
              key={btn.label}
              size={44}
              onClick={() => scrollByCards(btn.dir)}
              disabled={btn.disabled}
              aria-label={btn.label}
              className="pointer-events-auto"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d={btn.d}
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconButton>
          ))}
        </div>
      )}

      {/* No `scroll-smooth` class here: smoothness is passed per-scroll in JS instead, so a
          direct scrollLeft assignment stays predictable and reduced motion is honoured. */}
      <div
        ref={trackRef}
        onScroll={sync}
        tabIndex={0}
        role="region"
        aria-label="Add-ons"
        className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-4 pt-2"
      >
        {items.map((addon) => (
          <article
            key={addon.name}
            className="group w-[248px] shrink-0 snap-start overflow-hidden rounded-[28px] border border-brand-red/10 bg-paper shadow-[0_9px_28px_-20px_rgba(42,24,16,0.55)] transition-transform duration-500 hover:-translate-y-1.5 sm:w-[268px]"
          >
            <div className="relative aspect-[5/4] overflow-hidden bg-gradient-to-b from-[#fff8e3] to-brand-cream">
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(243,98,32,0.32) 0%, rgba(255,218,45,0.18) 45%, transparent 72%)",
                }}
              />
              <span className="absolute left-4 top-4 z-10 rounded-full bg-paper/90 px-3 py-1 text-[9.5px] font-bold uppercase tracking-[0.14em] text-brand-green-dark backdrop-blur-sm">
                {addon.availability}
              </span>
              <Image
                src={addon.src}
                alt={addon.name}
                width={800}
                height={800}
                sizes="280px"
                className="absolute left-1/2 top-1/2 h-auto w-[72%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_16px_20px_rgba(42,24,16,0.3)] transition-transform duration-500 group-hover:scale-107"
              />
            </div>

            <div className="p-5">
              <h3 className="font-display text-[16px] font-bold leading-tight text-ink">
                {addon.name}
              </h3>
              <p className="mt-1 text-[12.5px] leading-snug text-ink/65">{addon.note}</p>
              <p className="mt-4">
                <span className="inline-block rounded-full bg-brand-red px-4 py-1.5 font-poster text-lg leading-none text-brand-cream">
                  {addon.price}
                </span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
