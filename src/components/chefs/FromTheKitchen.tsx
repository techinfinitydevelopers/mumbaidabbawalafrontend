import Image from "next/image";
import Reveal from "@/components/Reveal";
import { KITCHEN_RULES } from "@/data/kitchenRules";

/**
 * The four kitchen rules as a fanned deck of coloured cards.
 *
 * Each card overlaps the one before it and sits at a slight tilt; hovering
 * straightens it, lifts it and brings it to the front. The tilt, drop and stacking
 * order are passed as custom properties, not inline styles, because an inline
 * `rotate` or `z-index` would beat the `:hover` rule in `globals.css`.
 *
 * Below 640px the fan unstacks into a plain column — four overlapping tilted cards
 * are unreadable at phone width.
 */

/** Per-card tilt and drop, so the fan looks dealt by hand rather than generated. */
const FAN = [
  { tilt: "-4.5deg", drop: "0px" },
  { tilt: "3deg", drop: "26px" },
  { tilt: "-2deg", drop: "8px" },
  { tilt: "4.5deg", drop: "32px" },
];

export default function FromTheKitchen() {
  return (
    <section id="fromTheKitchen" className="relative bg-paper pb-phi-6 pt-phi-5 sm:pb-phi-7">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <Reveal className="text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/8 px-4 py-1.5">
            <span className="text-phi-0 font-bold uppercase tracking-[0.18em] text-brand-red">
              135-Year Culinary Wisdom
            </span>
          </div>

          <h2 className="poster-stack mx-auto mt-3 [--po:3px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
            <span className="poster block text-[32px] text-ink sm:text-[46px]">
              Wisdom From The
            </span>
            <span className="poster block text-[32px] text-brand-red sm:text-[46px]">
              Dabbawala Kitchen
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-measure text-phi-2 leading-relaxed text-ink/70 sm:text-phi-3">
            Four rules the kitchen never breaks — the ones that decide whether food
            still tastes cooked-just-now three hours after it left the pan.
          </p>
        </Reveal>

        <div className="mt-phi-5 flex flex-col items-center gap-phi-3 sm:mt-phi-6 sm:flex-row sm:items-start sm:justify-center sm:gap-0">
          {KITCHEN_RULES.map((rule, i) => {
            const fan = FAN[i % FAN.length];

            return (
              <Reveal
                key={rule.title}
                delay={i * 90}
                className={i > 0 ? "sm:-ml-12 lg:-ml-16" : undefined}
              >
                <article
                  className={`fan-card w-[280px] rounded-[28px] p-phi-3 shadow-[0_18px_44px_-26px_rgba(42,24,16,0.5)] sm:w-[248px] sm:p-phi-3 lg:w-[288px] lg:p-phi-4 ${rule.tone.bg} ${rule.tone.text}`}
                  style={
                    {
                      "--fan-tilt": fan.tilt,
                      "--fan-drop": fan.drop,
                      "--fan-z": i + 1,
                    } as React.CSSProperties
                  }
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
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
