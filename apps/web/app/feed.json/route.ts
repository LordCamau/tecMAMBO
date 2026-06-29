import { NextResponse } from "next/server";
import { getArticles } from "@/lib/content";
import { buildJsonFeed } from "@/content/feeds";

export async function GET() {
  const articles = await getArticles();
  return NextResponse.json(buildJsonFeed(articles));
}
