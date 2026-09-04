import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Plans — A Dabba for Every Routine | Mumbai Dabbawala",
  description:
    "Whatever your week looks like, there's a plan for it. Trial, Weekly, Monthly and Corporate dabba plans.",
};

export default function PlansPage() {
  return (
    <div className="overflow-x-hidden">
      <PageHero
        kicker="Whatever your week looks like"
        titleTop="A Dabba For"
        titleBottom="Every Routine"
        facts={[
          { value: "4", label: "Plans to\nchoose from" },
          { value: "5", label: "Regional\ncuisines" },
          { value: "$0", label: "Delivery\nfee, always" },
        ]}
        lead="No two routines are the same — a student's week doesn't look like a family's, and a busy office doesn't look like either. So instead of one rigid plan, pick the rhythm that fits your life."
        primary={{ href: "/contact", label: "Start Trial" }}
        secondary={{ href: "/menu", label: "See the Menu" }}
        seal={{ eyebrow: "Most", lines: ["Loved", "Plan"], script: "monthly dabba" }}
      />
    </div>
  );
}
