import { NextResponse } from "next/server";
import { getGlossaryTerms } from "@/lib/content";
import { siteUrl } from "@/lib/formats";

export async function GET() {
  const terms = await getGlossaryTerms();
  const body = [
    "# tecMAMBO Glossary",
    "",
    "> Plain-English technology definitions designed for readers, search, and answer engines.",
    "",
    ...terms.map((term) => `- [${term.term}](${siteUrl}/glossary/${term.slug}) - ${term.oneLiner}`)
  ].join("\n");
  return new NextResponse(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, s-maxage=300, stale-while-revalidate=86400"
    }
  });
}
