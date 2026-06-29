import Link from "next/link";
import type { ReactNode } from "react";
import type { LegalPage, LegalSegment } from "@/lib/legal-pages";
import styles from "./LegalPageTemplate.module.css";

function Segment({ segment }: { segment: LegalSegment }) {
  if (typeof segment === "string") return segment;
  return <Link href={segment.href}>{segment.text}</Link>;
}

function Paragraph({ segments }: { segments: LegalSegment[] }) {
  return (
    <p>
      {segments.map((segment, index) => (
        <Segment segment={segment} key={index} />
      ))}
    </p>
  );
}

export function LegalPageTemplate({ page, children }: { page: LegalPage; children?: ReactNode }) {
  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>{page.eyebrow ?? "Legal"}</p>
        <h1>{page.title}</h1>
        <p className={styles.updated}>Last updated: {page.lastUpdated}</p>
        <section className={styles.summary} aria-labelledby="terms-summary-title">
          <p id="terms-summary-title">{page.summaryLabel}</p>
          <Paragraph segments={page.summary} />
        </section>
      </header>

      <div className={styles.layout}>
        <aside className={styles.toc} aria-label={`${page.title} table of contents`}>
          <details className={styles.mobileToc}>
            <summary>Contents</summary>
            <nav>
              {page.sections.map((section) => (
                <Link href={`#${section.id}`} key={section.id}>
                  {section.title}
                </Link>
              ))}
            </nav>
          </details>
          <nav className={styles.desktopToc}>
            <p>Contents</p>
            {page.sections.map((section) => (
              <Link href={`#${section.id}`} key={section.id}>
                {section.title}
              </Link>
            ))}
          </nav>
        </aside>

        <div className={styles.content}>
          <section className={styles.placeholderBox} aria-labelledby="legal-review-title">
            <h2 id="legal-review-title">{page.placeholderTitle ?? "Complete before publishing"}</h2>
            <p>{page.placeholderIntro ?? "This template needs legal review and these CMS fields completed before launch."}</p>
            <ul>
              {page.placeholders.map((placeholder) => (
                <li key={placeholder}>{placeholder}</li>
              ))}
            </ul>
          </section>

          {children}

          {page.sections.map((section) => (
            <section className={styles.section} id={section.id} key={section.id}>
              <h2>
                <a href={`#${section.id}`} aria-label={`Link to ${section.title}`}>
                  {section.title}
                </a>
              </h2>
              {section.paragraphs.map((paragraph, index) => (
                <Paragraph segments={paragraph} key={index} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
