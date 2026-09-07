"use client";

import Link from "next/link";
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
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45">Share</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {shares.map((s) => (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              title={s.label}
              className="grid h-10 w-10 place-items-center rounded-full border border-brand-red/15 bg-paper text-ink/70 transition-colors duration-300 hover:border-brand-green hover:bg-brand-cream hover:text-brand-red"
            >
              <BrandIcon name={s.key} />
            </a>
          ))}
        </div>
      </div>

      <Link
        href="/contact"
        className="rounded-full bg-brand-red px-6 py-3.5 text-center text-[11px] font-bold uppercase leading-snug tracking-[0.14em] text-brand-cream transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-orange"
      >
        Subscribe to our newsletter
      </Link>
    </div>
  );
}
