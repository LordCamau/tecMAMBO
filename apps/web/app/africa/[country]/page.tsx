import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAfricanArticles, getArticlesForRegion } from "@/lib/content";
import { africaLeadRegionSlugs, africanRegions, getRegion, regionPath, relatedRegionTopics } from "@/lib/regions";
import { siteUrl } from "@/lib/formats";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { StoryCard } from "@/components/cards/StoryCard";
import styles from "../africa.module.css";

type Params = Promise<{ country: string }>;

export function generateStaticParams() {
  return [...africanRegions.map((region) => ({ country: region.slug })), { country: "more" }];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { country } = await params;
  if (country === "more") {
    return {
      title: "African tech country hubs, tecMAMBO",
      description: "Browse tecMAMBO country hubs for African technology coverage.",
      alternates: { canonical: "/africa/more", types: { "text/markdown": `${siteUrl}/africa/more.md` } }
    };
  }
  const region = getRegion(country);
  if (!region) return {};
  return {
    title: `${region.name} tech news, tecMAMBO`,
    description: region.description,
    alternates: {
      canonical: regionPath(region),
      types: {
        "application/rss+xml": `${siteUrl}${regionPath(region)}/feed.xml`,
        "text/markdown": `${siteUrl}${regionPath(region)}.md`
      }
    },
    openGraph: {
      title: `${region.name} tech news, tecMAMBO`,
      description: region.description,
      type: "website",
      url: regionPath(region)
    }
  };
}

const leadRegions = africaLeadRegionSlugs
  .map((slug) => africanRegions.find((region) => region.slug === slug))
  .filter((region): region is NonNullable<typeof region> => Boolean(region));

function HubTabs({ active }: { active: string }) {
  return (
    <nav className={styles.tabs} aria-label="African tech filters">
      <Link aria-current={active === "all" ? "page" : undefined} href="/africa">
        All
      </Link>
      {leadRegions.map((region) => (
        <Link aria-current={active === region.slug ? "page" : undefined} href={regionPath(region)} key={region.slug}>
          {region.name}
        </Link>
      ))}
      <Link aria-current={active === "more" ? "page" : undefined} href="/africa/more">
        More
      </Link>
    </nav>
  );
}

export default async function CountryHubPage({ params }: { params: Params }) {
  const { country } = await params;

  if (country === "more") {
    const articles = await getAfricanArticles();
    const otherRegions = africanRegions.filter((region) => !africaLeadRegionSlugs.includes(region.slug as (typeof africaLeadRegionSlugs)[number]));
    return (
      <section className={`container ${styles.page}`}>
        <header className={styles.header}>
          <p>Region index</p>
          <h1>More African tech hubs</h1>
          <span>Country pages are ready as soon as a story is tagged. tecMAMBO can add more African countries without creating a new section.</span>
        </header>
        <HubTabs active="more" />
        <section className={styles.hubTools} aria-labelledby="country-index-title">
          <div>
            <h2 id="country-index-title">All available country terms</h2>
            <p>Lead hubs sit in the main tabs. The rest stay discoverable here until coverage grows.</p>
          </div>
          <div className={styles.countryList}>
            {otherRegions.map((region) => (
              <Link href={regionPath(region)} key={region.slug}>
                {region.name}
              </Link>
            ))}
          </div>
        </section>
        <JsonLd data={collectionPageJsonLd({ name: "More African tech hubs", description: "Country hubs for African technology coverage.", path: "/africa/more", articles })} />
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Africa", path: "/africa" },
            { name: "More", path: "/africa/more" }
          ])}
        />
      </section>
    );
  }

  const region = getRegion(country);
  if (!region) notFound();
  const articles = await getArticlesForRegion(region.slug);
  const topicChips = relatedRegionTopics(articles);

  return (
    <section className={`container ${styles.page}`}>
      <header className={styles.header}>
        <p>Africa region</p>
        <h1>{region.name} tech news</h1>
        <span>{region.description}</span>
      </header>

      <HubTabs active={region.slug} />

      <section className={styles.hubTools} aria-labelledby="country-tools-title">
        <div>
          <h2 id="country-tools-title">Follow {region.name} coverage</h2>
          <p>These stories keep their normal article URLs. This page collects them by country.</p>
        </div>
        {topicChips.length ? (
          <div className={styles.topicChips}>
            {topicChips.map((topic) => (
              <Link href={`/topics/${topic.slug}`} key={topic.slug}>
                {topic.name}
              </Link>
            ))}
          </div>
        ) : null}
        <Link className={styles.feedLink} href={`${regionPath(region)}/feed.xml`}>
          {region.name} RSS
        </Link>
      </section>

      {articles.length ? (
        <div className={styles.grid}>
          {articles.map((article) => (
            <StoryCard article={article} key={article.id} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No published stories have this region tag yet.</p>
      )}

      <JsonLd data={collectionPageJsonLd({ name: `${region.name} tech news`, description: region.description, path: regionPath(region), articles })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Africa", path: "/africa" },
          { name: region.name, path: regionPath(region) }
        ])}
      />
    </section>
  );
}
