import Image from "next/image";
import type { DishCluster as DishClusterData } from "@/data/regions";

const SHADOW = "drop-shadow-[0_18px_22px_rgba(42,24,16,0.32)]";

/**
 * Composes separately shot dish stickers into one hand-placed looking group — no plate
 * or tray underneath, matching the reference cards.
 */
export default function DishCluster({
  cluster,
  alt,
  eager = false,
  sizes = "380px",
}: {
  cluster: DishClusterData;
  alt: string;
  eager?: boolean;
  sizes?: string;
}) {
  const common = {
    width: 700,
    height: 700,
    sizes,
    loading: eager ? ("eager" as const) : undefined,
  };

  return (
    <div className="relative aspect-[1/0.78] w-full">
      {/* main piece — bread, baati, dosa — anchors the group */}
      <Image
        {...common}
        src={cluster.main}
        alt={alt}
        className={`absolute bottom-0 right-[4%] h-auto w-[62%] rotate-[6deg] ${SHADOW}`}
      />
      {/* upper bowl, overlapping the main piece's shoulder */}
      <Image
        {...common}
        src={cluster.top}
        alt=""
        aria-hidden="true"
        className={`absolute left-[8%] top-0 h-auto w-[43%] -rotate-[4deg] ${SHADOW}`}
      />
      {/* lower bowl, tucked into the main piece */}
      <Image
        {...common}
        src={cluster.bottom}
        alt=""
        aria-hidden="true"
        className={`absolute bottom-[8%] left-0 h-auto w-[38%] rotate-[8deg] ${SHADOW}`}
      />
      {/* optional fourth piece for the hero group */}
      {cluster.extra && (
        <Image
          {...common}
          src={cluster.extra}
          alt=""
          aria-hidden="true"
          className={`absolute right-0 top-[4%] h-auto w-[30%] rotate-[10deg] ${SHADOW}`}
        />
      )}
    </div>
  );
}
