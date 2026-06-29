import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { glossaryToMarkdown } from "@/content/markdown";
import { getGlossaryTerm } from "@/lib/content";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug") ?? "";
  const term = await getGlossaryTerm(slug);
  if (!term) notFound();

  return new NextResponse(glossaryToMarkdown(term), {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, s-maxage=300, stale-while-revalidate=86400"
    }
  });
}

export async function HEAD(request: NextRequest) {
  const response = await GET(request);
  return new NextResponse(null, {
    status: response.status,
    headers: response.headers
  });
}
