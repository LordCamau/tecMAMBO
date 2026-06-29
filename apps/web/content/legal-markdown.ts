import type { LegalPage, LegalSegment } from "@/lib/legal-pages";
import { segmentsToText } from "@/lib/legal-pages";

function segmentToMarkdown(segment: LegalSegment) {
  return typeof segment === "string" ? segment : `[${segment.text}](${segment.href})`;
}

function paragraphToMarkdown(segments: LegalSegment[]) {
  return segments.map(segmentToMarkdown).join("");
}

export function legalPageToMarkdown(page: LegalPage) {
  return [
    `# ${page.title}`,
    "",
    `Last updated: ${page.lastUpdated}`,
    "",
    `**${page.summaryLabel}** ${segmentsToText(page.summary)}`,
    "",
    `## ${page.placeholderTitle ?? "Complete before publishing"}`,
    "",
    page.placeholderIntro ?? "This template needs legal review and these CMS fields completed before launch.",
    "",
    ...page.placeholders.map((placeholder) => `- ${placeholder}`),
    "",
    ...page.sections.flatMap((section) => [`## ${section.title}`, "", ...section.paragraphs.flatMap((paragraph) => [paragraphToMarkdown(paragraph), ""])])
  ].join("\n");
}
