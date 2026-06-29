import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { NextResponse } from "next/server";

const filename = "tecMAMBO-Media-Kit-2026.pdf";

export async function GET() {
  try {
    const pdf = await readFile(join(process.cwd(), "public", "media", filename));

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "public, max-age=300"
      }
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "The media kit is not available right now." },
      { status: 404, headers: { "Cache-Control": "no-store" } }
    );
  }
}
