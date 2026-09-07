/**
 * The wave that hands a cream section over to the red one below it.
 *
 * It is a clipped <div> rather than an <svg> path so the graph-paper grid keeps
 * running through the curve — an <svg fill> paints flat colour and leaves the
 * print stopping dead at the section seam.
 */
export default function WaveDivider({
  tone = "bg-paper",
  textured = true,
  className = "",
}: {
  /** Background utility for the cream side of the wave. */
  tone?: string;
  /**
   * Carry the graph print through the curve. Only correct when the section ABOVE is
   * printed too — on a plain `bg-paper` section the grid would start abruptly inside
   * the band and draw a hard line along its top edge.
   */
  textured?: boolean;
  className?: string;
}) {
  return (
    <>
      <svg aria-hidden="true" className="absolute h-0 w-0" focusable="false">
        <defs>
          {/*
            Normalised from a 1440x150 box, so it stretches like preserveAspectRatio="none".
            It closes at y=-0.2 rather than 0 so the shape has no edge sitting on row 0,
            where partial coverage would let the colour underneath bleed a hairline. The
            element's own box still limits what actually paints.
            Every control point is kept between y=30 and y=104 of that 150: the previous path
            swung to -10 and 0, which put the crest above the band's own top edge, so the curve
            flattened against it and the wave read as two separate humps. One trough, one crest.
          */}
          <clipPath id="wave-divider" clipPathUnits="objectBoundingBox">
            <path d="M0,0.2933 C0.2083,0.64 0.4306,0.6933 0.625,0.4533 C0.8194,0.2133 0.9236,0.2 1,0.2667 L1,-0.2 L0,-0.2 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        aria-hidden="true"
        className={`absolute left-0 top-0 z-10 h-[110px] w-full sm:h-[150px] ${textured ? "graph-paper" : ""} ${tone} ${className}`}
        style={{ clipPath: "url(#wave-divider)" }}
      />
    </>
  );
}
