import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { buildGoogleNewsSitemap, buildJsonFeed, buildRssFeed } from "../content/feeds";
import { buildLlmsTxt } from "../content/llms";
import { articleToMarkdown, glossaryToMarkdown } from "../content/markdown";
import { articles, glossaryTerms } from "../lib/sample-data";
import { assertAdvertisePageIsPublishable, assertArticlesArePublishable, assertLegalPagesArePublishable, assertNoEditorialTodos } from "../lib/content-guard";
import { legalPageToMarkdown } from "../content/legal-markdown";
import { cookiePage, editorialStandardsPage, legalPages, privacyPage, termsPage } from "../lib/legal-pages";
import { consentCategories, consentModeDenied } from "../lib/cookie-consent";
import { advertiseSettings, populatedAudienceStats } from "../lib/advertise";
import { africaLeadRegionSlugs, africanRegions, getAfricaArticles } from "../lib/regions";
import { africaHubToMarkdown, countryHubToMarkdown } from "../content/region-markdown";

describe("content generators", () => {
  it("builds RSS with canonical article links", () => {
    const rss = buildRssFeed(articles);
    expect(rss).toContain("<rss version=\"2.0\">");
    expect(rss).toContain(
      "https://tecmambo.com/explainers/why-your-phone-gets-hot-when-you-charge-and-use-it-at-the-same-time"
    );
  });

  it("builds JSON Feed items", () => {
    const feed = buildJsonFeed(articles);
    expect(feed.version).toBe("https://jsonfeed.org/version/1.1");
    expect(feed.items[0]?.title).toBe(articles[0]?.title);
  });

  it("builds Google News sitemap XML", () => {
    const sitemap = buildGoogleNewsSitemap(articles);
    expect(sitemap).toContain("xmlns:news");
    expect(sitemap).toContain("<news:publication>");
  });

  it("builds a lean llms.txt map", () => {
    const llms = buildLlmsTxt(articles, glossaryTerms);
    expect(llms).toContain("# tecMAMBO");
    expect(llms).toContain("Markdown mirrors");
  });

  it("mirrors articles and glossary terms as markdown", () => {
    expect(articleToMarkdown(articles[0]!)).toContain("## Why it matters");
    expect(glossaryToMarkdown(glossaryTerms[0]!)).toContain(`# ${glossaryTerms[0]!.term}`);
    expect(glossaryToMarkdown(glossaryTerms[0]!)).toContain("## Go deeper");
  });

  it("blocks editorial TODO notes from rendered article fields", () => {
    expect(() => assertNoEditorialTodos(articles)).not.toThrow();
    expect(() => assertArticlesArePublishable(articles)).not.toThrow();
  });

  it("publishes the AI package with the requested authors, tags, and rich fields", () => {
    const aiPackage = articles.filter((article) => article.id.startsWith("ai-"));
    const uniqueImages = new Set(aiPackage.map((article) => article.image.src));

    expect(aiPackage).toHaveLength(12);
    expect(aiPackage.filter((article) => article.author.slug === "tim-humphreys")).toHaveLength(4);
    expect(aiPackage.filter((article) => article.author.slug === "lulu-kiritu")).toHaveLength(8);
    expect(aiPackage.every((article) => article.tags.some((tag) => tag.slug === "ai"))).toBe(true);
    expect(uniqueImages.size).toBe(aiPackage.length);
    expect(aiPackage.find((article) => article.slug === "what-is-an-ai-agent-really")?.faq).toHaveLength(3);
    expect(aiPackage.find((article) => article.slug === "why-ai-hallucinates-and-how-to-catch-it")?.faq).toHaveLength(3);
    expect(aiPackage.find((article) => article.slug === "gemini-spark-review")?.verdict?.score).toBe("3.5/5");
    expect(aiPackage.find((article) => article.slug === "best-ai-subscription-value-2026")?.itemList).toHaveLength(3);
  });

  it("ships a launch-sized glossary without placeholder text", () => {
    expect(glossaryTerms.length).toBeGreaterThanOrEqual(80);
    expect(glossaryTerms.every((term) => term.oneLiner && term.topics.length && term.difficulty)).toBe(true);
    expect(JSON.stringify(glossaryTerms)).not.toMatch(/\[(verify|todo|draft|tk|confirm)\b/i);
  });

  it("guards legal pages against em dashes and incorrect brand casing", () => {
    expect(() => assertLegalPagesArePublishable(legalPages)).not.toThrow();
  });

  it("guards the Advertise page and keeps unverified audience stats hidden", () => {
    expect(() => assertAdvertisePageIsPublishable(advertiseSettings)).not.toThrow();
    expect(populatedAudienceStats).toHaveLength(0);
    expect(advertiseSettings.form.budgetRanges.length).toBeGreaterThan(0);
    expect(advertiseSettings.faq).toHaveLength(6);
  });

  it("ships the downloadable media-kit PDF asset", () => {
    expect(existsSync(join(process.cwd(), "public", "media", "tecMAMBO-Media-Kit-2026.pdf"))).toBe(true);
  });

  it("mirrors the Terms of Use page as markdown", () => {
    const markdown = legalPageToMarkdown(termsPage);
    expect(markdown).toContain("# Terms of Use");
    expect(markdown).toContain("## 26. How to contact us");
    expect(markdown).toContain("[Privacy Policy](/privacy)");
    expect(markdown).toContain("[Cookie Policy](/cookies)");
  });

  it("mirrors the Privacy Policy page as markdown", () => {
    const markdown = legalPageToMarkdown(privacyPage);
    expect(markdown).toContain("# Privacy Policy");
    expect(markdown).toContain("## 18. How to complain");
    expect(markdown).toContain("[Cookie Policy](/cookies)");
    expect(markdown).toContain("[Terms of Use](/terms)");
    expect(markdown).toContain("[consent tool](/cookies#manage-cookie-preferences)");
  });

  it("mirrors the Cookie Policy page as markdown", () => {
    const markdown = legalPageToMarkdown(cookiePage);
    expect(markdown).toContain("# Cookie Policy");
    expect(markdown).toContain("## 10. More information and how to contact us");
    expect(markdown).toContain("[Privacy Policy](/privacy)");
    expect(markdown).toContain("[Terms of Use](/terms)");
  });

  it("mirrors the Editorial standards page as markdown", () => {
    const markdown = legalPageToMarkdown(editorialStandardsPage);
    expect(markdown).toContain("# Editorial standards");
    expect(markdown).toContain("## 20. Contact us");
    expect(markdown).toContain("[Terms of Use](/terms)");
    expect(markdown).toContain("[About page](/about)");
    expect(markdown).toContain("[editorial contact email]");
  });

  it("keeps Consent Mode defaults privacy-first", () => {
    expect(consentModeDenied).toEqual({
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      functionality_storage: "denied",
      personalization_storage: "denied",
      security_storage: "granted"
    });
  });

  it("seeds African regions and tags regional stories without siloing formats", () => {
    expect(africaLeadRegionSlugs).toEqual(["kenya", "nigeria", "south-africa", "rwanda"]);
    expect(africanRegions.length).toBeGreaterThanOrEqual(9);
    const regionalStories = getAfricaArticles(articles);
    expect(regionalStories.length).toBeGreaterThanOrEqual(8);
    expect(new Set(regionalStories.map((article) => article.format)).size).toBeGreaterThan(1);
  });

  it("builds regional hub markdown and region-aware feeds", () => {
    const regionalStories = getAfricaArticles(articles);
    const kenya = africanRegions.find((region) => region.slug === "kenya")!;
    const kenyaStories = regionalStories.filter((article) => article.regions?.some((region) => region.slug === "kenya"));
    const africaMarkdown = africaHubToMarkdown(regionalStories);
    const kenyaMarkdown = countryHubToMarkdown(kenya, kenyaStories);
    const africaFeed = buildRssFeed(regionalStories, "tecMAMBO African tech", "/africa/feed.xml");

    expect(africaMarkdown).toContain("# Tech across Africa");
    expect(kenyaMarkdown).toContain("# Kenya tech news");
    expect(africaFeed).toContain("<category>Kenya</category>");
  });

  it("surfaces regional hubs in llms.txt", () => {
    const llms = buildLlmsTxt(articles, glossaryTerms);
    expect(llms).toContain("## Regional technology hubs");
    expect(llms).toContain("https://tecmambo.com/africa");
    expect(llms).toContain("https://tecmambo.com/africa/kenya/feed.xml");
  });

  it("keeps cookie consent category copy aligned with the Cookie Policy", () => {
    expect(consentCategories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Strictly necessary",
          description: "Needed for tecMAMBO to work, stay secure, and remember your choices. These are always on.",
          locked: true
        }),
        expect.objectContaining({
          title: "Performance and analytics",
          description: "Help us see what is read so we can make tecMAMBO clearer and better."
        }),
        expect.objectContaining({
          title: "Functionality and preferences",
          description: "Remember settings like light or dark mode for a smoother visit."
        }),
        expect.objectContaining({
          title: "Advertising",
          description: "Used by us and our partners to show and measure ads, including more relevant ones where you allow it."
        }),
        expect.objectContaining({
          title: "Social media",
          description: "Allow embedded posts and share buttons from social platforms."
        })
      ])
    );
  });
});
