import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import ContactHero from "@/components/contact/ContactHero";
import Reveal from "@/components/Reveal";
import PhotoWall from "@/components/contact/PhotoWall";
import SubscribeForm from "@/components/contact/SubscribeForm";
import {
  BUSINESS_TOPICS,
  CUSTOMER_TOPICS,
  EMAIL,
  LAUNCH_DATE,
} from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact Us — Mumbai Dabbawala",
  description:
    "Questions about a plan, a meal, a delivery or a corporate order — and where corporate, franchise and global Dabbawala conversations live.",
};

/**
 * Contact Us, from section 9 of the content doc: For Customers, For Business, and the
 * "Subscribe and Forget — Contact — Registration" close.
 *
 * The hero is `ContactHero`, not the shared `PageHero` — see the note there. The email,
 * the phone and the socials live in it, so "For Customers" below carries only the four
 * topics rather than repeating the routes.
 *
 * The close is laid out as the band the client pointed at on their live site — photo wall
 * on the left, sign-up and launch cards on the right — but the COPY is the doc's, not the
 * live site's. The live site fills that band with "The Waitlist / Don't Just Watch
 * History"; the doc's own registration block is what belongs on this page, and it only
 * appears once rather than being repeated in a separate closing section.
 *
 * Every line here is the doc's, with two exceptions, both of them true rather than
 * marketing: the launch date, which the site already states in its hero seals, and the
 * note under the sign-up input, which says plainly what the form does — see
 * `SubscribeForm`, there is no list provider wired to this site yet.
 */
/**
 * Grounds for the four lid tags, primary palette only — the brand sheet keeps the greens
 * and the yellow for glyphs and accents, not for full grounds.
 */
const TOPIC_TAG = [
  "bg-brand-red text-brand-cream",
  "bg-brand-orange text-ink",
  "bg-brand-cream text-brand-red",
  "bg-brand-red text-brand-cream",
];

