import { articlePath, siteUrl } from "@/lib/formats";
import { africaHub, regionPath, relatedRegionTopics } from "@/lib/regions";
import type { Article, RegionTerm } from "@/lib/types";

function storyList(articles: Article[]) {
  return articles.length
    ? articles.map((article) => `- [${article.title}](${siteUrl}${articlePath(article.format, article.slug)})`).join("\n")
    : "No published stories have this region tag yet.";
}

export function africaHubToMarkdown(articles: Article[]) {
  const topics = relatedRegionTopics(articles);
  return [
    "# Tech across Africa",
    "",
    `> ${africaHub.description}`,
    "",
    `Canonical: ${siteUrl}/africa`,
    `RSS: ${siteUrl}/africa/feed.xml`,
    "",
    topics.length ? ["## Topics", "", ...topics.map((topic) => `- [${topic.name}](${siteUrl}/topics/${topic.slug})`), ""].join("\n") : "",
    "## Latest stories",
    "",
    storyList(articles)
  ]
    .filter(Boolean)
    .join("\n");
}

export function countryHubToMarkdown(region: RegionTerm, articles: Article[]) {
  const topics = relatedRegionTopics(articles);
  return [
    `# ${region.name} tech news`,
    "",
    `> ${region.description}`,
    "",
    `Canonical: ${siteUrl}${regionPath(region)}`,
    `RSS: ${siteUrl}${regionPath(region)}/feed.xml`,
    "",
    topics.length ? ["## Topics", "", ...topics.map((topic) => `- [${topic.name}](${siteUrl}/topics/${topic.slug})`), ""].join("\n") : "",
    "## Latest stories",
    "",
    storyList(articles)
  ]
    .filter(Boolean)
    .join("\n");
}
