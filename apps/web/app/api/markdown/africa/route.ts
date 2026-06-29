import { NextResponse } from "next/server";
import { africaHubToMarkdown } from "@/content/region-markdown";
import { getAfricanArticles } from "@/lib/content";

export async function GET() {
  const articles = await getAfricanArticles();
  return new NextResponse(africaHubToMarkdown(articles), {
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
