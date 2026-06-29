import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { countryHubToMarkdown } from "@/content/region-markdown";
import { getAfricanArticles, getArticlesForRegion } from "@/lib/content";
import { getRegion } from "@/lib/regions";

type Params = Promise<{ country: string }>;

export async function GET(_request: Request, { params }: { params: Params }) {
  const { country } = await params;
  if (country === "more") {
    const articles = await getAfricanArticles();
    return new NextResponse(countryHubToMarkdown({ name: "More African tech hubs", slug: "more", group: "Africa", description: "Country hubs for African technology coverage." }, articles), {
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        "cache-control": "public, s-maxage=300, stale-while-revalidate=86400"
      }
    });
  }
  const region = getRegion(country);
  if (!region) notFound();
  const articles = await getArticlesForRegion(region.slug);

  return new NextResponse(countryHubToMarkdown(region, articles), {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, s-maxage=300, stale-while-revalidate=86400"
    }
  });
}

export async function HEAD(request: Request, context: { params: Params }) {
  const response = await GET(request, context);
  return new NextResponse(null, {
    status: response.status,
    headers: response.headers
  });
}
