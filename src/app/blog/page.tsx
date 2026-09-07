import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import BlogIndex from "@/components/blog/BlogIndex";
import { CATEGORY_IMAGE, FEATURED_POST, MOST_POPULAR } from "@/data/blog";

export const metadata: Metadata = {
  title: "Notes from the Relay — Mumbai Dabbawala",
  description:
    "Dispatches from the daily run — how the coding system works, who books the seminars, and what a training batch actually looks like.",
};

export default function BlogPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ───── Lead story beside the most-popular rail, as on the Litmus blog ───── */}
      <section className="grain graph-paper relative bg-brand-cream pb-phi-5 pt-phi-6 sm:pb-phi-6 sm:pt-phi-7">
        <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
          <Reveal className="max-w-3xl">
            <p className="font-script text-3xl text-brand-orange">From the network</p>
            <h1 className="poster-stack mt-2 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
              <span
                className="poster text-[30px] text-brand-red sm:text-[46px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                Notes from
              </span>
              <span
                className="poster text-[30px] text-brand-green-dark sm:text-[46px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                the Relay.
              </span>
            </h1>
            <p className="mt-5 max-w-measure text-phi-2 leading-relaxed text-ink/70 sm:text-phi-3">
              Dispatches from the daily run — how the coding system works, who books the
              seminars, and what a training batch actually looks like.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.618fr_1fr] lg:gap-phi-4">
            {/* Lead story */}
            <Reveal>
              <Link href={`/blog/${FEATURED_POST.slug}`} className="group block">
                <div className="relative aspect-[2/1] overflow-hidden rounded-[32px] bg-ink shadow-[0_14px_40px_-26px_rgba(42,24,16,0.5)]">
                  <Image
                    src={CATEGORY_IMAGE[FEATURED_POST.category]}
                    alt=""
                    width={1024}
                    height={576}
                    priority
                    sizes="(min-width: 1024px) 60vw, 92vw"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-brand-red px-4 py-2 text-phi-0 font-bold uppercase tracking-[0.16em] text-brand-cream">
                    {FEATURED_POST.category}
                  </span>
                </div>

                <p className="mt-5 text-phi-0 font-bold uppercase tracking-[0.18em] text-ink/45">
                  {FEATURED_POST.month} · Lead story
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-[32px]">
                  {FEATURED_POST.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70 sm:text-phi-3">
                  {FEATURED_POST.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-red">
                  Read the story
                  <svg
                    width="13"
                    height="13"
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
              </Link>
            </Reveal>

            {/* Most popular */}
            <Reveal delay={120} className="self-start">
              <div className="rounded-[32px] border border-brand-red/12 bg-paper p-6 shadow-[0_8px_26px_-20px_rgba(42,24,16,0.28)] sm:p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-green-dark">
                  Most popular
                </p>

                <ol className="mt-5 space-y-3.5">
                  {MOST_POPULAR.map((post, i) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex gap-4 rounded-[22px] bg-brand-cream/70 p-4 transition-colors duration-300 hover:bg-brand-cream"
                      >
                        <span className="font-poster text-xl leading-none text-brand-orange">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-display text-[15px] font-bold leading-snug text-ink">
                            {post.title}
                          </span>
                          <span className="mt-1.5 block text-phi-0 font-bold uppercase tracking-[0.16em] text-brand-red">
                            {post.category} · {post.month}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───── Everything else, filterable ───── */}
      <section className="relative bg-paper pb-phi-6 pt-phi-5 sm:pb-phi-6 sm:pt-phi-5">
        <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-script text-3xl text-brand-orange">Every dispatch</p>
              <h2 className="poster mt-1 text-[30px] text-brand-red [--po:4px] sm:text-[48px] sm:[--po:5px]">
                The Archive
              </h2>
            </div>
          </Reveal>

          <BlogIndex />
        </div>
      </section>

      {/* ───── Subscribe band ───── */}
      <section className="grain graph-paper relative bg-brand-cream py-phi-5 sm:py-phi-6">
        <Reveal className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="poster text-[26px] text-brand-red [--po:4px] sm:text-[40px] sm:[--po:5px]">
            Keep Up With the Relay
          </h2>
          <p className="mx-auto mt-4 max-w-measure text-phi-2 leading-relaxed text-ink/70 sm:text-phi-3">
            New dispatches from the kitchen and the route, plus what&rsquo;s coming to the
            Perth menu — straight to your inbox.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-block rounded-full bg-brand-red px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-cream transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-orange"
          >
            Subscribe
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
