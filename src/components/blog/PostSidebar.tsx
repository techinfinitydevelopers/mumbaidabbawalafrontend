"use client";

import Button, { IconButton } from "@/components/Button";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import BrandIcon from "@/components/BrandIcon";

/** The origin is only knowable in the browser, and it never changes once there. */
const noSubscribe = () => () => {};

/**
 * The rail beside an article: share this piece, and subscribe.
 *
 * Deliberately no "follow us" block. Share and Follow reuse the same glyphs, so the
 * two rows read as a duplicate, and the brand's own profiles, email and phone are
 * already in the footer on every page.
 */
export default function PostSidebar({ title }: { title: string }) {
  const pathname = usePathname();
  // server renders the path alone; the client swaps in the absolute URL after hydration,
  // so the share targets are right without guessing a production domain at build time
  const origin = useSyncExternalStore(
    noSubscribe,
    () => window.location.origin,
    () => "",
  );

  const url = origin + pathname;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shares = [
    {
      key: "facebook",
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      key: "x",
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      key: "linkedin",
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      key: "mail",
      label: "Share by email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-phi-0 font-bold uppercase tracking-[0.2em] text-ink/45">Share</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {shares.map((s) => (
            <IconButton
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              title={s.label}
              size={40}
            >
              <BrandIcon name={s.key} />
            </IconButton>
          ))}
        </div>
      </div>

      <Button href="/contact" variant="red" size="md">
        Subscribe to our newsletter
      </Button>
    </div>
  );
}
