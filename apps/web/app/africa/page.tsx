import type { Metadata } from "next";
import Link from "next/link";
import { getAfricanArticles } from "@/lib/content";
import { africaHub, africaLeadRegionSlugs, africanRegions, regionPath, relatedRegionTopics } from "@/lib/regions";
import { siteUrl } from "@/lib/formats";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { StoryCard } from "@/components/cards/StoryCard";
import styles from "./africa.module.css";

export const metadata: Metadata = {
  title: "African tech news, tecMAMBO",
  description:
    "Technology coverage from Kenya, Nigeria, South Africa, Rwanda, and the wider African tech scene, collected as a regional layer inside tecMAMBO.",
  alternates: {
    canonical: "/africa",
    types: {
      "application/rss+xml": `${siteUrl}/africa/feed.xml`,
      "text/markdown": `${siteUrl}/africa.md`
    }
  }
};

const leadRegions = africaLeadRegionSlugs
  .map((slug) => africanRegions.find((region) => region.slug === slug))
  .filter((region): region is NonNullable<typeof region> => Boolean(region));

export default async function AfricaPage() {
  const articles = await getAfricanArticles();
  const topicChips = relatedRegionTopics(articles);

  return (
    <section className={`container ${styles.page}`}>
      <header className={styles.header}>
        <p>Region layer</p>
        <h1>Tech across Africa</h1>
        <span>{africaHub.description}</span>
      </header>

      <nav className={styles.tabs} aria-label="African tech filters">
        <Link aria-current="page" href="/africa">
          All
        </Link>
        {leadRegions.map((region) => (
          <Link href={regionPath(region)} key={region.slug}>
            {region.name}
          </Link>
        ))}
        <Link href="/africa/more">More</Link>
      </nav>

      {topicChips.length ? (
        <section className={styles.hubTools} aria-labelledby="africa-topic-title">
          <div>
            <h2 id="africa-topic-title">Topics showing up in African coverage</h2>
            <p>Use these as shortcuts into the broader tecMAMBO topic graph.</p>
          </div>
          <div className={styles.topicChips}>
            {topicChips.map((topic) => (
              <Link href={`/topics/${topic.slug}`} key={topic.slug}>
                {topic.name}
              </Link>
            ))}
          </div>
          <Link className={styles.feedLink} href="/africa/feed.xml">
            Africa RSS
          </Link>
        </section>
      ) : null}

      <div className={styles.grid}>
        {articles.map((article) => (
          <StoryCard article={article} key={article.id} />
        ))}
      </div>

      <JsonLd data={collectionPageJsonLd({ name: "Tech across Africa", description: africaHub.description, path: "/africa", articles })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Africa", path: "/africa" }])} />
    </section>
  );
}
