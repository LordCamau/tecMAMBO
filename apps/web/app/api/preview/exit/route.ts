import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const mode = await draftMode();
  mode.disable();
  return NextResponse.redirect(new URL("/", request.url));
}
