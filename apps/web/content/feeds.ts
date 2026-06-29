import { articlePath, formats, siteUrl } from "@/lib/formats";
import type { Article } from "@/lib/types";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function buildRssFeed(articles: Article[], title = "tecMAMBO", path = "/feed.xml") {
  const items = articles
    .map((article) => {
      const url = `${siteUrl}${articlePath(article.format, article.slug)}`;
      return `<item>
  <title>${escapeXml(article.title)}</title>
  <link>${url}</link>
  <guid>${url}</guid>
  <description>${escapeXml(article.subhead)}</description>
  <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
  <author>${escapeXml(article.author.name)}</author>
  <category>${escapeXml(formats[article.format].section)}</category>
  ${article.regions?.map((region) => `<category>${escapeXml(region.name)}</category>`).join("\n  ") ?? ""}
</item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(title)}</title>
  <link>${siteUrl}${path}</link>
  <description>Plain-English technology journalism with depth when you want it.</description>
  <language>en</language>
${items}
</channel>
</rss>`;
}

export function buildJsonFeed(articles: Article[]) {
  return {
    version: "https://jsonfeed.org/version/1.1",
    title: "tecMAMBO",
    home_page_url: siteUrl,
    feed_url: `${siteUrl}/feed.json`,
    items: articles.map((article) => ({
      id: article.id,
      url: `${siteUrl}${articlePath(article.format, article.slug)}`,
      title: article.title,
      summary: article.subhead,
      date_published: article.publishedAt,
      date_modified: article.updatedAt,
      authors: [{ name: article.author.name, url: `${siteUrl}/authors/${article.author.slug}` }],
      tags: article.tags.map((tag) => tag.name),
      image: article.image.src
    }))
  };
}

export function buildGoogleNewsSitemap(articles: Article[]) {
  const recent = articles.filter((article) => Date.now() - new Date(article.publishedAt).getTime() < 48 * 60 * 60 * 1000);
  const urls = recent
    .map(
      (article) => `<url>
  <loc>${siteUrl}${articlePath(article.format, article.slug)}</loc>
  <news:news>
    <news:publication>
      <news:name>tecMAMBO</news:name>
      <news:language>en</news:language>
    </news:publication>
    <news:publication_date>${article.publishedAt}</news:publication_date>
    <news:title>${escapeXml(article.title)}</news:title>
  </news:news>
</url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;
}
