import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { articlePath } from "@/lib/formats";
import { getCmsArticleByDatabaseId, getCmsArticleBySlug } from "@/lib/cms/source";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const slug = request.nextUrl.searchParams.get("slug");
  const id = request.nextUrl.searchParams.get("id");

  if (!process.env.WORDPRESS_PREVIEW_SECRET || secret !== process.env.WORDPRESS_PREVIEW_SECRET) {
    return NextResponse.json({ ok: false, error: "Invalid preview secret" }, { status: 401 });
  }

  if (!slug && !id) {
    return NextResponse.json({ ok: false, error: "Provide a WordPress slug or database id" }, { status: 400 });
  }

  const article = id ? await getCmsArticleByDatabaseId(id) : await getCmsArticleBySlug(slug!, true);
  if (!article) {
    return NextResponse.json({ ok: false, error: "Preview article not found" }, { status: 404 });
  }

  const mode = await draftMode();
  mode.enable();

  return NextResponse.redirect(new URL(articlePath(article.format, article.slug), request.url));
}
