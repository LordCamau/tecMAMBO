import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/lib/content";
import { articlePath, formats } from "@/lib/formats";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found, tecMAMBO",
  robots: {
    index: false,
    follow: false
  }
};

const recoveryLinks = [
  { href: "/", label: "Home" },
  { href: "/latest", label: "Latest" },
  { href: "/explainers", label: "Explainers" },
  { href: "/reviews", label: "Reviews" },
  { href: "/wallet-watch", label: "Wallet Watch" },
  { href: "/glossary", label: "Glossary" }
];

function NotFoundIllustration() {
  return (
    <svg className={styles.illustration} viewBox="0 0 420 320" role="img" aria-labelledby="not-found-art-title">
      <title id="not-found-art-title">A missing page sign with the tecMAMBO triangular A motif</title>
      <rect x="48" y="60" width="324" height="208" rx="26" className={styles.panelShape} />
      <path d="M112 240 198 82h52l-64 118h76l21 40H112Z" className={styles.markShape} />
      <path d="m262 104 58 136h-48l-31-78 21-58Z" className={styles.markAccent} />
      <circle cx="96" cy="106" r="12" className={styles.dotOne} />
      <circle cx="324" cy="218" r="10" className={styles.dotTwo} />
      <path d="M112 138h58M288 138h38M112 170h44M282 170h44" className={styles.lineShape} />
      <path d="M176 62c22-24 48-28 78-10" className={styles.signalShape} />
    </svg>
  );
}

export default async function NotFound() {
  const latestStories = (await getArticles()).slice(0, 3);

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="not-found-heading">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Missing page</p>
          <h1 id="not-found-heading">404. The one thing on tecMAMBO we can&apos;t explain.</h1>
          <p className={styles.subhead}>
            The page you were after has moved, retired, or never existed. That part is on us, not you. Let&apos;s get
            you back to something that actually makes sense.
          </p>

          <form className={styles.search} action="/search">
            <label htmlFor="not-found-search">Search for what you were after</label>
            <div className={styles.searchRow}>
              <input id="not-found-search" name="q" type="search" placeholder="Try battery, VPN, phone reviews" />
              <button type="submit">Search</button>
            </div>
          </form>

          <nav className={styles.recovery} aria-label="Useful places to go">
            {recoveryLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.aside}>
          <NotFoundIllustration />
          <article className={styles.glossaryCard} aria-labelledby="glossary-404-title">
            <p>Glossary entry</p>
            <div className={styles.termLine}>
              <h2 id="glossary-404-title">404</h2>
              <span>four-oh-four</span>
            </div>
            <p>
              The internet&apos;s polite way of saying &quot;that page isn&apos;t here.&quot; In plain English: you
              clicked something, and the thing it pointed to has moved or vanished. Not your fault.
            </p>
            <Link href="/glossary">Liked that? We explain the rest of tech the same way.</Link>
          </article>
        </div>
      </section>

      {latestStories.length ? (
        <section className={styles.latest} aria-labelledby="latest-stories-heading">
          <div className={styles.latestHeader}>
            <p>Fresh paths</p>
            <h2 id="latest-stories-heading">Latest stories</h2>
          </div>
          <div className={styles.storyGrid}>
            {latestStories.map((article) => (
              <Link className={styles.storyCard} href={articlePath(article.format, article.slug)} key={article.id}>
                <Image src={article.image.src} alt="" width={320} height={200} sizes="(max-width: 760px) 100vw, 33vw" />
                <span>{formats[article.format].shortLabel}</span>
                <strong>{article.title}</strong>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
