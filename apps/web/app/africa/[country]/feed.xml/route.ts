import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { buildRssFeed } from "@/content/feeds";
import { getArticlesForRegion } from "@/lib/content";
import { getRegion, regionPath } from "@/lib/regions";

type Params = Promise<{ country: string }>;

export async function GET(_request: Request, { params }: { params: Params }) {
  const { country } = await params;
  const region = getRegion(country);
  if (!region) notFound();
  const articles = await getArticlesForRegion(region.slug);

  return new NextResponse(buildRssFeed(articles, `tecMAMBO ${region.name} tech`, `${regionPath(region)}/feed.xml`), {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, s-maxage=300, stale-while-revalidate=86400"
    }
  });
}
