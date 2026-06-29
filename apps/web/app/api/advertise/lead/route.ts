import { NextResponse } from "next/server";
import { interestOptions } from "@/lib/advertise";

type LeadPayload = {
  name?: string;
  company?: string;
  email?: string;
  website?: string;
  interests?: string[];
  budget?: string;
  message?: string;
  consent?: boolean;
  websiteUrl?: string;
  startedAt?: number;
  source?: string;
};

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function text(value: unknown, max = 2000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function spamIssue(payload: LeadPayload) {
  if (text(payload.websiteUrl)) return "Thanks.";
  if (typeof payload.startedAt !== "number") return "Please try again.";
  const elapsed = Date.now() - payload.startedAt;
  if (elapsed < 1200) return "Please try again.";
  if (elapsed > 1000 * 60 * 60 * 6) return "Please refresh the page and try again.";
  return null;
}

async function sendLead(payload: Record<string, unknown>) {
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

  if (!response.ok) throw new Error(`Advertise lead webhook failed: ${response.status}`);
  return { delivered: true };
}

export async function POST(request: Request) {
  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, message: "Please send the form again." }, { status: 400 });
  }

  const spam = spamIssue(payload);
  if (spam) return NextResponse.json({ ok: true, message: spam });

  const errors: Record<string, string> = {};
  const name = text(payload.name, 120);
  const company = text(payload.company, 160);
  const email = text(payload.email, 180).toLowerCase();
  const website = text(payload.website, 240);
  const budget = text(payload.budget, 80);
  const message = text(payload.message, 3000);
  const interests = Array.isArray(payload.interests)
    ? payload.interests.filter((interest) => interestOptions.includes(interest)).slice(0, interestOptions.length)
    : [];

  if (!name) errors.name = "Tell us your name.";
  if (!company) errors.company = "Tell us the company or agency name.";
  if (!validEmail(email)) errors.email = "Use a valid work email.";
  if (!payload.consent) errors.consent = "Please confirm that we may contact you about this enquiry.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, message: "Please fix the highlighted fields.", errors }, { status: 422 });
  }

  const lead = {
    type: "partnership-enquiry",
    source: text(payload.source, 80) || "advertise-page",
    name,
    company,
    email,
    website,
    interests,
    budget,
    message,
    consent: true,
    submittedAt: new Date().toISOString(),
    privacy: "Use only to respond to this partnership enquiry unless a separate marketing consent is collected."
  };

  try {
    const delivery = await sendLead(lead);
    return NextResponse.json({
      ok: true,
      delivered: delivery.delivered,
      message: "Thanks. Your enquiry has been received, and we will reply within two business days."
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "The enquiry could not be sent right now. Please try again, or use the email option once it is available.",
        errors: { form: "Delivery failed." }
      },
      { status: 502 }
    );
  }
}
