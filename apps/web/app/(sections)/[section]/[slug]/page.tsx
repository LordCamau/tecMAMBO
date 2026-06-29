import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import type { GlossaryTerm } from "@/lib/types";
import { formats, articlePath } from "@/lib/formats";
import { getArticleBySlug, getArticles, getGlossaryTerms, getRelatedArticles } from "@/lib/content";
import { getCmsArticleBySlug } from "@/lib/cms/source";
import { articleJsonLd, breadcrumbJsonLd, dealProductJsonLd, faqJsonLd, itemListJsonLd } from "@/lib/seo";
import { renderGlossaryText, type GlossaryLinkState } from "@/lib/glossary-linking";
import { filterArticlesByCanonicalTopic, getTopicArchive, sectionFormatMap } from "@/lib/site-structure";
import { FormatBadge } from "@/components/signature/FormatBadge";
import { GoDeeper } from "@/components/signature/GoDeeper";
import { RegionList } from "@/components/signature/RegionChip";
import { TagList } from "@/components/signature/TagChip";
import { WhyItMatters } from "@/components/signature/WhyItMatters";
import { NewsletterCard } from "@/components/cards/NewsletterCard";
import { StoryCard } from "@/components/cards/StoryCard";
import { AdSlot } from "@/components/ads/AdSlot";
import { JsonLd } from "@/components/seo/JsonLd";
import styles from "./page.module.css";

type Params = Promise<{ section: string; slug: string }>;

export const dynamicParams = true;
export const revalidate = 300;

