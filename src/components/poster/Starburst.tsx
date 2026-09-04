/**
 * Spiky sunburst badge, as used behind the "1890 → 2026" mark on the poster set.
 * The caller owns positioning via `className` (including any position utility), so the
 * component must not set one itself — the inner wrapper anchors the label instead.
 */
export default function Starburst({
  className = "",
  fill = "var(--color-brand-orange)",
  points = 30,
  children,
}: {
  className?: string;
  fill?: string;
  points?: number;
  children?: React.ReactNode;
}) {
  const outer = 100;
  const inner = 84;
  const path = Array.from({ length: points * 2 }, (_, i) => {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI * i) / points - Math.PI / 2;
    return `${(100 + radius * Math.cos(angle)).toFixed(2)},${(100 + radius * Math.sin(angle)).toFixed(2)}`;
  }).join(" ");

  return (
    <div className={className}>
      <div className="relative h-full w-full">
        <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full">
          <polygon points={path} fill={fill} />
        </svg>
        {children && (
          <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
        )}
      </div>
    </div>
  );
}
