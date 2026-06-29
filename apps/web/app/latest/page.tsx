import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/content";
import { formats } from "@/lib/formats";
import { StoryCard } from "@/components/cards/StoryCard";
import styles from "./latest.module.css";

export const metadata: Metadata = {
  title: "Latest",
  description: "The newest tecMAMBO stories, with filters for every editorial format.",
  alternates: { canonical: "/latest" }
};

export default async function LatestPage() {
  const articles = await getArticles();
  return (
    <section className={`container ${styles.page}`}>
      <header className={styles.header}>
        <p>Latest</p>
        <h1>Fresh stories, calmly sorted</h1>
        <span>Start with everything, then narrow by the kind of clarity you need.</span>
      </header>
      <nav className={styles.filters} aria-label="Format filters">
        {Object.values(formats).map((format) => (
          <Link href={format.path} key={format.path}>
            {format.shortLabel}
          </Link>
        ))}
      </nav>
      <div className={styles.grid}>
        {articles.map((article) => (
          <StoryCard article={article} key={article.id} />
        ))}
      </div>
    </section>
  );
}
