import Image from "next/image";

/**
 * "MUMBAI ---------- PERTH" dashed route rule from the poster set, with the plane
 * sticker tracking along the dashes. With `landmarks`, the two cities are anchored by
 * their own cut-outs — the Gateway of India and Perth's Bell Tower.
 */
export default function RouteTicker({
  from = "Mumbai",
  to = "Perth",
  className = "",
  style,
}: {
  from?: string;
  to?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      <div className="flex items-center gap-3">
        <span className="shrink-0 text-phi-0 font-bold uppercase tracking-[0.24em]">{from}</span>

        <span className="relative flex min-w-0 flex-1 items-center">
          <span className="ticker-rule" aria-hidden="true" />
          <Image
            src="/images/plane.webp"
            alt=""
            aria-hidden="true"
            width={120}
            height={120}
            className="plane-fly absolute top-1/2 h-8 w-8 drop-shadow-[0_3px_5px_rgba(42,24,16,0.3)]"
          />
        </span>

        <span className="shrink-0 text-phi-0 font-bold uppercase tracking-[0.24em]">{to}</span>
      </div>
    </div>
  );
}
