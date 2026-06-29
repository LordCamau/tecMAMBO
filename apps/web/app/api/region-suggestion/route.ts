import { NextRequest, NextResponse } from "next/server";
import { geoHeaderToRegionSlug, getRegion } from "@/lib/regions";

export function GET(request: NextRequest) {
  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-country-code") ??
    request.headers.get("x-geo-country");
  const region = geoHeaderToRegionSlug(country);
  const term = region ? getRegion(region) : null;

  return NextResponse.json(
    { region: term ? { name: term.name, slug: term.slug } : null },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}
