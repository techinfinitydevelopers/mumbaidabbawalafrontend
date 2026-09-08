import Button from "@/components/Button";
import DishCluster from "./DishCluster";
import type { Region } from "@/data/regions";

const TONES = {
  orange: {
    card: "bg-brand-orange",
    kicker: "text-brand-cream/90",
    name: "text-brand-cream",
    nameShadow: "rgba(175,20,17,0.85)",
    body: "text-brand-cream/90",
    button: "cream" as const,
    badgeLabel: "text-ink/45",
    badgeValue: "text-brand-orange",
  },
  cream: {
    card: "bg-brand-cream",
    kicker: "text-brand-orange",
    name: "text-brand-red",
    nameShadow: "var(--color-brand-yellow)",
    body: "text-ink/70",
    button: "red" as const,
    badgeLabel: "text-ink/45",
    badgeValue: "text-brand-red",
  },
} as const;

export default function RegionCard({
  region,
  ariaHidden = false,
}: {
  region: Region;
  ariaHidden?: boolean;
}) {
  const tone = TONES[region.tone];

  return (
    <article
      aria-hidden={ariaHidden || undefined}
      className="group relative w-[318px] shrink-0 pt-[136px] sm:w-[386px] sm:pt-[164px]"
    >
      {/* Dish stickers, breaking out above the card */}
      <div className="pointer-events-none absolute -top-6 left-0 z-20 w-[88%] transition-transform duration-700 ease-out group-hover:-translate-y-3 group-hover:scale-[1.03] sm:-left-2">
        <DishCluster
          cluster={region.cluster}
          alt={`${region.name} thali — ${region.dishes.join(", ")}`}
          eager
        />
      </div>

      {/* Circular seal badge, echoing the reference's price roundel */}
      <div className="absolute right-3 top-[90px] z-30 grid h-[92px] w-[92px] place-items-center rounded-full bg-paper text-center shadow-[0_6px_18px_-8px_rgba(42,24,16,0.28)] sm:right-4 sm:top-[112px] sm:h-[106px] sm:w-[106px]">
        <div>
          <span className={`block text-[8px] font-bold tracking-[0.22em] ${tone.badgeLabel}`}>
            REGION
          </span>
          <span className={`block font-display text-2xl font-bold leading-none ${tone.badgeValue}`}>
            {region.index}
          </span>
          <span className="mt-0.5 block font-script text-sm leading-none text-ink/55">
            of five
          </span>
        </div>
      </div>

      {/* Card body */}
      <div
        className={`relative rounded-[46px] px-7 pb-8 pt-20 shadow-[0_10px_36px_-22px_rgba(42,24,16,0.26)] transition-transform duration-500 ease-out group-hover:-translate-y-2 sm:rounded-[54px] sm:px-9 sm:pb-9 sm:pt-24 ${tone.card}`}
      >
        <span className={`block font-script text-2xl leading-none ${tone.kicker}`}>
          {region.kicker}
        </span>
        <h3
          className={`poster mt-1 text-[42px] [--po:3px] sm:text-[52px] sm:[--po:4px] ${tone.name}`}
          style={{ ["--po-color" as string]: tone.nameShadow }}
        >
          {region.name}
        </h3>
        <p className={`mt-1.5 font-script text-xl leading-tight ${tone.kicker}`}>
          {region.tagline}
        </p>
        <p className={`mt-4 text-phi-1 leading-relaxed ${tone.body}`}>{region.description}</p>

        <div className="mt-6 flex justify-end">
          <Button
            href="/menu"
            tabIndex={ariaHidden ? -1 : undefined}
            variant={tone.button}
            size="md"
          >
            Explore Menu
          </Button>
        </div>
      </div>
    </article>
  );
}
