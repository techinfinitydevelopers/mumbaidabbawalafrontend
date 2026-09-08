import DabbaOfferings from "@/components/DabbaOfferings";
import StandFor from "@/components/StandFor";
import HomeHero from "@/components/home/HomeHero";
import NeverJustLunch from "@/components/home/NeverJustLunch";
import PerthLanding from "@/components/home/PerthLanding";
import Testimonials from "@/components/home/Testimonials";
import WhyTheDabba from "@/components/home/WhyTheDabba";

/**
 * The home page, in the order the content doc lays it out: hero, what we stand for,
 * it's never just lunch, however you eat, why the dabba, Perth, what customers say.
 *
 * Grounds alternate ink → cream → paper → red → paper → cream so no two adjacent
 * sections share a ground, and the two printed bands (cream and red) sit at the middle
 * and the end rather than stacking.
 */
export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HomeHero />
      <StandFor />
      <NeverJustLunch />
      <DabbaOfferings />
      <WhyTheDabba />
      <PerthLanding />
      <Testimonials />
    </div>
  );
}
