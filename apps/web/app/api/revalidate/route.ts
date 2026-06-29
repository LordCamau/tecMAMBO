import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { cmsTags } from "@/lib/cms/cache-tags";

export async function POST(request: NextRequest) {
  const querySecret = request.nextUrl.searchParams.get("secret");
  const headerSecret = request.headers.get("x-tecmambo-revalidate-secret");
  const secret = querySecret ?? headerSecret;
  const expected = process.env.REVALIDATE_SECRET ?? process.env.WP_WEBHOOK_SECRET;
  if (!expected || secret !== expected) {
    return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }

  const payload = (await request.json().catch(() => ({}))) as {
    tags?: string[];
    id?: string | number;
    slug?: string;
    type?: "article" | "glossary" | "author" | "settings" | string;
    section?: string;
    topics?: string[];
    brands?: string[];
    regions?: string[];
  };

  const tags = new Set(payload.tags?.length ? payload.tags : [cmsTags.all, cmsTags.home, cmsTags.sitemap, cmsTags.rss, cmsTags.llms, cmsTags.search]);
  if (payload.type === "article" && payload.slug) tags.add(cmsTags.article(payload.slug));
  if (payload.type === "glossary" && payload.slug) {
    tags.add(cmsTags.glossary);
    tags.add(cmsTags.glossaryTerm(payload.slug));
  }
  if (payload.type === "author" && payload.slug) tags.add(cmsTags.author(payload.slug));
  if (payload.type === "settings") tags.add(cmsTags.settings);
  if (payload.section) tags.add(cmsTags.section(payload.section));
  for (const topic of payload.topics ?? []) tags.add(cmsTags.topic(topic));
  for (const brand of payload.brands ?? []) tags.add(cmsTags.brand(brand));
  for (const region of payload.regions ?? []) tags.add(cmsTags.region(region));

  for (const tag of tags) revalidateTag(tag, "max");
  return NextResponse.json({ ok: true, revalidated: Array.from(tags) });
}
