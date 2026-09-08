import Image from "next/image";
import { WALL_LEFT, WALL_RIGHT } from "@/data/contact";

/**
 * The photo wall beside the waitlist: two columns of dabbawala photographs sliding past
 * each other, cropped by the panel so they read as a window onto a much larger set.
 *
 * Each column renders its list twice because the keyframe travels -50% — that is what
 * makes the loop seamless. The second pass is `aria-hidden`, so a screen reader is not
 * read the same photographs over again, and the images are decorative anyway.
 *
 * The two columns run in opposite directions (`--wall-dir`), which is the whole trick:
 * matched directions read as one grid scrolling, opposed directions read as a wall.
 *
 * Motion, the pause on hover and the reduced-motion stop all live in `globals.css` under
 * `.wall-col`.
 */

/** One column. `dir` flips the travel; `dur` staggers the two so they never sync up. */
function Column({
  ids,
  dir,
  dur,
  className = "",
}: {
  ids: string[];
  dir?: "reverse";
  dur: string;
  className?: string;
}) {
  return (
    <div className={`min-w-0 flex-1 overflow-hidden ${className}`}>
      <div
        className="wall-col flex flex-col gap-3 sm:gap-4"
        style={
          {
            "--wall-dur": dur,
            ...(dir ? { "--wall-dir": dir } : {}),
          } as React.CSSProperties
        }
      >
        {[...ids, ...ids].map((id, i) => (
          <div
            key={`${id}-${i}`}
            aria-hidden={i >= ids.length || undefined}
            className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[15px] bg-brand-cream shadow-[0_10px_26px_-20px_rgba(42,24,16,0.45)]"
          >
            <Image
              src={`/images/about/${id}.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 22vw, 44vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PhotoWall() {
  return (
    // the panel is what crops the columns; the fade at top and bottom is what stops the
    // crop reading as a hard cut
    <div
      aria-hidden="true"
      className="wall relative h-[clamp(320px,58svh,560px)] overflow-hidden rounded-[24px] bg-brand-cream/50 p-3 sm:p-4"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, #000 7%, #000 93%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, #000 7%, #000 93%, transparent 100%)",
      }}
    >
      <div className="flex h-full gap-3 sm:gap-4">
        <Column ids={WALL_LEFT} dur="58s" />
        <Column ids={WALL_RIGHT} dur="46s" dir="reverse" />
      </div>
    </div>
  );
}
