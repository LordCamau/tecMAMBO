import { NextResponse } from "next/server";
import { getArticles } from "@/lib/content";
import { buildRssFeed } from "@/content/feeds";

export async function GET() {
  const articles = await getArticles();
  return new NextResponse(buildRssFeed(articles), {
    headers: { "content-type": "application/rss+xml; charset=utf-8" }
  });
}
