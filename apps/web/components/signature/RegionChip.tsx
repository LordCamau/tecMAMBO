import Link from "next/link";
import { regionPath } from "@/lib/regions";
import type { RegionTerm } from "@/lib/types";
import styles from "./RegionChip.module.css";

export function RegionChip({ region }: { region: RegionTerm }) {
  return (
    <Link className={styles.chip} href={regionPath(region)}>
      {region.name}
    </Link>
  );
}

export function RegionList({ regions }: { regions?: RegionTerm[] }) {
  if (!regions?.length) return null;
  return (
    <div className={styles.list} aria-label="Regional coverage">
      {regions.map((region) => (
        <RegionChip region={region} key={region.slug} />
      ))}
    </div>
  );
}
