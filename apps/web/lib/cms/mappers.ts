import "server-only";
import { getRegion } from "@/lib/regions";
import type { Article, Author, Deal, Format, GlossaryTerm, RegionTerm, Tag } from "@/lib/types";

type WpTerm = {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
};

type WpAuthor = {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  avatar?: { url?: string | null } | null;
  authorFields?: {
    role?: string | null;
    expertise?: Array<{ item?: string | null }> | null;
  } | null;
};

type WpArticle = {
  id?: string | null;
  databaseId?: number | null;
  slug?: string | null;
  title?: string | null;
  excerpt?: string | null;
  date?: string | null;
  modified?: string | null;
  content?: string | null;
  featuredImage?: {
    node?: {
      sourceUrl?: string | null;
      altText?: string | null;
      caption?: string | null;
    } | null;
  } | null;
  author?: { node?: WpAuthor | null } | null;
  formats?: { nodes?: WpTerm[] | null } | null;
  topics?: { nodes?: WpTerm[] | null } | null;
  brands?: { nodes?: WpTerm[] | null } | null;
  regions?: { nodes?: WpTerm[] | null } | null;
  seo?: {
    title?: string | null;
    metaDesc?: string | null;
    canonical?: string | null;
  } | null;
  articleFields?: {
    subhead?: string | null;
    whyItMatters?: string | null;
    imageCredit?: string | null;
    sponsored?: boolean | null;
    readTime?: string | null;
    goDeeper?: {
      intro?: string | null;
      specTable?: Array<{ label?: string | null; value?: string | null }> | null;
    } | null;
    verdict?: {
      score?: string | null;
      summary?: string | null;
      pros?: Array<{ item?: string | null }> | null;
      cons?: Array<{ item?: string | null }> | null;
    } | null;
    deal?: {
      productName?: string | null;
      retailer?: string | null;
      priceCurrent?: number | null;
      priceWas?: number | null;
      currency?: "KSh" | "USD" | null;
      affiliateUrl?: string | null;
      dealExpiry?: string | null;
      bestUnderThreshold?: number | null;
      verified?: boolean | null;
    } | null;
    faqs?: Array<{ question?: string | null; answer?: string | null }> | null;
    closingLine?: string | null;
  } | null;
};

type WpGlossaryTerm = {
  slug?: string | null;
  title?: string | null;
  content?: string | null;
  date?: string | null;
  modified?: string | null;
  topics?: { nodes?: WpTerm[] | null } | null;
  glossaryFields?: {
    oneLiner?: string | null;
    pronunciation?: string | null;
    aliases?: Array<{ alias?: string | null }> | null;
    analogy?: string | null;
    fullExplanation?: string | null;
    whyItMatters?: string | null;
    difficulty?: GlossaryTerm["difficulty"] | null;
    featured?: boolean | null;
    termOfDay?: string | null;
    relatedTerms?: { nodes?: Array<{ slug?: string | null }> | null } | null;
    notToConfuseWith?: { nodes?: Array<{ slug?: string | null }> | null } | null;
    faqs?: Array<{ question?: string | null; answer?: string | null }> | null;
    sources?: Array<{ label?: string | null; url?: string | null }> | null;
  } | null;
};

function text(value: string | null | undefined, fallback = "") {
  return stripHtml(value ?? "").trim() || fallback;
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
}

