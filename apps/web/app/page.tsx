import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { articlePath, formats } from "@/lib/formats";
import { getHomeCuration, type HomeLane } from "@/lib/home-curation";
import { FormatBadge } from "@/components/signature/FormatBadge";
import { RegionList } from "@/components/signature/RegionChip";
import { StoryCard } from "@/components/cards/StoryCard";
import { NewsletterCard } from "@/components/cards/NewsletterCard";
import { PartnerCard } from "@/components/cards/PartnerCard";
import { RegionPreferencePanel } from "@/components/regions/RegionPreferencePanel";
import styles from "./page.module.css";

function Lane({ lane }: { lane: HomeLane }) {
  if (!lane.articles.length) return null;
  if (lane.layout === "feature") return <FeatureLane lane={lane} />;
  return (
    <section className={`container ${styles.lane}`}>
      <div className={styles.laneHead}>
        <div>
          <p>{lane.eyebrow}</p>
          <h2>{lane.title}</h2>
        </div>
        <Link href={lane.href}>{lane.linkLabel ?? "See all"} →</Link>
      </div>
      {lane.key === "africa" ? <RegionPreferencePanel /> : null}
      <div className={styles.cardGrid}>
        {lane.articles.map((article) => (
          <StoryCard article={article} key={article.id} />
        ))}
      </div>
    </section>
  );
}

function FeaturedArticleCard({ article, level }: { article: HomeLane["articles"][number]; level: "lead" | "second" | "small" }) {
  const href = articlePath(article.format, article.slug);
  return (
    <article className={level === "lead" ? styles.featureLead : level === "second" ? styles.featureSecond : styles.featureSmall}>
      <Link className={styles.featureImage} href={href} aria-label={article.title}>
        <Image src={article.image.src} alt={article.image.alt} fill sizes={level === "lead" ? "(min-width: 980px) 46vw, 100vw" : "(min-width: 980px) 24vw, 100vw"} />
        <span className={styles.featureBadge}>
          <FormatBadge format={article.format} />
        </span>
      </Link>
      <div className={styles.featureCopy}>
        <RegionList regions={article.regions?.slice(0, 2)} />
        <h3>
          <Link href={href}>{article.title}</Link>
        </h3>
        {level !== "small" ? <p>{article.excerpt}</p> : null}
        <div className={styles.heroMeta}>
          <span>{article.author.name}</span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </article>
  );
}

