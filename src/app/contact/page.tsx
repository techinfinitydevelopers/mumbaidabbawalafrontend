import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import { IconButton } from "@/components/Button";
import BrandIcon from "@/components/BrandIcon";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import PhotoWall from "@/components/contact/PhotoWall";
import SubscribeForm from "@/components/contact/SubscribeForm";
import {
  BUSINESS_TOPICS,
  CUSTOMER_TOPICS,
  EMAIL,
  LAUNCH_DATE,
  PHONE,
  PHONE_DISPLAY,
  SOCIALS,
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
export default function ContactPage() {
  const mailto = (subject: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

  return (
    <div className="overflow-x-clip">
      <PageHero
        kicker="We treat every message like a dabba"
        titleTop="Let's Talk"
        titleBottom="Dabba."
        facts={[
          { value: "135+", label: "Years of\npractice" },
          { value: "5", label: "Regional\ncuisines" },
          { value: "$0", label: "Delivery\nfee, always" },
        ]}
        lead="Got a question about your plan, a meal, a delivery, or a corporate order? We're here — and we treat every message the way we treat every dabba: with care and without delay."
        primary={{ href: mailto("Hello from the website"), label: "Send Us a Message" }}
        secondary={{ href: "#business", label: "Corporate & Franchise" }}
        seal={{ eyebrow: "Every", lines: ["Message", "Read"], script: "with care" }}
      />

      {/* ───── For Customers ───── */}
      <section className="relative bg-paper pb-phi-6 pt-phi-5">
        <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-phi-4 lg:grid-cols-[1fr_1.618fr] lg:gap-phi-5">
            <Reveal>
              <p className="font-script text-3xl text-brand-orange">For customers</p>
              <h2 className="poster-stack mt-2 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
                <span
                  className="poster text-[26px] text-brand-red sm:text-[42px]"
                  style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
                >
                  Get In Touch
                </span>
                <span
                  className="poster text-[26px] text-brand-green-dark sm:text-[42px]"
                  style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
                >
                  By Topic.
                </span>
              </h2>

              <div className="mt-phi-4 space-y-phi-2">
                <a
                  href={`mailto:${EMAIL}`}
                  className="block text-phi-2 font-semibold text-brand-red underline decoration-brand-red/30 underline-offset-4 transition-colors hover:decoration-brand-red"
                >
                  {EMAIL}
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="block text-phi-2 font-semibold text-ink/70 transition-colors hover:text-brand-red"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>

              <div className="mt-phi-3 flex flex-wrap gap-2.5">
                {SOCIALS.map((s) => (
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
            </Reveal>

            <Reveal delay={90}>
              {/* one card per route, each opening a mail with its own subject line, so a
                  message arrives already sorted rather than everything landing unlabelled */}
              <ul className="grid gap-4 sm:grid-cols-2">
                {CUSTOMER_TOPICS.map((topic, i) => (
                  <li key={topic}>
                    <a
                      href={mailto(topic)}
                      className="group flex h-full flex-col justify-between rounded-[28px] border border-brand-red/12 bg-brand-cream p-phi-3 shadow-[0_8px_26px_-20px_rgba(42,24,16,0.28)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-green hover:shadow-[0_12px_30px_-20px_rgba(44,73,15,0.34)] sm:p-phi-4"
                    >
                      <span className="font-poster text-[22px] leading-none text-brand-red/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-phi-3 font-display text-phi-3 font-bold leading-tight text-ink">
                        {topic}
                      </span>
                      <span className="mt-phi-2 inline-flex items-center gap-1.5 text-phi-0 font-bold uppercase tracking-[0.16em] text-brand-red">
                        Email us
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                          className="transition-transform duration-500 group-hover:translate-x-1"
                        >
                          <path
                            d="M5 12h14M13 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="2.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───── For Business ───── */}
      <section id="business" className="relative bg-paper pb-phi-6 pt-phi-6">
        <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-script text-3xl text-brand-orange">For business</p>
            <h2 className="poster-stack mx-auto mt-2 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
              <span
                className="poster text-[26px] text-brand-red sm:text-[42px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                Beyond The Dabba:
              </span>
              <span
                className="poster text-[26px] text-brand-green-dark sm:text-[42px]"
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

          <div className="mt-phi-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {BUSINESS_TOPICS.map((item, i) => (
              <Reveal key={item.name} delay={i * 70}>
                <article className="flex h-full flex-col rounded-[28px] border border-brand-red/12 bg-brand-cream p-phi-3 shadow-[0_8px_26px_-20px_rgba(42,24,16,0.28)] sm:p-phi-4">
                  <span className="font-poster text-[22px] leading-none text-brand-red/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-phi-3 font-display text-phi-3 font-bold leading-tight text-ink">
                    {item.name}
                  </h3>
                  <p className="mt-phi-2 text-phi-1 leading-relaxed text-ink/65">{item.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>

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
                    className="poster text-[26px] text-brand-red sm:text-[40px]"
                    style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
                  >
                    The Best Lunch Decision Is
                  </span>
                  <span
                    className="poster text-[26px] text-brand-green-dark sm:text-[40px]"
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
