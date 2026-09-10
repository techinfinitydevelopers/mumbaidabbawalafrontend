import Image from "next/image";
import Reveal from "@/components/Reveal";
import { REGIONS } from "@/data/regions";

/**
 * Fills the sixth grid cell the five region cards leave empty on a 3-column row.
 * A bold three-line poster stack — the same `.poster-stack` used on every section
 * headline — with the tiffin cropped by the card's corner as the prop, the way a poster
 * breaks its frame with an object instead of a photo.
 */
const HEADLINE = [
  { text: "Five", tone: "text-brand-yellow" },
  { text: "Regions", tone: "text-brand-cream" },
  { text: "One Dabba", tone: "text-brand-green" },
] as const;

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
              <p className="mt-3 text-phi-1 leading-relaxed text-ink/70">
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

        <Reveal delay={REGIONS.length * 80}>
          <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-[28px] border border-brand-red/10 p-6 shadow-[0_8px_26px_-20px_rgba(42,24,16,0.28)]">
            <Image
              src="/images/cards/region-stat-bg.d10018e6.jpeg"
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />

            <h3 className="poster-stack relative z-10 [--po:2px] [--po-gap:2px]">
              {HEADLINE.map((line) => (
                <span
                  key={line.text}
                  className={`poster block text-[27px] leading-[0.92] sm:text-[32px] ${line.tone}`}
                  style={{ ["--po-color" as string]: "rgba(42,24,16,0.9)" }}
                >
                  {line.text}
                </span>
              ))}
            </h3>

            <p className="relative z-10 mt-4 max-w-[210px] text-[13px] leading-snug text-brand-cream/75">
              Real variety, every week — never the same three curries.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
