import type { Format } from "@/lib/types";

export type TopicArchive = {
  label: string;
  slug: string;
  canonicalTopic: string;
  description: string;
};

export type NavItem = {
  label: string;
  path: string;
  section?: string;
  children?: TopicArchive[];
};

export const topicAliases: Record<string, string[]> = {
  ai: ["ai"],
  apps: ["apps", "apps-software"],
  smartphones: ["smartphones", "phones"],
  computing: ["computing", "laptops", "laptops-pcs"],
  "social-media": ["social-media"],
  entertainment: ["entertainment"],
  "evs-mobility": ["evs-mobility"],
  gaming: ["gaming"],
  wearables: ["wearables", "audio"],
  "smart-homes": ["smart-homes", "smart-home"],
  startups: ["startups"],
  audio: ["audio"],
  connectivity: ["connectivity"],
  "power-batteries": ["power-batteries"],
  headphones: ["headphones", "audio"],
  "smart-watches": ["smart-watches", "wearables"],
  "vr-ar": ["vr-ar", "wearables"]
};

export const sectionFormatMap: Record<string, Format> = {
  explainers: "explainer",
  reviews: "review",
  "wallet-watch": "wallet-watch",
  "real-life": "real-life",
  news: "news",
  opinion: "opinion",
  business: "business"
};

export const topicArchives: Record<string, TopicArchive[]> = {
  news: [
    { label: "AI", slug: "ai", canonicalTopic: "ai", description: "AI news explained by what changes for real users." },
    { label: "Apps", slug: "apps", canonicalTopic: "apps", description: "App and software updates without the feature fog." },
    { label: "Smartphones", slug: "smartphones", canonicalTopic: "smartphones", description: "Phone news, launches, updates, and policy changes." },
    { label: "Computing", slug: "computing", canonicalTopic: "computing", description: "Laptop, PC, chip, and work-device news." },
    { label: "Social Media", slug: "social-media", canonicalTopic: "social-media", description: "Social platform changes translated into everyday impact." },
    { label: "Entertainment", slug: "entertainment", canonicalTopic: "entertainment", description: "Streaming, games, and culture-adjacent tech news." },
    { label: "EVs & Mobility", slug: "evs-mobility", canonicalTopic: "evs-mobility", description: "Electric mobility and transport tech, calmly sorted." }
  ],
  reviews: [
    { label: "Smartphones", slug: "smartphones", canonicalTopic: "smartphones", description: "Phone reviews with practical verdicts first." },
    { label: "Laptops & PCs", slug: "laptops-pcs", canonicalTopic: "computing", description: "Laptop and PC reviews for work, school, and home." },
    { label: "Gaming", slug: "gaming", canonicalTopic: "gaming", description: "Gaming devices, accessories, and performance explained." },
    { label: "Wearables", slug: "wearables", canonicalTopic: "wearables", description: "Wearable reviews with tabs for headphones, watches, VR, and AR." }
  ],
  "wallet-watch": [
    { label: "Smartphones", slug: "smartphones", canonicalTopic: "smartphones", description: "Phone deals, budgets, and value picks." },
    { label: "Laptops & PCs", slug: "laptops-pcs", canonicalTopic: "computing", description: "Laptop and PC buying advice by budget." },
    { label: "Smart Homes", slug: "smart-homes", canonicalTopic: "smart-homes", description: "Smart home gear worth paying attention to." },
    { label: "Wearables", slug: "wearables", canonicalTopic: "wearables", description: "Wearables and audio deals with the hype removed." }
  ],
  business: [{ label: "Startups", slug: "startups", canonicalTopic: "startups", description: "Startup and industry stories for builders and buyers." }]
};

export const wearableFilters: TopicArchive[] = [
  { label: "All", slug: "wearables", canonicalTopic: "wearables", description: "All wearable reviews." },
  { label: "Headphones", slug: "headphones", canonicalTopic: "headphones", description: "Headphone and earbud reviews." },
  { label: "Smart Watches", slug: "smart-watches", canonicalTopic: "smart-watches", description: "Smart watch reviews." },
  { label: "VR & AR", slug: "vr-ar", canonicalTopic: "vr-ar", description: "VR and AR headset reviews." }
];

export const navItems: NavItem[] = [
  { label: "Latest", path: "/latest" },
  { label: "News", path: "/news", section: "news", children: topicArchives.news },
  { label: "Reviews", path: "/reviews", section: "reviews", children: topicArchives.reviews },
  { label: "Wallet Watch", path: "/wallet-watch", section: "wallet-watch", children: topicArchives["wallet-watch"] },
  { label: "Business", path: "/business", section: "business", children: topicArchives.business },
  { label: "Glossary", path: "/glossary" },
  { label: "About", path: "/about" }
];

export const footerDiscoveryLinks = [
  { label: "Explainers", path: "/explainers" },
  { label: "Real Life", path: "/real-life" },
  { label: "Opinion", path: "/opinion" },
  { label: "Compare Phones", path: "/compare-phones" }
];

export function getTopicArchive(section: string, segment: string) {
  return topicArchives[section]?.find((topic) => topic.slug === segment) ?? null;
}

export function isReservedTopicSlug(section: string, segment: string) {
  return Boolean(getTopicArchive(section, segment));
}

export function filterArticlesByCanonicalTopic<T extends { tags: Array<{ slug: string }> }>(items: T[], canonicalTopic: string) {
  const aliases = new Set(topicAliases[canonicalTopic] ?? [canonicalTopic]);
  return items.filter((item) => item.tags.some((tag) => aliases.has(tag.slug)));
}

export function allSectionTopicPaths() {
  return Object.entries(topicArchives).flatMap(([section, topics]) => topics.map((topic) => `/${section}/${topic.slug}`));
}

export function wearableFilterPath(filterSlug: string) {
  return filterSlug === "wearables" ? "/reviews/wearables" : `/reviews/wearables/${filterSlug}`;
}