function htmlToParagraphs(value?: string | null) {
  if (!value) return [];
  const withBreaks = value
    .replace(/<\/h2>/gi, "\n")
    .replace(/<h2[^>]*>/gi, "\n## ")
    .replace(/<\/h3>/gi, "\n")
    .replace(/<h3[^>]*>/gi, "\n### ")
    .replace(/<\/p>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n");
  return withBreaks
    .replace(/<[^>]+>/g, "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function termToTag(kind: Tag["kind"]) {
  return (term: WpTerm): Tag | null => {
    if (!term.name || !term.slug) return null;
    return { name: term.name, slug: term.slug, kind };
  };
}

function regionFromTerm(term: WpTerm): RegionTerm | null {
  if (!term.slug || !term.name) return null;
  const seeded = getRegion(term.slug);
  if (seeded) return seeded;
  return {
    name: term.name,
    slug: term.slug,
    group: "Africa",
    description: term.description ?? `Technology coverage relevant to ${term.name}.`
  };
}

function wpAuthorToAuthor(author?: WpAuthor | null): Author {
  return {
    name: text(author?.name, "Tim Humphreys"),
    slug: author?.slug ?? "tim-humphreys",
    role: author?.authorFields?.role ?? "tecMAMBO writer",
    bio: text(author?.description, "Plain-English technology writing for tecMAMBO."),
    avatar: author?.avatar?.url ?? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    expertise: author?.authorFields?.expertise?.map((item) => item.item).filter((item): item is string => Boolean(item)) ?? []
  };
}

function formatFromTerms(terms?: WpTerm[] | null): Format {
  const slugs = new Set((terms ?? []).map((term) => term.slug));
  if (slugs.has("review")) return "review";
  if (slugs.has("wallet-watch")) return "wallet-watch";
  if (slugs.has("real-life")) return "real-life";
  if (slugs.has("news")) return "news";
  if (slugs.has("opinion")) return "opinion";
  if (slugs.has("business")) return "business";
  return "explainer";
}

function dealFromWp(deal?: WpArticle["articleFields"] extends infer Fields ? Fields extends { deal?: infer DealField } ? DealField : never : never): Deal | undefined {
  if (!deal || typeof deal !== "object") return undefined;
  const value = deal as {
    productName?: string | null;
    retailer?: string | null;
    priceCurrent?: number | null;
    priceWas?: number | null;
    currency?: "KSh" | "USD" | null;
    affiliateUrl?: string | null;
    dealExpiry?: string | null;
    bestUnderThreshold?: number | null;
    verified?: boolean | null;
  };
  if (!value.productName || !value.retailer || !value.priceCurrent || !value.affiliateUrl) return undefined;
  return {
    productName: value.productName,
    retailer: value.retailer,
    priceCurrent: value.priceCurrent,
    priceWas: value.priceWas ?? undefined,
    currency: value.currency ?? "KSh",
    affiliateUrl: value.affiliateUrl,
    expiry: value.dealExpiry ?? undefined,
    bestUnderThreshold: value.bestUnderThreshold ?? undefined,
    verified: Boolean(value.verified)
  };
}

export function wpArticleToArticle(node: WpArticle): Article | null {
  if (!node.slug || !node.title) return null;
  const format = formatFromTerms(node.formats?.nodes);
  const fields = node.articleFields;
  const body = htmlToParagraphs(node.content);
  const tags = [
    ...(node.topics?.nodes ?? []).map(termToTag("topic")),
    ...(node.brands?.nodes ?? []).map(termToTag("brand"))
  ].filter((tag): tag is Tag => Boolean(tag));
  const regions = (node.regions?.nodes ?? []).map(regionFromTerm).filter((region): region is RegionTerm => Boolean(region));
  const featured = node.featuredImage?.node;
  const excerpt = text(node.excerpt, fields?.subhead ?? node.title);

  return {
    id: node.id ?? String(node.databaseId ?? node.slug),
    slug: node.slug,
    format,
    title: text(node.title),
    seo: node.seo?.title || node.seo?.metaDesc ? { title: node.seo.title ?? text(node.title), description: node.seo.metaDesc ?? excerpt } : undefined,
    subhead: text(fields?.subhead, excerpt),
    excerpt,
    whyItMatters: text(fields?.whyItMatters, "This story helps readers understand what changes in plain English."),
    body: body.length ? body : [excerpt],
    goDeeper: fields?.goDeeper
      ? {
          intro: text(fields.goDeeper.intro),
          specs:
            fields.goDeeper.specTable
              ?.map((row) => ({ label: text(row.label), value: text(row.value) }))
              .filter((row) => row.label && row.value) ?? []
        }
      : undefined,
    closingLine: fields?.closingLine ?? undefined,
    verdict: fields?.verdict?.score
      ? {
          score: fields.verdict.score,
          summary: text(fields.verdict.summary),
          pros: fields.verdict.pros?.map((item) => text(item.item)).filter(Boolean) ?? [],
          cons: fields.verdict.cons?.map((item) => text(item.item)).filter(Boolean) ?? []
        }
      : undefined,
    author: wpAuthorToAuthor(node.author?.node),
    publishedAt: node.date ?? new Date().toISOString(),
    updatedAt: node.modified ?? node.date ?? new Date().toISOString(),
    readTime: fields?.readTime ?? `${Math.max(3, Math.ceil(body.join(" ").split(/\s+/).length / 220))} min read`,
    image: {
      src: featured?.sourceUrl ?? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1800&auto=format&fit=crop",
      alt: featured?.altText || text(node.title),
      credit: fields?.imageCredit ?? text(featured?.caption, "WordPress media library")
    },
    tags,
    regions: regions.length ? regions : undefined,
    faq: fields?.faqs?.map((item) => ({ question: text(item.question), answer: text(item.answer) })).filter((item) => item.question && item.answer),
    sponsored: Boolean(fields?.sponsored),
    deal: dealFromWp(fields?.deal)
  };
}

export function wpGlossaryTermToTerm(node: WpGlossaryTerm): GlossaryTerm | null {
  if (!node.slug || !node.title) return null;
  const fields = node.glossaryFields;
  return {
    term: text(node.title),
    slug: node.slug,
    oneLiner: text(fields?.oneLiner, text(node.content, node.title)),
    pronunciation: fields?.pronunciation ?? undefined,
    aliases: fields?.aliases?.map((item) => text(item.alias)).filter(Boolean) ?? [],
    analogy: fields?.analogy ?? undefined,
    fullExplanation: text(fields?.fullExplanation, text(node.content)),
    whyItMatters: fields?.whyItMatters ?? undefined,
    notToConfuseWith: fields?.notToConfuseWith?.nodes?.map((item) => item.slug).filter((slug): slug is string => Boolean(slug)),
    relatedTerms: fields?.relatedTerms?.nodes?.map((item) => item.slug).filter((slug): slug is string => Boolean(slug)) ?? [],
    topics: node.topics?.nodes?.map((topic) => topic.name).filter((name): name is string => Boolean(name)) ?? [],
    difficulty: fields?.difficulty ?? "Everyday",
    faqs: fields?.faqs?.map((item) => ({ question: text(item.question), answer: text(item.answer) })).filter((item) => item.question && item.answer),
    featured: Boolean(fields?.featured),
    termOfDay: fields?.termOfDay ?? undefined,
    sources: fields?.sources?.map((source) => ({ label: text(source.label), url: source.url ?? "" })).filter((source) => source.label && source.url),
    publishedAt: node.date ?? new Date().toISOString(),
    updatedAt: node.modified ?? node.date ?? new Date().toISOString()
  };
}

export function wpTermToDomainTag(kind: Tag["kind"], term: WpTerm): Tag | null {
  return termToTag(kind)(term);
}

export function wpRegionToDomainRegion(term: WpTerm): RegionTerm | null {
  return regionFromTerm(term);
}

export function wpUserToAuthor(user: WpAuthor): Author {
  return wpAuthorToAuthor(user);
}
