import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.includes(".") && !pathname.endsWith(".md")) {
    return NextResponse.next();
  }
  if (pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }
  if (pathname.endsWith(".md")) {
    const parts = pathname.split("/").filter(Boolean);
    const url = request.nextUrl.clone();
    if (parts[0] === "about.md") {
      url.pathname = "/api/markdown/about";
      return NextResponse.rewrite(url);
    }
    if (parts[0] === "terms.md") {
      url.pathname = "/api/markdown/legal/terms";
      return NextResponse.rewrite(url);
    }
    if (parts[0] === "privacy.md") {
      url.pathname = "/api/markdown/legal/privacy";
      return NextResponse.rewrite(url);
    }
    if (parts[0] === "cookies.md") {
      url.pathname = "/api/markdown/legal/cookies";
      return NextResponse.rewrite(url);
    }
    if (parts[0] === "editorial-standards.md") {
      url.pathname = "/api/markdown/legal/editorial-standards";
      return NextResponse.rewrite(url);
    }
    if (parts[0] === "africa.md") {
      url.pathname = "/api/markdown/africa";
      return NextResponse.rewrite(url);
    }
    if (parts[0] === "africa") {
      url.pathname = `/api/markdown/africa/${(parts[1] ?? "").replace(/\.md$/, "")}`;
      return NextResponse.rewrite(url);
    }
    if (parts[0] === "glossary") {
      url.pathname = `/api/markdown/glossary/${(parts[1] ?? "").replace(/\.md$/, "")}`;
      return NextResponse.rewrite(url);
    }
    url.pathname = `/api/markdown/article/${parts[0] ?? ""}/${(parts[1] ?? "").replace(/\.md$/, "")}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api).*)"]
};
