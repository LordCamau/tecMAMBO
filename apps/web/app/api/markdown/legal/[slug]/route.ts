import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { legalPageToMarkdown } from "@/content/legal-markdown";
import { getLegalPage } from "@/lib/legal-pages";

type Params = Promise<{ slug: string }>;

export async function GET(_request: Request, { params }: { params: Params }) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  return new NextResponse(legalPageToMarkdown(page), {
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
