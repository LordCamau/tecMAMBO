import { NextResponse } from "next/server";

type MediaKitPayload = {
  name?: string;
  email?: string;
  company?: string;
  websiteUrl?: string;
  startedAt?: number;
  source?: string;
};

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function text(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function spamIssue(payload: MediaKitPayload) {
  if (text(payload.websiteUrl)) return true;
  if (typeof payload.startedAt !== "number") return true;
  const elapsed = Date.now() - payload.startedAt;
  return elapsed < 1200 || elapsed > 1000 * 60 * 60 * 6;
}

async function sendMediaKitLead(payload: Record<string, unknown>) {
  const webhookUrl = process.env.ADVERTISE_LEAD_WEBHOOK_URL;
  if (!webhookUrl) return { delivered: false };
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.ADVERTISE_LEAD_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.ADVERTISE_LEAD_WEBHOOK_TOKEN}` } : {})
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(`Advertise media kit webhook failed: ${response.status}`);
  return { delivered: true };
}

export async function POST(request: Request) {
  let payload: MediaKitPayload;
  try {
    payload = (await request.json()) as MediaKitPayload;
  } catch {
    return NextResponse.json({ ok: false, message: "Please send the media-kit request again." }, { status: 400 });
  }

  if (spamIssue(payload)) return NextResponse.json({ ok: true, downloadUrl: "/api/advertise/media-kit" });

  const errors: Record<string, string> = {};
  const name = text(payload.name, 120);
  const email = text(payload.email, 180).toLowerCase();
  const company = text(payload.company, 160);

  if (!name) errors.name = "Tell us your name.";
  if (!validEmail(email)) errors.email = "Use a valid work email.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, message: "Please fix the highlighted fields.", errors }, { status: 422 });
  }

  try {
    await sendMediaKitLead({
      type: "media-kit-request",
      source: text(payload.source, 80) || "advertise-page-media-kit",
      name,
      email,
      company,
      submittedAt: new Date().toISOString(),
      privacy: "Use only for media-kit delivery and partnership follow-up unless a separate marketing consent is collected."
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "The media kit could not be prepared right now.", errors: { form: "Delivery failed." } },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, downloadUrl: "/api/advertise/media-kit" });
}
