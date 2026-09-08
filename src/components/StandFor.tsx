import Reveal from "@/components/Reveal";

/**
 * "What We Stand For" — the six words the content doc names, in its order, as one
 * continuous marquee.
 *
 * The doc places this section on both the Home page and the About page, so it lives here
 * rather than in either page: one copy of the words, one copy of the motion.
 *
 * Tile grounds come from the primary palette only (red / cream / orange) — the brand
 * sheet reserves the secondary greens and yellow for icons and minimal accents, so
 * they appear on the glyphs and the poster shadow, never as a full ground.
 */
const VALUES: {
  word: string;
  icon: React.ReactNode;
  ground: string;
  text: string;
  glyph: string;
  shadow: string;
}[] = [
  {
    word: "Fresh",
    // sprout
    icon: (
      <>
        <path d="M12 20v-7" />
        <path d="M12 13c0-3.3-2.7-6-6-6 0 3.3 2.7 6 6 6Z" />
        <path d="M12 13c0-3.9 3.1-7 7-7 0 3.9-3.1 7-7 7Z" />
      </>
    ),
    ground: "bg-brand-red",
    text: "text-brand-cream",
    glyph: "text-brand-green",
    shadow: "rgba(42,24,16,0.55)",
  },
  {
    word: "Authentic",
    // stamp
    icon: (
      <>
        <path d="M4 20h16" />
        <path d="M6 16.5h12v-2H6v2Z" />
        <path d="M9.5 14.5c-1-2.6-2-3.6-2-5.5a4.5 4.5 0 0 1 9 0c0 1.9-1 2.9-2 5.5" />
      </>
    ),
    ground: "bg-brand-cream",
    text: "text-ink",
    glyph: "text-brand-green-dark",
    shadow: "var(--color-brand-yellow)",
  },
  {
    word: "Affordable",
    // price tag
    icon: (
      <>
        <path d="M13.5 3.5H20v6.5L10.5 19.5 4 13 13.5 3.5Z" />
        <circle cx="16.6" cy="7.4" r="1.3" />
      </>
    ),
    ground: "bg-brand-orange",
    text: "text-ink",
    glyph: "text-brand-green-dark",
    shadow: "var(--color-brand-yellow)",
  },
  {
    word: "Convenient",
    // clock
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3.5 2" />
      </>
    ),
    ground: "bg-brand-cream",
    text: "text-ink",
    glyph: "text-brand-green-dark",
    shadow: "var(--color-brand-yellow)",
  },
  {
    word: "Reliable",
    // shield with a tick
    icon: (
      <>
        <path d="M12 3.5l7 2.5v6c0 4-3 7-7 8.5-4-1.5-7-4.5-7-8.5V6l7-2.5Z" />
        <path d="M8.8 12.2l2.2 2.2 4.2-4.4" />
      </>
    ),
    ground: "bg-brand-red",
    text: "text-brand-cream",
    glyph: "text-brand-yellow",
    shadow: "rgba(42,24,16,0.55)",
  },
  {
    word: "Personal",
    // hand holding a tiffin
    icon: (
      <>
        <path d="M8.5 10.5V6.2A1.7 1.7 0 0 1 10.2 4.5h3.6a1.7 1.7 0 0 1 1.7 1.7v4.3" />
        <path d="M7 10.5h10v4H7v-4Z" />
        <path d="M4.5 17.5c2.5 2.5 6 3 7.5 3s5-.5 7.5-3" />
      </>
    ),
    ground: "bg-brand-orange",
    text: "text-ink",
    glyph: "text-brand-green-dark",
    shadow: "var(--color-brand-yellow)",
  },
];

export default function StandFor() {
  return (
    <section className="grain graph-paper relative overflow-hidden bg-brand-cream pb-phi-4 pt-phi-5 sm:pb-phi-5">
      <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-script text-3xl text-brand-orange">What we stand for</p>
          <h2 className="poster-stack mx-auto mt-2 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
            <span
              className="poster text-[30px] text-brand-red sm:text-[46px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              Six Words.
            </span>
            <span
              className="poster text-[30px] text-brand-green-dark sm:text-[46px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              One Promise.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-measure text-phi-2 leading-relaxed text-ink/70">
            We don&rsquo;t just deliver meals — we deliver on a set of values that
            don&rsquo;t change, no matter how big we get or how far from Mumbai we travel.
          </p>
        </Reveal>

        {/* The doc gives the six words and nothing else. Each tile makes its word the
            whole subject in poster type rather than propping it up with a made-up
            one-liner — colour, an icon and scale do the work the copy can't. */}
      </div>

      {/* One continuous line. `.rail` + `.rail-track` are the site's existing marquee
          (22s linear, paused on hover and on focus-within, and already switched off
          under prefers-reduced-motion). The track holds the six tiles twice because
          the keyframe travels -50%; the second set is aria-hidden so the values are
          not announced twice. It bleeds past the padded container on purpose — a
          marquee that stops at a margin reads as a broken row. */}
      <div className="rail relative mt-phi-4 overflow-hidden py-2 lg:mt-phi-3">
        <div className="rail-track flex gap-3 sm:gap-4">
          {[...VALUES, ...VALUES].map((value, i) => {
            const dup = i >= VALUES.length;
            return (
              <div
                key={`${value.word}-${i}`}
                aria-hidden={dup || undefined}
                className={`flex min-h-[168px] w-[236px] shrink-0 flex-col justify-between overflow-hidden rounded-[28px] p-phi-3 shadow-[0_10px_30px_-20px_rgba(42,24,16,0.45)] sm:w-[268px] sm:p-phi-4 ${value.ground} ${value.text}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={`shrink-0 ${value.glyph}`}
                  >
                    {value.icon}
                  </svg>
                  <span className="font-poster text-[22px] leading-none opacity-45">
                    {String((i % VALUES.length) + 1).padStart(2, "0")}
                  </span>
                </div>

                <span
                  className="poster mt-phi-3 block text-[26px] leading-none [--po:3px] sm:text-[32px]"
                  style={{ ["--po-color" as string]: value.shadow }}
                >
                  {value.word}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
        <Reveal delay={140} className="mt-phi-4 text-center lg:mt-phi-3">
          <p className="font-script text-3xl text-brand-red sm:text-4xl">Every single dabba.</p>
        </Reveal>
      </div>
    </section>
  );
}
