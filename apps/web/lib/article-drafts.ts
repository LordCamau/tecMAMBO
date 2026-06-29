import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Article, Author, Format, Tag } from "@/lib/types";
import { stripEditorialNotes } from "@/lib/content-guard";

const draftPath = resolve(process.cwd(), "../../content/articles/tecmambo-20-article-drafts.md");

const formatBySection: Record<string, Format> = {
  Explainers: "explainer",
  Reviews: "review",
  "Wallet Watch": "wallet-watch",
  "Real Life": "real-life",
  News: "news",
  Opinion: "opinion"
};

const topicNameAliases: Record<string, string> = {
  phones: "smartphones",
  laptops: "computing",
  "apps & software": "apps",
  "smart home": "smart homes"
};

const imagePools: Record<string, Article["image"][]> = {
  smartphones: [
    {
      src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1800&auto=format&fit=crop",
      alt: "Modern smartphones arranged on a table",
      credit: "Unsplash"
    },
    {
      src: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1800&auto=format&fit=crop",
      alt: "A smartphone screen held in one hand",
      credit: "Unsplash"
    },
    {
      src: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1800&auto=format&fit=crop",
      alt: "A phone camera module in close-up",
      credit: "Unsplash"
    }
  ],
  audio: [
    {
      src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1800&auto=format&fit=crop",
      alt: "Headphones on a clean surface",
      credit: "Unsplash"
    },
    {
      src: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=1800&auto=format&fit=crop",
      alt: "Wireless earbuds in a charging case",
      credit: "Unsplash"
    }
  ],
  computing: [
    {
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1800&auto=format&fit=crop",
      alt: "Laptop on a desk with notes and code",
      credit: "Unsplash"
    },
    {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1800&auto=format&fit=crop",
      alt: "A laptop and phone on a tidy desk",
      credit: "Unsplash"
    }
  ],
  apps: [
    {
      src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1800&auto=format&fit=crop",
      alt: "App icons on a smartphone screen",
      credit: "Unsplash"
    },
    {
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1800&auto=format&fit=crop",
      alt: "A person using apps on a phone",
      credit: "Unsplash"
    }
  ],
  connectivity: [
    {
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1800&auto=format&fit=crop",
      alt: "Network hardware with connected cables",
      credit: "Unsplash"
    },
    {
      src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1800&auto=format&fit=crop",
      alt: "Laptop and phone connected for work",
      credit: "Unsplash"
    }
  ],
  "power-batteries": [
    {
      src: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=1800&auto=format&fit=crop",
      alt: "A phone charging from a compact power bank",
      credit: "Unsplash"
    },
    {
      src: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1800&auto=format&fit=crop",
      alt: "A smartphone connected to a charging cable",
      credit: "Unsplash"
    }
  ],
  fallback: [
    {
      src: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1800&auto=format&fit=crop",
      alt: "A phone on top of newspapers",
      credit: "Unsplash"
    },
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1800&auto=format&fit=crop",
      alt: "People using devices together in a real work setting",
      credit: "Unsplash"
    }
  ]
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/ksh/g, "ksh")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function readDraftFile() {
  if (!existsSync(draftPath)) {
    throw new Error(`Article draft file not found at ${draftPath}`);
  }
  return readFileSync(draftPath, "utf8");
}

function metadataValue(block: string, label: string) {
  const match = block.match(new RegExp(`^${label}:\\s*(.+)$`, "m"));
  return match?.[1]?.replace(/\s{2,}$/g, "").trim() ?? "";
}

function normalizeLine(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function firstSentence(value: string) {
  return normalizeLine(value).match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim() ?? normalizeLine(value);
}

function tagLookup(tags: Tag[]) {
  return new Map(tags.map((tag) => [tag.name.toLowerCase(), tag]));
}

function parseTagList(value: string, lookup: Map<string, Tag>) {
  if (!value || value === "None") return [];
  return value
    .split(",")
    .map((item) => {
      const normalized = item.trim().toLowerCase();
      return lookup.get(topicNameAliases[normalized] ?? normalized);
    })
    .filter((tag): tag is Tag => Boolean(tag));
}

function stableIndex(value: string, size: number) {
  const total = Array.from(value).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return total % size;
}

function imageForArticle(slug: string, tags: Tag[]) {
  const topic = tags.find((tag) => tag.kind === "topic")?.slug ?? "fallback";
  const pool = imagePools[topic] ?? imagePools.fallback;
  return pool[stableIndex(slug, pool.length)]!;
}

function conciseWhyItMatters(value: string, subhead: string) {
  const sentences = normalizeLine(value)
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);
  const distinct = sentences.filter((sentence) => sentence !== subhead).slice(0, 2);
  return distinct.join(" ") || firstSentence(value);
}

