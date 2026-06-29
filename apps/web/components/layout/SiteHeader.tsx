import { getArticles } from "@/lib/content";
import { articlePath, formats } from "@/lib/formats";
import { sectionFormatMap } from "@/lib/site-structure";
import type { MegaSectionKey } from "@/lib/nav";
import { SiteHeaderClient, type MegaFeature } from "./SiteHeaderClient";

export async function SiteHeader() {
  const articles = await getArticles();
  const features = (["news", "reviews", "wallet-watch", "business"] as MegaSectionKey[]).reduce<Record<MegaSectionKey, MegaFeature | null>>(
    (items, section) => {
      const format = sectionFormatMap[section];
      const article = articles.find((candidate) => candidate.format === format) ?? null;
      items[section] = article
        ? {
            title: article.title,
            path: articlePath(article.format, article.slug),
            image: article.image,
            badge: formats[article.format].label
          }
        : null;
      return items;
    },
    { news: null, reviews: null, "wallet-watch": null, business: null }
  );

  return <SiteHeaderClient features={features} />;
}
