"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import { BLOG_CATEGORIES, LISTED_POSTS, type BlogCategory } from "@/data/blog";

const PER_PAGE = 6;

type Sort = "newest" | "oldest";

/**
 * The filterable half of the blog index: search, category, sort, then a three-up
 * grid and pagination — the same controls the Litmus blog puts under its lead story.
 *
 * All ten posts ship with the page, so filtering is local; there is no fetch and no
 * loading state to design around.
 */
export default function BlogIndex() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BlogCategory | "all">("all");
  const [sort, setSort] = useState<Sort>("newest");
  const [page, setPage] = useState(1);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = LISTED_POSTS.filter((post) => {
      if (category !== "all" && post.category !== category) return false;
      if (!needle) return true;
      return `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(needle);
    });
    return filtered.sort((a, b) =>
      sort === "newest" ? b.sort.localeCompare(a.sort) : a.sort.localeCompare(b.sort),
    );
  }, [query, category, sort]);

  const pageCount = Math.max(1, Math.ceil(results.length / PER_PAGE));
  // a filter change can strand the reader past the last page, so clamp on render
  const current = Math.min(page, pageCount);
  const visible = results.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  function change<T>(set: (v: T) => void) {
    return (value: T) => {
      set(value);
      setPage(1);
    };
  }

  return (
    <div>
      <Reveal className="flex flex-col gap-3 rounded-[28px] border border-brand-red/12 bg-brand-cream/60 p-3 sm:flex-row sm:items-center sm:gap-3 sm:p-3.5">
        <p className="px-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-red sm:shrink-0">
          Filter, sort &amp; search
        </p>

        <label className="relative flex-1">
          <span className="sr-only">Search posts</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.2" />
            <path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => change(setQuery)(e.target.value)}
            placeholder="Search posts…"
            className="w-full rounded-full border border-brand-red/15 bg-paper py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink/40 focus:border-brand-green focus:outline-none"
          />
        </label>

        <select
          value={category}
          onChange={(e) => change(setCategory)(e.target.value as BlogCategory | "all")}
          aria-label="Filter by category"
          className="rounded-full border border-brand-red/15 bg-paper px-4 py-2.5 text-sm font-semibold text-ink focus:border-brand-green focus:outline-none"
        >
          <option value="all">All categories</option>
          {BLOG_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => change(setSort)(e.target.value as Sort)}
          aria-label="Sort posts"
          className="rounded-full border border-brand-red/15 bg-paper px-4 py-2.5 text-sm font-semibold text-ink focus:border-brand-green focus:outline-none"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </Reveal>

      {visible.length === 0 ? (
        <p className="mt-10 rounded-[26px] border border-brand-red/10 bg-paper p-8 text-center text-sm text-ink/70">
          Nothing matches that yet — try a different word or “All categories”.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {visible.map((post, i) => (
            <Reveal key={post.slug} delay={i * 60}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-[28px] border border-brand-red/12 bg-paper p-6 shadow-[0_8px_26px_-20px_rgba(42,24,16,0.28)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-green hover:shadow-[0_12px_30px_-20px_rgba(44,73,15,0.34)]"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/45">
                  {post.month}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold leading-tight text-ink">
                  {post.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-ink/65">{post.excerpt}</p>
                <span className="mt-auto flex items-center gap-2 pt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-red">
                  {post.category}
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
              </Link>
            </Reveal>
          ))}
        </div>
      )}

      {pageCount > 1 && (
        <nav
          aria-label="Blog pages"
          className="mt-10 flex items-center justify-center gap-2"
        >
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-current={n === current ? "page" : undefined}
              className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold transition-colors ${
                n === current
                  ? "bg-brand-red text-brand-cream"
                  : "border border-brand-red/15 text-ink/70 hover:border-brand-green hover:text-brand-red"
              }`}
            >
              {n}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