function dealForArticle(title: string, slug: string, format: Format): Article["deal"] {
  if (format !== "wallet-watch") return undefined;
  const productName = title.includes("power bank")
    ? "Reliable 20,000mAh power bank"
    : title.includes("laptop")
      ? "Student laptop shortlist"
      : title.includes("refurbished")
        ? "Verified refurbished phone"
        : "Budget smartphone pick";
  const threshold = title.match(/KSh\s?([0-9,]+)/)?.[1]?.replace(/,/g, "");
  return {
    productName,
    retailer: "Editor-verified retailer",
    priceCurrent: threshold ? Number(threshold) : 4999 + stableIndex(slug, 8) * 1500,
    priceWas: threshold ? Number(threshold) + 2500 : undefined,
    currency: "KSh",
    affiliateUrl: "/advertise",
    expiry: "Check retailer before checkout",
    bestUnderThreshold: threshold ? Number(threshold) : undefined,
    verified: true
  };
}

function parseWhy(block: string) {
  const match = block.match(/\*\*Why it matters:\*\*\s*([\s\S]*?)(?:\n\n|$)/);
  return normalizeLine(match?.[1] ?? "");
}

function parseTitle(block: string) {
  const match = block.match(/^#\s+(.+)$/m);
  return normalizeLine(match?.[1] ?? "Untitled article");
}

function parseBody(block: string) {
  const afterWhy = block.split(/\*\*Why it matters:\*\*\s*[\s\S]*?\n\n/)[1] ?? "";
  const [bodyPart] = afterWhy.split(/\n## Go deeper:/);
  return bodyPart
    .split(/\n\n+/)
    .map((paragraph) => stripEditorialNotes(normalizeLine(paragraph)))
    .filter(Boolean);
}

function parseGoDeeper(block: string) {
  const match = block.match(/## Go deeper:[^\n]*\n\n([\s\S]*?)(?:\n\nClosing line:|$)/);
  const intro = match?.[1]
    ?.split(/\n\n+/)
    .map((paragraph) => stripEditorialNotes(normalizeLine(paragraph)))
    .filter(Boolean)
    .join("\n\n");
  return intro ? { intro, specs: [] } : undefined;
}

function parseClosingLine(block: string) {
  const match = block.match(/Closing line:\s*([\s\S]*?)$/);
  return match ? stripEditorialNotes(normalizeLine(match[1])) : undefined;
}

function pickAuthor(authors: Author[]) {
  return authors[0];
}

function readTimeFor(articleText: string) {
  const words = articleText.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(3, Math.ceil(words / 180))} min read`;
}

export function loadDraftArticles({
  authors,
  topics,
  brands
}: {
  authors: Author[];
  topics: Tag[];
  brands: Tag[];
}): Article[] {
  const topicLookup = tagLookup(topics);
  const brandLookup = tagLookup(brands);
  return readDraftFile()
    .split(/\n(?=## \d+\.)/)
    .filter((block) => /^## \d+\./.test(block))
    .map((block, index) => {
      const section = metadataValue(block, "Section");
      const format = formatBySection[section] ?? "explainer";
      const title = parseTitle(block);
      const slug = slugify(title);
      const rawWhyItMatters = stripEditorialNotes(parseWhy(block));
      const body = parseBody(block);
      const tags = [
        ...parseTagList(metadataValue(block, "Topics"), topicLookup),
        ...parseTagList(metadataValue(block, "Brands"), brandLookup)
      ];
      const publishedAt = new Date(Date.UTC(2026, 5, 26 - index, 6, 0, 0)).toISOString();
      const excerpt = stripEditorialNotes(firstSentence(body[0] ?? rawWhyItMatters));
      const subhead = stripEditorialNotes(firstSentence(rawWhyItMatters));
      const whyItMatters = conciseWhyItMatters(rawWhyItMatters, subhead);

      return {
        id: String(200 + index + 1),
        slug,
        format,
        title,
        subhead,
        excerpt,
        whyItMatters,
        body,
        goDeeper: parseGoDeeper(block),
        closingLine: parseClosingLine(block),
        author: pickAuthor(authors),
        publishedAt,
        updatedAt: publishedAt,
        readTime: readTimeFor(block),
        image: imageForArticle(slug, tags),
        tags,
        deal: dealForArticle(title, slug, format)
      };
    });
}
