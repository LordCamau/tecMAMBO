import "server-only";
import { africanRegions, getAfricaArticles, getArticlesByRegion, getRegion } from "@/lib/regions";
import type { Article, Author, Format, GlossaryTerm, Tag } from "@/lib/types";
import { cmsTags, tagsForArchive } from "./cache-tags";
import { cmsWarning } from "./env";
import { wordpressRequest } from "./graphql";
import { ARTICLES_QUERY, ARTICLE_BY_DATABASE_ID_QUERY, ARTICLE_BY_SLUG_QUERY, AUTHORS_QUERY, GLOSSARY_TERMS_QUERY, TAXONOMIES_QUERY } from "./queries";
import { wpArticleToArticle, wpGlossaryTermToTerm, wpRegionToDomainRegion, wpTermToDomainTag, wpUserToAuthor } from "./mappers";

type ArticlesData = {
  posts?: {
    nodes?: unknown[];
    pageInfo?: {
      hasNextPage?: boolean;
      endCursor?: string | null;
    };
  };
};

type ArticleData = {
  post?: unknown | null;
};

type GlossaryData = {
  glossaryTerms?: {
    nodes?: unknown[];
  };
};

type TaxonomiesData = {
  topics?: { nodes?: unknown[] };
  brands?: { nodes?: unknown[] };
  regions?: { nodes?: unknown[] };
};

type AuthorsData = {
  users?: {
    nodes?: unknown[];
  };
};

function mapArticles(nodes: unknown[] | undefined) {
  return (nodes ?? []).map((node) => wpArticleToArticle(node as Parameters<typeof wpArticleToArticle>[0])).filter((article): article is Article => Boolean(article));
}

export async function getCmsArticles() {
  const all: Article[] = [];
  let after: string | null | undefined;
  for (let page = 0; page < 20; page += 1) {
    const data = await wordpressRequest<ArticlesData>(ARTICLES_QUERY, {
      variables: { first: 100, after },
      tags: [cmsTags.all, cmsTags.articles, cmsTags.home, cmsTags.sitemap, cmsTags.rss]
    });
    all.push(...mapArticles(data.posts?.nodes));
    if (!data.posts?.pageInfo?.hasNextPage) break;
    after = data.posts.pageInfo.endCursor;
  }
  return all;
}

export async function getCmsArticleBySlug(slug: string, preview = false) {
  const data = await wordpressRequest<ArticleData>(ARTICLE_BY_SLUG_QUERY, {
    variables: { slug, asPreview: preview },
    authenticated: preview,
    tags: [cmsTags.all, cmsTags.articles, cmsTags.article(slug)]
  });
  return data.post ? wpArticleToArticle(data.post as Parameters<typeof wpArticleToArticle>[0]) : null;
}

export async function getCmsArticleByDatabaseId(id: string) {
  const data = await wordpressRequest<ArticleData>(ARTICLE_BY_DATABASE_ID_QUERY, {
    variables: { id, asPreview: true },
    authenticated: true,
    tags: [cmsTags.all, cmsTags.articles]
  });
  return data.post ? wpArticleToArticle(data.post as Parameters<typeof wpArticleToArticle>[0]) : null;
}

export async function getCmsArticlesByFormat(format: Format) {
  return (await getCmsArticles()).filter((article) => article.format === format);
}

export async function getCmsAfricanArticles() {
  return getAfricaArticles(await getCmsArticles());
}

export async function getCmsArticlesForRegion(regionSlug: string) {
  return getArticlesByRegion(await getCmsArticles(), regionSlug);
}

export async function getCmsRegions() {
  const data = await wordpressRequest<TaxonomiesData>(TAXONOMIES_QUERY, { tags: [cmsTags.all, ...tagsForArchive("region", "africa")] });
  const regions = (data.regions?.nodes ?? [])
    .map((node) => wpRegionToDomainRegion(node as Parameters<typeof wpRegionToDomainRegion>[0]))
    .filter((region): region is NonNullable<typeof region> => Boolean(region));
  return regions.length ? regions : africanRegions;
}

