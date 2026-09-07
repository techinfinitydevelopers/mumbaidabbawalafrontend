import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ChefDeck from "@/components/chefs/ChefDeck";
import FromTheKitchen from "@/components/chefs/FromTheKitchen";

export const metadata: Metadata = {
  title: "Chef's Corner — Mumbai Dabbawala",
  description:
    "Fresh ingredients. Balanced portions. Nothing overcomplicated. Meet the people behind the flavour.",
};

export default function ChefsCornerPage() {
  return (
    <>
      <PageHero
        kicker="The people behind the flavour"
        titleTop="Fresh Ingredients"
        titleBottom="Nothing Fussy"
        facts={[
          { value: "5", label: "Regional\nkitchens" },
          { value: "0", label: "Fad claims,\nno gimmicks" },
          { value: "135+", label: "Years of\npractice" },
        ]}
        quote={{
          name: "From the kitchen",
          text: "“Cooking for a dabba is different from cooking for a restaurant — it has to taste just as good three hours later as it does fresh off the stove.”",
        }}
        primary={{ href: "/contact", label: "Meet the Kitchen Team" }}
        secondary={{ href: "/menu", label: "See the Menu" }}
        seal={{ eyebrow: "Cooked", lines: ["Fresh", "Daily"], script: "never reheated" }}
      />
      <ChefDeck />
      <FromTheKitchen />
    </>
  );
}
