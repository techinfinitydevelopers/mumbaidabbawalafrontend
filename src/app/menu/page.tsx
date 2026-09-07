import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import RegionStoryCards from "@/components/regional/RegionStoryCards";
import MenuRotation from "@/components/menu/MenuRotation";
import FoodFirst from "@/components/menu/FoodFirst";
import DabbaOfferings from "@/components/DabbaOfferings";

export const metadata: Metadata = {
  title: "The Rotating Menu — Mumbai Dabbawala",
  description:
    "Food first. Everything else follows. Sixteen weekday menus and four Friday specials across nine regional cuisines — never the same thing twice in a row.",
};

export default function MenuPage() {
  return (
    <div className="overflow-x-hidden">
      <PageHero
        kicker="Food first, everything else follows"
        titleTop="The Rotating"
        titleBottom="Menu"
        facts={[
          { value: "16", label: "Weekday\nmenus" },
          { value: "9", label: "Regional\ncuisines" },
          { value: "4", label: "Friday\nspecials" },
        ]}
        lead="No more “what's for lunch” fatigue. Nine cuisines, rotating dishes, real variety — not a repeating loop of the same three curries."
        primary={{ href: "#rotation", label: "See the Rotation" }}
        secondary={{ href: "/plans", label: "Choose a Plan" }}
        seal={{ eyebrow: "Every card", lines: ["Allergens", "+ Nutrition"], script: "always tagged" }}
      />

      {/* ───── Why the food comes first ───── */}
      <FoodFirst />

      {/* ───── The rotation, day by day ───── */}
      <section id="rotation" className="relative bg-paper pb-phi-6 pt-phi-4 sm:pb-phi-7">
        <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-script text-3xl text-brand-orange">Monday to Thursday</p>
              <h2 className="poster mt-1 text-[34px] text-brand-red [--po:4px] sm:text-[54px] sm:[--po:5px]">
                The Rotation
              </h2>
              <p className="mt-2 max-w-measure text-phi-2 text-ink/70 sm:text-phi-3">
                Sixteen weekday menus on rotation. Tomorrow&rsquo;s is first — tap it to see
                the full dabba.
              </p>
            </div>
            <Link
              href="/whats-cooking-tomorrow"
              className="rounded-full bg-brand-orange px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-cream transition-transform duration-300 hover:-translate-y-0.5"
            >
              What&rsquo;s Cooking Tomorrow
            </Link>
          </Reveal>

          <MenuRotation />
        </div>

      </section>

      {/* ───── The cuisines behind the rotation ───── */}
      <section
        id="cuisines"
        className="grain graph-paper relative overflow-hidden bg-brand-cream pb-phi-6 pt-phi-6 sm:pb-phi-6"
      >
        <Reveal className="mx-auto max-w-7xl px-5 text-center sm:px-8">
          <p className="font-script text-3xl text-brand-orange">What&rsquo;s on rotation</p>
          <h2 className="poster-stack mx-auto mt-3 max-w-4xl [--po:4px] sm:[--po:6px]">
            <span
              className="poster whitespace-nowrap text-[34px] text-brand-red sm:text-[56px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              Five Story
            </span>
            <span
              className="poster whitespace-nowrap text-[34px] text-brand-green-dark sm:text-[56px]"
              style={{ ["--po-color" as string]: "var(--color-brand-yellow)" }}
            >
              Cuisines
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-measure text-phi-2 leading-relaxed text-ink/70 sm:text-phi-3">
            The regions with a story worth telling — and what each one brings to your dabba.
          </p>
        </Reveal>

        <RegionStoryCards className="mx-auto mt-14 max-w-5xl px-5 sm:px-8" />

        <Reveal className="mx-auto mt-14 max-w-3xl px-5 text-center sm:px-8">
          <Link
            href="/regional-food-stories"
            className="inline-flex items-center gap-2 rounded-full bg-brand-red px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-cream transition-transform duration-300 hover:-translate-y-0.5"
          >
            Read the Regional Food Stories
          </Link>
        </Reveal>
      </section>

      {/* ───── However you eat ───── */}
      <DabbaOfferings />
    </div>
  );
}
