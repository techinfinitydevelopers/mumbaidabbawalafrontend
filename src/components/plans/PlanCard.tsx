import Link from "next/link";
import type { Plan } from "@/data/plans";

/**
 * One plan.
 *
 * The Monthly plan is the doc's "Most Popular", so it inverts into brand red the same
 * way the featured day card does on the menu — one loud card, the rest on paper.
 */
export default function PlanCard({ plan }: { plan: Plan }) {
  const featured = Boolean(plan.featured);

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-[32px] border p-7 transition-all duration-500 hover:-translate-y-1.5 sm:p-8 ${
        featured
          ? "border-brand-red bg-brand-red shadow-[0_14px_34px_-20px_rgba(175,20,17,0.55)]"
          : "border-brand-red/12 bg-paper shadow-[0_8px_26px_-20px_rgba(42,24,16,0.28)] hover:border-brand-green hover:shadow-[0_12px_30px_-20px_rgba(44,73,15,0.34)]"
      }`}
    >
      {featured && (
        <span className="absolute right-6 top-7 rounded-full bg-brand-yellow px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-brand-red">
          Most loved
        </span>
      )}

      <h3
        className={`font-display text-xl font-bold leading-tight ${
          featured ? "text-brand-cream" : "text-ink"
        }`}
      >
        {plan.name}
      </h3>
      <p
        className={`mt-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
          featured ? "text-brand-yellow" : "text-brand-orange"
        }`}
      >
        {plan.variant}
      </p>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span
          className={`font-poster text-[34px] leading-none sm:text-[40px] ${
            featured ? "text-brand-yellow" : "text-brand-red"
          }`}
        >
          {plan.price}
        </span>
        <span
          className={`text-[13px] font-semibold ${
            featured ? "text-brand-cream/80" : "text-ink/60"
          }`}
        >
          {plan.unit}
        </span>
      </div>
      {plan.priceIsPlaceholder ? (
        // the content doc still has $XX.XX here; saying so beats inventing a number
        <p
          className={`mt-2 text-[10px] font-bold uppercase tracking-[0.14em] ${
            featured ? "text-brand-cream/60" : "text-ink/40"
          }`}
        >
          Price to be confirmed · GST inclusive
        </p>
      ) : (
        <p
          className={`mt-2 text-[10px] font-bold uppercase tracking-[0.14em] ${
            featured ? "text-brand-cream/60" : "text-ink/40"
          }`}
        >
          Quoted per office
        </p>
      )}

      <p
        className={`mt-5 text-sm leading-relaxed ${
          featured ? "text-brand-cream/85" : "text-ink/70"
        }`}
      >
        {plan.blurb}
      </p>

      <ul
        className={`mt-6 space-y-2.5 border-t pt-6 ${
          featured ? "border-brand-cream/20" : "border-brand-red/10"
        }`}
      >
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2.5">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className={`mt-0.5 shrink-0 ${
                featured ? "text-brand-yellow" : "text-brand-green-dark"
              }`}
            >
              <path
                d="M4.5 12.5l4.5 4.5L19.5 6.5"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className={`text-[13px] leading-relaxed ${
                featured ? "text-brand-cream/85" : "text-ink/75"
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* mt-auto on the wrapper so the four CTAs line up however long the feature lists run */}
      <div className="mt-auto pt-7">
        <Link
          href="/contact"
          className={`block rounded-full px-6 py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.16em] transition-transform duration-300 hover:-translate-y-0.5 ${
            featured
              ? "bg-brand-yellow text-brand-red"
              : "bg-brand-red text-brand-cream hover:bg-brand-orange"
          }`}
        >
          {plan.cta}
        </Link>
      </div>
    </article>
  );
}
