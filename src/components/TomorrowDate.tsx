"use client";

import { useSyncExternalStore } from "react";

/**
 * Tomorrow's date, in Perth.
 *
 * Computed on the client rather than on the server: this Next build uses Cache Components,
 * so a server-rendered date would be frozen into the cached shell and go stale.
 * `useSyncExternalStore` gives the server a stable "Tomorrow" snapshot and the client the
 * real date, so there's no hydration mismatch and no state-setting inside an effect.
 */

/** nothing to subscribe to — the value only needs to differ between server and client */
const subscribe = () => () => {};

function getSnapshot() {
  return new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString("en-AU", {
    timeZone: "Australia/Perth",
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

const getServerSnapshot = () => "Tomorrow";

export default function TomorrowDate({ className = "" }: { className?: string }) {
  const label = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return <span className={className}>{label}</span>;
}
