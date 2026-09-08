import DabbaOfferings from "@/components/DabbaOfferings";
import StandFor from "@/components/StandFor";
import DabbaCarries from "@/components/home/DabbaCarries";
import HomeHero from "@/components/home/HomeHero";
import NeverJustLunch from "@/components/home/NeverJustLunch";
import PerthLanding from "@/components/home/PerthLanding";
import Testimonials from "@/components/home/Testimonials";
import WhyTheDabba from "@/components/home/WhyTheDabba";

/**
 * The home page, in the order the content doc lays it out: hero, what we stand for,
 * it's never just lunch, however you eat, why the dabba, Perth, what customers say —
 * plus the client's "More than a meal" statement band, which sits between the six words
 * and the essay they introduce.
 *
 * Grounds alternate ink → cream → ink → paper → paper → red → paper → cream, so no two
 * adjacent sections share one. The two ink bands are the page's scroll-driven moments
 * (the hero film and the panned statement) and the two printed ones (cream and red) sit
 * either side of the middle rather than stacking.
 */
export default function Home() {
  return (
    // `overflow-x-clip`, not `-hidden`: `hidden` makes this wrapper a scroll container,
    // which silently stops `position: sticky` working anywhere inside it - the statement
    // band's pin rode up with the page until this was changed. `clip` clips the same way
    // without creating the scroll container.
    <div className="overflow-x-clip">
      <HomeHero />
      <StandFor />
      <DabbaCarries />
      <NeverJustLunch />
      <DabbaOfferings />
      <WhyTheDabba />
      <PerthLanding />
      <Testimonials />
    </div>
  );
}
