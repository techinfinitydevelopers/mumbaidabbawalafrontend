"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { HERO_VIDEO } from "@/data/home";

/**
 * The hero's moving ground.
 *
 * The poster still is always rendered, server-side and eager, so the hero is never blank
 * and never shifts: the video is layered over it and only mounted when playing it is
 * actually the right call.
 *
 * Two conditions gate that, read as one media query:
 *  - `prefers-reduced-motion: no-preference` — a looping background is exactly the kind
 *    of motion the setting exists to stop.
 *  - `min-width: 768px` — the file is ~11MB, which is not something to push down a phone
 *    connection for decoration. Phones get the still.
 *
 * `useSyncExternalStore` keeps that decision out of the server render (the snapshot is
 * `false` there), so there is no hydration mismatch and no first-paint flash of video.
 */

const PLAYABLE = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(PLAYABLE);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function HeroVideo({ className = "" }: { className?: string }) {
  const playable = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(PLAYABLE).matches,
    () => false,
  );

  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={HERO_VIDEO.poster}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {playable && (
        <video
          src={HERO_VIDEO.src}
          poster={HERO_VIDEO.poster}
          width={HERO_VIDEO.width}
          height={HERO_VIDEO.height}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