export async function getCmsRegionBySlug(slug: string) {
  return (await getCmsRegions()).find((region) => region.slug === slug) ?? getRegion(slug);
}

export async function getCmsGlossaryTerms() {
  const data = await wordpressRequest<GlossaryData>(GLOSSARY_TERMS_QUERY, { tags: [cmsTags.all, cmsTags.glossary, cmsTags.sitemap, cmsTags.llms] });
  return (data.glossaryTerms?.nodes ?? [])
    .map((node) => wpGlossaryTermToTerm(node as Parameters<typeof wpGlossaryTermToTerm>[0]))
    .filter((term): term is GlossaryTerm => Boolean(term));
}

export async function getCmsGlossaryTerm(slug: string) {
  return (await getCmsGlossaryTerms()).find((term) => term.slug === slug) ?? null;
}

export async function getCmsGlossaryTermsByTopic(topicSlug: string) {
  return (await getCmsGlossaryTerms()).filter((term) =>
    term.topics.some((topic) => topic.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === topicSlug)
  );
}

export async function getCmsAuthors() {
  const data = await wordpressRequest<AuthorsData>(AUTHORS_QUERY, { tags: [cmsTags.all, cmsTags.authors] });
  return (data.users?.nodes ?? []).map((node) => wpUserToAuthor(node as Parameters<typeof wpUserToAuthor>[0])).filter((author): author is Author => Boolean(author));
}

export async function getCmsAuthor(slug: string) {
  return (await getCmsAuthors()).find((author) => author.slug === slug) ?? null;
}

export async function getCmsTags(kind: Tag["kind"]) {
  const data = await wordpressRequest<TaxonomiesData>(TAXONOMIES_QUERY, { tags: [cmsTags.all, kind === "brand" ? "brands" : "topics"] });
  const nodes = kind === "brand" ? data.brands?.nodes : data.topics?.nodes;
  return (nodes ?? []).map((node) => wpTermToDomainTag(kind, node as Parameters<typeof wpTermToDomainTag>[1])).filter((tag): tag is Tag => Boolean(tag));
}

export async function getCmsArticlesByTag(slug: string) {
  return (await getCmsArticles()).filter((article) => article.tags.some((tag) => tag.slug === slug));
}

export async function getCmsRelatedArticles(article: Article, limit = 3) {
  const tagSlugs = new Set(article.tags.map((tag) => tag.slug));
  return (await getCmsArticles())
    .filter((candidate) => candidate.id !== article.id)
    .sort((a, b) => {
      const aScore = a.tags.filter((tag) => tagSlugs.has(tag.slug)).length;
      const bScore = b.tags.filter((tag) => tagSlugs.has(tag.slug)).length;
      return bScore - aScore;
    })
    .slice(0, limit);
}

export async function getCmsRelatedGlossaryTerms(slugs: string[]) {
  const wanted = new Set(slugs);
  return (await getCmsGlossaryTerms()).filter((term) => wanted.has(term.slug));
}

export async function getCmsArticlesForGlossaryTerm(slug: string) {
  const term = await getCmsGlossaryTerm(slug);
  if (!term) return [];
  const needles = [term.term, ...term.aliases].map((item) => item.toLowerCase());
  return (await getCmsArticles())
    .filter((article) => {
      const haystack = [article.title, article.subhead, article.excerpt, article.whyItMatters, ...article.body].join(" ").toLowerCase();
      return needles.some((needle) => haystack.includes(needle));
    })
    .slice(0, 4);
}

export async function withCmsFallback<T>(operation: string, cms: () => Promise<T>, fallback: () => T | Promise<T>) {
  try {
    return await cms();
  } catch (error) {
    cmsWarning(`${operation} fell back to local content`, error);
    return fallback();
  }
}