export default function ContactPage() {
  const mailto = (subject: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

  return (
    <div className="overflow-x-clip">
      <ContactHero />

      {/* ───── For Customers ─────
           Four wide rows rather than a 2x2 of cards. "Pick the closest match" is a
           one-of-four decision, and a row you can read across in one line makes that
           decision faster than four boxes you have to scan around. It also stops this
           section and "For Business" below from being the same card grid twice running. */}
      <section className="relative bg-paper pb-phi-6 pt-phi-5">
        <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-phi-4 lg:grid-cols-[1fr_1.618fr] lg:gap-phi-5">
            <Reveal>
              <p className="font-script text-3xl text-brand-orange">For customers</p>
              <h2 className="poster-stack mt-2 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
                <span
                  className="poster text-[30px] text-brand-red sm:text-[50px]"
                  style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
                >
                  Get In Touch
                </span>
                <span
                  className="poster text-[30px] text-brand-green-dark sm:text-[50px]"
                  style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
                >
                  By Topic.
                </span>
              </h2>
              <p className="mt-phi-4 max-w-measure text-phi-2 leading-relaxed text-ink/70">
                Pick the closest match and the mail opens with its subject already set, so
                it reaches the right person without being sorted first.
              </p>
            </Reveal>

            <Reveal delay={90}>
              <ul className="divide-y divide-brand-red/10 border-y border-brand-red/10">
                {CUSTOMER_TOPICS.map((topic, i) => (
                  <li key={topic}>
                    <a
                      href={mailto(topic)}
                      className="group flex items-center gap-phi-3 py-phi-3 transition-colors duration-300 hover:bg-brand-cream/60"
                    >
                      {/* the lid tag: the dabbawalas' own routing marks are painted codes,
                          so the index is set in poster type on a coloured square rather
                          than dressed up as an icon */}
                      <span
                        aria-hidden="true"
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-[15px] font-poster text-lg leading-none transition-transform duration-500 group-hover:-rotate-6 sm:h-14 sm:w-14 sm:text-xl ${TOPIC_TAG[i % TOPIC_TAG.length]}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-phi-3 font-bold leading-snug text-ink sm:text-phi-4">
                          {topic}
                        </span>
                        <span className="mt-0.5 block text-phi-0 font-bold uppercase tracking-[0.16em] text-brand-red">
                          Email us
                        </span>
                      </span>

                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="shrink-0 text-brand-red transition-transform duration-500 group-hover:translate-x-1.5"
                      >
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───── For Business ─────
           Light ground, like the section above it. What keeps the two from reading as one
           long list is their SHAPE, not their colour: rows you scan down on the left up
           there, a divided panel of poster-type lines down here. The cream panel is what
           lifts this off the paper. */}
      <section id="business" className="relative bg-paper pb-phi-6 pt-phi-6">
        <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-script text-3xl text-brand-orange">For business</p>
            <h2 className="poster-stack mx-auto mt-3 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
              <span
                className="poster text-[30px] text-brand-red sm:text-[50px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                Beyond The Dabba:
              </span>
              <span
                className="poster text-[30px] text-brand-green-dark sm:text-[50px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                Corporate & Global.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-measure-wide text-phi-2 leading-relaxed text-ink/70">
              For organisations interested in the operational model, franchise
              opportunities, training programs, or the Dabbawala system&rsquo;s global
              expansion — this is where that conversation lives.
            </p>
          </Reveal>

          <Reveal delay={90} className="mt-phi-5">
            <ul className="mx-auto max-w-measure-full overflow-hidden rounded-[28px] bg-brand-cream shadow-[0_14px_34px_-24px_rgba(42,24,16,0.4)]">
              {BUSINESS_TOPICS.map((item, i) => (
                <li
                  key={item.name}
                  className={`flex flex-col gap-x-phi-3 gap-y-1 p-phi-3 sm:flex-row sm:items-baseline sm:p-phi-4 ${
                    i > 0 ? "border-t border-brand-red/12" : ""
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-poster text-[22px] leading-none text-brand-red/30 sm:w-12"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="poster shrink-0 text-[19px] leading-none text-brand-red [--po:2px] sm:text-[23px]"
                    style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
                  >
                    {item.name}
                  </span>
                  <span className="text-phi-1 leading-relaxed text-ink/65 sm:text-phi-2">
                    {item.copy}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140} className="mt-phi-5 text-center">
            <Button
              href={mailto("Corporate & Partnership Enquiries")}
              variant="red"
              size="lg"
            >
              Corporate & Partnership Enquiries
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ───── Subscribe and Forget — the doc's registration close, in the band
           layout the client pointed at ───── */}
      <section className="grain graph-paper relative overflow-hidden bg-brand-cream pb-phi-6 pt-phi-6">
        <div className="relative mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
          {/* No `items-center`: the row stretches, so the wall can match the cards beside
              it. The wall fills this item absolutely from `lg` up (see `PhotoWall`), which
              is what lets the CARDS set the row's height - a wall in normal flow would
              contribute its own ~2000px of photographs instead. Below `lg` the wall is back
              in normal flow and its own height is this item's. */}
          <div className="grid gap-phi-4 lg:grid-cols-[1fr_1.3fr] lg:gap-phi-5">
            <Reveal className="relative">
              <PhotoWall />
            </Reveal>

            <Reveal delay={90} className="space-y-4">
              <div className="rounded-[28px] bg-paper p-phi-4 shadow-[0_14px_34px_-24px_rgba(42,24,16,0.4)] sm:p-phi-5">
                <p className="font-script text-3xl text-brand-orange">Subscribe and forget</p>
                <h2 className="poster-stack mt-3 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
                  <span
                    className="poster text-[28px] text-brand-red sm:text-[44px]"
                    style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
                  >
                    The Best Lunch Decision Is
                  </span>
                  <span
                    className="poster text-[28px] text-brand-green-dark sm:text-[44px]"
                    style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
                  >
                    The One You Only Make Once.
                  </span>
                </h2>
                <p className="mt-phi-3 max-w-measure-wide text-phi-2 leading-relaxed text-ink/70">
                  Set your plan, and let us handle the rest. No daily ordering. No
                  &ldquo;what&rsquo;s for lunch&rdquo; panic at 11:45. Just a dabba that
                  shows up, exactly when it&rsquo;s supposed to.
                </p>

                <SubscribeForm />

                <p className="mt-phi-3 border-t border-brand-red/10 pt-phi-3 font-poster text-base uppercase tracking-[0.04em] text-brand-orange sm:text-xl">
                  Fresh Food · Fair Price · Free Delivery
                </p>
                <p className="mt-1 text-phi-1 leading-relaxed text-ink/60">
                  Every day, without you having to think about it twice.
                </p>
              </div>

              <div className="flex items-center gap-phi-3 rounded-[28px] bg-paper p-phi-3 shadow-[0_14px_34px_-24px_rgba(42,24,16,0.4)] sm:p-phi-4">
                <div className="min-w-0 flex-1">
                  <p className="text-phi-0 font-bold uppercase tracking-[0.18em] text-brand-red">
                    Launching Soon
                  </p>
                  <p className="mt-2 font-display text-phi-3 font-bold leading-snug text-ink">
                    Perth&rsquo;s corridor opens {LAUNCH_DATE}.
                  </p>
                </div>
                <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[15px] sm:h-[84px] sm:w-[84px]">
                  <Image
                    src="/images/stickers/run-perth.png"
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="84px"
                    className="object-contain p-2"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  );
}