function FeatureLane({ lane }: { lane: HomeLane }) {
  const [lead, second, ...rest] = lane.articles;
  if (!lead) return null;
  return (
    <section className={`container ${styles.lane} ${styles.featureLane}`}>
      <div className={styles.laneHead}>
        <div>
          <p>{lane.eyebrow}</p>
          <h2>{lane.title}</h2>
        </div>
        <Link href={lane.href}>{lane.linkLabel ?? "See all"} →</Link>
      </div>
      {lane.key === "africa" ? <RegionPreferencePanel /> : null}
      <div className={styles.featureGrid}>
        <FeaturedArticleCard article={lead} level="lead" />
        <div className={styles.featureStack}>
          {second ? <FeaturedArticleCard article={second} level="second" /> : null}
          {rest.length ? (
            <div className={styles.featureMiniGrid}>
              {rest.map((article) => (
                <FeaturedArticleCard article={article} key={article.id} level="small" />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const curation = await getHomeCuration();
  const { hero } = curation;
  const supportingStories = curation.latestRail.slice(0, 2);
  const topStories = curation.latestRail.slice(2, 7);
  const laneByKey = new Map(curation.lanes.map((lane) => [lane.key, lane]));
  const renderLane = (key: string) => {
    const lane = laneByKey.get(key);
    return lane ? <Lane lane={lane} key={lane.key} /> : null;
  };

  return (
    <div className={styles.page}>
      <section className={styles.heroStage}>
        <div className={`container ${styles.hero}`}>
          <div className={styles.storyStack}>
            <article className={styles.heroCard}>
              <Link className={styles.heroImage} href={articlePath(hero.format, hero.slug)}>
                <Image src={hero.image.src} alt={hero.image.alt} fill priority loading="eager" sizes="(min-width: 1180px) 300px, (min-width: 780px) 44vw, 100vw" />
              </Link>
              <div className={styles.heroCopy}>
                <FormatBadge format={hero.format} />
                <h1>
                  <Link href={articlePath(hero.format, hero.slug)}>{hero.title}</Link>
                </h1>
                <p className={styles.subhead}>{hero.subhead}</p>
                <div className={styles.heroMeta}>
                  <span>{hero.author.name}</span>
                  <span>{hero.readTime}</span>
                </div>
              </div>
            </article>

            <div className={styles.supportGrid}>
              {supportingStories.map((article) => (
                <article className={styles.supportCard} key={article.id}>
                  <Link className={styles.supportImage} href={articlePath(article.format, article.slug)}>
                    <Image src={article.image.src} alt={article.image.alt} fill sizes="(min-width: 1180px) 300px, (min-width: 780px) 44vw, 100vw" />
                  </Link>
                  <div className={styles.supportBody}>
                    <FormatBadge format={article.format} />
                    <h2>
                      <Link href={articlePath(article.format, article.slug)}>{article.title}</Link>
                    </h2>
                    <div className={styles.heroMeta}>
                      <span>{article.author.name}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className={styles.latestRail} aria-labelledby="latest-rail-title">
            <div className={styles.railHead}>
              <p id="latest-rail-title">Top stories</p>
              <Link href="/latest">Latest →</Link>
            </div>
            {topStories.map((article, index) => (
              <Link className={styles.railItem} href={articlePath(article.format, article.slug)} key={article.id}>
                <span className={styles.railNumber}>{index + 1}</span>
                <span className={styles.railCopy}>
                  <small>{formats[article.format].shortLabel}</small>
                  <strong>{article.title}</strong>
                </span>
                <span className={styles.railThumb}>
                  <Image src={article.image.src} alt="" fill sizes="118px" />
                </span>
              </Link>
            ))}
          </aside>
        </div>
      </section>

      <section className={`container ${styles.threeWays}`}>
        <div className={styles.laneHead}>
          <div>
            <p>Three ways in</p>
            <h2>Choose the kind of clarity you need today</h2>
          </div>
        </div>
        <div className={styles.formatGrid}>
          {(["explainer", "real-life", "wallet-watch"] as const).map((formatKey) => {
            const format = formats[formatKey];
            return (
              <Link href={format.path} key={format.path}>
                <FormatBadge format={formatKey} />
                <strong>{format.label}</strong>
                <span>{format.description}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <Suspense>
        {renderLane("news")}
        {renderLane("smartphones")}
        {renderLane("reviews")}
      </Suspense>

      <Suspense>
        {renderLane("africa")}
      </Suspense>

      <section className={`container ${styles.teachingLane}`}>
        <div className={styles.laneHead}>
          <div>
            <p>MAMBO Explains + Glossary</p>
            <h2>Start with the words, then the idea</h2>
          </div>
          <div className={styles.doubleLink}>
            <Link href="/explainers">Explainers →</Link>
            <Link href="/glossary">Glossary →</Link>
          </div>
        </div>
        <div className={styles.teachingGrid}>
          {curation.lanes
            .find((lane) => lane.key === "explains")
            ?.articles.map((article) => <StoryCard article={article} key={article.id} />)}
          <div className={styles.glossarySpotlight}>
            {curation.glossarySpotlight.map((term) => (
              <Link href={`/glossary/${term.slug}`} key={term.slug}>
                <strong>{term.term}</strong>
                <span>{term.oneLiner}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Suspense>
        {renderLane("wallet")}
        {renderLane("business")}
      </Suspense>

      <section className={`container ${styles.promoRow}`}>
        <NewsletterCard />
        <PartnerCard />
      </section>

      <Suspense>
        {renderLane("real-life")}
        {renderLane("ai")}
        {renderLane("evergreen")}
        {renderLane("mobility")}
      </Suspense>
    </div>
  );
}
