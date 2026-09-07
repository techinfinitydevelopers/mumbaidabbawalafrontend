"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { KITCHEN_RULES } from "@/data/kitchenRules";

/**
 * 4 Playing Card Suits matching the 4 Kitchen Rules:
 * Hearts (Red), Spades (Dark Ink), Diamonds (Red), Clubs (Dark Ink)
 */
const CARD_SUITS = [
  {
    symbol: "♥",
    suitName: "Hearts",
    color: "#AF1411", // Brand Red
    badgeBg: "rgba(175, 20, 17, 0.08)",
    rank: "A",
  },
  {
    symbol: "♠",
    suitName: "Spades",
    color: "#1E1614", // Dark Ink
    badgeBg: "rgba(30, 22, 20, 0.08)",
    rank: "A",
  },
  {
    symbol: "♦",
    suitName: "Diamonds",
    color: "#AF1411", // Brand Red
    badgeBg: "rgba(175, 20, 17, 0.08)",
    rank: "A",
  },
  {
    symbol: "♣",
    suitName: "Clubs",
    color: "#1E1614", // Dark Ink
    badgeBg: "rgba(30, 22, 20, 0.08)",
    rank: "A",
  },
];

const STACK_CONFIG = [
  { x: -10, y: 0, rot: -4.5 },
  { x: -3, y: 5, rot: -1.5 },
  { x: 3, y: 10, rot: 1.5 },
  { x: 10, y: 15, rot: 4.5 },
];

const SPREAD_CONFIG = [
  { xMult: -1.53, rot: -2, y: 4 },
  { xMult: -0.51, rot: -0.6, y: 0 },
  { xMult: 0.51, rot: 0.6, y: 0 },
  { xMult: 1.53, rot: 2, y: 4 },
];

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Corner MD monogram representing Mumbai Dabbawala Estd 1890,
 * styled in the exact suit color matching the techinfinity corner brand mark convention.
 */
function CornerBrandMark({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-1 select-none font-display tracking-tight" style={{ color }}>
      <span className="text-[14px] font-black leading-none tracking-tight">MD</span>
      <span className="text-[8.5px] font-bold tracking-widest opacity-75 leading-none">1890</span>
    </div>
  );
}

/**
 * The Dabbawala bicycle mark — same emblem used on the Chef's Corner card
 * back — stroked in whatever color is passed in.
 */
function BicycleLogo({ color, size = 30 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 46" fill="none">
      <g
        transform="translate(30,23)"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="-17" cy="13" r="11" />
        <circle cx="17" cy="13" r="11" />
        <path d="M-17 13 L-4 -7 L13 -7 M-4 -7 L5 13 M-4 -7 L-10 -16 L-15 -16" />
      </g>
    </svg>
  );
}

