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

export type Dabba = {
  src: string;
  /** native pixel size of `src`, for Next/Image's aspect ratio */
  width: number;
  height: number;
  /** width, as a % of the group box */
  size: number;
};

/** the tall tiffin-can photo, current default centrepiece */
export const DEFAULT_DABBA: Dabba = {
  src: "/images/items/dabba-centre.3de5b694.png",
  width: 269,
  height: 594,
  size: 20,
};

/** the original square-cutout dabba, kept for the one page not moving to the new set */
export const CLASSIC_DABBA: Dabba = {
  src: "/images/items/dabba-centre.png",
  width: 1024,
  height: 1024,
  size: 54,
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

/** default ring: one container per thali course */
export const REGION_TINS: Piece[] = [
  {
    src: "/images/items/tin-potato-bhaji.dfe0c97a.png",
    alt: "A dabba container of spiced potato bhaji",
    x: 22,
    y: 26,
    size: 23,
    rotate: -6,
    z: 2,
  },
  {
    src: "/images/items/tin-roti.a7afbfe4.png",
    alt: "A dabba container of fresh rotis",
    x: 78,
    y: 27,
    size: 23,
    rotate: 5,
    z: 2,
  },
  {
    src: "/images/items/tin-salad.36a0a5e4.png",
    alt: "A dabba container of fresh cucumber, tomato and onion salad",
    x: 79,
    y: 71,
    size: 23,
    rotate: 4,
    z: 4,
  },
  {
    src: "/images/items/tin-rice.4dffaeb7.png",
    alt: "A dabba container of steamed rice",
    x: 21,
    y: 71,
    size: 23,
    rotate: -5,
    z: 4,
  },
  {
    src: "/images/items/tin-gulab-jamun.434920ac.png",
    alt: "A dabba container of gulab jamun",
    x: 50,
    y: 89,
    size: 23,
    rotate: 2,
    z: 5,
  },
];

/** the /menu hero's ring — a full thali's worth of courses */
export const MENU_TINS: Piece[] = [
  { src: "/images/items/tin-paratha.c8a92c83.png", alt: "A dabba container of fresh parathas", ...TIN_SLOTS[0] },
  { src: "/images/items/tin-rice-menu.7e0dfd40.png", alt: "A dabba container of steamed rice", ...TIN_SLOTS[1] },
  { src: "/images/items/tin-rajma.f3435da4.png", alt: "A dabba container of rajma", ...TIN_SLOTS[2] },
  { src: "/images/items/tin-chana.56b2be13.png", alt: "A dabba container of spiced chana", ...TIN_SLOTS[3] },
  { src: "/images/items/tin-gajar-halwa.1d953bcf.png", alt: "A dabba container of gajar halwa", ...TIN_SLOTS[4] },
];

/** the /plans hero's ring */
export const PLANS_TINS: Piece[] = [
  { src: "/images/items/tin-roti-plans.997aac92.png", alt: "A dabba container of fresh rotis", ...TIN_SLOTS[0] },
  { src: "/images/items/tin-rice-plans.d2bca08f.png", alt: "A dabba container of steamed rice", ...TIN_SLOTS[1] },
  { src: "/images/items/tin-bhindi.f660f676.png", alt: "A dabba container of bhindi masala", ...TIN_SLOTS[2] },
  { src: "/images/items/tin-paneer-curry.41c6395b.png", alt: "A dabba container of paneer curry", ...TIN_SLOTS[3] },
  { src: "/images/items/tin-rasgulla.1360d5bf.png", alt: "A dabba container of rasgulla", ...TIN_SLOTS[4] },
];

/** the /regional-food-stories hero's ring */
export const REGIONAL_TINS: Piece[] = [
  { src: "/images/items/tin-paratha-regional.568d9726.png", alt: "A dabba container of fresh parathas", ...TIN_SLOTS[0] },
  { src: "/images/items/tin-missi-roti.87a9fd9e.png", alt: "A dabba container of missi roti", ...TIN_SLOTS[1] },
  { src: "/images/items/tin-kadhi.d324e188.png", alt: "A dabba container of kadhi", ...TIN_SLOTS[2] },
  { src: "/images/items/tin-potato-regional.f63338e8.png", alt: "A dabba container of spiced potato bhaji", ...TIN_SLOTS[3] },
  { src: "/images/items/tin-corn-upma.ad36afb7.png", alt: "A dabba container of corn upma", ...TIN_SLOTS[4] },
];

export default function HeroPlatter({
  className = "",
  sizes = "(min-width: 1024px) 46vw, 88vw",
  tins = REGION_TINS,
  dabba = DEFAULT_DABBA,
}: {
  className?: string;
  sizes?: string;
  /** the five containers ringing the dabba — swap per page */
  tins?: Piece[];
  /** the centrepiece tin — swap per page */
  dabba?: Dabba;
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
          src={dabba.src}
          alt="A three-tier stainless steel Mumbai dabba"
          width={dabba.width}
          height={dabba.height}
          priority
          sizes={sizes}
          className="absolute h-auto drop-shadow-[0_32px_38px_rgba(42,24,16,0.34)]"
          style={{
            left: "50%",
            top: "46%",
            width: `${dabba.size}%`,
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
