import type { Article } from "@/lib/types";
import type { LegalPage } from "@/lib/legal-pages";
import { legalPageText } from "@/lib/legal-pages";
import type { AdvertiseSettings } from "@/lib/advertise";

export const editorialTodoPattern = /\[(verify|todo|draft|tk|confirm)\b[^\]]*\]/i;

export function stripEditorialNotes(value: string) {
  return value.replace(/\[(verify|todo|draft|tk|confirm)\b[^\]]*\]/gi, "").replace(/\s{2,}/g, " ").trim();
}

export function renderedArticleFields(article: Article) {
  return [
    article.title,
    article.seo?.title ?? "",
    article.seo?.description ?? "",
    article.subhead,
    article.excerpt,
    article.whyItMatters,
    ...article.body,
    article.closingLine ?? "",
    article.goDeeper?.intro ?? "",
    ...(article.goDeeper?.specs.flatMap((spec) => [spec.label, spec.value]) ?? []),
    article.verdict?.summary ?? "",
    ...(article.verdict?.pros ?? []),
    ...(article.verdict?.cons ?? []),
    ...(article.faq?.flatMap((faq) => [faq.question, faq.answer]) ?? []),
    ...(article.itemList ?? []),
    article.image.alt,
    ...(article.regions?.flatMap((region) => [region.name, region.description]) ?? [])
  ];
}

export function assertNoEditorialTodos(articles: Article[]) {
  const leaked = articles.flatMap((article) =>
    renderedArticleFields(article)
      .filter((field) => editorialTodoPattern.test(field))
      .map(() => article.slug)
  );
  if (leaked.length > 0) {
    throw new Error(`Editorial TODO text leaked into rendered fields: ${[...new Set(leaked)].join(", ")}`);
  }
}

export function assertArticlesArePublishable(articles: Article[]) {
  const emDashPattern = /—|&mdash;|&#8212;|&#x2014;/i;
  const wrongBrandPattern = /\b(?:Tecmambo|TecMAMBO|TECMAMBO|tecmambo)\b/g;
  const failures = articles.flatMap((article) => {
    const text = renderedArticleFields(article).join("\n");
    const issues: string[] = [];
    if (editorialTodoPattern.test(text)) issues.push("editorial note");
    if (emDashPattern.test(text)) issues.push("em dash");
    const wrongBrandMatches = [...text.matchAll(wrongBrandPattern)].map((match) => match[0]);
    if (wrongBrandMatches.length) issues.push(`brand casing: ${[...new Set(wrongBrandMatches)].join(", ")}`);
    return issues.map((issue) => `${article.slug}: ${issue}`);
  });

  if (failures.length > 0) {
    throw new Error(`Article content guard failed: ${failures.join("; ")}`);
  }
}

export function assertLegalPagesArePublishable(pages: LegalPage[]) {
  const emDashPattern = /—|&mdash;|&#8212;|&#x2014;/i;
  const wrongBrandPattern = /\b(?:Tecmambo|TecMAMBO|TECMAMBO|tecmambo)\b/g;
  const failures = pages.flatMap((page) => {
    const text = legalPageText(page);
    const issues: string[] = [];
    if (emDashPattern.test(text)) issues.push("em dash");
    const wrongBrandMatches = [...text.matchAll(wrongBrandPattern)].map((match) => match[0]);
    if (wrongBrandMatches.length) issues.push(`brand casing: ${[...new Set(wrongBrandMatches)].join(", ")}`);
    return issues.map((issue) => `${page.slug}: ${issue}`);
  });

  if (failures.length > 0) {
    throw new Error(`Legal page content guard failed: ${failures.join("; ")}`);
  }
}

export function renderedAdvertiseFields(settings: AdvertiseSettings) {
  return [
    settings.hero.eyebrow,
    settings.hero.title,
    settings.hero.sub,
    ...settings.pillars.flatMap((pillar) => [pillar.title, pillar.body]),
    settings.audience.heading,
    settings.audience.intro,
    ...settings.audience.stats.flatMap((stat) => [stat.label, stat.value ?? "", stat.note ?? ""]),
    ...settings.offerings.flatMap((offering) => [offering.title, offering.body]),
    settings.trust.heading,
    settings.trust.body,
    ...settings.process.flatMap((step) => [step.title, step.body]),
    settings.socialProof.heading,
    settings.socialProof.body,
    ...settings.socialProof.partners.flatMap((partner) => [partner.name, partner.quote ?? ""]),
    ...settings.faq.flatMap((faq) => [faq.question, faq.answer]),
    settings.form.heading,
    settings.form.sub,
    settings.form.responseTime,
    settings.form.advertisingEmail ?? "",
    settings.form.partnershipsInbox ?? "",
    settings.form.schedulingLink ?? "",
    settings.form.currency,
    ...settings.form.budgetRanges
  ];
}

export function assertAdvertisePageIsPublishable(settings: AdvertiseSettings) {
  const emDashPattern = /—|&mdash;|&#8212;|&#x2014;/i;
  const wrongBrandPattern = /\b(?:Tecmambo|TecMAMBO|TECMAMBO|tecmambo)\b/g;
  const text = renderedAdvertiseFields(settings).join("\n");
  const issues: string[] = [];
  if (emDashPattern.test(text)) issues.push("em dash");
  const wrongBrandMatches = [...text.matchAll(wrongBrandPattern)].map((match) => match[0]);
  if (wrongBrandMatches.length) issues.push(`brand casing: ${[...new Set(wrongBrandMatches)].join(", ")}`);
  if (issues.length > 0) {
    throw new Error(`Advertise page content guard failed: ${issues.join("; ")}`);
  }
}

export function uniqueImagesWithinLane<T extends { image: { src: string }; title: string }>(laneName: string, items: T[]) {
  const seen = new Set<string>();
  const duplicates = items.filter((item) => {
    if (seen.has(item.image.src)) return true;
    seen.add(item.image.src);
    return false;
  });
  if (duplicates.length > 0) {
    console.warn(`Duplicate images in ${laneName}: ${duplicates.map((item) => item.title).join(", ")}`);
  }
}