function ArticleBodyBlock({
  paragraph,
  glossaryTerms,
  glossaryState
}: {
  paragraph: string;
  glossaryTerms: GlossaryTerm[];
  glossaryState: GlossaryLinkState;
}) {
  if (paragraph.startsWith("## ")) {
    return <h2>{paragraph.slice(3)}</h2>;
  }
  if (paragraph.startsWith("### ")) {
    return <h3>{paragraph.slice(4)}</h3>;
  }
  return <p>{renderGlossaryText(paragraph, glossaryTerms, glossaryState)}</p>;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ section: formats[article.format].path.slice(1), slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { section, slug } = await params;
  const topic = getTopicArchive(section, slug);
  if (topic) {
    return {
      title: `${topic.label} ${sectionFormatMap[section] ? formats[sectionFormatMap[section]].section : ""}`,
      description: topic.description,
      alternates: { canonical: `/${section}/${slug}` }
    };
  }
  const { isEnabled: previewEnabled } = await draftMode();
  const article = previewEnabled ? await getCmsArticleBySlug(slug, true) : await getArticleBySlug(slug);
  if (!article || formats[article.format].path.slice(1) !== section) return {};
  const path = articlePath(article.format, article.slug);
  const title = article.seo?.title ?? article.title;
  const description = article.seo?.description ?? article.subhead;
  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: {
        "text/markdown": `${path}.md`
      }
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: path,
      images: [{ url: article.image.src, alt: article.image.alt }],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      section: formats[article.format].section,
      tags: article.tags.map((tag) => tag.name)
    }
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { section, slug } = await params;
  const topic = getTopicArchive(section, slug);
  if (topic) {
    const formatKey = sectionFormatMap[section];
    if (!formatKey) notFound();
    const format = formats[formatKey];
    const articles = filterArticlesByCanonicalTopic(
      (await getArticles()).filter((article) => article.format === formatKey),
      topic.canonicalTopic
    );
    return (
      <section className={`container ${styles.topicArchive}`}>
        <header className={styles.topicHeader}>
          <p>{format.section}</p>
          <h1>{topic.label}</h1>
          <span>{topic.description}</span>
        </header>
        {section === "reviews" && slug === "wearables" ? (
          <nav className={styles.wearableTabs} aria-label="Wearables review filters">
            <Link aria-current="page" href="/reviews/wearables">
              All
            </Link>
            <Link href="/reviews/wearables/headphones">Headphones</Link>
            <Link href="/reviews/wearables/smart-watches">Smart Watches</Link>
            <Link href="/reviews/wearables/vr-ar">VR & AR</Link>
          </nav>
        ) : null}
        <div className={styles.relatedGrid}>
          {articles.length ? articles.map((item) => <StoryCard article={item} key={item.id} />) : <p>No stories in this lane yet.</p>}
        </div>
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: format.section, path: format.path },
            { name: topic.label, path: `/${section}/${slug}` }
          ])}
        />
      </section>
    );
  }
  const article = await getArticleBySlug(slug);
  if (!article || formats[article.format].path.slice(1) !== section) notFound();
  const [related, glossaryTerms] = await Promise.all([getRelatedArticles(article), getGlossaryTerms()]);
  const format = formats[article.format];
  const glossaryState: GlossaryLinkState = { seen: new Set(), count: 0, max: 12 };

  return (
    <article className={styles.article}>
      <header className={`readable ${styles.header}`}>
        <div className={styles.kickerRow}>
          <FormatBadge format={article.format} />
          <Link href={format.path}>{format.section}</Link>
        </div>
        <RegionList regions={article.regions} />
        <TagList tags={article.tags} />
        <h1>{article.title}</h1>
        <p className={styles.subhead}>{article.subhead}</p>
        <div className={styles.byline}>
          <Link href={`/authors/${article.author.slug}`}>{article.author.name}</Link>
          <span>Updated {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(article.updatedAt))}</span>
          <span>{article.readTime}</span>
          <Link href="/editorial-standards">How we work</Link>
        </div>
        <WhyItMatters>{article.whyItMatters}</WhyItMatters>
      </header>

      <figure className={styles.leadImage}>
        <Image src={article.image.src} alt={article.image.alt} fill priority sizes="(min-width: 920px) 90vw, 100vw" />
        <figcaption>{article.image.credit}</figcaption>
      </figure>

      <div className={`readable ${styles.body}`}>
        {article.sponsored ? <p className={styles.disclosure}>Sponsored</p> : null}
        {article.format === "wallet-watch" ? (
          <p className={styles.affiliateDisclosure}>
            Wallet Watch may include affiliate links. Prices are manually checked by editors and can change before checkout.
          </p>
        ) : null}
        {article.deal ? (
          <section className={styles.dealBox} aria-labelledby="deal-title">
            <div>
              <p id="deal-title">Editor-verified deal</p>
              <h2>{article.deal.productName}</h2>
              <span>
                {article.deal.currency} {article.deal.priceCurrent.toLocaleString("en-KE")}
              </span>
              {article.deal.priceWas ? (
                <del>
                  {article.deal.currency} {article.deal.priceWas.toLocaleString("en-KE")}
                </del>
              ) : null}
              {article.deal.expiry ? <small>{article.deal.expiry}</small> : null}
            </div>
            <a href={article.deal.affiliateUrl} rel="sponsored nofollow" target="_blank">
              Check retailer
            </a>
          </section>
        ) : null}
        {article.verdict ? (
          <section className={styles.verdict} aria-labelledby="verdict-title">
            <p className={styles.score}>{article.verdict.score}</p>
            <div>
              <h2 id="verdict-title">Simple verdict</h2>
              <p>{article.verdict.summary}</p>
              <div className={styles.proCon}>
                <ul>
                  {article.verdict.pros.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ul>
                  {article.verdict.cons.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null}
        {article.body.map((paragraph) => (
          <ArticleBodyBlock paragraph={paragraph} glossaryTerms={glossaryTerms} glossaryState={glossaryState} key={paragraph} />
        ))}
        {article.goDeeper ? <GoDeeper intro={article.goDeeper.intro} specs={article.goDeeper.specs} /> : null}
        {article.faq?.length ? (
          <section className={styles.faq} aria-labelledby="article-faq-title">
            <h2 id="article-faq-title">FAQ</h2>
            {article.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </section>
        ) : null}
        {article.closingLine ? <p className={styles.closingLine}>{article.closingLine}</p> : null}
        <TagList tags={article.tags} />
        <section className={styles.ask}>
          <h2>Ask MAMBO</h2>
          <p>Have a plain-English question about this topic? Send it in and we may answer it in a future guide.</p>
          <Link href="/contact">Ask a question</Link>
        </section>
        <AdSlot />
      </div>

      <section className={`container ${styles.related}`} aria-labelledby="related-title">
        <h2 id="related-title">Related reading</h2>
        <div className={styles.relatedGrid}>
          {related.map((item) => (
            <StoryCard article={item} key={item.id} />
          ))}
        </div>
      </section>

      <div className={`container ${styles.newsletter}`}>
        <NewsletterCard />
      </div>

      <JsonLd data={articleJsonLd(article)} />
      {dealProductJsonLd(article) ? <JsonLd data={dealProductJsonLd(article)!} /> : null}
      {article.faq?.length ? <JsonLd data={faqJsonLd(article.faq)} /> : null}
      {itemListJsonLd(article) ? <JsonLd data={itemListJsonLd(article)!} /> : null}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: format.section, path: format.path },
          { name: article.title, path: articlePath(article.format, article.slug) }
        ])}
      />
    </article>
  );
}
