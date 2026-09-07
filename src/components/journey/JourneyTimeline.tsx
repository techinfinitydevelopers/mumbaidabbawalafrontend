"use client";

import { useEffect, useRef, useState } from "react";
import { MILESTONES, type Milestone } from "@/data/journeyMilestones";

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

/** Must stay equal to `.flight-corridor { min-height }` and `.flight-svg
 *  { height }` in globals.css — the SVG viewBox uses it so one SVG unit is
 *  one corridor pixel, which is what keeps the path glued to the cards. */
const CORRIDOR_HEIGHT = 2230;

/** Fraction of the viewport height the flight path is pinned to. A card's
 *  "hero" moment — plane level with its pin — happens here. */
const FOCUS_RATIO = 0.6;

/** Distance from a card's top edge down to its pin on the flight path. */
const PIN_OFFSET = 154;

/**
 * Builds the flight path FROM the milestones' own `side` + `top` values,
 * instead of a hardcoded L/R alternation — so the string, its pins, and the
 * plane always pass through exactly where each card actually sits. A
 * mismatch here (pin on one side, card on the other) is what made the plane
 * and the cards look disconnected from the line.
 */
function getFlightGeometry(W: number) {
  const isMobile = W < 768;
  const cardWidth = isMobile ? Math.min(168, Math.round(W * 0.44)) : clamp(Math.round(W * 0.26), 65, 300);
  const xL = cardWidth;
  const xR = W - cardWidth;
  const xM = isMobile ? cardWidth : clamp(Math.round(W * 0.22), 45, 220);
  const pinOffset = isMobile ? 95 : PIN_OFFSET;
  const startY = isMobile ? 120 : 176;

  const stops = MILESTONES.map((m) => ({
    x: m.side === "right" ? xR : xL,
    y: m.top + pinOffset,
  }));
  const last = stops[stops.length - 1];
  const runOut =
    last.x === xR
      ? [{ x: xL, y: last.y + 155 }, { x: xR, y: 1674 }]
      : [{ x: xR, y: 1674 }];
  const points = [{ x: xM, y: startY }, ...stops, ...runOut];

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const delta = p1.y - p0.y;
    if (i === 1) {
      // first segment only: horizontal tangent leaving Mumbai
      const c1x = p0.x + (p1.x - p0.x) * 0.29;
      const c2y = p0.y + delta * 0.47;
      path += ` C ${c1x} ${p0.y}, ${p1.x} ${c2y}, ${p1.x} ${p1.y}`;
    } else {
      // vertical-tangent S-curve, symmetric about the segment's midpoint
      const c1y = p0.y + delta / 2;
      const c2y = p1.y - delta / 2;
      path += ` C ${p0.x} ${c1y}, ${p1.x} ${c2y}, ${p1.x} ${p1.y}`;
    }
  }

  const pins = [
    { cx: xM, cy: startY, r: isMobile ? 6.5 : 9, fill: "#AF1411" },
    ...stops.map((s, i) => ({
      cx: s.x,
      cy: s.y,
      r: isMobile ? 5 : 7,
      fill: MILESTONES[i].side === "right" ? "#F36220" : "#AF1411",
    })),
    {
      cx: points[points.length - 1].x,
      cy: points[points.length - 1].y,
      r: isMobile ? 6.5 : 9,
      fill: "#F36220",
    },
  ];

  return { path, pins };
}

function MilestonePlate({ plate, side }: { plate: Milestone["plate"]; side: "left" | "right" }) {
  return (
    <figure className={`tl-sticker tl-sticker--${side === "left" ? "a" : "b"}`}>
      {plate.kind === "photo" ? (
        // plain <img>, not next/image: these are animated GIFs and must keep animating
        // eslint-disable-next-line @next/next/no-img-element
        <img src={plate.src} alt={plate.alt} />
      ) : (
        <div className="tl-sticker-seal-frame">
          <div className={`timeline-seal timeline-seal--${plate.tone}`}>
            <span className="seal-icon">{plate.icon}</span>
            <span className="seal-yr">{plate.year}</span>
            <span className="seal-txt">{plate.label}</span>
            <span className="seal-sub">{plate.sub}</span>
          </div>
        </div>
      )}
    </figure>
  );
}

