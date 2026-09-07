/**
 * The one place the brand's contact details and profile URLs live, so the footer and
 * the blog rail can't drift apart.
 *
 * The TikTok URL the client supplied carried `?_r=1&_t=…` — a share-session tracking
 * pair, not part of the profile address — so it is stored clean.
 */

export const EMAIL = "hello@mumbaidabbawala.com.au";

/** E.164 for the `tel:` href; `PHONE_DISPLAY` is how it's printed. */
export const PHONE = "+61469860839";
export const PHONE_DISPLAY = "+61 469 860 839";

export type SocialKey = "instagram" | "facebook" | "youtube" | "linkedin" | "tiktok";

export const SOCIALS: { key: SocialKey; label: string; href: string }[] = [
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/mumbaidabbawalaau/",
  },
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61592772927793",
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@mumbaidabbawalaau",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/mumbaidabbawalaau/",
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@mumbaidabbawalaau",
  },
];
