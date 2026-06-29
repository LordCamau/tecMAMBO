import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticlesByTag, getGlossaryTermsByTopic, getTags } from "@/lib/content";
import { StoryCard } from "@/components/cards/StoryCard";
import styles from "../../(sections)/[section]/page.module.css";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const topics = await getTags("topic");
  return topics.map((topic) => ({ slug: topic.slug }));
}

export default async function TopicPage({ params }: { params: Params }) {
  const { slug } = await params;
  const topics = await getTags("topic");
  const topic = topics.find((item) => item.slug === slug);
  if (!topic) notFound();
  const [articles, keyTerms] = await Promise.all([getArticlesByTag(slug), getGlossaryTermsByTopic(slug)]);
  return (
    <section className={`container ${styles.archive}`}>
      <header className={styles.header}>
        <p>Topic</p>
        <h1>{topic.name}</h1>
        <span>Stories, glossary entries, and explainers connected to {topic.name.toLowerCase()}.</span>
      </header>
      {keyTerms.length ? (
        <section className={styles.keyTerms} aria-labelledby="key-terms-title">
          <div>
            <p id="key-terms-title">Key terms in {topic.name}</p>
            <span>Quick definitions before the deeper reading.</span>
          </div>
          <div>
            {keyTerms.slice(0, 6).map((term) => (
              <Link href={`/glossary/${term.slug}`} key={term.slug}>
                {term.term}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      <div className={styles.grid}>
        {articles.map((article) => (
          <StoryCard article={article} key={article.id} />
        ))}
      </div>
    </section>
  );
}
