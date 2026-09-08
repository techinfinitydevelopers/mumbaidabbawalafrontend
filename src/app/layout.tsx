import type { Metadata } from "next";
import { Roboto_Slab, DM_Sans, Caveat, Anton, Newsreader, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "700"],
});

// Poster display face — stands in for Acumin Pro Condensed Black from the brand posters,
// which isn't available as a webfont.
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

// The "What a dabba carries" statement band is set in these two: Newsreader for the
// sentence, Manrope for the braces and the heritage-badge numerals.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "400", "800"],
});

export const metadata: Metadata = {
  title: "Mumbai Dabbawala — Perth",
  description:
    "135+ years. Millions of deliveries. One legendary legacy. Mumbai Dabbawala is coming to Perth. Fresh Food. Fair Price. Free Delivery.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${robotoSlab.variable} ${dmSans.variable} ${caveat.variable} ${anton.variable} ${newsreader.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
