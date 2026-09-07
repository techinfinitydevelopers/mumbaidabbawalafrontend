"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

/** useLayoutEffect warns during SSR; this component is only interactive on the client. */
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
import { CHEFS } from "@/data/chefs";

const N = CHEFS.length;
const mod = (i: number) => ((i % N) + N) % N;

export default function ChefDeck() {
  const [active, setActive] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const activeChef = CHEFS[active];

  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const hasDragged = useRef(false);

  // Smooth hover panning state
  const targetScrollLeft = useRef(0);
  const isHoverPanning = useRef(false);
  const rafId = useRef<number>(0);

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // FLIP: the rect of the thumbnail being picked, measured before the re-render
  const flipFrom = useRef<DOMRect | null>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);
  /** autoplay stops while the pointer is in the deck, so it can't move the card being aimed at */
  const autoplayPaused = useRef(false);
  /** true while the grow owns the motion; hover-panning holds off until it finishes */
  const flipBusy = useRef(false);
  /**
   * The outgoing card, cloned. The big card is one stable node whose `src` swaps, so
   * there is nothing left of the old dish to animate — this clone is what shrinks
   * back into the thumbnail the outgoing dish is about to occupy.
   */
  const outgoingGhost = useRef<HTMLElement | null>(null);
  const outgoingTitle = useRef<string | null>(null);

  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const go = useCallback((index: number) => {
    const nextIdx = mod(index);
    setIsTransitioning(true);
    setActive(nextIdx);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  }, []);

  // Auto-slide through the chefs from left to right continuously on a timer
  useEffect(() => {
    const AUTOPLAY_MS = 6500;
    const interval = setInterval(() => {
      if (isDragging.current || autoplayPaused.current) return;
      setActive((prev) => {
        const next = mod(prev - 1);
        setIsTransitioning(true);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 400);
        return next;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, []);

  /**
   * Hover picks the card, and so does a click.
   *
   * The settle delay is 180ms rather than the original 40ms for a reason: the grow
   * runs for 520ms, and at 40ms a sweep across the rail re-selected every thumbnail
   * it passed, cancelling each animation before a frame of it was visible. 180ms is
   * long enough that a deliberate hover plays the whole grow, and short enough that
   * it still feels like hover rather than a click.
   */
  /** Clones the current big card into a fixed-position ghost at its own rect. */
  const liftOutgoing = () => {
    const card = activeCardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // sweep every clone, not just the one this ref happens to hold: an animation that
    // never settles (a hidden tab pauses WAAPI, so `finished` never resolves) would
    // otherwise leave its clone behind and they would stack up
    document.querySelectorAll("[data-deck-ghost]").forEach((n) => n.remove());
    const r = card.getBoundingClientRect();
    const ghost = card.cloneNode(true) as HTMLElement;
    ghost.setAttribute("aria-hidden", "true");
    ghost.setAttribute("data-deck-ghost", "");
    ghost.style.cssText =
      `position:fixed;left:${r.left}px;top:${r.top}px;width:${r.width}px;` +
      `height:${r.height}px;margin:0;z-index:60;pointer-events:none;transform-origin:top left;`;
    document.body.appendChild(ghost);
    outgoingGhost.current = ghost;
    outgoingTitle.current = CHEFS[activeRef.current].title;
  };

  const handleCardHover = (event: React.MouseEvent<HTMLButtonElement>, idx: number) => {
    if (isDragging.current || idx === activeRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      flipFrom.current = rect;
      liftOutgoing();
      go(idx);
    }, 180);
  };

  const handleCardLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  /**
   * Grows the clicked thumbnail into the big slot.
   *
   * The active card is a different element from the thumbnail, so there is nothing for
   * CSS to transition between — it used to just appear at full size. Measuring the
   * thumbnail first and animating the new card from that rect is the missing step.
   */
  const pick = (event: React.MouseEvent<HTMLButtonElement>, idx: number) => {
    if (hasDragged.current) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    flipFrom.current = event.currentTarget.getBoundingClientRect();
    liftOutgoing();
    go(idx);
  };

  useIsoLayoutEffect(() => {
    const from = flipFrom.current;
    const node = activeCardRef.current;
    flipFrom.current = null;
    if (!from || !node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const to = node.getBoundingClientRect();
    if (!to.width || !to.height) return;

    // a fast run of clicks would otherwise stack transforms on the same node
    node.getAnimations().forEach((a) => a.cancel());
    flipBusy.current = true;

    const grow = node.animate(
      [
        {
          transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${
            from.width / to.width
          }, ${from.height / to.height})`,
          borderRadius: "20px",
        },
        { transform: "none", borderRadius: "30px" },
      ],
      { duration: 520, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
    const release = () => (flipBusy.current = false);
    grow.finished.then(release, release);

    // the mirror of the grow: the old dish shrinks into its new thumbnail
    const ghost = outgoingGhost.current;
    const title = outgoingTitle.current;
    outgoingGhost.current = null;
    outgoingTitle.current = null;
    if (!ghost) return;

    const slot = title
      ? document.querySelector<HTMLElement>(`[data-chef="${CSS.escape(title)}"]`)
      : null;
    const ghostRect = ghost.getBoundingClientRect();
    const slotRect = slot?.getBoundingClientRect();

    const shrink = slotRect
      ? [
          { transform: "none", opacity: 1 },
          {
            transform: `translate(${slotRect.left - ghostRect.left}px, ${
              slotRect.top - ghostRect.top
            }px) scale(${slotRect.width / ghostRect.width}, ${
              slotRect.height / ghostRect.height
            })`,
            opacity: 0,
          },
        ]
      : // nowhere to land (the dish scrolled out of the window): just fade
        [{ opacity: 1 }, { opacity: 0 }];

    const done = () => ghost.remove();
    ghost
      .animate(shrink, { duration: 520, easing: "cubic-bezier(0.22, 1, 0.36, 1)" })
      .finished.then(done, done);
    // and a floor, for the case where `finished` never settles
    window.setTimeout(done, 900);
  }, [active]);

  // never leave a clone behind if the component goes away mid-animation
  useEffect(
    () => () => document.querySelectorAll("[data-deck-ghost]").forEach((n) => n.remove()),
    [],
  );

  // Pointer drag for mouse and touch
  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    scrollStartX.current = track.scrollLeft;
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 5) {
      hasDragged.current = true;
    }
    track.scrollLeft = scrollStartX.current - delta;
    targetScrollLeft.current = track.scrollLeft;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const track = trackRef.current;
    if (track) {
      try {
        track.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  // Smooth hover gliding across container
  const onContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current) return;
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progress = Math.max(0, Math.min(1, x / rect.width));

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll > 0) {
      // Add slight deadzone at edges (5% to 95%)
      const mapped = Math.max(0, Math.min(1, (progress - 0.06) / 0.88));
      targetScrollLeft.current = mapped * maxScroll;
      isHoverPanning.current = true;
    }
  };

  const onContainerMouseLeave = () => {
    handleCardLeave();
    autoplayPaused.current = false;
    isHoverPanning.current = false;
  };

  // Smooth lerp frame loop for 60fps/120fps glide
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      if (flipBusy.current) {
        rafId.current = requestAnimationFrame(animate);
        return;
      }
      if (isHoverPanning.current && !isDragging.current && track) {
        const diff = targetScrollLeft.current - track.scrollLeft;
        if (Math.abs(diff) > 0.4) {
          track.scrollLeft += diff * 0.075;
        }
      }
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Continuous circular indices wrapping around
  const leftIndices = [mod(active - 2), mod(active - 1)];
  const rightIndices = [1, 2, 3, 4, 5].map((offset) => mod(active + offset));

  return (
    <section className="overflow-hidden bg-paper px-4 py-phi-5 sm:px-8 sm:py-phi-6">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Title Header */}
        <div className="text-center">
          <p className="font-script text-2xl text-brand-orange sm:text-3xl">Meet the kitchen</p>
          <h2 className="poster-stack mx-auto mt-2 [--po:3px] sm:[--po:5px]">
            <span
              className="poster block text-[32px] text-ink sm:text-[48px] lg:text-[54px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              The People Behind
            </span>
            <span
              className="poster block text-[32px] text-brand-red sm:text-[48px] lg:text-[54px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              Every Dabba
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-ink/75 sm:text-base">
            Hover any dish to bring it forward and read what the kitchen does with it.
          </p>
        </div>

        {/* Carousel Outer Container */}
        <div
          ref={containerRef}
          onMouseEnter={() => (autoplayPaused.current = true)}
          onMouseMove={onContainerMouseMove}
          onMouseLeave={onContainerMouseLeave}
          onFocusCapture={() => (autoplayPaused.current = true)}
          onBlurCapture={() => (autoplayPaused.current = false)}
          className="relative mt-12 sm:mt-16"
        >
          {/* Scrollable Bottom-Aligned Deck */}
          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (isDragging.current = false)}
            tabIndex={0}
            role="region"
            aria-label="Chefs Gallery"
            className="no-scrollbar flex cursor-grab items-end justify-start gap-3 overflow-x-auto px-2 py-4 select-none sm:gap-4 md:justify-center md:gap-5 active:cursor-grabbing will-change-scroll"
          >
            {/* 1. Left Small Cards */}
            {leftIndices.map((idx, pos) => {
              const chef = CHEFS[idx];
              return (
                <button
                  key={`left-${chef.title}-${idx}-${pos}`}
                  type="button"
                  onMouseEnter={(e) => handleCardHover(e, idx)}
                  onMouseLeave={handleCardLeave}
                  onClick={(e) => pick(e, idx)}
                  aria-label={`View ${chef.title}`}
                  data-chef={chef.title}
                  className="group relative h-[120px] w-[90px] shrink-0 self-end overflow-hidden rounded-[16px] border border-brand-red/10 shadow-[0_4px_12px_-4px_rgba(42,24,16,0.08)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:shadow-[0_8px_18px_-6px_rgba(42,24,16,0.14)] sm:h-[148px] sm:w-[110px] sm:rounded-[20px] md:h-[168px] md:w-[125px] lg:h-[180px] lg:w-[135px]"
                >
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={chef.image}
                      alt={chef.title}
                      fill
                      sizes="(min-width: 1024px) 400px, (min-width: 768px) 370px, 270px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      draggable={false}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/5 transition-opacity duration-300 group-hover:opacity-0" />
                  </div>
                </button>
              );
            })}

            {/* 2. Active Enlarged Main Card */}
            <div
              ref={activeCardRef}
              className="relative h-[360px] w-[270px] shrink-0 self-end overflow-hidden rounded-[26px] border border-brand-red/15 shadow-[0_12px_28px_-10px_rgba(42,24,16,0.18)] ring-1 ring-brand-yellow/60 transition-[box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:h-[440px] sm:w-[330px] sm:rounded-[30px] md:h-[490px] md:w-[370px] lg:h-[520px] lg:w-[400px]"
            >
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={activeChef.image}
                  alt={activeChef.title}
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 768px) 370px, 270px"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-104"
                  priority
                  draggable={false}
                />
                <span className="absolute left-4 top-4 rounded-full bg-brand-cream/95 px-3.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.14em] text-brand-red shadow-sm backdrop-blur-sm transition-all duration-300 sm:left-5 sm:top-5 sm:text-[10.5px]">
                  {activeChef.tag}
                </span>
              </div>
            </div>

            {/* 3. Right Area: Testimonial/Quote on Top + Right Small Cards on Bottom */}
            <div
              className="flex shrink-0 flex-col justify-between self-end"
              style={{ minHeight: "clamp(360px, 46vw, 520px)" }}
            >
              {/* Active Chef Details & Quote with smooth crossfade */}
              <div
                className={`max-w-[320px] pt-1 transition-all duration-400 ease-out sm:max-w-[420px] md:max-w-[480px] lg:max-w-[540px] ${
                  isTransitioning ? "translate-y-1 opacity-70" : "translate-y-0 opacity-100"
                }`}
              >
                {/* 5 Golden Stars */}
                <div className="flex items-center gap-1 text-base tracking-wider text-brand-orange sm:text-lg">
                  {"★".repeat(5)}
                </div>

                {/* Quote */}
                <p className="mt-3 text-sm leading-relaxed italic text-ink/85 sm:text-base md:text-lg">
                  &ldquo;{activeChef.subtitle}.&rdquo;
                </p>

                {/* Accent Divider Line */}
                <div className="mt-3.5 h-0.5 w-12 rounded-full bg-brand-red sm:mt-4" />

                {/* Chef Name */}
                <h3 className="mt-3 font-display text-lg font-bold text-ink sm:text-xl md:text-2xl lg:text-[26px]">
                  {activeChef.title}
                </h3>

                {/* Role / Location */}
                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-green-dark sm:text-xs">
                  {activeChef.loc}
                </p>
              </div>

              {/* Right Small Cards */}
              <div className="mt-4 flex items-end gap-3 sm:gap-4 md:gap-5">
                {rightIndices.map((idx, pos) => {
                  const chef = CHEFS[idx];
                  return (
                    <button
                      key={`right-${chef.title}-${idx}-${pos}`}
                      type="button"
                      onMouseEnter={(e) => handleCardHover(e, idx)}
                  onMouseLeave={handleCardLeave}
                  onClick={(e) => pick(e, idx)}
                      aria-label={`View ${chef.title}`}
                  data-chef={chef.title}
                      className="group relative h-[120px] w-[90px] shrink-0 self-end overflow-hidden rounded-[16px] border border-brand-red/10 shadow-[0_4px_12px_-4px_rgba(42,24,16,0.08)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:shadow-[0_8px_18px_-6px_rgba(42,24,16,0.14)] sm:h-[148px] sm:w-[110px] sm:rounded-[20px] md:h-[168px] md:w-[125px] lg:h-[180px] lg:w-[135px]"
                    >
                      <div className="relative h-full w-full overflow-hidden">
                        <Image
                          src={chef.image}
                          alt={chef.title}
                          fill
                          sizes="(min-width: 1024px) 400px, (min-width: 768px) 370px, 270px"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                          draggable={false}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-black/5 transition-opacity duration-300 group-hover:opacity-0" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
