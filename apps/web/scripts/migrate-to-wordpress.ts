import { articles, authors, brands, glossaryTerms, topics } from "../lib/sample-data";
import { africanRegions } from "../lib/regions";

type Report = {
  created: string[];
  updated: string[];
  skipped: string[];
  failed: Array<{ item: string; error: string }>;
};

const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT;
const auth = process.env.WORDPRESS_API_TOKEN_OR_APP_PASSWORD;
const dryRun = process.env.DRY_RUN !== "false";

if (!endpoint) throw new Error("WORDPRESS_GRAPHQL_ENDPOINT is required");
if (!auth && !dryRun) throw new Error("WORDPRESS_API_TOKEN_OR_APP_PASSWORD is required unless DRY_RUN is true");

const wpBase = endpoint.replace(/\/graphql\/?$/, "").replace(/\/$/, "");
const restBase = `${wpBase}/wp-json/wp/v2`;
const headers: HeadersInit = {
  "Content-Type": "application/json",
  ...(auth ? { Authorization: `Basic ${auth}` } : {})
};

const report: Report = { created: [], updated: [], skipped: [], failed: [] };
const topicSlugByName = new Map(topics.map((topic) => [topic.name.toLowerCase(), topic.slug]));

async function wpFetch<T>(path: string, init: RequestInit = {}) {
  const response = await fetch(`${restBase}${path}`, { ...init, headers: { ...headers, ...(init.headers ?? {}) } });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${body}`);
  }
  return (await response.json()) as T;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function upsertTerm(taxonomy: string, name: string, slug: string, description = "") {
  if (dryRun) {
    report.skipped.push(`dry-run term ${taxonomy}:${slug}`);
    return 0;
  }
  const existing = await wpFetch<Array<{ id: number }>>(`/${taxonomy}?slug=${encodeURIComponent(slug)}`);
  if (existing[0]) {
    await wpFetch(`/${taxonomy}/${existing[0].id}`, { method: "POST", body: JSON.stringify({ name, description }) });
    report.updated.push(`term ${taxonomy}:${slug}`);
    return existing[0].id;
  }
  const created = await wpFetch<{ id: number }>(`/${taxonomy}`, { method: "POST", body: JSON.stringify({ name, slug, description }) });
  report.created.push(`term ${taxonomy}:${slug}`);
  return created.id;
}

async function upsertPost(endpointPath: "posts" | "glossary", slug: string, payload: Record<string, unknown>) {
  if (dryRun) {
    report.skipped.push(`dry-run ${endpointPath}:${slug}`);
    return;
  }
  const existing = await wpFetch<Array<{ id: number }>>(`/${endpointPath}?slug=${encodeURIComponent(slug)}&status=any`);
  if (existing[0]) {
    await wpFetch(`/${endpointPath}/${existing[0].id}`, { method: "POST", body: JSON.stringify(payload) });
    report.updated.push(`${endpointPath}:${slug}`);
    return;
  }
  await wpFetch(`/${endpointPath}`, { method: "POST", body: JSON.stringify({ ...payload, slug }) });
  report.created.push(`${endpointPath}:${slug}`);
}

async function main() {
  const formatIds = new Map<string, number>();
  const formatNames = new Map([
    ["explainer", "MAMBO Explains"],
    ["review", "Review"],
    ["wallet-watch", "Wallet Watch"],
    ["real-life", "MAMBO vs Real Life"],
    ["news", "Should you care?"],
    ["opinion", "Opinion"],
    ["business", "Business"]
  ]);

  for (const [slug, name] of formatNames) {
    formatIds.set(slug, await upsertTerm("format", name, slug));
  }
  for (const topic of topics) await upsertTerm("topic", topic.name, topic.slug);
  for (const brand of brands) await upsertTerm("brand", brand.name, brand.slug);
  for (const region of africanRegions) await upsertTerm("region", region.name, region.slug, region.description);

  for (const article of articles) {
    try {
      const topicIds = await Promise.all(article.tags.filter((tag) => tag.kind === "topic").map((tag) => upsertTerm("topic", tag.name, tag.slug)));
      const brandIds = await Promise.all(article.tags.filter((tag) => tag.kind === "brand").map((tag) => upsertTerm("brand", tag.name, tag.slug)));
      const regionIds = await Promise.all((article.regions ?? []).map((region) => upsertTerm("region", region.name, region.slug, region.description)));

      await upsertPost("posts", article.slug, {
        title: article.title,
        status: "publish",
        excerpt: article.excerpt,
        content: article.body.map((paragraph) => `<p>${paragraph}</p>`).join("\n"),
        format: [formatIds.get(article.format)].filter(Boolean),
        topic: topicIds,
        brand: brandIds,
        region: regionIds,
        acf: {
          subhead: article.subhead,
          why_it_matters: article.whyItMatters,
          image_credit: article.image.credit,
          sponsored: article.sponsored ?? false,
          read_time: article.readTime,
          go_deeper: article.goDeeper
            ? {
                intro: article.goDeeper.intro,
                spec_table: article.goDeeper.specs
              }
            : null,
          verdict: article.verdict ?? null,
          deal: article.deal ?? null,
          faqs: article.faq ?? [],
          closing_line: article.closingLine ?? ""
        }
      });
    } catch (error) {
      report.failed.push({ item: `article:${article.slug}`, error: error instanceof Error ? error.message : String(error) });
    }
  }

  for (const term of glossaryTerms) {
    try {
      const topicIds = await Promise.all(term.topics.map((topic) => upsertTerm("topic", topic, topicSlugByName.get(topic.toLowerCase()) ?? slugify(topic))));
      await upsertPost("glossary", term.slug, {
        title: term.term,
        status: "publish",
        content: term.fullExplanation,
        topic: topicIds,
        acf: {
          one_liner: term.oneLiner,
          pronunciation: term.pronunciation ?? "",
          aliases: term.aliases.map((alias) => ({ alias })),
          analogy: term.analogy ?? "",
          full_explanation: term.fullExplanation,
          why_it_matters: term.whyItMatters ?? "",
          difficulty: term.difficulty,
          featured: term.featured ?? false,
          term_of_day: term.termOfDay ?? "",
          faqs: term.faqs ?? [],
          sources: term.sources ?? []
        }
      });
    } catch (error) {
      report.failed.push({ item: `glossary:${term.slug}`, error: error instanceof Error ? error.message : String(error) });
    }
  }

  for (const author of authors) {
    report.skipped.push(`author:${author.slug} must be matched to an existing WordPress user or created by an admin`);
  }

  console.log(JSON.stringify({ dryRun, counts: { articles: articles.length, glossaryTerms: glossaryTerms.length, authors: authors.length }, report }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
