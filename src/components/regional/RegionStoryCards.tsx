import Reveal from "@/components/Reveal";
import { REGIONS } from "@/data/regions";

/**
 * The five cuisines as readable story cards — tagline, the region's story, and its
 * signature dishes. Anchored by region id so a menu day or a nav link can jump to one.
 */
export default function RegionStoryCards({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REGIONS.map((region, i) => (
          <Reveal key={region.id} delay={i * 80}>
            <div
              id={region.id}
              // the graph print belongs to the cream page behind these; on the card it fights it
              className="h-full scroll-mt-28 rounded-[28px] border border-brand-red/10 bg-paper p-6 shadow-[0_8px_26px_-20px_rgba(42,24,16,0.28)]"
            >
              <span className="font-script text-2xl text-brand-orange">{region.tagline}</span>
              <h3
                className="poster mt-1 text-3xl text-brand-red [--po:3px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                {region.name}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-ink/70">
                {region.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {region.dishes.map((dish) => (
                  <span
                    key={dish}
                    className="rounded-full bg-brand-green/20 px-3 py-1 text-[11px] font-bold text-brand-green-dark"
                  >
                    {dish}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
