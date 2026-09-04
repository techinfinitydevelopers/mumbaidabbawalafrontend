import Image from "next/image";
import Link from "next/link";
import Starburst from "@/components/poster/Starburst";
import RouteTicker from "@/components/poster/RouteTicker";
import DishCluster from "@/components/regional/DishCluster";
import { HERO_CLUSTER } from "@/data/regions";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <section className="grain graph-paper relative bg-brand-cream pb-24 pt-28 sm:pb-36 sm:pt-32">

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-4 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative">
            <div className="rise mx-auto w-[94%] max-w-[580px] lg:w-full">
                <DishCluster
                  cluster={HERO_CLUSTER}
                  alt="A steel tiffin dabba with bowls of dal and raita and a stack of rotis"
                  sizes="(min-width: 1024px) 48vw, 94vw"
                  eager
                />
            </div>

            <Starburst className="absolute -bottom-2 right-[2%] z-30 h-[112px] w-[112px] rotate-[-8deg] sm:h-[136px] sm:w-[136px] lg:-bottom-6 lg:right-[6%]">
              <div className="px-5">
                <span className="block text-[9px] font-bold tracking-[0.2em] text-brand-cream/85">
                  Perth
                </span>
                <span className="block font-poster text-xl uppercase leading-[0.9] text-brand-cream sm:text-2xl">
                  Launching
                  <br />
                  Soon
                </span>
                <span className="block font-script text-sm leading-none text-brand-cream/90 sm:text-base">
                  14 Sept 2026
                </span>
              </div>
            </Starburst>
          </div>

          <div>
            <span className="inline-block rounded-full bg-brand-green-dark px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-cream">
              Mumbai since 1890
            </span>

            <h1 className="poster-stack rise mt-4 [--po:5px] sm:[--po:7px]">
              <span
                className="poster whitespace-nowrap text-[40px] text-brand-red sm:text-[64px] lg:text-[72px] xl:text-[84px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                The Dabba That
              </span>
              <span
                className="poster whitespace-nowrap text-[40px] text-brand-green-dark sm:text-[64px] lg:text-[72px] xl:text-[84px]"
                style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
              >
                Never Stops
              </span>
            </h1>

            <p
              className="rise mt-4 font-poster text-xl uppercase tracking-[0.04em] text-brand-orange sm:text-2xl"
              style={{ animationDelay: "0.1s" }}
            >
              Fresh food · Fair price · Free delivery
            </p>

            <p
              className="rise mt-5 max-w-md text-sm leading-relaxed text-ink/75 sm:text-base"
              style={{ animationDelay: "0.2s" }}
            >
              For 135+ years, one dabba has never missed a delivery, never broken a promise,
              and never stopped carrying the taste of home. Now, that same dabba is moving to
              Perth.
            </p>

            <div className="rise mt-7 flex flex-wrap gap-3" style={{ animationDelay: "0.3s" }}>
              <Link
                href="/plans"
                className="rounded-full bg-brand-orange px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-cream shadow-[0_14px_26px_-12px_rgba(243,98,32,0.9)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Order Your Dabba
              </Link>
              <Link
                href="/menu"
                className="rounded-full bg-paper px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-red shadow-[0_14px_26px_-16px_rgba(42,24,16,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                See What&rsquo;s Cooking
              </Link>
            </div>

            <RouteTicker className="mt-8 max-w-md text-brand-red" />
          </div>
        </div>

        <svg
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute bottom-0 left-0 z-10 h-[110px] w-full sm:h-[150px]"
        >
          <path
            d="M0,92 C170,150 300,44 520,62 C742,80 900,148 1120,116 C1268,94 1360,52 1440,36 L1440,150 L0,150 Z"
            fill="var(--color-paper)"
          />
        </svg>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-24 pt-6 text-center sm:px-8">
        <p className="font-script text-3xl text-brand-orange">More of the site is on the way</p>
        <h2 className="mx-auto mt-3 [--po:4px]">
          <span
            className="poster block text-[34px] text-brand-red sm:text-[48px]"
            style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
          >
            Start with the Stories
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-ink/70 sm:text-base">
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
