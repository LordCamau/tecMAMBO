import type { MetadataRoute } from "next";
import { getArticles, getAuthors, getGlossaryTerms, getTags } from "@/lib/content";
import { articlePath, formats, siteUrl } from "@/lib/formats";
import { allSectionTopicPaths, wearableFilters, wearableFilterPath } from "@/lib/site-structure";
import { africanRegions, regionPath } from "@/lib/regions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, terms, authors, topics, brands] = await Promise.all([
    getArticles(),
    getGlossaryTerms(),
    getAuthors(),
    getTags("topic"),
    getTags("brand")
  ]);
  const glossaryTopicPaths = Array.from(
    new Set(
      terms.flatMap((term) =>
        term.topics.map((topic) => `/glossary/topic/${topic.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`)
      )
    )
  );
  const staticPaths = [
    "/",
    "/latest",
    "/glossary",
    "/glossary/llms.txt",
    "/glossary/sitemap.xml",
    "/glossary/feed.xml",
    "/glossary/feed.json",
    "/africa",
    "/africa.md",
    "/africa/feed.xml",
    "/africa/more",
    "/africa/more.md",
    "/about",
    "/about.md",
    "/terms",
    "/terms.md",
    "/advertise",
    "/newsletter",
    "/contact",
    "/editorial-standards",
    "/editorial-standards.md",
    "/privacy",
    "/privacy.md",
    "/cookies",
    "/cookies.md"
  ];
  const archivePaths = [...allSectionTopicPaths(), ...wearableFilters.map((filter) => wearableFilterPath(filter.slug))].filter(
    (path, index, all) => all.indexOf(path) === index
  );
  return [
    ...staticPaths.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date() })),
    ...glossaryTopicPaths.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date() })),
    ...archivePaths.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date() })),
    ...Object.values(formats).map((format) => ({ url: `${siteUrl}${format.path}`, lastModified: new Date() })),
    ...africanRegions.flatMap((region) => [
      { url: `${siteUrl}${regionPath(region)}`, lastModified: new Date() },
      { url: `${siteUrl}${regionPath(region)}.md`, lastModified: new Date() },
      { url: `${siteUrl}${regionPath(region)}/feed.xml`, lastModified: new Date() }
    ]),
    ...articles.map((article) => ({
      url: `${siteUrl}${articlePath(article.format, article.slug)}`,
      lastModified: new Date(article.updatedAt)
    })),
    ...terms.map((term) => ({ url: `${siteUrl}/glossary/${term.slug}`, lastModified: new Date() })),
    ...authors.map((author) => ({ url: `${siteUrl}/authors/${author.slug}`, lastModified: new Date() })),
    ...topics.map((topic) => ({ url: `${siteUrl}/topics/${topic.slug}`, lastModified: new Date() })),
    ...brands.map((brand) => ({ url: `${siteUrl}/brands/${brand.slug}`, lastModified: new Date() }))
  ];
}
