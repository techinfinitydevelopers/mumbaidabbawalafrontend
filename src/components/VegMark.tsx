/**
 * The Indian packaged-food veg / non-veg mark: a filled dot inside a rounded square.
 * Drawn as SVG rather than shipped as artwork so it stays crisp at 12px and can take
 * the brand palette (or `currentColor`) instead of the stock pure green and red.
 */
export default function VegMark({
  type,
  className = "h-3.5 w-3.5",
  color,
  label,
}: {
  type: "veg" | "nonveg";
  className?: string;
  /** Any CSS colour; defaults to the brand green / red. Pass "currentColor" to inherit. */
  color?: string;
  /** Set to announce the mark; leave unset when adjacent text already says "Veg". */
  label?: string;
}) {
  const stroke =
    color ?? (type === "veg" ? "var(--color-brand-green-dark)" : "var(--color-brand-red)");

  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <rect
        x="1.6"
        y="1.6"
        width="20.8"
        height="20.8"
        rx="5"
        fill="none"
        stroke={stroke}
        strokeWidth="2.4"
      />
      <circle cx="12" cy="12" r="6.1" fill={stroke} />
    </svg>
  );
}
