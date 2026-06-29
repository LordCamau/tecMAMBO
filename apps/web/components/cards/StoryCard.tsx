import Image from "next/image";
import Link from "next/link";
import { articlePath } from "@/lib/formats";
import type { Article } from "@/lib/types";
import { FormatBadge } from "@/components/signature/FormatBadge";
import { RegionList } from "@/components/signature/RegionChip";
import styles from "./StoryCard.module.css";

export function StoryCard({ article, priority = false }: { article: Article; priority?: boolean }) {
  return (
    <article className={styles.card}>
      <Link href={articlePath(article.format, article.slug)} className={styles.media} aria-label={article.title}>
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes="(min-width: 960px) 33vw, 100vw"
          priority={priority}
        />
        <span className={styles.badge}>
          <FormatBadge format={article.format} />
        </span>
      </Link>
      <div className={styles.body}>
        <RegionList regions={article.regions?.slice(0, 2)} />
        <h3>
          <Link href={articlePath(article.format, article.slug)}>{article.title}</Link>
        </h3>
        <p>{article.excerpt}</p>
        {article.deal ? (
          <div className={styles.dealPrice}>
            <span>{article.deal.currency} {article.deal.priceCurrent.toLocaleString("en-KE")}</span>
            {article.deal.priceWas ? <del>{article.deal.currency} {article.deal.priceWas.toLocaleString("en-KE")}</del> : null}
          </div>
        ) : null}
        <div className={styles.meta}>
          <span>{article.author.name}</span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </article>
  );
}
