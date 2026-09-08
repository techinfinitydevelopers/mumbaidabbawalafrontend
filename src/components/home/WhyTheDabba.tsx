import Reveal from "@/components/Reveal";
import WaveDivider from "@/components/poster/WaveDivider";
import { WHY_THE_DABBA } from "@/data/home";

/**
 * "WHY THE DABBA? Because Some Things Deserve to Be Done Right."
 *
 * Four values on red — the one loud band on the page, in the same place the other pages
 * put their closing CTA. The doc's emoji (🤝 🎯 👥 🏠) are redrawn as line glyphs so they
 * sit in the palette and render identically everywhere.
 *
 * The cards are cream on red rather than red on cream: at four across, outlined cards on
 * a printed ground turn into a grid of boxes, and the section's job here is to be the
 * page's one full-strength moment.
 */
const GLYPHS: React.ReactNode[] = [
  // Trust — a handshake
  <>
    <path d="M3 11.5 7 8l3.2 2.6a1.8 1.8 0 0 1 .2 2.6l-.4.4" key="a" />
    <path d="M21 11.5 17 8l-3.2 2.6a1.8 1.8 0 0 0-.2 2.6l.4.4" key="b" />
    <path d="M10 13.6l1.4 1.4a1.6 1.6 0 0 0 2.3 0" key="c" />
    <path d="M3 11.5v3.2l2.6 2.4M21 11.5v3.2l-2.6 2.4" key="d" />
  </>,
  // Discipline — a target
  <>
    <circle cx="12" cy="12" r="8.5" key="a" />
    <circle cx="12" cy="12" r="4.6" key="b" />
    <circle cx="12" cy="12" r="1.1" key="c" />
  </>,
  // People — two figures
  <>
    <circle cx="9" cy="8" r="3" key="a" />
    <path d="M3.5 20v-1.2A4.3 4.3 0 0 1 7.8 14.5h2.4a4.3 4.3 0 0 1 4.3 4.3V20" key="b" />
    <path d="M16 6.4a3 3 0 0 1 0 5.6" key="c" />
    <path d="M17.2 14.6h.6a4.3 4.3 0 0 1 4.2 4.3V20" key="d" />
  </>,
  // Home — a roof over a door
  <>
    <path d="M3.5 10.8 12 4l8.5 6.8" key="a" />
    <path d="M5.6 12.4V20h12.8v-7.6" key="b" />
    <path d="M10 20v-4.4h4V20" key="c" />
  </>,
];

export default function WhyTheDabba() {
  return (
    <section className="grain graph-paper-light relative overflow-hidden bg-brand-red pb-phi-6 pt-phi-7 sm:pt-phi-8">
      <WaveDivider tone="bg-paper" textured={false} />

      <div className="relative z-20 mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-script text-3xl text-brand-yellow">Why the dabba?</p>
          <h2 className="poster-stack mx-auto mt-3 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
            <span
              className="poster text-[26px] text-brand-yellow sm:text-[44px]"
              style={{ ["--po-color" as string]: "rgba(42,24,16,0.85)" }}
            >
              Because Some Things
            </span>
            <span
              className="poster text-[26px] text-brand-green sm:text-[44px]"
              style={{ ["--po-color" as string]: "rgba(42,24,16,0.6)" }}
            >
              Deserve To Be Done Right.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-measure text-phi-2 leading-relaxed text-brand-cream/85">
            Behind every dabba is more than a delivery system — it&rsquo;s a set of values
            that have held for over a century.
          </p>
        </Reveal>

        <div className="mt-phi-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {WHY_THE_DABBA.map((value, i) => (
            <Reveal key={value.name} delay={i * 80}>
              <article className="flex h-full flex-col rounded-[28px] bg-brand-cream p-phi-3 shadow-[0_14px_34px_-22px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:-translate-y-1.5 sm:p-phi-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-green-dark/10 text-brand-green-dark">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {GLYPHS[i]}
                    </svg>
                  </span>
                  <span className="font-poster text-[22px] leading-none text-brand-red/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3
                  className="poster mt-phi-3 block text-[26px] leading-none text-brand-red [--po:3px] sm:text-[30px]"
                  style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
                >
                  {value.name}
                </h3>

                <p className="mt-phi-2 text-phi-1 leading-relaxed text-ink/70">{value.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
