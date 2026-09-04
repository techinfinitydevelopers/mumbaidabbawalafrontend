import { REGIONS } from "@/data/regions";
import RegionCard from "./RegionCard";

export default function RegionRail() {
  return (
    <div className="rail relative overflow-hidden py-4">
      <div className="rail-track flex gap-6 sm:gap-9">
        {REGIONS.map((region) => (
          <RegionCard key={region.id} region={region} />
        ))}
        {REGIONS.map((region) => (
          <RegionCard key={`dup-${region.id}`} region={region} ariaHidden />
        ))}
      </div>
    </div>
  );
}
