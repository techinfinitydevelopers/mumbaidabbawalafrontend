import Image from "next/image";
import { IconButton } from "@/components/Button";
import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { EMAIL, PHONE, PHONE_DISPLAY, SOCIALS } from "@/data/contact";

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

export default function Footer() {
  return (
    <footer className="grain graph-paper-light relative bg-brand-red pt-8 text-brand-cream">
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-6 pt-8 sm:px-8">
        {/* Two bands, not one grid.

            The brand block and the link lists share a row; the contact details, the
            copyright and the socials share the one below. Splitting them is what lets
            each half use the alignment it actually wants — an earlier pass had all six
            in a single grid, with the copyright and the icons sharing cells with the
            link columns and bottom-aligning out of them, which meant every item had to
            be placed by hand or auto-placement would flow the columns around the two
            explicit cells. Two containers need no placement at all. */}
        <div className="grid gap-8 lg:grid-cols-[1.618fr_1fr_1fr_1fr]">
          <div>
            {/* the supplied mark is dark-on-light, so on a dark ground it needs its own cream chip */}
            <span className="inline-flex rounded-2xl bg-brand-cream px-4 py-3 shadow-[0_10px_28px_-18px_rgba(0,0,0,0.55)]">
              <Image
                src="/images/logo-dabbawala.png"
                alt="Mumbai Dabbawala — since 1890"
                width={614}
                height={149}
                className="h-9 w-auto sm:h-10"
              />
            </span>
            <p className="mt-5 font-display text-2xl font-bold text-brand-cream">
              Mumbai&rsquo;s Legendary Dabba.
              <br />
              Now in Perth.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-brand-cream/80">
              Fresh Food. Fair Price. Free Delivery. For over 135 years, the dabba has
              delivered more than meals — it&rsquo;s delivered trust, and a taste of home.
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

        {/* Contact left, copyright centre, socials right.

            Three equal columns rather than `justify-between`, because the copyright has
            to sit on the page's true centre. With `justify-between` it would centre
            itself in the space left over between the other two, which is only the middle
            if those two happen to be the same width — they are not. An equal-thirds grid
            centres the middle cell on the container regardless.

            No rule between the two containers, and no padding above this one to clear
            it — the gap alone separates them, so it is `mt-6` rather than the 40 + 24
            that a ruled band needed.

            It stacks below `lg` in source order: contact, copyright, socials. */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3 lg:items-center">
          <div className="text-sm font-semibold lg:justify-self-start">
            <p>
              <a href={`mailto:${EMAIL}`} className="hover:text-brand-yellow">
                {EMAIL}
              </a>
            </p>
            <p>
              <a href={`tel:${PHONE}`} className="hover:text-brand-yellow">
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>

          {/* cream/85, not /70: at 12px over the brand red, 70% composites to 3.77:1,
              under AA for text this size. 85% clears it without the line shouting. */}
          <div className="text-xs leading-relaxed text-brand-cream/85 lg:justify-self-center lg:text-center">
            <p>&copy; 2026 Mumbai Dabbawala. All Rights Reserved</p>
            <p>
              Designed &amp; Developed By{" "}
              <a
                href="https://techinfinity.io"
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline underline-offset-2 transition-colors hover:text-brand-yellow"
              >
                Techinfinity
              </a>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-self-end">
            {SOCIALS.map((s) => (
              <IconButton
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
                variant="outlineCream"
                size={36}
              >
                <BrandIcon name={s.key} className="h-4 w-4" />
              </IconButton>
            ))}
          </div>
        </div>

      </div>

      {/* Mumbai on the left, Perth on the right — the whole proposition as one band, so
          the page ends on the journey rather than on a row of social buttons.

          It sits outside the `max-w-7xl` container because it has to run edge to edge,
          and it is a real element rather than a background image: as a background it
          could only be sized by guessing a height, and the artwork would crop
          differently at every viewport. As an `<img>` at its own aspect it scales as one
          picture and the buildings always meet the bottom edge.

          The source arrived 1920x500 and already trimmed; the artwork is the bottom
          478px of it, found by testing alpha against a threshold per row rather than by
          `getbbox()`, which these exports defeat — they carry a faint halo that puts
          non-zero alpha far above the picture.

          It is used at its own 4.02:1, so the skyline runs the full width of the page.
          An earlier pass padded the canvas out to 5.05:1, which shortened the band to
          285px at a 1440 viewport — but padding buys that height with transparent
          gutters, and the artwork then stops about 10% short of each edge instead of
          bleeding off it. Full width won: the height of a full-bleed image is its width
          over its aspect, so the band is 358px at 1440 and there is no way around that
          short of cropping into the Rajabai clock tower's spire. The footer's own
          spacing is tightened to pay for it.

          The hash in the filename is not decoration. `/_next/image` keys its cache on
          the source URL, so replacing this file in place once left browsers serving the
          previous crop from the same address with nothing to tell them it had changed —
          it looked exactly like the swap had not happened. The name carries a hash of the
          contents, so a new picture is always a new URL and no cache can answer for it.
          Regenerate it whenever the artwork changes. */}
      {/* Pulled up under the copy, and `z-0` so it passes BEHIND it rather than over.

          The top third of the artwork is nearly empty — the Rajabai spire and two tower
          tips, under 20% coverage until a third of the way down — so that band of it is
          height the footer was paying for and getting nothing back. Sliding it under the
          text reclaims the space without hiding anything: the overlap stops well short of
          the skyline proper.

          The margin is a PERCENTAGE on purpose. Percentage margins resolve against the
          container's width, and the band's height is that same width over 4.017, so
          -4.7% is a fixed 19% of the band's own height at every viewport. A pixel value
          would be a different fraction of the artwork at every screen size, and would
          start eating buildings on narrow ones. */}
      <div className="relative z-0 -mt-[4.7%]">
        <Image
          src="/images/footer-skyline.cffa74e2.png"
          alt=""
          aria-hidden="true"
          width={1920}
          height={478}
          sizes="100vw"
          className="block h-auto w-full select-none"
        />
      </div>
    </footer>
  );
}
