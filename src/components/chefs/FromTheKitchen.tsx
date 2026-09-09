import Reveal from "@/components/Reveal";
import RuleFan from "@/components/chefs/RuleFan";

/**
 * The four kitchen rules, introduced and then dealt out as a deck.
 *
 * The deck itself is `RuleFan` — a client component, because the cards part around the
 * pointer and that needs a listener. Everything above it is static, so it stays on the
 * server.
 */

export default function FromTheKitchen() {
  return (
    <section id="fromTheKitchen" className="fan-clip relative bg-paper pb-phi-6 pt-phi-5 sm:pb-phi-7">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <Reveal className="text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/8 px-4 py-1.5">
            <span className="text-phi-0 font-bold uppercase tracking-[0.18em] text-brand-red">
              135-Year Culinary Wisdom
            </span>
          </div>

          <h2 className="poster-stack mx-auto mt-3 [--po:3px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
            <span
              className="poster block text-[32px] text-brand-red sm:text-[46px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              Wisdom From The
            </span>
            <span
              className="poster block text-[32px] text-brand-green-dark sm:text-[46px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              Dabbawala Kitchen
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-measure text-phi-2 leading-relaxed text-ink/70">
            Four rules the kitchen never breaks — the ones that decide whether food
            still tastes cooked-just-now three hours after it left the pan.
          </p>
        </Reveal>

        {/* One Reveal around the whole deck, not one per card. `.reveal` keeps a
            translate3d even when shown, which makes it a stacking context — wrapping
            each card individually trapped its `z-index` inside its own wrapper, so the
            wrappers stayed in DOM order and the active card could never come forward. */}
        <Reveal className="mt-phi-5 sm:mt-phi-6">
          <RuleFan />
        </Reveal>

      </div>
    </section>
  );
}
