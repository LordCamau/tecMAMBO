import { articlePath, formats, siteUrl } from "@/lib/formats";
import { africaHub, africaLeadRegionSlugs, africanRegions, regionPath } from "@/lib/regions";
import { allSectionTopicPaths, wearableFilters, wearableFilterPath } from "@/lib/site-structure";
import type { Article, GlossaryTerm } from "@/lib/types";

export function buildLlmsTxt(articles: Article[], terms: GlossaryTerm[]) {
  const latest = articles.slice(0, 6).map((article) => `- [${article.title}](${siteUrl}${articlePath(article.format, article.slug)})`);
  const sections = Object.values(formats).map((format) => `- [${format.section}](${siteUrl}${format.path}) - ${format.description}`);
  const navArchives = ["/latest", ...allSectionTopicPaths(), ...wearableFilters.map((filter) => wearableFilterPath(filter.slug))]
    .filter((path, index, all) => all.indexOf(path) === index)
    .map((path) => `- ${siteUrl}${path}`);
  const glossary = terms.slice(0, 16).map((term) => `- [${term.term}](${siteUrl}/glossary/${term.slug}) - ${term.oneLiner}`);
  const regionalHubs = [
    `- [Tech across Africa](${siteUrl}${africaHub.path}) - ${africaHub.description}`,
    `- ${siteUrl}/africa.md`,
    `- ${siteUrl}/africa/feed.xml`,
    ...africaLeadRegionSlugs
      .map((slug) => africanRegions.find((region) => region.slug === slug))
      .filter((region): region is NonNullable<typeof region> => Boolean(region))
      .flatMap((region) => [
        `- [${region.name} tech news](${siteUrl}${regionPath(region)}) - ${region.description}`,
        `- ${siteUrl}${regionPath(region)}.md`,
        `- ${siteUrl}${regionPath(region)}/feed.xml`
      ])
  ];

  return [
    "# tecMAMBO",
    "",
    "> tecMAMBO is a plain-English technology publication. It explains consumer technology clearly first, with optional technical depth for readers and agents that need more context.",
    "",
    "## Sections",
    "",
    ...sections,
    "",
    "## About tecMAMBO",
    "",
    `- [About tecMAMBO](${siteUrl}/about) - Founded in 2016 by Tim Humphreys in Nairobi. Tech, made to be understood.`,
    `- ${siteUrl}/about.md`,
    "",
    "## Navigation and topic archives",
    "",
    ...navArchives,
    "",
    "## Regional technology hubs",
    "",
    ...regionalHubs,
    "",
    "## Glossary feeds and machine-readable indexes",
    "",
    `- ${siteUrl}/glossary`,
    `- ${siteUrl}/glossary/llms.txt`,
    `- ${siteUrl}/glossary/sitemap.xml`,
    `- ${siteUrl}/glossary/feed.xml`,
    `- ${siteUrl}/glossary/feed.json`,
    "",
    "## Latest articles",
    "",
    ...latest,
    "",
    "## Glossary starting points",
    "",
    ...glossary,
    "",
    `Editorial standards: ${siteUrl}/editorial-standards`,
    `Markdown mirrors: article and glossary URLs support .md endpoints.`
  ].join("\n");
}
