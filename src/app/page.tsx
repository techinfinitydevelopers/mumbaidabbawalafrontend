import Link from "next/link";
import Starburst from "@/components/poster/Starburst";
import RouteTicker from "@/components/poster/RouteTicker";
import DishCluster from "@/components/regional/DishCluster";
import { HERO_CLUSTER } from "@/data/regions";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <section className="grain graph-paper relative bg-brand-cream pb-20 pt-20 sm:pb-36 sm:pt-32">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-3 px-5 sm:gap-6 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative">
            <div className="rise mx-auto w-[54%] max-w-[250px] sm:w-[78%] sm:max-w-[480px] lg:w-full">
                <DishCluster
                  cluster={HERO_CLUSTER}
                  alt="A steel tiffin dabba with bowls of dal and raita and a stack of rotis"
                  sizes="(min-width: 1024px) 48vw, 94vw"
                  eager
                />
            </div>

            <Starburst className="absolute -bottom-2 right-[10%] z-30 h-[80px] w-[80px] rotate-[-8deg] sm:right-[2%] sm:h-[136px] sm:w-[136px] lg:-bottom-6 lg:right-[6%]">
              <div className="px-2 sm:px-5">
                <span className="block text-[7px] font-bold tracking-[0.2em] text-brand-cream/85 sm:text-[9px]">
                  Perth
                </span>
                <span className="block font-poster text-xs uppercase leading-[0.9] text-brand-cream sm:text-2xl">
                  Launching
                  <br />
                  Soon
                </span>
                <span className="block font-script text-[10px] leading-none text-brand-cream/90 sm:text-base">
                  14 Sept 2026
                </span>
              </div>
            </Starburst>
          </div>

          <div>
            <span className="inline-block rounded-full bg-brand-green-dark px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-brand-cream sm:px-4 sm:py-1.5 sm:text-[10px] sm:tracking-[0.22em]">
              Mumbai since 1890
            </span>

            <h1 className="poster-stack rise mt-2.5 [--po:3px] sm:mt-4 sm:[--po:7px]">
              <span
                className="poster block text-[26px] leading-[0.95] text-brand-red sm:text-[64px] lg:text-[72px] xl:text-[84px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                The Dabba That
              </span>
              <span
                className="poster block text-[26px] leading-[0.95] text-brand-green-dark sm:text-[64px] lg:text-[72px] xl:text-[84px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                Never Stops
              </span>
            </h1>

            <p
              className="rise mt-2.5 font-poster text-base uppercase tracking-[0.04em] text-brand-orange sm:mt-4 sm:text-2xl"
              style={{ animationDelay: "0.1s" }}
            >
              Fresh food · Fair price · Free delivery
            </p>

            <p
              className="rise mt-3 max-w-md text-xs leading-relaxed text-ink/75 sm:mt-5 sm:text-base"
              style={{ animationDelay: "0.2s" }}
            >
              For 135+ years, one dabba has never missed a delivery, never broken a promise,
              and never stopped carrying the taste of home. Now, that same dabba is moving to
              Perth.
            </p>

            <div className="rise mt-3.5 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3" style={{ animationDelay: "0.3s" }}>
              <Link
                href="/plans"
                className="rounded-full bg-brand-orange px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-cream shadow-[0_12px_22px_-10px_rgba(243,98,32,0.9)] transition-transform duration-300 hover:-translate-y-0.5 sm:px-7 sm:py-3.5 sm:text-[11px] sm:tracking-[0.18em]"
              >
                Order Your Dabba
              </Link>
              <Link
                href="/menu"
                className="rounded-full bg-paper px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-red shadow-[0_12px_22px_-14px_rgba(42,24,16,0.6)] transition-transform duration-300 hover:-translate-y-0.5 sm:px-7 sm:py-3.5 sm:text-[11px] sm:tracking-[0.18em]"
              >
                See What&rsquo;s Cooking
              </Link>
            </div>

            <RouteTicker className="mt-4 max-w-md text-brand-red sm:mt-8" />
          </div>
        </div>

        <svg
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute bottom-0 left-0 z-10 h-[110px] w-full sm:h-[150px]"
        >
          <path
            d="M0,104 C300,52 620,44 900,80 C1180,116 1330,118 1440,106 L1440,150 L0,150 Z"
            fill="var(--color-paper)"
          />
        </svg>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-phi-6 pt-phi-2 text-center sm:px-8">
        <p className="font-script text-3xl text-brand-orange">More of the site is on the way</p>
        <h2 className="mx-auto mt-3 [--po:4px]">
          <span
            className="poster block text-[34px] text-brand-red sm:text-[48px]"
            style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
          >
            Start with the Stories
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-measure text-phi-2 text-ink/70 sm:text-base">
          Five cuisines, five stories — Gujarati, Punjabi, Marathi, Rajasthani and South
          Indian, each behind the 15-day rotating menu.
        </p>
        <Link
          href="/regional-food-stories"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-red px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-cream transition-transform duration-300 hover:-translate-y-0.5"
        >
          Explore Regional Food Stories
        </Link>
      </section>
    </div>
  );
}
