import { getArticles, getGlossaryTerms } from "@/lib/content";
import type { Article, Format, GlossaryTerm } from "@/lib/types";
import { filterArticlesByCanonicalTopic } from "@/lib/site-structure";
import { uniqueImagesWithinLane } from "@/lib/content-guard";
import { getAfricaArticles } from "@/lib/regions";

export type HomeLane = {
  key: string;
  eyebrow: string;
  title: string;
  href: string;
  linkLabel?: string;
  layout?: "grid" | "feature";
  articles: Article[];
};

function byFormat(articles: Article[], format: Format, limit = 3) {
  return articles.filter((article) => article.format === format).slice(0, limit);
}

function uniqueByImage(articles: Article[]) {
  const seen = new Set<string>();
  return articles.filter((article) => {
    if (seen.has(article.image.src)) return false;
    seen.add(article.image.src);
    return true;
  });
}

function lane(
  key: string,
  eyebrow: string,
  title: string,
  href: string,
  articles: Article[],
  linkLabel?: string,
  layout: HomeLane["layout"] = "grid",
  limit = layout === "feature" ? 4 : 3
) {
  const capped = uniqueByImage(articles).slice(0, limit);
  uniqueImagesWithinLane(key, capped);
  return { key, eyebrow, title, href, linkLabel, layout, articles: capped };
}

export async function getHomeCuration() {
  const [articles, glossaryTerms] = await Promise.all([getArticles(), getGlossaryTerms()]);
  const hero =
    articles.find((article) => article.format === "explainer" && article.tags.some((tag) => tag.slug === "smartphones" || tag.slug === "phones")) ??
    articles[0]!;
  const latestRail = articles.filter((article) => article.id !== hero.id).slice(0, 7);
  const reviewArticles = byFormat(articles, "review", 6);
  const explainers = byFormat(articles, "explainer", 3);
  const realLife = byFormat(articles, "real-life", 3);
  const wallet = byFormat(articles, "wallet-watch", 3);
  const news = byFormat(articles, "news", 3);
  const business = byFormat(articles, "business", 6);
  const evergreen = articles.filter((article) => ["explainer", "opinion"].includes(article.format)).slice(0, 3);
  const africa = getAfricaArticles(articles);
  const ai = filterArticlesByCanonicalTopic(articles, "ai");
  const smartphones = filterArticlesByCanonicalTopic(articles, "smartphones");
  const mobility = filterArticlesByCanonicalTopic(articles, "evs-mobility");

  return {
    hero,
    latestRail,
    lanes: [
      lane("news", "Should you care?", "News that changes what you do next", "/news", news),
      lane("smartphones", "Smartphones", "Phones in plain English", "/topics/smartphones", smartphones, "See smartphone stories", "feature"),
      lane("reviews", "Reviews", "Verdicts first, specs second", "/reviews", reviewArticles),
      lane("africa", "Region layer", "Tech across Africa", "/africa", africa, "See all African tech", "feature"),
      lane("wallet", "Wallet Watch", "Useful deals and budget picks", "/wallet-watch", wallet),
      lane("explains", "Explains + Glossary", "The teaching pair", "/explainers", explainers),
      lane("real-life", "MAMBO vs Real Life", "Field tests after the promise", "/real-life", realLife),
      lane("business", "Business", "Startups and the industry behind the screen", "/business", business, "See business stories", "feature"),
      lane("ai", "AI", "Useful AI, without the stage smoke", "/topics/ai", ai, "See AI stories", "feature"),
      lane("mobility", "EVs & Mobility", "How transport tech moves in real life", "/topics/evs-mobility", mobility, "See mobility stories", "feature"),
      lane("evergreen", "In case you missed it", "More from tecMAMBO", "/latest", evergreen)
    ] satisfies HomeLane[],
    glossarySpotlight: glossaryTerms.slice(0, 3),
    bestBuyingGuides: filterArticlesByCanonicalTopic(wallet, "smartphones").slice(0, 2),
    glossaryTerms
  };
}

export type HomeCuration = Awaited<ReturnType<typeof getHomeCuration>>;
export type HomeGlossaryTerm = GlossaryTerm;
