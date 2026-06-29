import { NextResponse } from "next/server";
import { aboutToMarkdown } from "@/content/about";
import { getArticles, getGlossaryTerms } from "@/lib/content";

export async function GET() {
  const [articles, terms] = await Promise.all([getArticles(), getGlossaryTerms()]);
  return new NextResponse(aboutToMarkdown(articles, terms), {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, s-maxage=300, stale-while-revalidate=86400"
    }
  });
}

export async function HEAD() {
  const response = await GET();
  return new NextResponse(null, {
    status: response.status,
    headers: response.headers
  });
}
