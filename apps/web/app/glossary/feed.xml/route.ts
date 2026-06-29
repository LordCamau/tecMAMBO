import { NextResponse } from "next/server";
import { getGlossaryTerms } from "@/lib/content";
import { siteUrl } from "@/lib/formats";

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function GET() {
  const terms = (await getGlossaryTerms()).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 40);
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0"><channel>',
    "<title>tecMAMBO Glossary</title>",
    `<link>${siteUrl}/glossary</link>`,
    "<description>Plain-English technology definitions from tecMAMBO.</description>",
    ...terms.map(
      (term) =>
        `<item><title>${escapeXml(term.term)}</title><link>${siteUrl}/glossary/${term.slug}</link><guid>${siteUrl}/glossary/${term.slug}</guid><pubDate>${new Date(term.updatedAt).toUTCString()}</pubDate><description>${escapeXml(term.oneLiner)}</description></item>`
    ),
    "</channel></rss>"
  ].join("");
  return new NextResponse(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, s-maxage=300, stale-while-revalidate=86400"
    }
  });
}
