import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { BLOG_POSTS, POSTS_BY_DATE, postBySlug } from "@/data/blog";

/**
 * A post's own page.
 *
 * The extracted source has no article bodies — its post URLs 404 — so this renders
 * the headline, standfirst and meta that do exist and says plainly that the copy is
 * still to come, rather than padding it out with invented text.
 */

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return { title: "Post not found — Mumbai Dabbawala" };
  return { title: `${post.title} — Mumbai Dabbawala`, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const more = POSTS_BY_DATE.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="overflow-x-hidden">
      <article className="grain graph-paper relative bg-brand-cream pb-16 pt-28 sm:pb-20 sm:pt-32">
        <Reveal className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-red hover:text-brand-orange"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M19 12H5M11 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            </svg>
            All dispatches
          </Link>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-ink/45">
            {post.category} · {post.month}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-[42px]">
            {post.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink/75 sm:text-lg">{post.excerpt}</p>

          <p className="mt-8 rounded-[24px] border border-brand-red/15 bg-paper p-6 text-sm leading-relaxed text-ink/70">
            <span className="block font-bold uppercase tracking-[0.14em] text-brand-red">
              Full article coming soon
            </span>
            <span className="mt-2 block">
              The headline and summary above are in place; the body copy is still being
              written. In the meantime, the{" "}
              <Link href="/regional-food-stories" className="font-bold text-brand-red underline">
                regional food stories
              </Link>{" "}
              cover the cuisines behind the rotation.
            </span>
          </p>
        </Reveal>
      </article>

      <section className="relative bg-paper pb-24 pt-14 sm:pb-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="poster text-[26px] text-brand-red [--po:4px] sm:text-[36px]">
            More From the Relay
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {more.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col rounded-[28px] border border-brand-red/12 bg-brand-cream/60 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-green"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/45">
                    {p.month}
                  </span>
                  <span className="mt-2 font-display text-base font-bold leading-snug text-ink">
                    {p.title}
                  </span>
                  <span className="mt-auto pt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-red">
                    {p.category}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
