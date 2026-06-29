import type { Article, GlossaryTerm } from "@/lib/types";
import { articlePath } from "@/lib/formats";

export function articleToMarkdown(article: Article) {
  return [
    `# ${article.title}`,
    "",
    `> ${article.subhead}`,
    "",
    `Author: ${article.author.name}`,
    article.regions?.length ? `Regions: ${article.regions.map((region) => region.name).join(", ")}` : "",
    `Published: ${article.publishedAt}`,
    `Updated: ${article.updatedAt}`,
    `Canonical: ${articlePath(article.format, article.slug)}`,
    "",
    "## Why it matters",
    "",
    article.whyItMatters,
    "",
    "## Story",
    "",
    ...article.body.flatMap((paragraph) => [paragraph, ""]),
    article.goDeeper
      ? ["## Go deeper", "", article.goDeeper.intro, "", ...article.goDeeper.specs.map((spec) => `- ${spec.label}: ${spec.value}`)].join("\n")
      : "",
    article.faq?.length ? ["## FAQ", "", ...article.faq.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""])].join("\n") : "",
    article.itemList?.length ? ["## Picks", "", ...article.itemList.map((item) => `- ${item}`)].join("\n") : "",
    article.closingLine ? ["", article.closingLine].join("\n") : ""
  ].join("\n");
}

export function glossaryToMarkdown(term: GlossaryTerm) {
  return [
    `# ${term.term}`,
    "",
    `> ${term.oneLiner}`,
    "",
    `Topics: ${term.topics.join(", ")}`,
    `Difficulty: ${term.difficulty}`,
    term.aliases.length ? `Aliases: ${term.aliases.join(", ")}` : "",
    `Updated: ${term.updatedAt}`,
    "",
    term.analogy ? ["## In one analogy", "", term.analogy, ""].join("\n") : "",
    term.whyItMatters ? ["## Why it matters", "", term.whyItMatters, ""].join("\n") : "",
    "## Go deeper",
    "",
    term.fullExplanation,
    "",
    term.faqs?.length
      ? ["## FAQ", "", ...term.faqs.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""])].join("\n")
      : "",
    term.sources?.length
      ? ["## Sources", "", ...term.sources.map((source) => `- [${source.label}](${source.url})`)].join("\n")
      : ""
  ]
    .filter(Boolean)
    .join("\n");
}
