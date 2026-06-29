import { notFound } from "next/navigation";
import { getArticlesByTag, getTags } from "@/lib/content";
import { StoryCard } from "@/components/cards/StoryCard";
import styles from "../../(sections)/[section]/page.module.css";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const brands = await getTags("brand");
  return brands.map((brand) => ({ slug: brand.slug }));
}

export default async function BrandPage({ params }: { params: Params }) {
  const { slug } = await params;
  const brands = await getTags("brand");
  const brand = brands.find((item) => item.slug === slug);
  if (!brand) notFound();
  const articles = await getArticlesByTag(slug);
  return (
    <section className={`container ${styles.archive}`}>
      <header className={styles.header}>
        <p>Brand hub</p>
        <h1>{brand.name}</h1>
        <span>
          Even-handed coverage, buying context, and practical explainers involving {brand.name}. Partnership-friendly,
          reader-first.
        </span>
      </header>
      <div className={styles.grid}>
        {articles.map((article) => (
          <StoryCard article={article} key={article.id} />
        ))}
      </div>
    </section>
  );
}
