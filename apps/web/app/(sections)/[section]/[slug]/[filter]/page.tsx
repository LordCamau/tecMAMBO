import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles } from "@/lib/content";
import { filterArticlesByCanonicalTopic, wearableFilters, wearableFilterPath } from "@/lib/site-structure";
import { breadcrumbJsonLd } from "@/lib/seo";
import { StoryCard } from "@/components/cards/StoryCard";
import { JsonLd } from "@/components/seo/JsonLd";
import styles from "../page.module.css";

type Params = Promise<{ section: string; slug: string; filter: string }>;

export function generateStaticParams() {
  return wearableFilters
    .filter((filter) => filter.slug !== "wearables")
    .map((filter) => ({ section: "reviews", slug: "wearables", filter: filter.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { section, slug, filter } = await params;
  const active = wearableFilters.find((item) => item.slug === filter);
  if (section !== "reviews" || slug !== "wearables" || !active) return {};
  return {
    title: `${active.label} reviews`,
    description: active.description,
    alternates: { canonical: wearableFilterPath(active.slug) }
  };
}

export default async function WearableFilterPage({ params }: { params: Params }) {
  const { section, slug, filter } = await params;
  const active = wearableFilters.find((item) => item.slug === filter);
  if (section !== "reviews" || slug !== "wearables" || !active) notFound();
  const articles = filterArticlesByCanonicalTopic(
    (await getArticles()).filter((article) => article.format === "review"),
    active.canonicalTopic
  );

  return (
    <section className={`container ${styles.topicArchive}`}>
      <header className={styles.topicHeader}>
        <p>Reviews</p>
        <h1>{active.label}</h1>
        <span>{active.description}</span>
      </header>
      <nav className={styles.wearableTabs} aria-label="Wearables review filters">
        {wearableFilters.map((item) => (
          <Link key={item.slug} href={wearableFilterPath(item.slug)} aria-current={item.slug === active.slug ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className={styles.relatedGrid}>
        {articles.length ? articles.map((item) => <StoryCard article={item} key={item.id} />) : <p>No stories in this lane yet.</p>}
      </div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
          { name: "Wearables", path: "/reviews/wearables" },
          { name: active.label, path: wearableFilterPath(active.slug) }
        ])}
      />
    </section>
  );
}
