import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-tecmambo-search-secret") ?? request.nextUrl.searchParams.get("secret");
  if (!process.env.SEARCH_REINDEX_SECRET || secret !== process.env.SEARCH_REINDEX_SECRET) {
    return NextResponse.json({ ok: false, error: "Invalid search reindex secret" }, { status: 401 });
  }

  const payload = (await request.json().catch(() => ({}))) as {
    type?: "article" | "glossary";
    id?: string | number;
    slug?: string;
    action?: "upsert" | "delete";
  };

  if (!payload.type || !payload.slug) {
    return NextResponse.json({ ok: false, error: "Provide type and slug" }, { status: 400 });
  }

  const hasTypesense = Boolean(process.env.TYPESENSE_HOST && process.env.TYPESENSE_API_KEY);
  const hasAlgolia = Boolean(process.env.ALGOLIA_APP_ID && process.env.ALGOLIA_ADMIN_API_KEY);

  return NextResponse.json({
    ok: true,
    queued: false,
    provider: hasTypesense ? "typesense" : hasAlgolia ? "algolia" : "none",
    note: hasTypesense || hasAlgolia ? "Wire the provider client here during search cutover." : "No search provider credentials configured.",
    payload
  });
}
