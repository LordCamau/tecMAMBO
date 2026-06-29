import type { Article, RegionTerm } from "@/lib/types";

export const africaLeadRegionSlugs = ["kenya", "nigeria", "south-africa", "rwanda"] as const;

export const africanRegions: RegionTerm[] = [
  {
    name: "Kenya",
    slug: "kenya",
    group: "Africa",
    flag: "KE",
    description: "Kenya tech stories, from Nairobi startups and AI policy to the way people actually use phones, apps, and connectivity."
  },
  {
    name: "Nigeria",
    slug: "nigeria",
    group: "Africa",
    flag: "NG",
    description: "Nigeria tech coverage across fintech, startups, phones, creators, and the digital services people use every day."
  },
  {
    name: "South Africa",
    slug: "south-africa",
    group: "Africa",
    flag: "ZA",
    description: "South Africa tech stories across power, connectivity, enterprise tools, devices, and the products shaped by real infrastructure."
  },
  {
    name: "Rwanda",
    slug: "rwanda",
    group: "Africa",
    flag: "RW",
    description: "Rwanda tech coverage, including digital public services, logistics, connectivity, and policy experiments worth watching."
  },
  {
    name: "Ghana",
    slug: "ghana",
    group: "Africa",
    flag: "GH",
    description: "Ghana tech stories across startups, digital payments, connectivity, creators, and practical consumer technology."
  },
  {
    name: "Egypt",
    slug: "egypt",
    group: "Africa",
    flag: "EG",
    description: "Egypt tech coverage across startups, devices, software, infrastructure, and the wider North African technology market."
  },
  {
    name: "Ethiopia",
    slug: "ethiopia",
    group: "Africa",
    flag: "ET",
    description: "Ethiopia tech stories across connectivity, startups, public services, devices, and the changing digital economy."
  },
  {
    name: "Tanzania",
    slug: "tanzania",
    group: "Africa",
    flag: "TZ",
    description: "Tanzania tech coverage across mobile money, connectivity, consumer technology, startups, and everyday digital services."
  },
  {
    name: "Uganda",
    slug: "uganda",
    group: "Africa",
    flag: "UG",
    description: "Uganda tech stories across startups, mobile services, connectivity, devices, and practical digital tools."
  }
];

export const africaHub = {
  name: "Africa",
  slug: "africa",
  path: "/africa",
  description:
    "Technology coverage from Kenya, Nigeria, South Africa, Rwanda, and the wider African tech scene, collected without turning tecMAMBO into an Africa-only publication."
};

export const countryCodeToRegionSlug: Record<string, string> = {
  KE: "kenya",
  NG: "nigeria",
  ZA: "south-africa",
  RW: "rwanda",
  GH: "ghana",
  EG: "egypt",
  ET: "ethiopia",
  TZ: "tanzania",
  UG: "uganda"
};

export const reservedRegionSlugs = ["africa", "more", ...africanRegions.map((region) => region.slug)];

const regionMap = new Map(africanRegions.map((region) => [region.slug, region]));

export function getRegion(slug: string) {
  return regionMap.get(slug) ?? null;
}

export function regionPath(region: Pick<RegionTerm, "slug">) {
  return `/africa/${region.slug}`;
}

export function primaryRegion(article: Article) {
  return article.regions?.[0] ?? null;
}

export function hasAfricanRegion(article: Article) {
  return Boolean(article.regions?.some((region) => region.group === "Africa"));
}

export function getAfricaArticles(articles: Article[]) {
  return articles.filter(hasAfricanRegion);
}

export function getArticlesByRegion(articles: Article[], regionSlug: string) {
  return articles.filter((article) => article.regions?.some((region) => region.slug === regionSlug));
}

export function relatedRegionTopics(articles: Article[]) {
  const counts = new Map<string, { name: string; slug: string; count: number }>();
  for (const article of articles) {
    for (const tag of article.tags.filter((item) => item.kind === "topic")) {
      const current = counts.get(tag.slug) ?? { name: tag.name, slug: tag.slug, count: 0 };
      current.count += 1;
      counts.set(tag.slug, current);
    }
  }
  return [...counts.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)).slice(0, 8);
}

export function geoHeaderToRegionSlug(value: string | null) {
  if (!value) return null;
  return countryCodeToRegionSlug[value.toUpperCase()] ?? null;
}
