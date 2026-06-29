"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { articlePath } from "@/lib/formats";
import type { Article, GlossaryTerm } from "@/lib/types";
import styles from "./search.module.css";

export function SearchClient({
  articles,
  terms,
  initialQuery = ""
}: {
  articles: Article[];
  terms: GlossaryTerm[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo<{ articles: Article[]; terms: GlossaryTerm[] }>(() => {
    const value = query.trim().toLowerCase();
    if (!value) return { articles: [], terms: [] };
    return {
      articles: articles.filter((article) =>
        [article.title, article.subhead, article.excerpt, ...article.tags.map((tag) => tag.name)]
          .join(" ")
          .toLowerCase()
          .includes(value)
      ),
      terms: terms.filter((term) => [term.term, term.oneLiner, ...term.topics].join(" ").toLowerCase().includes(value))
    };
  }, [articles, query, terms]);

  const hasResults = Boolean(results.articles.length || results.terms.length);

  return (
    <div className={styles.searchBox}>
      <label htmlFor="site-search">Search tecMAMBO</label>
      <input id="site-search" name="q" value={query} onChange={(event) => setQuery(event.target.value)} autoFocus />
      {query && !hasResults ? (
        <p className={styles.empty}>No match yet. Try a broader term, or browse the Glossary.</p>
      ) : null}
      {hasResults ? (
        <div className={styles.results}>
          {results.articles.map((article) => (
            <Link href={articlePath(article.format, article.slug)} key={article.id}>
              <span>Article</span>
              <strong>{article.title}</strong>
              <p>{article.subhead}</p>
            </Link>
          ))}
          {results.terms.map((term) => (
            <Link href={`/glossary/${term.slug}`} key={term.slug}>
              <span>Glossary</span>
              <strong>{term.term}</strong>
              <p>{term.oneLiner}</p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
