import { NextResponse } from "next/server";
import { getArticles, getGlossaryTerms } from "@/lib/content";
import { buildLlmsTxt } from "@/content/llms";

export async function GET() {
  const [articles, terms] = await Promise.all([getArticles(), getGlossaryTerms()]);
  return new NextResponse(buildLlmsTxt(articles, terms), {
    headers: { "content-type": "text/plain; charset=utf-8" }
  });
}
