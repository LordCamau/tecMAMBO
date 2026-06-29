import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { glossaryToMarkdown } from "@/content/markdown";
import { getGlossaryTerm } from "@/lib/content";

type Params = Promise<{ slug: string }>;

export async function GET(_request: Request, { params }: { params: Params }) {
  const { slug } = await params;
  const term = await getGlossaryTerm(slug);
  if (!term) notFound();

  return new NextResponse(glossaryToMarkdown(term), {
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
