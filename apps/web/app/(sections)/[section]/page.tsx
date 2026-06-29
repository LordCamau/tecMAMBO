import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formats } from "@/lib/formats";
import { getArticlesByFormat } from "@/lib/content";
import type { Format } from "@/lib/types";
import { sectionFormatMap, topicArchives } from "@/lib/site-structure";
import { StoryCard } from "@/components/cards/StoryCard";
import styles from "./page.module.css";

type Params = Promise<{ section: string }>;

function formatFromSection(section: string): Format | null {
  return sectionFormatMap[section] ?? null;
}

export function generateStaticParams() {
  return Object.values(formats).map((format) => ({ section: format.path.slice(1) }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const formatKey = formatFromSection((await params).section);
  if (!formatKey) return {};
  const format = formats[formatKey];
  return {
    title: format.section,
    description: format.description,
    alternates: { canonical: format.path }
  };
}

export default async function SectionPage({ params }: { params: Params }) {
  const { section } = await params;
  const formatKey = formatFromSection(section);
  if (!formatKey) notFound();
  const format = formats[formatKey];
  const articles = await getArticlesByFormat(formatKey);
  return (
    <section className={`container ${styles.archive}`}>
      <header className={styles.header}>
        <p>{format.label}</p>
        <h1>{format.section}</h1>
        <span>{format.description}</span>
      </header>
      {topicArchives[section]?.length ? (
        <nav className={styles.topicTabs} aria-label={`${format.section} topics`}>
          {topicArchives[section]?.map((topic) => (
            <a href={`${format.path}/${topic.slug}`} key={topic.slug}>
              {topic.label}
            </a>
          ))}
        </nav>
      ) : null}
      <div className={styles.grid}>
        {articles.map((article) => (
          <StoryCard article={article} key={article.id} />
        ))}
      </div>
      <div className={styles.seoCopy}>
        tecMAMBO section archives are built as collection pages with stable links, plain descriptions, and room for
        editorial picks as the newsroom grows.
      </div>
    </section>
  );
}
