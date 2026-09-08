import Button from "@/components/Button";

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
    <section className="mx-auto max-w-3xl px-5 py-phi-6 text-center sm:py-phi-7">
      <span className="mx-auto w-fit rounded-full bg-brand-cream px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
        {eyebrow}
      </span>
      <h1 className="mt-5 font-display text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
      <p className="mt-4 text-base leading-relaxed text-ink/70">{description}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button href="/regional-food-stories" variant="red" size="md">
          Read Regional Food Stories
        </Button>
        <Button href="/" variant="outline" size="md">
          Back to Home
        </Button>
      </div>
    </section>
  );
}
