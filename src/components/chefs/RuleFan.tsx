"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { KITCHEN_RULES } from "@/data/kitchenRules";

/**
 * The four kitchen rules as a deck that parts around the cursor.
 *
 * The interaction is the one on aardvarkbookclub.com's "How it works" deck, and the
 * thing that makes it feel different from an ordinary card hover is that it is **not a
 * hover at all**. The row is divided into as many equal vertical bands as there are
 * cards, and whichever band the pointer is in decides the active card. Two things follow
 * from that:
 *
 *  - the deck reacts the instant the cursor crosses a boundary, with no dead ground
 *    between cards and no need to reach the visible sliver of a card buried under its
 *    neighbour — which matters here, where each card overlaps the one before it by 64px;
 *  - moving *within* a band does nothing. The handler compares against the last band and
 *    returns early, so a slow sweep across one card is silent rather than a stream of
 *    no-op style writes.
 *
 * The active card straightens out of its tilt, lifts, and scales up. Every other card is
 * shoved sideways by `PUSH / (index - active)` percent — a signed reciprocal, so the
 * direction and the falloff both fall out of one expression: the immediate neighbours
 * move the full amount, the next ones half of it, and so on. That is what reads as the
 * deck *parting* rather than as one card popping.
 *
 * ## What this does not copy
 *
 * The reference re-randomises a card's tilt every time the pointer leaves it, so the deck
 * is never twice the same. Here the resting fan is designed — the tilts and drops in
 * `FAN` are chosen so the four cards read as dealt by hand — and randomising would throw
 * that away and make the section restless. Cards return to their own resting angle.
 *
 * The reference also ignores `prefers-reduced-motion`; its cards fly in and spring about
 * whatever the visitor has asked for. This binds nothing under that setting.
 *
 * No animation library: the motion is CSS transitions on custom properties, with an
 * `--ease-elastic` curve sampled from GSAP's `elastic.out(1, 0.75)`. Script only writes
 * which card is active — it runs no loop and touches no layout property.
 */

/** Per-card tilt and drop, so the fan looks dealt by hand rather than generated. */
const FAN = [
  { tilt: "-4.5deg", drop: "0px" },
  { tilt: "3deg", drop: "26px" },
  { tilt: "-2deg", drop: "8px" },
  { tilt: "4.5deg", drop: "32px" },
];

/** How far the immediate neighbours of the active card are shoved aside, in percent. */
const PUSH = 45;

/** How far the active card rises out of the fan. */
const LIFT = 22;

const SCALE = 1.075;

/** Desktop only: below this the fan unstacks into a column and there is nothing to part. */
const INTERACTIVE =
  "(min-width: 640px) and (hover: hover) and (prefers-reduced-motion: no-preference)";

export default function RuleFan() {
  const rowRef = useRef<HTMLDivElement>(null);
  const slots = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row || !window.matchMedia(INTERACTIVE).matches) return;

    /** The band under the pointer on the last move, so unchanged bands cost nothing. */
    let active = -1;

    const paint = (next: number) => {
      active = next;

      slots.current.forEach((slot, i) => {
        if (!slot) return;
        const card = slot.firstElementChild as HTMLElement | null;
        const isActive = i === next;

        slot.dataset.active = String(isActive);

        if (isActive) {
          slot.style.setProperty("--fan-rot", "0deg");
          slot.style.setProperty("--fan-lift", `calc(var(--fan-drop, 0px) - ${LIFT}px)`);
          slot.style.setProperty("--fan-scale", String(SCALE));
          slot.style.setProperty("--fan-z", "40");
        } else {
          slot.style.removeProperty("--fan-rot");
          slot.style.removeProperty("--fan-lift");
          slot.style.removeProperty("--fan-scale");
          slot.style.setProperty("--fan-z", String(i + 1));
        }

        // the signed reciprocal: nearest neighbours move furthest, and the sign carries
        // which side of the active card they are on
        if (card) {
          card.style.setProperty("--fan-push", next < 0 || isActive ? "0" : String(PUSH / (i - next)));
        }
      });
    };

    const onMove = (e: MouseEvent) => {
      const rect = row.getBoundingClientRect();
      if (rect.width <= 0) return;

      const share = (e.clientX - rect.left) / rect.width;
      const band = Math.min(KITCHEN_RULES.length - 1, Math.max(0, Math.floor(share * KITCHEN_RULES.length)));

      if (band !== active) paint(band);
    };

    const onLeave = () => {
      if (active !== -1) paint(-1);
    };

    row.addEventListener("mousemove", onMove);
    row.addEventListener("mouseleave", onLeave);

    return () => {
      row.removeEventListener("mousemove", onMove);
      row.removeEventListener("mouseleave", onLeave);
      paint(-1);
    };
  }, []);

  return (
    <div
      ref={rowRef}
      className="flex flex-col items-center gap-phi-3 sm:flex-row sm:items-start sm:justify-center sm:gap-0"
    >
      {KITCHEN_RULES.map((rule, i) => {
        const fan = FAN[i % FAN.length];

        return (
          <div
            key={rule.title}
            ref={(el) => {
              slots.current[i] = el;
            }}
            className={`fan-slot ${i > 0 ? "sm:-ml-12 lg:-ml-16" : ""}`}
            style={
              {
                "--fan-tilt": fan.tilt,
                "--fan-drop": fan.drop,
                "--fan-z": i + 1,
              } as React.CSSProperties
            }
          >
            <article
              className={`fan-card w-[280px] rounded-[28px] p-phi-3 sm:w-[248px] sm:p-phi-3 lg:w-[288px] lg:p-phi-4 ${rule.tone.bg} ${rule.tone.text}`}
            >
              {/* the cut-out breaks the card's top edge, as the reference's stickers do.
                  Kept on the left: each card overlaps the one to its left, so a sticker
                  on the right would disappear under the next card. */}
              <div className="relative -mt-phi-5 mb-phi-1 h-16">
                <Image
                  src={rule.sticker}
                  alt=""
                  width={200}
                  height={200}
                  className="absolute -left-2 top-0 h-[86px] w-auto -rotate-12 drop-shadow-[0_10px_14px_rgba(42,24,16,0.4)]"
                />
              </div>

              <p className="text-phi-0 font-bold uppercase tracking-[0.16em] opacity-70">
                {rule.rule.replace("🌿 ", "")} · {rule.step}
              </p>
              <h3 className="mt-1 font-display text-phi-4 font-bold leading-tight">
                {rule.title}
              </h3>

              <span
                aria-hidden="true"
                className={`mt-phi-2 mb-phi-2 block h-px w-full ${rule.tone.rule}`}
              />

              <ul className="space-y-2">
                {rule.points.map((point) => (
                  <li key={point} className="flex gap-2 text-phi-1 leading-relaxed">
                    <span aria-hidden="true" className={`shrink-0 ${rule.tone.bullet}`}>
                      ✦
                    </span>
                    <span className="opacity-90">{point}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-phi-3 border-t border-current/15 pt-phi-2 text-phi-0 font-bold uppercase tracking-[0.14em] opacity-70">
                {rule.footerLabel}
              </p>
            </article>
          </div>
        );
      })}
    </div>
  );
}
