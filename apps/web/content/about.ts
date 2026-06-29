import type { Article, GlossaryTerm } from "@/lib/types";

export function aboutToMarkdown(articles: Article[], terms: GlossaryTerm[]) {
  const explainerReviewCount = articles.filter((article) => article.format === "explainer" || article.format === "review").length;
  return [
    "# About tecMAMBO",
    "",
    "> Tech, made to be understood.",
    "",
    "We're the tech publication for everyone the other tech sites forgot to write for, without boring the people who already love this stuff.",
    "",
    "Founded in 2016 by Tim Humphreys in Nairobi, tecMAMBO set out to be the translation layer: plain English first, the deep technical detail there when you want it, out of your way when you don't.",
    "",
    "## Why tecMAMBO?",
    "",
    "Mambo is Swahili for things, matters, what's going on. tecMAMBO is what's up in tech, explained the way a good friend would explain it.",
    "",
    "## What we stand for",
    "",
    "- Plain English first.",
    "- Clear, not dumbed down.",
    "- Independent and honest.",
    "- Show the workings.",
    "- Warmth over jargon.",
    "- Rooted here, useful everywhere.",
    "",
    "## In brief",
    "",
    "- Founded 2016",
    "- Based in Nairobi, Kenya",
    `- ${explainerReviewCount} explainers & reviews`,
    `- ${terms.length} plain-English glossary terms`,
    "- Free to read",
    "",
    "## Founder",
    "",
    "Tim Humphreys founded tecMAMBO in 2016 on a stubborn belief that clarity is a feature, not a compromise.",
    "",
    "Canonical: https://tecmambo.com/about"
  ].join("\n");
}
