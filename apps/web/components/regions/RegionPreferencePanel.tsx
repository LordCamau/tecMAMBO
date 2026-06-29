"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { africaLeadRegionSlugs, africanRegions, regionPath } from "@/lib/regions";
import type { RegionTerm } from "@/lib/types";
import styles from "./RegionPreferencePanel.module.css";

type Suggestion = { region?: Pick<RegionTerm, "name" | "slug"> | null };

const leadRegions = africaLeadRegionSlugs
  .map((slug) => africanRegions.find((region) => region.slug === slug))
  .filter((region): region is RegionTerm => Boolean(region));

export function RegionPreferencePanel() {
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/region-suggestion", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: Suggestion | null) => {
        if (active) setSuggestion(payload);
      })
      .catch(() => {
        if (active) setSuggestion(null);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className={styles.panel}>
      {!dismissed && suggestion?.region ? (
        <div className={styles.suggestion}>
          <span>Popular in {suggestion.region.name}</span>
          <Link href={regionPath(suggestion.region)}>Open hub</Link>
          <button type="button" onClick={() => setDismissed(true)}>
            Dismiss
          </button>
        </div>
      ) : null}
      <nav className={styles.links} aria-label="Choose African region">
        {leadRegions.map((region) => (
          <Link href={regionPath(region)} key={region.slug}>
            {region.name}
          </Link>
        ))}
        <Link href="/africa/more">More countries</Link>
      </nav>
    </div>
  );
}
