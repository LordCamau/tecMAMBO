import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticlesForGlossaryTerm, getGlossaryTerm, getGlossaryTerms, getRelatedGlossaryTerms } from "@/lib/content";
import { articlePath } from "@/lib/formats";
import { breadcrumbJsonLd, definedTermJsonLd, faqJsonLd } from "@/lib/seo";
import { GoDeeper } from "@/components/signature/GoDeeper";
import { WhyItMatters } from "@/components/signature/WhyItMatters";
import { JsonLd } from "@/components/seo/JsonLd";
import styles from "../glossary.module.css";

type Params = Promise<{ slug: string }>;

function topicSlug(topic: string) {
  return topic.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function generateStaticParams() {
  const terms = await getGlossaryTerms();
  return terms.map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const term = await getGlossaryTerm((await params).slug);
  if (!term) return {};
  return {
    title: `${term.term}, explained`,
    description: term.oneLiner,
    alternates: {
      canonical: `/glossary/${term.slug}`,
      types: {
        "text/markdown": `/glossary/${term.slug}.md`
      }
    }
  };
}

export default async function GlossaryTermPage({ params }: { params: Params }) {
  const terms = await getGlossaryTerms();
  const term = await getGlossaryTerm((await params).slug);
  if (!term) notFound();
  const relatedTerms = await getRelatedGlossaryTerms(term.relatedTerms);
  const confusingTerms = await getRelatedGlossaryTerms(term.notToConfuseWith ?? []);
  const articles = await getArticlesForGlossaryTerm(term.slug);
  const index = terms.findIndex((item) => item.slug === term.slug);
  const previous = terms[(index - 1 + terms.length) % terms.length]!;
  const next = terms[(index + 1) % terms.length]!;

  return (
    <article className={`readable ${styles.termPage}`}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/glossary">Glossary</Link>
        <span>/</span>
        <span>{term.term}</span>
      </nav>

      <header className={styles.termHero}>
        <div className={styles.topicRow}>
          {term.topics.map((topic) => (
            <Link href={`/glossary/topic/${topicSlug(topic)}`} key={topic}>
              {topic}
            </Link>
          ))}
          <span className={styles.pill}>{term.difficulty}</span>
        </div>
        <p className={styles.eyebrow}>Glossary</p>
        <h1>{term.term}</h1>
        {term.pronunciation ? <span>{term.pronunciation}</span> : null}
        {term.aliases.length ? <p className={styles.aliases}>Also: {term.aliases.join(", ")}</p> : null}
        <p className={styles.oneLiner}>{term.oneLiner}</p>
      </header>

      {term.analogy ? (
        <aside className={styles.analogy}>
          <strong>In one analogy</strong>
          <p>{term.analogy}</p>
        </aside>
      ) : null}

      {term.whyItMatters ? <WhyItMatters>{term.whyItMatters}</WhyItMatters> : null}

      <section className={styles.termSection} aria-labelledby="go-deeper-title">
        <h2 id="go-deeper-title" className={styles.sectionTitle}>
          Go deeper
        </h2>
        <GoDeeper intro={term.fullExplanation} specs={[]} />
      </section>

      {confusingTerms.length ? (
        <section className={styles.confusable} aria-labelledby="confusable-title">
          <h2 id="confusable-title" className={styles.sectionTitle}>
            Not to be confused with
          </h2>
          <div className={styles.relatedTerms}>
            {confusingTerms.map((item) => (
              <Link href={`/glossary/${item.slug}`} key={item.slug}>
                {item.term}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {term.faqs?.length ? (
        <section className={`${styles.termSection} ${styles.faq}`} aria-labelledby="faq-title">
          <h2 id="faq-title">FAQ</h2>
          {term.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </section>
      ) : null}

      {relatedTerms.length ? (
        <section className={styles.termSection} aria-labelledby="related-terms-title">
          <h2 id="related-terms-title">Related terms</h2>
          <div className={styles.relatedTerms}>
            {relatedTerms.map((item) => (
              <Link href={`/glossary/${item.slug}`} key={item.slug}>
                {item.term}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className={`${styles.termSection} ${styles.appearsIn}`} aria-labelledby="appears-title">
        <h2 id="appears-title">Appears in these stories</h2>
        {articles.length ? (
          <div className={styles.appearsGrid}>
            {articles.map((article) => (
              <Link href={articlePath(article.format, article.slug)} key={article.id}>
                {article.title}
              </Link>
            ))}
          </div>
        ) : (
          <p>This term is ready for future stories. The glossary gets there before the jargon does.</p>
        )}
      </section>

      <section className={styles.askMambo}>
        <h2>Still fuzzy? Ask MAMBO</h2>
        <p>Send us the bit that still feels unclear and we may turn it into a sharper explanation.</p>
        <div className={styles.pageActions}>
          <Link href="/contact">Ask a question</Link>
          <Link href={`/glossary/${term.slug}.md`}>Markdown version</Link>
        </div>
      </section>

      {term.sources?.length ? (
        <section className={styles.sourceList} aria-labelledby="sources-title">
          <h2 id="sources-title">Sources</h2>
          {term.sources.map((source) => (
            <a href={source.url} key={source.url} rel="nofollow">
              {source.label}
            </a>
          ))}
        </section>
      ) : null}

      <nav className={styles.pageActions} aria-label="Glossary navigation">
        <Link href={`/glossary/${previous.slug}`}>Previous: {previous.term}</Link>
        <Link href="/glossary">Back to the Glossary</Link>
        <Link href={`/glossary/${next.slug}`}>Next: {next.term}</Link>
      </nav>

      <p className={styles.metaLine}>Updated {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(term.updatedAt))}</p>

      <JsonLd data={definedTermJsonLd(term)} />
      {term.faqs?.length ? <JsonLd data={faqJsonLd(term.faqs)} /> : null}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Glossary", path: "/glossary" },
          { name: term.topics[0] ?? "Terms", path: `/glossary/topic/${topicSlug(term.topics[0] ?? "terms")}` },
          { name: term.term, path: `/glossary/${term.slug}` }
        ])}
      />
    </article>
  );
}
