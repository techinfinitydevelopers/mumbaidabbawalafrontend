import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import PlanCard from "@/components/plans/PlanCard";
import WaveDivider from "@/components/poster/WaveDivider";
import { PLANS, PLAN_TERMS_NOTE } from "@/data/plans";

export const metadata: Metadata = {
  title: "Plans — A Dabba for Every Routine | Mumbai Dabbawala",
  description:
    "Whatever your week looks like, there's a plan for it. Trial, Weekly, Monthly and Corporate dabba plans.",
};

export default function PlansPage() {
  return (
    <div className="overflow-x-hidden">
      <PageHero
        kicker="Whatever your week looks like"
        titleTop="A Dabba For"
        titleBottom="Every Routine"
        facts={[
          { value: "4", label: "Plans to\nchoose from" },
          { value: "5", label: "Regional\ncuisines" },
          { value: "$0", label: "Delivery\nfee, always" },
        ]}
        lead="No two routines are the same — a student's week doesn't look like a family's, and a busy office doesn't look like either. So instead of one rigid plan, pick the rhythm that fits your life."
        primary={{ href: "#plans", label: "See the Plans" }}
        secondary={{ href: "/menu", label: "See the Menu" }}
        seal={{ eyebrow: "Most", lines: ["Loved", "Plan"], script: "monthly dabba" }}
      />

      {/* ───── The four plans ───── */}
      <section id="plans" className="relative bg-paper pb-24 pt-14 sm:pb-28 sm:pt-16">
        <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
          <Reveal className="max-w-3xl">
            <p className="font-script text-3xl text-brand-orange">Pick your rhythm</p>
            <h2 className="poster-stack mt-2 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
              <span
                className="poster text-[26px] text-brand-red sm:text-[42px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                Whatever Your Week
              </span>
              <span
                className="poster text-[26px] text-brand-green-dark sm:text-[42px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                Looks Like.
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/70 sm:text-base">
              Start with three meals, settle into a work week, or set the whole month and
              forget about lunch. Every plan runs on the same 15-day rotation and the same
              free delivery.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {PLANS.map((plan, i) => (
              <Reveal key={plan.slug} delay={i * 80}>
                <PlanCard plan={plan} />
              </Reveal>
            ))}
          </div>

          {/* The doc's closing line. No border: this box is wide and shallow, so a hairline
              outline reads as a rule across the page rather than as a card edge. */}
          <Reveal
            delay={120}
            className="mt-10 flex flex-col gap-4 rounded-[28px] bg-brand-cream/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7"
          >
            <p className="max-w-2xl text-[13px] leading-relaxed text-ink/70">{PLAN_TERMS_NOTE}</p>
            <Link
              href="/contact"
              className="shrink-0 rounded-full border-2 border-brand-red/25 px-6 py-3 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-brand-red transition-colors duration-300 hover:border-brand-red hover:bg-brand-red hover:text-brand-cream"
            >
              Check My Delivery Zone
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───── Closing CTA ───── */}
      <section className="grain graph-paper-light relative overflow-hidden bg-brand-red pb-16 pt-28 sm:pb-20">
        <WaveDivider tone="bg-paper" textured={false} />

        <Reveal className="relative z-20 mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="font-script text-3xl text-brand-yellow">Still deciding?</p>
          <h2 className="poster-stack mt-3 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
            <span
              className="poster text-[28px] text-brand-yellow sm:text-[44px]"
              style={{ ["--po-color" as string]: "rgba(42,24,16,0.85)" }}
            >
              Start With Three
            </span>
            <span
              className="poster text-[28px] text-brand-green sm:text-[44px]"
              style={{ ["--po-color" as string]: "rgba(42,24,16,0.6)" }}
            >
              Meals.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-brand-cream/85 sm:text-base">
            The 3-day taster is the whole idea in miniature — one cuisine, no commitment,
            and the same food everyone else is eating that week.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-brand-yellow px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-red shadow-[0_16px_30px_-14px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start Trial
            </Link>
            <Link
              href="/whats-cooking-tomorrow"
              className="rounded-full border-2 border-brand-cream/50 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-cream transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-cream/10"
            >
              See Tomorrow&rsquo;s Dabba
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
