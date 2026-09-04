import Link from "next/link";

export default function ComingSoon({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-28 text-center sm:py-36">
      <span className="mx-auto w-fit rounded-full bg-brand-cream px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
        {eyebrow}
      </span>
      <h1 className="mt-5 font-display text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
      <p className="mt-4 text-base leading-relaxed text-ink/70">{description}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/regional-food-stories"
          className="rounded-full bg-brand-red px-6 py-3 text-sm font-bold text-brand-cream transition-transform hover:-translate-y-0.5"
        >
          Read Regional Food Stories
        </Link>
        <Link
          href="/"
          className="rounded-full border border-brand-red/20 px-6 py-3 text-sm font-bold text-brand-red hover:bg-brand-cream"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
