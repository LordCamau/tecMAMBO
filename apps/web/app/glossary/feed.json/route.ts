import { NextResponse } from "next/server";
import { getGlossaryTerms } from "@/lib/content";
import { siteUrl } from "@/lib/formats";

export async function GET() {
  const terms = (await getGlossaryTerms()).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 40);
  return NextResponse.json(
    {
      version: "https://jsonfeed.org/version/1.1",
      title: "tecMAMBO Glossary",
      home_page_url: `${siteUrl}/glossary`,
      feed_url: `${siteUrl}/glossary/feed.json`,
      items: terms.map((term) => ({
        id: `${siteUrl}/glossary/${term.slug}`,
        url: `${siteUrl}/glossary/${term.slug}`,
        title: term.term,
        summary: term.oneLiner,
        date_modified: term.updatedAt,
        tags: [...term.topics, term.difficulty]
      }))
    },
    {
      headers: {
        "cache-control": "public, s-maxage=300, stale-while-revalidate=86400"
      }
    }
  );
}
