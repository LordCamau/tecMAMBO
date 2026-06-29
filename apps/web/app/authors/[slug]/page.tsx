import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles, getAuthor, getAuthors } from "@/lib/content";
import { StoryCard } from "@/components/cards/StoryCard";
import styles from "./page.module.css";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.map((author) => ({ slug: author.slug }));
}

export default async function AuthorPage({ params }: { params: Params }) {
  const author = await getAuthor((await params).slug);
  if (!author) notFound();
  const articles = (await getArticles()).filter((article) => article.author.slug === author.slug);
  return (
    <section className={`container ${styles.page}`}>
      <header className={styles.header}>
        <Image src={author.avatar} alt="" width={132} height={132} />
        <div>
          <p>{author.role}</p>
          <h1>{author.name}</h1>
          <span>{author.bio}</span>
          <Link className={styles.standardsLink} href="/editorial-standards">
            How tecMAMBO works
          </Link>
        </div>
      </header>
      <div className={styles.expertise}>
        {author.expertise.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className={styles.grid}>
        {articles.map((article) => (
          <StoryCard article={article} key={article.id} />
        ))}
      </div>
    </section>
  );
}
