import Image from "next/image";
import { HERO_BACKGROUND } from "@/data/home";

/** The hero's still ground — a full-bleed photo behind the poster copy. */
export default function HeroBackground({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={HERO_BACKGROUND.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
