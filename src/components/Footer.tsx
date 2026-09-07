import Image from "next/image";
import Link from "next/link";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "Our Story" },
      { href: "/menu", label: "Our Menu" },
      { href: "/plans", label: "Plans" },
    ],
  },
  {
    title: "Order",
    links: [
      { href: "/menu", label: "15-Day Menu" },
      { href: "/whats-cooking-tomorrow", label: "What's Cooking Tomorrow" },
      { href: "/regional-food-stories", label: "Regional Cuisines" },
      { href: "/plans", label: "Corporate Dabba" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "/contact", label: "Contact Us" },
      { href: "/blog", label: "From Our Kitchen" },
      { href: "/chefs-corner", label: "Chef's Corner" },
    ],
  },
];

const SOCIALS = [
  { href: "https://www.instagram.com/mumbaidabbawalaau/", label: "Instagram" },
  { href: "https://www.facebook.com/profile.php?id=61592772927793", label: "Facebook" },
  { href: "https://www.youtube.com/@mumbaidabbawalaau", label: "YouTube" },
  { href: "https://www.linkedin.com/company/mumbaidabbawalaau/", label: "LinkedIn" },
  { href: "https://www.tiktok.com/@mumbaidabbawalaau", label: "TikTok" },
];

export default function Footer() {
  return (
    <footer className="grain graph-paper-light relative bg-brand-red text-brand-cream">
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            {/* the supplied mark is dark-on-light, so on the red it sits on its own cream chip */}
            <span className="inline-flex rounded-2xl bg-brand-cream px-4 py-3 shadow-[0_10px_28px_-18px_rgba(0,0,0,0.55)]">
              <Image
                src="/images/logo-dabbawala.png"
                alt="Mumbai Dabbawala — since 1890"
                width={614}
                height={149}
                className="h-9 w-auto sm:h-10"
              />
            </span>
            <p className="mt-6 font-display text-2xl font-bold text-brand-cream">
              Mumbai&rsquo;s Legendary Dabba.
              <br />
              Now in Perth.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-brand-cream/80">
              Fresh Food. Fair Price. Free Delivery. For over 135 years, the dabba has
              delivered more than meals — it&rsquo;s delivered trust, and a taste of home.
            </p>
            <p className="mt-5 text-sm font-semibold">
              <a href="mailto:hello@mumbaidabbawala.com.au" className="hover:text-brand-yellow">
                hello@mumbaidabbawala.com.au
              </a>
            </p>
            <p className="text-sm font-semibold">
              <a href="tel:+61469860839" className="hover:text-brand-yellow">
                +61 469 860 839
              </a>
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-cream/85 transition-colors hover:text-brand-yellow"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-brand-cream/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-brand-cream/70">
            Mumbai since 1890 · Perth from 14 September 2026
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-brand-cream/80 hover:text-brand-yellow"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
