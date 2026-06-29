import { NextResponse } from "next/server";
import { buildRssFeed } from "@/content/feeds";
import { getAfricanArticles } from "@/lib/content";

export async function GET() {
  const articles = await getAfricanArticles();
  return new NextResponse(buildRssFeed(articles, "tecMAMBO African tech", "/africa/feed.xml"), {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, s-maxage=300, stale-while-revalidate=86400"
    }
  });
}
