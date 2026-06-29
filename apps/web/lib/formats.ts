import type { Format } from "@/lib/types";

export const siteUrl = process.env.SITE_URL ?? "https://tecmambo.com";

export const formats: Record<
  Format,
  {
    label: string;
    shortLabel: string;
    section: string;
    path: string;
    badge: "explains" | "wallet" | "realLife" | "care" | "take" | "review";
    description: string;
  }
> = {
  explainer: {
    label: "MAMBO Explains",
    shortLabel: "Explainers",
    section: "Explainers",
    path: "/explainers",
    badge: "explains",
    description: "Plain-English guides that make the moving parts make sense."
  },
  review: {
    label: "Review",
    shortLabel: "Reviews",
    section: "Reviews",
    path: "/reviews",
    badge: "review",
    description: "Careful testing, simple verdicts, and details only where they help."
  },
  "wallet-watch": {
    label: "Wallet Watch",
    shortLabel: "Wallet Watch",
    section: "Wallet Watch",
    path: "/wallet-watch",
    badge: "wallet",
    description: "Deals, budgets, and buying decisions with the hype taken out."
  },
  "real-life": {
    label: "MAMBO vs Real Life",
    shortLabel: "Real Life",
    section: "Real Life",
    path: "/real-life",
    badge: "realLife",
    description: "How technology behaves once it leaves the keynote."
  },
  news: {
    label: "Should you care?",
    shortLabel: "News",
    section: "News",
    path: "/news",
    badge: "care",
    description: "The news, translated into what changes for normal people."
  },
  opinion: {
    label: "MAMBO Take",
    shortLabel: "Opinion",
    section: "Opinion",
    path: "/opinion",
    badge: "take",
    description: "Clear, accountable takes on where tech is heading."
  },
  business: {
    label: "Business",
    shortLabel: "Business",
    section: "Business",
    path: "/business",
    badge: "care",
    description: "Startups, industry shifts, and the money behind the products people use."
  }
};

export function articlePath(format: Format, slug: string) {
  return `${formats[format].path}/${slug}`;
}