/**
 * Same layout as the Mumbai/Perth corridor nodes: a badge, a tilted
 * .tl-sticker polaroid, then a bold caption line and a short blurb — right
 * side alternates to the orange badge variant, mirroring the Perth node.
 */
function MilestoneCard({
  milestone,
  cardRef,
  plateRef,
  bodyRef,
}: {
  milestone: Milestone;
  cardRef: (node: HTMLDivElement | null) => void;
  plateRef: (node: HTMLDivElement | null) => void;
  bodyRef: (node: HTMLDivElement | null) => void;
}) {
  const isRight = milestone.side === "right";

  return (
    <div
      className={`timeline-postcard timeline-postcard--${milestone.side} timeline-card`}
      id={`card${milestone.id}`}
      ref={cardRef}
      style={{ top: `${milestone.top}px` }}
    >
      <div className={`node-badge${isRight ? " node-badge--perth" : ""}`}>
        <span className="pulse-dot" /> {milestone.year}
      </div>

      <div className="timeline-postcard-media" ref={plateRef}>
        <MilestonePlate plate={milestone.plate} side={milestone.side} />
      </div>

      <div className="timeline-postcard-caption" ref={bodyRef}>
        <div className="node-location">
          <span className="loc-city">{milestone.tag}</span>
        </div>
        <p className="node-history-sub">{milestone.description}</p>
      </div>
    </div>
  );
}

/**
 * Flight corridor: Mumbai (1890) -> 5 timeline milestones -> Perth (2026), a
 * hand-drawn S-curve flight path with the plane and every card scroll-synced
 * to the same continuous progress value.
 *
 * All of it is pixel-positioned against the flight-svg's own 1000x1650
 * coordinate space (see journeyMilestones.ts) so cards line up with pins
 * regardless of the corridor's actual rendered height.
 */
