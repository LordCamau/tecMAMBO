import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGlossaryTerms, getGlossaryTermsByTopic } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import styles from "../../glossary.module.css";

type Params = Promise<{ topic: string }>;

function topicSlug(topic: string) {
  return topic.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function generateStaticParams() {
  const terms = await getGlossaryTerms();
  const topics = Array.from(new Set(terms.flatMap((term) => term.topics)));
  return topics.map((topic) => ({ topic: topicSlug(topic) }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const topic = (await params).topic;
  return {
    title: `${topic.replace(/-/g, " ")} glossary terms`,
    description: "Plain-English technology definitions grouped by topic.",
    alternates: { canonical: `/glossary/topic/${topic}` }
  };
}

export default async function GlossaryTopicPage({ params }: { params: Params }) {
  const topic = (await params).topic;
  const terms = await getGlossaryTermsByTopic(topic);
  if (!terms.length) notFound();
  const label = terms[0]!.topics.find((item) => topicSlug(item) === topic) ?? topic.replace(/-/g, " ");

  return (
    <section className={`container ${styles.page}`}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/glossary">Glossary</Link>
        <span>/</span>
        <span>{label}</span>
      </nav>
      <header className={styles.header}>
        <p>Glossary topic</p>
        <h1>{label}</h1>
        <span>Key terms that make this topic easier to read, compare, and explain.</span>
      </header>
      <div className={styles.termGrid}>
        {terms.map((term) => (
          <Link className={styles.termCard} href={`/glossary/${term.slug}`} key={term.slug}>
            <span>{term.term}</span>
            <p>{term.oneLiner}</p>
            <small>{term.difficulty}</small>
          </Link>
        ))}
      </div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Glossary", path: "/glossary" },
          { name: label, path: `/glossary/topic/${topic}` }
        ])}
      />
    </section>
  );
}
