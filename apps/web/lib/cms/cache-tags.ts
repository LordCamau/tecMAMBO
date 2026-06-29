import "server-only";
import type { Article, GlossaryTerm } from "@/lib/types";

export const cmsTags = {
  all: "cms",
  home: "home",
  settings: "settings",
  articles: "articles",
  glossary: "glossary",
  authors: "authors",
  sitemap: "sitemap",
  rss: "rss",
  llms: "llms",
  search: "search",
  article: (slug: string) => `article:${slug}`,
  section: (slug: string) => `section:${slug}`,
  topic: (slug: string) => `topic:${slug}`,
  brand: (slug: string) => `brand:${slug}`,
  region: (slug: string) => `region:${slug}`,
  glossaryTerm: (slug: string) => `glossary:${slug}`,
  author: (slug: string) => `author:${slug}`
};

export function tagsForArticle(article: Article) {
  return [
    cmsTags.all,
    cmsTags.home,
    cmsTags.articles,
    cmsTags.article(article.slug),
    cmsTags.section(article.format),
    ...article.tags.map((tag) => (tag.kind === "brand" ? cmsTags.brand(tag.slug) : cmsTags.topic(tag.slug))),
    ...(article.regions ?? []).map((region) => cmsTags.region(region.slug)),
    cmsTags.sitemap,
    cmsTags.rss,
    cmsTags.llms,
    cmsTags.search
  ];
}

export function tagsForGlossaryTerm(term: GlossaryTerm) {
  return [cmsTags.all, cmsTags.glossary, cmsTags.glossaryTerm(term.slug), cmsTags.sitemap, cmsTags.llms, cmsTags.search];
}

export function tagsForArchive(kind: "topic" | "brand" | "region" | "section", slug: string) {
  if (kind === "brand") return [cmsTags.all, cmsTags.brand(slug), cmsTags.sitemap];
  if (kind === "region") return [cmsTags.all, cmsTags.region(slug), cmsTags.sitemap, cmsTags.rss, cmsTags.llms];
  if (kind === "section") return [cmsTags.all, cmsTags.section(slug), cmsTags.sitemap, cmsTags.rss];
  return [cmsTags.all, cmsTags.topic(slug), cmsTags.sitemap];
}
