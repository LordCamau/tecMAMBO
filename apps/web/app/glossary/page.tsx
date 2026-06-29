import type { Metadata } from "next";
import Link from "next/link";
import { getGlossaryTerms } from "@/lib/content";
import { definedTermSetJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { GlossarySearch } from "./GlossarySearch";
import styles from "./glossary.module.css";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Plain-English definitions for the tech terms that make the internet feel harder than it is.",
  alternates: { canonical: "/glossary" }
};

export default async function GlossaryPage() {
  const terms = await getGlossaryTerms();
  const termOfDay = terms.find((term) => term.termOfDay) ?? terms.find((term) => term.featured) ?? terms[0]!;
  return (
    <>
      <section className={`container ${styles.page}`}>
        <header className={styles.header}>
          <p>Glossary</p>
          <h1>Start with the words that make tech feel harder than it is</h1>
          <span>Plain-English definitions first, deeper explanations when they help.</span>
        </header>
        <Link className={styles.termOfDay} href={`/glossary/${termOfDay.slug}`}>
          <small>Term of the day</small>
          <strong>{termOfDay.term}</strong>
          <span>{termOfDay.oneLiner}</span>
        </Link>
        <GlossarySearch terms={terms} />
      </section>
      <JsonLd data={definedTermSetJsonLd(terms)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Glossary", path: "/glossary" }
        ])}
      />
    </>
  );
}
