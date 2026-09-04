import Image from "next/image";

/**
 * Hero food group: the dabba itself is the focus at the centre, with its own containers —
 * each packed with one region's dish — arranged around it, overlapping, so the whole thing
 * reads as one dabba opened out.
 *
 * Every piece carries its own `rotate`/`translate` inline. The group slides in as one unit
 * from the left (`.slide-in-left` on the wrapper), so nothing here animates individually.
 */

export type Piece = {
  src: string;
  alt: string;
  /** centre of the piece, as a % of the group box */
  x: number;
  y: number;
  /** width, as a % of the group box */
  size: number;
  rotate: number;
  z: number;
};

const SPICES: Piece[] = [
  { src: "/images/cutouts/spice-cinnamon.png", alt: "", x: 33, y: 8, size: 8, rotate: -24, z: 1 },
  { src: "/images/cutouts/spice-staranise.png", alt: "", x: 67, y: 7, size: 5.5, rotate: 14, z: 1 },
  { src: "/images/cutouts/spice-curryleaf.png", alt: "", x: 5, y: 47, size: 6.5, rotate: -10, z: 1 },
  { src: "/images/cutouts/spice-chilli.png", alt: "", x: 95, y: 48, size: 6, rotate: 18, z: 1 },
];

/** the five slots the containers sit in — content varies per page */
export const TIN_SLOTS = [
  { x: 22, y: 26, size: 27, rotate: -6, z: 2 },
  { x: 78, y: 27, size: 27, rotate: 5, z: 2 },
  { x: 79, y: 71, size: 28, rotate: 4, z: 4 },
  { x: 21, y: 71, size: 28, rotate: -5, z: 4 },
  { x: 50, y: 89, size: 29, rotate: 2, z: 5 },
] as const;

/** default ring: one container per region */
export const REGION_TINS: Piece[] = [
  {
    src: "/images/items/tin-dhokla.png",
    alt: "A dabba container of Gujarati dhokla",
    x: 22,
    y: 26,
    size: 27,
    rotate: -6,
    z: 2,
  },
  {
    src: "/images/items/tin-butterchicken.png",
    alt: "A dabba container of Punjabi butter chicken",
    x: 78,
    y: 27,
    size: 27,
    rotate: 5,
    z: 2,
  },
  {
    src: "/images/items/tin-fishcurry.png",
    alt: "A dabba container of Konkan fish curry",
    x: 79,
    y: 71,
    size: 28,
    rotate: 4,
    z: 4,
  },
  {
    src: "/images/items/tin-dal.png",
    alt: "A dabba container of Rajasthani dal baati",
    x: 21,
    y: 71,
    size: 28,
    rotate: -5,
    z: 4,
  },
  {
    src: "/images/items/tin-sambar.png",
    alt: "A dabba container of South Indian sambar and idli",
    x: 50,
    y: 89,
    size: 29,
    rotate: 2,
    z: 5,
  },
];

export default function HeroPlatter({
  className = "",
  sizes = "(min-width: 1024px) 46vw, 88vw",
  tins = REGION_TINS,
}: {
  className?: string;
  sizes?: string;
  /** the five containers ringing the dabba — swap per page */
  tins?: Piece[];
}) {
  return (
    <div className={className}>
      <div className="relative aspect-[1/0.88] w-full">
        {SPICES.map((spice, i) => (
          <Image
            key={`${spice.src}-${i}`}
            src={spice.src}
            alt=""
            aria-hidden="true"
            width={220}
            height={220}
            sizes="80px"
            className="absolute h-auto opacity-90"
            style={{
              left: `${spice.x}%`,
              top: `${spice.y}%`,
              width: `${spice.size}%`,
              rotate: `${spice.rotate}deg`,
              translate: "-50% -50%",
              zIndex: spice.z,
            }}
          />
        ))}

        {/* the dabba — the focus of the whole section */}
        <Image
          src="/images/items/dabba-centre.png"
          alt="A three-tier stainless steel Mumbai dabba"
          width={1024}
          height={1024}
          priority
          sizes={sizes}
          className="absolute h-auto drop-shadow-[0_32px_38px_rgba(42,24,16,0.34)]"
          style={{
            left: "50%",
            top: "46%",
            width: "54%",
            translate: "-50% -50%",
            zIndex: 3,
          }}
        />

        {tins.map((tin) => (
          <Image
            key={tin.src}
            src={tin.src}
            alt={tin.alt}
            width={800}
            height={800}
            sizes="240px"
            loading="eager"
            className="absolute h-auto drop-shadow-[0_18px_22px_rgba(42,24,16,0.3)]"
            style={{
              left: `${tin.x}%`,
              top: `${tin.y}%`,
              width: `${tin.size}%`,
              rotate: `${tin.rotate}deg`,
              translate: "-50% -50%",
              zIndex: tin.z,
            }}
          />
        ))}
      </div>
    </div>
  );
}
