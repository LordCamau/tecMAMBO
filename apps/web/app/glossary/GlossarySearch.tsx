"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { GlossaryTerm } from "@/lib/types";
import styles from "./glossary.module.css";

const levels: Array<GlossaryTerm["difficulty"]> = ["Everyday", "Getting technical", "Deep cut"];

function topicSlug(topic: string) {
  return topic.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function firstLetter(term: string) {
  const first = term[0]?.toUpperCase() ?? "#";
  return /[A-Z0-9]/.test(first) ? first : "#";
}

export function GlossarySearch({ terms }: { terms: GlossaryTerm[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const [level, setLevel] = useState("all");
  const [suggestion, setSuggestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const topics = useMemo(
    () => Array.from(new Set(terms.flatMap((term) => term.topics))).sort((a, b) => a.localeCompare(b)),
    [terms]
  );

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    return terms.filter((term) => {
      const matchesQuery =
        !value ||
        [term.term, term.oneLiner, ...term.aliases, ...term.topics].some((field) => field.toLowerCase().includes(value));
      const matchesTopic = topic === "all" || term.topics.some((item) => topicSlug(item) === topic);
      const matchesLevel = level === "all" || term.difficulty === level;
      return matchesQuery && matchesTopic && matchesLevel;
    });
  }, [level, query, terms, topic]);

  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, GlossaryTerm[]>>((groups, term) => {
      const letter = firstLetter(term.term);
      groups[letter] = [...(groups[letter] ?? []), term];
      return groups;
    }, {});
  }, [filtered]);

  const letters = Object.keys(grouped).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const trending = [...terms].sort((a, b) => (b.trendingScore ?? 0) - (a.trendingScore ?? 0)).slice(0, 5);
  const recent = [...terms].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5);

  return (
    <div className={styles.searchBlock}>
      <div className={styles.searchPanel}>
        <label htmlFor="glossary-search">Search the glossary</label>
        <input
          id="glossary-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try eSIM, VPN, refresh rate, NFC"
          autoComplete="off"
        />
      </div>

      <div className={styles.controls} aria-label="Glossary filters">
        <div>
          <p>Topic</p>
          <div className={styles.chipRow}>
            <button type="button" aria-pressed={topic === "all"} onClick={() => setTopic("all")}>
              All
            </button>
            {topics.map((item) => (
              <button type="button" aria-pressed={topic === topicSlug(item)} onClick={() => setTopic(topicSlug(item))} key={item}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p>Difficulty</p>
          <div className={styles.chipRow}>
            <button type="button" aria-pressed={level === "all"} onClick={() => setLevel("all")}>
              All
            </button>
            {levels.map((item) => (
              <button type="button" aria-pressed={level === item} onClick={() => setLevel(item)} key={item}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <nav className={styles.azBar} aria-label="Jump to glossary letter">
        {letters.map((letter) => (
          <a href={`#letter-${letter}`} key={letter}>
            {letter}
          </a>
        ))}
      </nav>

      {filtered.length ? (
        <div className={styles.library} aria-live="polite">
          {letters.map((letter) => (
            <section className={styles.letterGroup} id={`letter-${letter}`} key={letter}>
              <h2>{letter}</h2>
              <div className={styles.termGrid}>
                {grouped[letter]!.map((term) => (
                  <Link className={styles.termCard} href={`/glossary/${term.slug}`} key={term.slug}>
                    <span>{term.term}</span>
                    <p>{term.oneLiner}</p>
                    <small>
                      {term.topics[0]} · {term.difficulty}
                    </small>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <strong>No match yet.</strong>
          <p>Try a broader word, browse by topic, or suggest it below so MAMBO can explain it next.</p>
        </div>
      )}

      <div className={styles.rails}>
        <section>
          <h2>Most looked up</h2>
          {trending.map((term) => (
            <Link href={`/glossary/${term.slug}`} key={term.slug}>
              {term.term}
            </Link>
          ))}
        </section>
        <section>
          <h2>Recently updated</h2>
          {recent.map((term) => (
            <Link href={`/glossary/${term.slug}`} key={term.slug}>
              {term.term}
            </Link>
          ))}
        </section>
        <form
          className={styles.suggest}
          onSubmit={(event) => {
            event.preventDefault();
            if (suggestion.trim()) {
              setSubmitted(true);
              setSuggestion("");
            }
          }}
        >
          <h2>Can't find a word?</h2>
          <label htmlFor="suggest-term">Ask MAMBO to explain it.</label>
          <input
            id="suggest-term"
            value={suggestion}
            onChange={(event) => {
              setSuggestion(event.target.value);
              setSubmitted(false);
            }}
            placeholder="Type the word here"
          />
          <button type="submit">Suggest term</button>
          {submitted ? <p role="status">Got it. The editors now have one more word to chase down.</p> : null}
        </form>
      </div>
    </div>
  );
}
