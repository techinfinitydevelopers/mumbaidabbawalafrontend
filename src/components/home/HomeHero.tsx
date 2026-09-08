import Button from "@/components/Button";
import HeroVideo from "@/components/home/HeroVideo";
import RouteTicker from "@/components/poster/RouteTicker";
import Starburst from "@/components/poster/Starburst";

/**
 * The home hero: the film runs full-bleed behind the poster copy.
 *
 * Every other page opens on cream with a dabba group beside the headline (`PageHero`).
 * Home can't reuse that — a hero video only reads as one when it is the ground — so the
 * poster language is carried over instead of the layout: the same three-deep stacked
 * Anton headline, the same starburst seal, the same route ticker, and the same wave
 * handing the section down to paper.
 *
 * Over film, the type has to be the bright thing rather than the dark thing, so the
 * headline runs cream/yellow on an ink scrim instead of red/green on cream. The scrim is
 * weighted to the copy side and thins out over the right, so the footage stays visible
 * where nothing sits on top of it.
 *
 * No graph print here, deliberately: the print belongs on flat brand grounds, and ruled
 * over moving footage it reads as a grid sitting on the lens rather than as paper. The
 * texture returns on the cream section the wave hands down to.
 */
export default function HomeHero() {
  return (
    <section className="grain relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink pb-phi-7 pt-phi-6 sm:pb-phi-8">
      <HeroVideo />

      {/* Copy-side scrim, in two mutually exclusive halves. Below lg the copy runs the
          full width, so the veil has to cover the whole frame and only lightens toward the
          foot. From lg the copy is a left column, so the veil is weighted to it and clears
          by the right edge — the two must never stack, or their opacities compound and the
          film greys out everywhere. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 lg:hidden"
        style={{
          background:
            "linear-gradient(178deg, rgba(42,24,16,0.92) 0%, rgba(42,24,16,0.7) 32%, rgba(42,24,16,0.55) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 hidden lg:block"
        style={{
          background:
            "linear-gradient(96deg, rgba(42,24,16,0.95) 0%, rgba(42,24,16,0.88) 38%, rgba(42,24,16,0.42) 66%, rgba(42,24,16,0.08) 100%)",
        }}
      />
      <div className="relative z-20 mx-auto w-full max-w-[1720px] px-5 sm:px-8 lg:px-12 2xl:px-16">
        <div className="max-w-[54rem]">
          <span className="rise inline-block rounded-full bg-brand-green-dark px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-brand-cream sm:px-4 sm:py-1.5 sm:text-[10px] sm:tracking-[0.22em]">
            Mumbai since 1890
          </span>

          <h1 className="poster-stack rise mt-2.5 [--po:3px] [--po-gap:4px] sm:mt-4 sm:[--po:7px] sm:[--po-gap:8px]">
            <span
              className="poster block text-[30px] leading-[0.95] text-brand-cream sm:text-[62px] lg:text-[74px] xl:text-[86px]"
              style={{ ["--po-color" as string]: "rgba(42,24,16,0.9)" }}
            >
              The Dabba That
            </span>
            <span
              className="poster block text-[30px] leading-[0.95] text-brand-yellow sm:text-[62px] lg:text-[74px] xl:text-[86px]"
              style={{ ["--po-color" as string]: "rgba(42,24,16,0.9)" }}
            >
              Never Stops
            </span>
            <span
              className="poster block text-[30px] leading-[0.95] text-brand-green sm:text-[62px] lg:text-[74px] xl:text-[86px]"
              style={{ ["--po-color" as string]: "rgba(42,24,16,0.9)" }}
            >
              Moving.
            </span>
          </h1>

          <p
            className="rise mt-3 font-poster text-base uppercase tracking-[0.04em] text-brand-orange sm:mt-4 sm:text-2xl"
            style={{ animationDelay: "0.1s" }}
          >
            Fresh Food · Fair Price · Free Delivery
          </p>

          <p
            className="rise mt-3 max-w-measure text-xs leading-relaxed text-brand-cream/80 sm:mt-5 sm:text-phi-2"
            style={{ animationDelay: "0.2s" }}
          >
            For 135+ years, one dabba has never missed a delivery, never broken a promise,
            and never stopped carrying the taste of home to the people who needed it most.
            Now, that same dabba is moving to Perth.
          </p>

          <div
            className="rise mt-4 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3"
            style={{ animationDelay: "0.3s" }}
          >
            <Button href="/plans" variant="orange" size="sm">
              Order Your Dabba
            </Button>
            <Button href="/whats-cooking-tomorrow" variant="cream" size="sm">
              See What&rsquo;s Cooking
            </Button>
          </div>

          <RouteTicker
            className="rise mt-5 max-w-md text-brand-yellow sm:mt-8"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>

      {/* The launch seal. Bottom-right on desktop, where the scrim is thinnest and the
          copy column has already ended; tucked under the copy on phones. */}
      <Starburst className="rise absolute bottom-[128px] right-6 z-20 h-[86px] w-[86px] rotate-[-8deg] sm:bottom-[176px] sm:right-10 sm:h-[132px] sm:w-[132px] lg:bottom-[200px] lg:right-16 lg:h-[168px] lg:w-[168px]">
        <div className="px-2 sm:px-5">
          <span className="block text-[7px] font-bold uppercase tracking-[0.2em] text-brand-cream/85 sm:text-[9px]">
            Perth
          </span>
          <span className="block font-poster text-xs uppercase leading-[0.9] text-brand-cream sm:text-2xl lg:text-3xl">
            Launching
            <br />
            Soon
          </span>
          <span className="block font-script text-[10px] leading-none text-brand-yellow sm:text-base lg:text-lg">
            14 Sept 2026
          </span>
        </div>
      </Starburst>

      <svg
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute bottom-0 left-0 z-20 h-[110px] w-full sm:h-[150px]"
      >
        <path
          d="M0,104 C300,52 620,44 900,80 C1180,116 1330,118 1440,106 L1440,150 L0,150 Z"
          fill="var(--color-brand-cream)"
        />
      </svg>
    </section>
  );
}
