import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { articleToMarkdown } from "@/content/markdown";
import { getArticleBySlug } from "@/lib/content";
import { formats } from "@/lib/formats";

type Params = Promise<{ section: string; slug: string }>;

export async function GET(_request: Request, { params }: { params: Params }) {
  const { section, slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || formats[article.format].path.slice(1) !== section) notFound();

  return new NextResponse(articleToMarkdown(article), {
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
