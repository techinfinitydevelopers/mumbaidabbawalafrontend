"use client";

import { useEffect, type RefObject } from 'react';

/** px of vertical scroll per px of horizontal track travel (site: 9000 / ~3943) */
const RATIO = 2.28;

/**
 * Scroll held still at the end of the track, as a share of one viewport height.
 *
 * Without it the pan and the pin end on the same pixel: the last words of the line arrive
 * exactly as the band lets go, and the ending cannot be read. The lerp below makes that
 * worse, because `current` is still catching up to `target` at the moment the section
 * unpins.
 *
 * It is measured in viewport heights rather than as a share of the track, so a long line
 * does not buy itself a proportionally absurd hold — one screen of scrolling is what it
 * takes to read the end of a sentence, whether the track is three screens or twenty.
 */
const TAIL_HOLD_VH = 1;

/** badge rotation per px of track travel (site: 218.962deg @ 594.812px) */
export const ROT_PER_PX = 0.368;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export type Frame = {
  /** current horizontal track offset in px (0 → travel) */
  x: number;
  /** 0→1 progress of a panel crossing the stage, for staggered reveals */
  panel: (el: HTMLElement | null) => number;
  /** eased 0→1 with a per-item stagger, plus an optional extra delay */
  step: (
    progress: number,
    index: number,
    stagger: number,
    span: number,
    delay?: number,
  ) => number;
};

/**
 * Drives the pinned horizontal track.
 *
 * The section's height is derived from how far the track has to travel, so the
 * scroll length always matches the content — no magic numbers to keep in sync.
 * Per-frame work writes straight to the DOM (never to state): one render pass
 * per frame instead of one React commit per frame.
 *
 * The track does not pan for the whole of that height. The pan finishes `TAIL_HOLD_VH`
 * viewport heights before the pin releases, and that last stretch is spent still, holding
 * the end of the line on screen long enough to read.
 */
export function useTrackScroll(
  sectionRef: RefObject<HTMLElement | null>,
  clipRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  onFrame: (frame: Frame) => void,
) {
  useEffect(() => {
    const section = sectionRef.current;
    const clip = clipRef.current;
    const track = trackRef.current;
    if (!section || !clip || !track) return;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    let travel = 0;
    /** scroll spent panning, before the hold */
    let panSpan = 0;
    let current = 0;
    let target = 0;
    let raf = 0;

    const layout = () => {
      travel = Math.max(0, track.scrollWidth - clip.clientWidth);
      panSpan = travel * RATIO;
      const hold = window.innerHeight * TAIL_HOLD_VH;
      section.style.height = `${panSpan + hold + window.innerHeight}px`;
    };

    /* Progress is read against the pan alone, not against the whole pinned height: past
       `panSpan` it clamps to 1 and the track simply stays where it is while the rest of
       the section scrolls by underneath the pin. */
    const readScroll = () => {
      const p = panSpan > 0 ? clamp((window.scrollY - section.offsetTop) / panSpan, 0, 1) : 0;
      target = p * travel;
    };

    const panel = (el: HTMLElement | null) => {
      if (!el) return 0;
      const w = clip.clientWidth;
      const from = el.offsetLeft - w;
      const to = el.offsetLeft - w * 0.42;
      return to === from ? 1 : clamp((current - from) / (to - from), 0, 1);
    };

    const step = (
      progress: number,
      index: number,
      stagger: number,
      span: number,
      delay = 0,
    ) => easeOut(clamp((progress - index * stagger - delay) / span, 0, 1));

    const render = () => {
      track.style.transform = `perspective(1200px) translateX(${-current}px)`;
      onFrame({ x: current, panel, step });
    };

    /* Delta-time lerp so the smoothing feels identical at 60Hz, 120Hz or when
       the tab is throttled: 0.09 is the per-16.67ms rate, rescaled per frame. */
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      const k = reduce ? 1 : 1 - Math.pow(1 - 0.09, dt / 16.67);
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.05) current = target;
      render();
      raf = requestAnimationFrame(tick);
    };

    const remeasure = () => {
      layout();
      readScroll();
    };

    remeasure();
    current = target;
    render();
    raf = requestAnimationFrame(tick);

    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('resize', remeasure);

    // the stage can be measured at zero width (hidden pane, late fonts)
    const ro = new ResizeObserver(remeasure);
    ro.observe(clip);
    document.fonts?.ready.then(remeasure);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', readScroll);
      window.removeEventListener('resize', remeasure);
      ro.disconnect();
    };
  }, [sectionRef, clipRef, trackRef, onFrame]);
}
