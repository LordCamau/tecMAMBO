import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FormatBadge } from "@/components/signature/FormatBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import { getArticles, getAuthors, getGlossaryTerms } from "@/lib/content";
import { aboutPageJsonLd, organizationJsonLd, personJsonLd } from "@/lib/seo";
import type { Format } from "@/lib/types";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About tecMAMBO - Made to be understood",
  description:
    "We're the tech publication for everyone the other tech sites forgot to write for, without boring the people who already love this stuff.",
  alternates: {
    canonical: "/about",
    types: {
      "text/markdown": "/about.md"
    }
  },
  openGraph: {
    title: "About tecMAMBO - Made to be understood",
    description:
      "We're the tech publication for everyone the other tech sites forgot to write for, without boring the people who already love this stuff.",
    url: "/about",
    images: [{ url: "/brand/tecMAMBO-favicon.jpg", alt: "tecMAMBO" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "About tecMAMBO - Made to be understood",
    description:
      "We're the tech publication for everyone the other tech sites forgot to write for, without boring the people who already love this stuff."
  }
};

const formats: Array<{ key: Format; description: string }> = [
  { key: "explainer", description: "Jargon-busting, how-it-works pieces." },
  { key: "review", description: "The verdict first; the full spec sheet a tap away." },
  { key: "wallet-watch", description: "Honest budget picks and best under price guides." },
  { key: "real-life", description: "We test the claims against an actual Nairobi commute." },
  { key: "news", description: "The news, translated into what it changes for you." },
  { key: "opinion", description: "Clear, accountable opinion." }
];

const formatPaths: Record<Format, string> = {
  explainer: "/explainers",
  review: "/reviews",
  "wallet-watch": "/wallet-watch",
  "real-life": "/real-life",
  news: "/news",
  opinion: "/opinion",
  business: "/business"
};

const values = [
  "Plain English first. Depth is optional, never required.",
  "Clear, not dumbed down. We respect your intelligence and your time.",
  "Independent and honest. We'll tell you when something isn't worth your money.",
  "Show the workings. Real testing, named sources, visible corrections.",
  "Warmth over jargon. The friend who explains, not the expert who flexes.",
  "Rooted here, useful everywhere. Built in Kenya, written for real life."
];

export default async function AboutPage() {
  const [articles, terms, authors] = await Promise.all([getArticles(), getGlossaryTerms(), getAuthors()]);
  const founder = authors.find((author) => author.slug === "tim-humphreys") ?? authors[0]!;
  const explainerReviewCount = articles.filter((article) => article.format === "explainer" || article.format === "review").length;
  const otherAuthors = authors.filter((author) => author.slug !== founder.slug);

  return (
    <article className={styles.page}>
      <section className={`container ${styles.hero}`}>
        <p>ABOUT tecMAMBO</p>
        <h1>Tech, made to be understood.</h1>
        <span>
          We're the tech publication for everyone the other tech sites forgot to write for, without boring the people who already love this stuff.
        </span>
      </section>

      <section className={`readable ${styles.section}`}>
        <h2>Why we exist</h2>
        <p>
          Most tech writing assumes you already speak tech. It tosses around "ProMotion," "LTPO," and "tensor cores" like everyone got the
          memo. tecMAMBO started because too many smart, curious people, the ones spending real money on these devices, were quietly left
          out of the conversation.
        </p>
        <p>
          Founded in <strong>2016 by Tim Humphreys in Nairobi</strong>, tecMAMBO set out to be the <strong>translation layer</strong>:
          plain English first, the deep technical detail there when you want it, out of your way when you don't.
        </p>
        <p>
          The bet was simple, and a little contrarian: <em>you can make technology genuinely clear without dumbing it down.</em> Clarity
          isn't the absence of depth. It's depth you can actually follow.
        </p>
      </section>

      <section className={`readable ${styles.section}`}>
        <h2>Why "tecMAMBO"?</h2>
        <p>
          <em>Mambo</em> is Swahili for <strong>things, matters, what's going on</strong>, and "Mambo?" is how friends greet each other
          across East Africa: <em>"what's up?"</em> tecMAMBO is exactly that, what's up in tech, explained the way a good friend would
          explain it. <strong>Tech + mambo.</strong> Warm, not stiff. Rooted right here, useful everywhere.
        </p>
      </section>

      <section className={`container ${styles.formats}`}>
        <div className={styles.sectionHead}>
          <h2>How we make tech make sense</h2>
          <p>
            Every story works on two levels at once: clear for someone who's never heard the jargon, and substantial for someone who
            reviews phones for fun. That's the whole craft. We tell it in a few honest formats:
          </p>
        </div>
        <div className={styles.formatGrid}>
          {formats.map((format) => (
            <Link href={formatPaths[format.key]} key={format.key}>
              <FormatBadge format={format.key} />
              <span>{format.description}</span>
            </Link>
          ))}
        </div>
        <p className={styles.closingLine}>
          And the <Link href="/glossary">Glossary</Link>, a plain-English dictionary wired into every article, so a hard word is never a
          dead end.
        </p>
      </section>

      <section className={`readable ${styles.section}`}>
        <h2>Where we're headed</h2>
        <p>
          A world where understanding technology isn't a privilege reserved for the already-fluent. We want tecMAMBO to be the place
          anyone, from a first-time smartphone buyer in Kisumu to a developer in Berlin, comes to <em>actually understand</em> the tech
          shaping their life, and leaves feeling smarter and calmer, not smaller.
        </p>
      </section>

      <section className={`readable ${styles.section}`}>
        <h2>What we're building</h2>
        <p>
          To become <strong>Africa's most trusted technology publication, and one of the clearest anywhere</strong>: the reference people
          <em> and</em> the AI tools they ask both turn to first. We measure success not in pageviews, but in how many people made a
          better, more confident decision because of something they read here.
        </p>
      </section>

      <section className={`container ${styles.values}`}>
        <div className={styles.sectionHead}>
          <h2>What we stand for</h2>
        </div>
        <div className={styles.valueGrid}>
          {values.map((value) => {
            const [title, body] = value.split(". ");
            return (
              <div key={value}>
                <strong>{title}.</strong>
                <p>{body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className={`readable ${styles.trustBlock}`}>
        <h2>How we keep the lights on, and stay honest</h2>
        <p>
          tecMAMBO is funded by advertising, affiliate links, and clearly-labelled partner content. Three rules keep that clean: we{" "}
          <strong>label anything sponsored, plainly</strong>; <strong>affiliate links never change a verdict</strong>; and{" "}
          <strong>reviews are written before, and independently of, any commercial conversation.</strong> If we recommend it, it earned the
          spot.
        </p>
        <Link href="/editorial-standards">Read our full editorial standards →</Link>
      </section>

      <section className={`container ${styles.factStrip}`} aria-label="tecMAMBO in brief">
        <span>Founded 2016</span>
        <span>Based in Nairobi, Kenya</span>
        <span>{explainerReviewCount} explainers & reviews</span>
        <span>{terms.length} plain-English glossary terms</span>
        <span>Free to read</span>
      </section>

      <section className={`container ${styles.team}`}>
        <div className={styles.sectionHead}>
          <h2>The people behind it</h2>
        </div>
        <div className={styles.teamGrid}>
          <article className={styles.founderCard}>
            <Image src={founder.avatar} alt="Tim Humphreys" width={112} height={112} />
            <div>
              <p>Founder & Editor</p>
              <h3>Tim Humphreys</h3>
              <span>
                Tim founded tecMAMBO in 2016 on a stubborn belief that clarity is a feature, not a compromise. He still edits, still writes,
                and still tests phones on matatus.
              </span>
              <Link href="/authors/tim-humphreys">Read Tim's work →</Link>
            </div>
          </article>
          {otherAuthors.map((author) => (
            <article className={styles.personCard} key={author.slug}>
              <Image src={author.avatar} alt={author.name} width={72} height={72} />
              <h3>{author.name}</h3>
              <p>{author.role}</p>
              <span>{author.bio}</span>
              <Link href={`/authors/${author.slug}`}>Read work →</Link>
            </article>
          ))}
          {!otherAuthors.length ? (
            <article className={styles.growingCard}>
              <h3>We're growing</h3>
              <p>tecMAMBO will add more real editors, writers, and contributors here as the team grows.</p>
              <Link href="/contact">Join us →</Link>
            </article>
          ) : null}
        </div>
      </section>

      <section className={`container ${styles.cta}`}>
        <h2>Say mambo</h2>
        <p>Got a question, a tip, a word you want explained, or a partnership in mind? We'd love to hear from you.</p>
        <div>
          <Link href="/contact">Contact us</Link>
          <Link href="/glossary#suggest-term">Ask MAMBO</Link>
          <Link href="/advertise">Advertise with us</Link>
          <Link href="/newsletter">Get the newsletter</Link>
        </div>
      </section>

      <JsonLd data={aboutPageJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={personJsonLd()} />
    </article>
  );
}
