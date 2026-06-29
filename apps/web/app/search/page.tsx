import { getArticles, getGlossaryTerms } from "@/lib/content";
import { SearchClient } from "./SearchClient";
import styles from "./search.module.css";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const [articles, terms] = await Promise.all([getArticles(), getGlossaryTerms()]);
  return (
    <section className={`container ${styles.page}`}>
      <header className={styles.header}>
        <p>Search</p>
        <h1>Find the plain-English version</h1>
      </header>
      <SearchClient articles={articles} terms={terms} initialQuery={q} />
    </section>
  );
}
