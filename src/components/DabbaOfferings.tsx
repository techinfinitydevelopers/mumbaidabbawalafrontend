import Link from "next/link";
import Reveal from "@/components/Reveal";

/**
 * The five ways to eat with us, in the client's order and wording.
 *
 * The source copy bullets these with emoji; drawn icons in the secondary palette are
 * used instead, so they match the rest of the site and render the same on every OS.
 */
const OFFERINGS: {
  name: string;
  copy: string;
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    name: "Daily Meals",
    copy: "Fresh regional thalis, delivered to your door or desk \u2014 every single day.",
    href: "/whats-cooking-tomorrow",
    icon: (
      <>
        <path d="M5 8h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8Z" />
        <path d="M5 8V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" />
        <path d="M5 13.5h14" />
        <path d="M10.5 4V2.6h3V4" />
      </>
    ),
  },
  {
    name: "Flexible Plans",
    copy: "Trial it, do it weekly, or set it and forget it monthly. Your call.",
    href: "/plans",
    icon: (
      <>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
        <path d="M3.5 10h17M8.5 3v4M15.5 3v4" />
        <path d="M8 14h3M8 17.2h6.5" />
      </>
    ),
  },
  {
    name: "Free Delivery",
    copy: "No delivery fee, no commission mark-up \u2014 just a fair price for real food.",
    href: "/plans",
    icon: (
      <>
        <path d="M2.5 7.5h9.5v9H2.5z" />
        <path d="M12 10.5h3.6l3.4 3.2v2.8H12z" />
        <circle cx="6.6" cy="18.4" r="1.9" />
        <circle cx="16.4" cy="18.4" r="1.9" />
      </>
    ),
  },
  {
    name: "Corporate Meals",
    copy: "Feed your whole office without the group-order chaos.",
    href: "/plans",
    icon: (
      <>
        <path d="M4 20.5V5.5A1.5 1.5 0 0 1 5.5 4h7A1.5 1.5 0 0 1 14 5.5v15" />
        <path d="M14 10h4.5A1.5 1.5 0 0 1 20 11.5v9" />
        <path d="M7 8h4M7 12h4M7 16h4M17 14h1M17 17.5h1" />
        <path d="M2.5 20.5h19" />
      </>
    ),
  },
  {
    name: "Festival Specials",
    copy: "Because Diwali lunch should taste like Diwali, not a regular Tuesday.",
    href: "/menu#rotation",
    icon: (
      <>
        <path d="M12 3.2c1.6 2.3 2.6 3.9 2.6 5.3a2.6 2.6 0 0 1-5.2 0c0-1.4 1-3 2.6-5.3Z" />
        <path d="M4.5 14h15l-2 4.4a2 2 0 0 1-1.8 1.2H8.3a2 2 0 0 1-1.8-1.2L4.5 14Z" />
        <path d="M12 11.2V14" />
      </>
    ),
  },
];

export default function DabbaOfferings() {
  return (
    <section className="relative bg-paper pb-phi-6 pt-phi-6 sm:pb-phi-6">
      <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-script text-3xl text-brand-orange">Pick your routine</p>
          <h2 className="poster-stack mx-auto mt-3 [--po:4px] [--po-gap:12px] sm:[--po:5px] sm:[--po-gap:18px]">
            <span
              className="poster text-[26px] text-brand-red sm:text-[42px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              However You Eat,
            </span>
            <span
              className="poster text-[26px] text-brand-green-dark sm:text-[42px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              We&rsquo;ve Got a Dabba for It.
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {OFFERINGS.map((item, i) => (
            <Reveal key={item.name} delay={i * 70}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-[28px] border border-brand-red/12 bg-brand-cream p-6 shadow-[0_8px_26px_-20px_rgba(42,24,16,0.28)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-green hover:shadow-[0_12px_30px_-20px_rgba(44,73,15,0.34)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-green-dark/10 text-brand-green-dark transition-colors duration-500 group-hover:bg-brand-green-dark group-hover:text-brand-yellow">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-lg font-bold leading-tight text-ink">
                  {item.name}
                </h3>
                <p className="mt-2 text-phi-1 leading-relaxed text-ink/65">{item.copy}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-phi-0 font-bold uppercase tracking-[0.16em] text-brand-red">
                  Learn more
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
      </div>
    </section>
  );
}
