/**
 * The platform glyphs, drawn once so the footer and the blog rail share them.
 * All sit on a 24×24 box and paint with `currentColor`.
 */

const PATHS: Record<string, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="4" fill="none" strokeWidth="1.9" />
      <circle cx="17.2" cy="6.8" r="1.2" stroke="none" fill="currentColor" />
    </>
  ),
  facebook: (
    <path
      d="M13.6 21v-7.4h2.6l.4-3h-3V8.7c0-.9.3-1.5 1.6-1.5H16.8V4.5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.1H7.8v3h2.6V21h3.2Z"
      stroke="none"
      fill="currentColor"
    />
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" strokeWidth="1.9" />
      <path d="M10.5 9.4v5.2l4.4-2.6-4.4-2.6Z" stroke="none" fill="currentColor" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" fill="none" strokeWidth="1.9" />
      <path
        d="M7.6 10.4v7M7.6 7.4v.1M11.6 17.4v-4a2.4 2.4 0 0 1 4.8 0v4"
        fill="none"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </>
  ),
  tiktok: (
    <path
      d="M14.2 3h2.6c.2 1.9 1.3 3.2 3.2 3.4v2.5c-1.2 0-2.3-.3-3.2-1v5.6a5.3 5.3 0 1 1-5.3-5.3c.3 0 .5 0 .8.1v2.6a2.7 2.7 0 1 0 1.9 2.6V3Z"
      stroke="none"
      fill="currentColor"
    />
  ),
  x: (
    <path
      d="M4 3.4h4.2l4 5.5 4.6-5.5H20l-6.2 7.3L20.4 20h-4.2l-4.2-5.8L6.9 20H4l6.5-7.7L4 3.4Z"
      stroke="none"
      fill="currentColor"
    />
  ),
  mail: (
    <>
      <rect x="2.8" y="5" width="18.4" height="14" rx="2.6" fill="none" strokeWidth="1.9" />
      <path d="m3.6 7 8.4 6 8.4-6" fill="none" strokeWidth="1.9" strokeLinecap="round" />
    </>
  ),
};

export default function BrandIcon({
  name,
  className = "h-5 w-5",
}: {
  name: keyof typeof PATHS | string;
  className?: string;
}) {
  const path = PATHS[name];
  if (!path) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      stroke="currentColor"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {path}
    </svg>
  );
}