export default function JourneyTimeline() {
  const corridorRef = useRef<HTMLDivElement>(null);
  const routeProgressRef = useRef<SVGPathElement>(null);
  const routeGhostRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const nodeMumbaiRef = useRef<HTMLDivElement>(null);
  const nodePerthRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const plateRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [corridorWidth, setCorridorWidth] = useState(1000);

  useEffect(() => {
    const corridor = corridorRef.current;
    if (!corridor) return;

    function handleResize() {
      if (corridor) {
        setCorridorWidth(corridor.clientWidth || 1000);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const flightGeometry = getFlightGeometry(corridorWidth);

  useEffect(() => {
    const corridor = corridorRef.current;
    const routeProgress = routeProgressRef.current;
    if (!corridor || !routeProgress) return;

    let routeLen = 0;
    let smoothedProgress = 0;
    let raf = 0;
    // y → arc-length samples, so the plane can be driven by how far the page
    // has scrolled vertically rather than by distance along the curve. Arc
    // length runs ahead of vertical travel on the wide horizontal sweeps,
    // which is what let the plane drift off-screen away from its card.
    let yTable: { y: number; len: number }[] = [];

    function measure() {
      routeLen = routeProgress!.getTotalLength();
      routeProgress!.style.strokeDasharray = `${routeLen}`;
      routeProgress!.style.strokeDashoffset = `${routeLen}`;

      yTable = [];
      const samples = 240;
      for (let i = 0; i <= samples; i++) {
        const len = (i / samples) * routeLen;
        yTable.push({ y: routeProgress!.getPointAtLength(len).y, len });
      }
    }

    // the path only ever descends, so a binary search over y is safe
    function lengthAtY(y: number) {
      if (yTable.length === 0) return 0;
      if (y <= yTable[0].y) return 0;
      if (y >= yTable[yTable.length - 1].y) return routeLen;

      let lo = 0;
      let hi = yTable.length - 1;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (yTable[mid].y <= y) lo = mid;
        else hi = mid;
      }
      const a = yTable[lo];
      const b = yTable[hi];
      const t = b.y === a.y ? 0 : (y - a.y) / (b.y - a.y);
      return a.len + (b.len - a.len) * t;
    }

    function calculateProgress() {
      const rect = corridor!.getBoundingClientRect();
      const vh = window.innerHeight;
      // The corridor y that sits on this line is the one the plane flies along,
      // so it doubles as each card's "hero" position. Kept below centre so a
      // 421px card still clears the header there and holds full opacity for a
      // good stretch either side of the plane reaching its pin.
      const startY = vh * FOCUS_RATIO;
      const totalTravel = rect.height;
      const currentTravel = startY - rect.top;
      return clamp(currentTravel / totalTravel, 0, 1);
    }

    function updateMilestoneCard(i: number, isRight: boolean) {
      const card = cardRefs.current[i];
      const plate = plateRefs.current[i];
      const body = bodyRefs.current[i];
      if (!card || !plate || !body) return;

      // Driven off the card's own live position rather than a hand-tuned
      // progress fraction, so every card tracks the real scroll and can't
      // drift out of step with the plane.
      const rect = card.getBoundingClientRect();
      const vh = window.innerHeight;

      // Rises into view from the bottom of the viewport and then simply stays:
      // once a card has arrived it keeps full opacity and scrolls away with the
      // page, rather than fading back out as the next one arrives.
      const enter = clamp((vh - rect.top) / 300, 0, 1);

      // no rotation on the outer card — only the .tl-sticker itself tilts
      // (via its own CSS, --a/--b), exactly like the Mumbai/Perth nodes.
      card.style.opacity = String(enter);

      plate.style.transform = `scale(${0.88 + enter * 0.12})`;
      plate.style.opacity = String(clamp(enter * 1.4, 0, 1));

      const bodySlide = clamp((enter - 0.2) / 0.5, 0, 1);
      const slideOffset = isRight ? (1 - bodySlide) * 40 : (1 - bodySlide) * -40;
      body.style.transform = `translateX(${slideOffset}px)`;
      body.style.opacity = String(bodySlide);
    }

    function applyProgress(p: number) {
      if (!routeLen) return;

      // one SVG unit == one corridor pixel, so the scrolled-to y in corridor
      // space is simply p * height — the plane then always sits level with
      // whichever card is currently on screen.
      const currentDist = lengthAtY(p * CORRIDOR_HEIGHT);
      routeProgress!.style.strokeDashoffset = `${routeLen - currentDist}`;

      if (routeGhostRef.current) {
        routeGhostRef.current.style.opacity = String(0.22 * (1 - p * 0.4));
      }

      // position and orient the plane along the curved string
      const pt = routeProgress!.getPointAtLength(currentDist);
      const delta = 2.5;
      const ahead = routeProgress!.getPointAtLength(clamp(currentDist + delta, 0, routeLen));
      const behind = routeProgress!.getPointAtLength(clamp(currentDist - delta, 0, routeLen));
      const angle = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;
      planeRef.current?.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${angle})`);

      if (nodeMumbaiRef.current) {
        const mumbaiAlpha = clamp(1 - (p - 0.25) * 2, 0.35, 1);
        nodeMumbaiRef.current.style.opacity = String(mumbaiAlpha);
        nodeMumbaiRef.current.style.transform = `translateY(${clamp(p * 15, 0, 15)}px) rotate(-2deg)`;
      }

      MILESTONES.forEach((m, i) => updateMilestoneCard(i, m.side === "right"));

      if (nodePerthRef.current) {
        // the plane touches down at y 1674 of 2230, i.e. p ≈ 0.75
        const perthAlpha = clamp((p - 0.64) / 0.12, 0, 1);
        nodePerthRef.current.style.opacity = String(perthAlpha);
        nodePerthRef.current.style.transform = `translateY(${(1 - perthAlpha) * 35}px) scale(${0.92 + perthAlpha * 0.08}) rotate(2deg)`;
      }
    }

    function tick() {
      // no easing toward the target: the corridor's live rect IS the scroll
      // position, so reading it every frame is already smooth, and damping it
      // only made the plane and the cards lag behind the actual scroll.
      smoothedProgress = calculateProgress();
      applyProgress(smoothedProgress);
      raf = requestAnimationFrame(tick);
    }

    function onResize() {
      measure();
      applyProgress(smoothedProgress);
    }

    measure();
    smoothedProgress = calculateProgress();
    applyProgress(smoothedProgress);
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [corridorWidth]);

  return (
    <section id="journey" className="journey-flow">
      <div className="flight-corridor" ref={corridorRef}>
        {/* 1. Mumbai departure, 1890 */}
        <div className="corridor-node corridor-node--mumbai" ref={nodeMumbaiRef}>
          <div className="node-badge">
            <span className="pulse-dot" /> DEPARTURE · 1890
          </div>
          <figure className="tl-sticker tl-sticker--a">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/journey/collage-mumbai.jpg" alt="Mumbai Dabbawala Origin Collage" />
          </figure>
          <div className="node-location">
            <span className="loc-code">IND</span>
            <span className="loc-city">Mumbai</span>
          </div>
        </div>

        {/* 2. flight string with the 5-milestone S-curve */}
        <svg
          className="flight-svg"
          viewBox={`0 0 ${corridorWidth} ${CORRIDOR_HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
          aria-label="Flight line from Mumbai to Perth"
        >
          <defs>
            <linearGradient id="stringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#AF1411" />
              <stop offset="25%" stopColor="#F36220" />
              <stop offset="50%" stopColor="#AF1411" />
              <stop offset="75%" stopColor="#F36220" />
              <stop offset="100%" stopColor="#AF1411" />
            </linearGradient>
          </defs>

          <path
            ref={routeGhostRef}
            className="route-ghost"
            d={flightGeometry.path}
            fill="none"
            stroke="#241008"
            strokeWidth="3.5"
            strokeDasharray="8 12"
            opacity="0.22"
          />

          <path
            ref={routeProgressRef}
            className="route-progress"
            d={flightGeometry.path}
            fill="none"
            stroke="url(#stringGradient)"
            strokeWidth="6"
            strokeLinecap="round"
          />

          <g id="svgPins">
            {flightGeometry.pins.map((pin, i) => (
              <circle
                key={i}
                cx={pin.cx}
                cy={pin.cy}
                r={pin.r}
                fill={pin.fill}
                stroke="#FFFDF8"
                strokeWidth={pin.r > 8 ? 3 : 2.5}
              />
            ))}
          </g>

          <g id="plane" ref={planeRef}>
            <g transform="rotate(-90)">
              <image
                href="/images/plane.webp"
                x={corridorWidth < 768 ? "-29" : "-50"}
                y={corridorWidth < 768 ? "-29" : "-50"}
                width={corridorWidth < 768 ? "58" : "100"}
                height={corridorWidth < 768 ? "58" : "100"}
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
          </g>
        </svg>

        {/* 3. the 5 timeline milestone cards */}
        {MILESTONES.map((m, i) => (
          <MilestoneCard
            key={m.id}
            milestone={m}
            cardRef={(node) => {
              cardRefs.current[i] = node;
            }}
            plateRef={(node) => {
              plateRefs.current[i] = node;
            }}
            bodyRef={(node) => {
              bodyRefs.current[i] = node;
            }}
          />
        ))}

        {/* 4. Perth touchdown, 2026 */}
        <div className="corridor-node corridor-node--perth" ref={nodePerthRef}>
          <div className="node-badge node-badge--perth">
            <span className="pulse-dot" /> TOUCHDOWN · PERTH 2026
          </div>
          <figure className="tl-sticker tl-sticker--b">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/journey/collage-perth.jpg" alt="Perth Waterfront Arrival Collage" />
          </figure>
          <div className="node-location">
            <span className="loc-code">AUS</span>
            <span className="loc-city">Perth</span>
          </div>
          <p className="node-history-sub">
            136 years after Bombay&rsquo;s first delivery, the Mumbai Dabbawala legacy crosses
            an ocean to arrive in Western Australia.
          </p>
        </div>
      </div>
    </section>
  );
}