export default function FromTheKitchen() {
  const [active, setActive] = useState(0);
  const [, setFlipStateVersion] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frontFaceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const backFaceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const manualFlippedRef = useRef<Record<number, boolean>>({});
  const smoothedRef = useRef(0);
  const rafId = useRef<number>(0);
  const cardWRef = useRef(310);

  // Measure card width for responsive spread
  useEffect(() => {
    const updateWidth = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        cardWRef.current = 265;
      } else if (window.innerWidth < 1024) {
        cardWRef.current = 285;
      } else {
        cardWRef.current = 310;
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Smooth direct DOM transform rAF loop driven by scroll
  useEffect(() => {
    const tick = () => {
      const section = sectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        // Starts counting a bit before the section is fully pinned (rect.top
        // reaches 0), so the deck is already a little underway right as it
        // locks in place instead of sitting dead-still until then.
        const earlyStart = window.innerHeight * 0.55;
        const target =
          scrollable > 0 ? clamp((earlyStart - rect.top) / scrollable, 0, 1) : 0;

        // Lower damping = more inertia/trailing = a smoother glide instead of
        // snapping straight to the raw scroll position every frame.
        smoothedRef.current += (target - smoothedRef.current) * 0.075;
        if (Math.abs(target - smoothedRef.current) < 0.0008) {
          smoothedRef.current = target;
        }

        const smoothed = smoothedRef.current;

        // Two distinct, gentle stages instead of one shared curve: each card
        // eases outward (no bounce/overshoot — a plain smooth deceleration),
        // then only once mostly landed does it begin its own flip reveal —
        // a "deal, then turn" sequence, generously staggered so it never
        // feels like several things happening in the same instant.
        const now = performance.now() / 1000;

        cardRefs.current.forEach((cardEl, i) => {
          if (!cardEl) return;
          const innerEl = innerCardRefs.current[i];

          const dealStagger = i * 0.045;
          const dealProgress = clamp((smoothed - dealStagger) / 0.58, 0, 1);
          const dealEased = easeInOutCubic(dealProgress);

          const flipStagger = 0.25 + i * 0.05;
          const flipProgress = clamp((smoothed - flipStagger) / 0.62, 0, 1);
          const flipEased = easeInOutCubic(flipProgress);

          const stack = STACK_CONFIG[i];
          const spread = SPREAD_CONFIG[i];
          const targetSpreadX = spread.xMult * (cardWRef.current + 16);

          // Once a card has finished opening, ease in a gentle idle float —
          // its own out-of-phase sine drift, so the deck feels alive at rest
          // instead of freezing the instant the last card lands. Fades back
          // out smoothly if the user scrolls back up mid-flip.
          const floatY = Math.sin(now * 1.1 + i * 1.9) * 6 * flipEased;
          const floatRot = Math.sin(now * 0.85 + i * 2.3) * 0.55 * flipEased;

          const currentX = lerp(stack.x, targetSpreadX, dealEased);
          const currentY = lerp(stack.y, spread.y, dealEased) + floatY;
          const currentRot = lerp(stack.rot, spread.rot, dealEased) + floatRot;

          cardEl.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) rotate(${currentRot.toFixed(2)}deg)`;

          if (innerEl) {
            // Base scroll-driven angle: 180 -> 0. Plus manual user click override.
            const manualAngle = manualFlippedRef.current[i] ? 180 : 0;
            const currentRotY = lerp(180, 0, flipEased) + manualAngle;

            // Chromium has a long-standing backface-visibility precision bug
            // right at the edge-on (90deg) point of a 3D flip — for a frame
            // or two BOTH faces' own background paints while their content
            // vanishes, showing a blank white card. Sidestep it entirely by
            // driving each face's opacity explicitly off the actual angle
            // instead of trusting the browser's own face-culling — opacity 0
            // hides a face (background included) regardless of what
            // backface-visibility gets wrong.
            const frontFace = frontFaceRefs.current[i];
            const backFace = backFaceRefs.current[i];
            if (frontFace && backFace) {
              const cosAngle = Math.cos((currentRotY * Math.PI) / 180);
              const frontOpacity = clamp(cosAngle / 0.05, 0, 1);
              frontFace.style.opacity = String(frontOpacity);
              backFace.style.opacity = String(1 - frontOpacity);
            }

            // 3D elevation during mid-flip so cards don't collide
            const liftZ = Math.sin(flipEased * Math.PI) * 46;

            innerEl.style.transform = `rotateY(${currentRotY.toFixed(2)}deg) translateZ(${liftZ.toFixed(2)}px)`;
          }
        });
      }
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const toggleFlip = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    manualFlippedRef.current[idx] = !manualFlippedRef.current[idx];
    setFlipStateVersion((v) => v + 1);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[220vh] bg-paper"
      id="fromTheKitchen"
    >
      {/* Sticky viewport container driven by scroll */}
      <div className="sticky top-0 flex min-h-screen flex-col justify-center overflow-hidden px-4 py-12 sm:px-8">
        <div className="relative z-10 mx-auto w-full max-w-[1400px]">
          {/* Section Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/8 px-4 py-1.5">
              <span className="text-xs">📜</span>
              <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-brand-red">
                135-Year Culinary Wisdom
              </span>
            </div>

            <h2 className="poster-stack mx-auto mt-3 [--po:3px] sm:[--po:5px]">
              <span className="poster block text-[32px] text-ink sm:text-[46px] lg:text-[52px]">
                Wisdom From The
              </span>
              <span className="poster block text-[32px] text-brand-red sm:text-[46px] lg:text-[52px]">
                Dabbawala Kitchen
              </span>
            </h2>

            <p className="mx-auto mt-2.5 max-w-xl text-xs leading-relaxed text-ink/70 sm:text-sm md:text-base">
              Scroll down to deal the deck and watch all four cards flip over to reveal the cardinal rules of our kitchen.
            </p>
          </div>

          {/* 3D Scroll-Driven Card Deck Stage */}
          <div
            className="relative mx-auto mt-6 flex min-h-[510px] w-full max-w-[1320px] items-center justify-center sm:min-h-[530px]"
            style={{
              perspective: "1600px",
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
            }}
          >
            {/* 4 Playing Cards: Starts Stacked showing Backside -> Scrolls & Flips to Front */}
            {KITCHEN_RULES.map((rule, idx) => {
              const suit = CARD_SUITS[idx % CARD_SUITS.length];
              const isCurrent = idx === active;
              // Reverse z-index so Card 0 sits on top of the initial deck stack
              const zIndex = isCurrent ? 35 : 25 - idx;

              return (
                <div
                  key={`deck-card-${rule.title}-${idx}`}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onClick={() => setActive(idx)}
                  style={{
                    zIndex,
                    transformStyle: "preserve-3d",
                    WebkitTransformStyle: "preserve-3d",
                    willChange: "transform",
                    transform: `translate3d(${STACK_CONFIG[idx].x}px, ${STACK_CONFIG[idx].y}px, 0) rotate(${STACK_CONFIG[idx].rot}deg)`,
                  }}
                  className={`group absolute w-[280px] select-none cursor-pointer sm:w-[295px] md:w-[310px] transition-shadow duration-300 rounded-[24px] ${
                    isCurrent
                      ? "shadow-[0_24px_50px_-10px_rgba(0,0,0,0.65)]"
                      : "shadow-[0_16px_36px_-12px_rgba(0,0,0,0.5)]"
                  }`}
                >
                  {/* 3D Flippable Inner Card Container (Starts at 180deg showing BACK face) */}
                  <div
                    ref={(el) => {
                      innerCardRefs.current[idx] = el;
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      WebkitTransformStyle: "preserve-3d",
                      willChange: "transform",
                      transform: "rotateY(180deg)",
                    }}
                    className="relative h-[490px] w-full rounded-[24px] sm:h-[505px]"
                  >
                    {/* ==================================================== */}
                    {/* FRONT FACE: Authentic Playing Card Style (Techinfinity) */}
                    {/* ==================================================== */}
                    <div
                      ref={(el) => {
                        frontFaceRefs.current[idx] = el;
                      }}
                      style={{
                        background: "#FFFFFF",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(0deg)",
                      }}
                      className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[24px] border-[1.5px] border-[#E8E2D8] p-4 text-ink shadow-[0_18px_45px_-12px_rgba(20,10,8,0.22)] sm:p-5"
                    >
                      {/* Subtle Inset Playing Card Frame */}
                      <div className="pointer-events-none absolute inset-2.5 rounded-[18px] border border-black/[0.04]" />

                      {/* --- TOP ROW: Corner Suit Symbol & Corner Brand Mark --- */}
                      <div className="flex items-center justify-between">
                        {/* Top Left: Suit Symbol + A (e.g. ♥ A) */}
                        <div
                          className="flex items-center gap-1 font-display font-black leading-none select-none"
                          style={{ color: suit.color }}
                        >
                          <span className="text-xl sm:text-2xl">{suit.symbol}</span>
                          <span className="text-lg sm:text-xl">{suit.rank}</span>
                        </div>

                        {/* Top Right: Brand Monogram (MD 1890) in Suit Color */}
                        <CornerBrandMark color={suit.color} />
                      </div>

                      {/* --- CENTER AREA: Rest of the Content as it was --- */}
                      <div className="my-auto flex flex-col items-center text-center px-1">
                        {/* Rule Badge Pill */}
                        <div
                          style={{ background: suit.badgeBg, color: suit.color }}
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.14em]"
                        >
                          <span>{suit.symbol}</span>
                          <span>{rule.rule}</span>
                          <span className="opacity-60">·</span>
                          <span>STEP {rule.step}</span>
                        </div>

                        {/* Title */}
                        <h3 className="mt-2 font-display text-xl font-extrabold leading-tight tracking-tight text-ink sm:text-[23px]">
                          {rule.title}
                        </h3>

                        {/* Circular Framed Plate Photo */}
                        <div className="relative mx-auto my-2.5 h-[126px] w-[126px] overflow-hidden rounded-full border-3 border-brand-yellow shadow-[0_8px_20px_rgba(0,0,0,0.14)] ring-2 ring-brand-red/20 sm:h-[136px] sm:w-[136px]">
                          <Image
                            src={rule.photo}
                            alt={rule.photoAlt}
                            fill
                            sizes="160px"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                            draggable={false}
                            priority
                          />
                        </div>

                        {/* Recipe Wisdom Quote */}
                        <p className="line-clamp-2 px-1 text-center text-[11.5px] font-medium italic leading-relaxed text-ink/80 sm:text-xs">
                          {rule.quote}
                        </p>

                        {/* Meta Pill & Secret Technique Button */}
                        <div className="mt-3 flex w-full items-center justify-between gap-1 border-t border-black/[0.06] pt-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#FAF5EC] px-2.5 py-0.5 text-[9.5px] font-bold text-ink/80">
                            <span>{rule.footerIcon}</span> {rule.footerLabel}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => toggleFlip(idx, e)}
                            className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-brand-red transition-colors hover:bg-brand-red/10"
                          >
                            <span>Back ↺</span>
                          </button>
                        </div>
                      </div>

                      {/* --- BOTTOM ROW: Corner Brand Mark & Corner Suit Symbol --- */}
                      <div className="flex items-center justify-between">
                        {/* Bottom Left: Brand Monogram (MD 1890) */}
                        <CornerBrandMark color={suit.color} />

                        {/* Bottom Right: Suit Symbol + A (e.g. ♥ A) */}
                        <div
                          className="flex items-center gap-1 font-display font-black leading-none select-none"
                          style={{ color: suit.color }}
                        >
                          <span className="text-xl sm:text-2xl">{suit.symbol}</span>
                          <span className="text-lg sm:text-xl">{suit.rank}</span>
                        </div>
                      </div>
                    </div>

                    {/* ==================================================== */}
                    {/* BACK FACE: the reference Bicycle-style card art, palette-swapped
                        to brand red/cream, with the bicycle emblem overlaid on the
                        blank disc reserved for it (see Chef's Corner card back). */}
                    {/* ==================================================== */}
                    <div
                      ref={(el) => {
                        backFaceRefs.current[idx] = el;
                      }}
                      style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                      className="absolute inset-0 overflow-hidden rounded-[24px] border-[5px] border-[#FFFDF8] shadow-[0_20px_45px_-12px_rgba(0,0,0,0.6)]"
                    >
                      <Image
                        src="/images/chefs-corner/card-back-v2.png"
                        alt="Mumbai Dabbawala Since 1890"
                        fill
                        sizes="310px"
                        className="object-cover"
                        draggable={false}
                        priority
                      />

                      {/* regenerated at the card's own ~0.614 aspect ratio (the old
                          290x424 art was 0.684 and got visibly cropped by
                          object-cover); its blank medallion sits centred, ~49% wide */}
                      <div
                        className="absolute flex flex-col items-center justify-center gap-1"
                        style={{
                          left: "50%",
                          top: "49.5%",
                          width: "42%",
                          aspectRatio: 1,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <BicycleLogo color="#AF1411" size={40} />
                        <span className="font-display text-phi-1 font-black uppercase tracking-[0.1em] text-brand-red">
                          Dabbawala
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-brand-red/80">
                          Est. 1890
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
