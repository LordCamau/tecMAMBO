import { topicArchives, wearableFilterPath, wearableFilters, type TopicArchive } from "@/lib/site-structure";
import { formats } from "@/lib/formats";

export type MegaSectionKey = "news" | "reviews" | "wallet-watch" | "business";
export type TopNavItem =
  | { kind: "link"; label: string; path: string }
  | { kind: "mega"; label: string; path: string; key: MegaSectionKey; children: TopicArchive[] }
  | { kind: "more"; label: string; key: "more" };

export const megaNavItems: TopNavItem[] = [
  { kind: "link", label: "Latest", path: "/latest" },
  { kind: "mega", label: "News", path: "/news", key: "news", children: topicArchives.news },
  { kind: "mega", label: "Reviews", path: "/reviews", key: "reviews", children: topicArchives.reviews },
  { kind: "mega", label: "Wallet Watch", path: "/wallet-watch", key: "wallet-watch", children: topicArchives["wallet-watch"] },
  { kind: "mega", label: "Business", path: "/business", key: "business", children: topicArchives.business },
  { kind: "link", label: "Glossary", path: "/glossary" },
  { kind: "more", label: "More", key: "more" }
];

export const moreLinks = [
  { label: "Africa", path: "/africa" },
  { label: "Compare Phones", path: "/compare-phones" },
  { label: "About", path: "/about" },
  { label: "Editorial standards", path: "/editorial-standards" },
  { label: "Contact", path: "/contact" },
  { label: "Terms of Use", path: "/terms" },
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Cookie Policy", path: "/cookies" }
];

export const siteSettings = {
  social: {
    facebook: "https://www.facebook.com/tecmambo",
    instagram: "https://www.instagram.com/tecmambo",
    youtube: "https://www.youtube.com/@tecmambo",
    x: "https://x.com/tecmambo",
    tiktok: "https://www.tiktok.com/@tecmambo"
  }
};

export const socialLinks = [
  { label: "Facebook", icon: "f", href: siteSettings.social.facebook, external: true },
  { label: "Instagram", icon: "◎", href: siteSettings.social.instagram, external: true },
  { label: "YouTube", icon: "▶", href: siteSettings.social.youtube, external: true },
  { label: "Twitter / X", icon: "𝕏", href: siteSettings.social.x, external: true },
  { label: "Newsletters", icon: "mail", href: "/newsletter", external: false },
  { label: "TikTok", icon: "♪", href: siteSettings.social.tiktok, external: true }
];

export const wearableTabLinks = wearableFilters
  .filter((filter) => filter.slug !== "wearables")
  .map((filter) => ({ label: filter.label, path: wearableFilterPath(filter.slug) }));

export const footerReadLinks = [
  ...megaNavItems.flatMap((item) => (item.kind === "more" ? [] : [{ label: item.label, path: item.path }])),
  { label: "Africa", path: "/africa" },
  { label: formats.explainer.shortLabel, path: formats.explainer.path },
  { label: formats["real-life"].shortLabel, path: formats["real-life"].path },
  { label: formats.opinion.shortLabel, path: formats.opinion.path }
];

export const footerCompanyLinks = [
  { label: "About tecMAMBO", path: "/about" },
  { label: "Editorial standards", path: "/editorial-standards" },
  { label: "Advertise with us", path: "/advertise" },
  { label: "Contact", path: "/contact" },
  { label: "Newsletter", path: "/newsletter" }
];

export const footerLegalLinks = [
  { label: "Terms of Use", path: "/terms" },
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Cookie Policy", path: "/cookies" }
];
