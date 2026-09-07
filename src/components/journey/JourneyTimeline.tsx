"use client";

import { useEffect, useRef } from "react";
import { MILESTONES, FLIGHT_SVG, type Milestone } from "@/data/journeyMilestones";

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function MilestonePlate({ plate, side }: { plate: Milestone["plate"]; side: "left" | "right" }) {
  return (
    <div className={`menu-card-plate menu-card-plate--${side}`}>
      {plate.kind === "photo" ? (
        // plain <img>, not next/image: these are animated GIFs and must keep animating
        // eslint-disable-next-line @next/next/no-img-element
        <img src={plate.src} alt={plate.alt} />
      ) : (
        <div className={`timeline-seal timeline-seal--${plate.tone}`}>
          <span className="seal-icon">{plate.icon}</span>
          <span className="seal-yr">{plate.year}</span>
          <span className="seal-txt">{plate.label}</span>
          <span className="seal-sub">{plate.sub}</span>
        </div>
      )}
    </div>
  );
}

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
  const body = (
    <div className="menu-card-body" ref={bodyRef}>
      <div className="timeline-badge-row">
        <span className="timeline-badge-year">{milestone.year}</span>
        <span className="timeline-badge-tag">{milestone.tag}</span>
      </div>
      <h3 className="menu-card-title">{milestone.title}</h3>
      <p className="menu-card-sub">{milestone.description}</p>
    </div>
  );
  const plate = <MilestonePlate plate={milestone.plate} side={milestone.side} />;

  return (
    <div
      className={`menu-food-card menu-food-card--${milestone.side} timeline-card`}
      id={`card${milestone.id}`}
      ref={cardRef}
      style={{ top: `${milestone.top}px` }}
    >
      {isRight ? (
        <>
          {body}
          <div ref={plateRef}>{plate}</div>
        </>
      ) : (
        <>
          <div ref={plateRef}>{plate}</div>
          {body}
        </>
      )}
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

  useEffect(() => {
    const corridor = corridorRef.current;
    const routeProgress = routeProgressRef.current;
    if (!corridor || !routeProgress) return;

    let routeLen = 0;
    let smoothedProgress = 0;
    let raf = 0;

    function measure() {
      routeLen = routeProgress!.getTotalLength();
      routeProgress!.style.strokeDasharray = `${routeLen}`;
      routeProgress!.style.strokeDashoffset = `${routeLen}`;
    }

    function calculateProgress() {
      const rect = corridor!.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress starts as Mumbai scrolls up into view, and completes when Perth enters
      const startY = vh * 0.5;
      const totalTravel = rect.height;
      const currentTravel = startY - rect.top;
      return clamp(currentTravel / totalTravel, 0, 1);
    }

    function updateMilestoneCard(i: number, triggerP: number, isRight: boolean) {
      const card = cardRefs.current[i];
      const plate = plateRefs.current[i];
      const body = bodyRefs.current[i];
      if (!card || !plate || !body) return;

      const cardAlpha = clamp((smoothedProgress - (triggerP - 0.08)) / 0.08, 0, 1);
      const plateScale = clamp((smoothedProgress - (triggerP - 0.06)) / 0.12, 0, 1);
      const bodySlide = clamp((smoothedProgress - triggerP) / 0.12, 0, 1);

      card.style.opacity = String(cardAlpha);
      card.style.transform = isRight ? "rotate(2deg)" : "rotate(-2deg)";

      plate.style.transform = `scale(${plateScale})`;
      plate.style.opacity = String(plateScale);

      const slideOffset = isRight ? (1 - bodySlide) * 40 : (1 - bodySlide) * -40;
      body.style.transform = `translateX(${slideOffset}px)`;
      body.style.opacity = String(bodySlide);
    }

    function applyProgress(p: number) {
      if (!routeLen) return;

      const offset = routeLen * (1 - p);
      routeProgress!.style.strokeDashoffset = `${offset}`;

      if (routeGhostRef.current) {
        routeGhostRef.current.style.opacity = String(0.22 * (1 - p * 0.4));
      }

      // position and orient the plane along the curved string
      const currentDist = p * routeLen;
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

      MILESTONES.forEach((m, i) => updateMilestoneCard(i, m.triggerP, m.side === "right"));

      if (nodePerthRef.current) {
        const perthAlpha = clamp((p - 0.78) / 0.18, 0, 1);
        nodePerthRef.current.style.opacity = String(perthAlpha);
        nodePerthRef.current.style.transform = `translateY(${(1 - perthAlpha) * 35}px) scale(${0.92 + perthAlpha * 0.08}) rotate(2deg)`;
      }
    }

    function tick() {
      const target = calculateProgress();
      smoothedProgress += (target - smoothedProgress) * 0.14;
      if (Math.abs(target - smoothedProgress) < 0.0002) smoothedProgress = target;
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
  }, []);

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
          viewBox={FLIGHT_SVG.viewBox}
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
            d={FLIGHT_SVG.path}
            fill="none"
            stroke="#241008"
            strokeWidth="3.5"
            strokeDasharray="8 12"
            opacity="0.22"
          />

          <path
            ref={routeProgressRef}
            className="route-progress"
            d={FLIGHT_SVG.path}
            fill="none"
            stroke="url(#stringGradient)"
            strokeWidth="6"
            strokeLinecap="round"
          />



          <g id="svgPins">
            {FLIGHT_SVG.pins.map((pin, i) => (
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
              <image href="/images/plane.webp" x="-42" y="-42" width="84" height="84" preserveAspectRatio="xMidYMid meet" />
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
