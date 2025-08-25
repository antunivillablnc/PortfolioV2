import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function escapeHtml(input: string): string {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 500 });
    }

    const to = process.env.CONTACT_TO_EMAIL;
    if (!to) {
      return NextResponse.json({ error: "Missing CONTACT_TO_EMAIL" }, { status: 500 });
    }
    if (to.toLowerCase() === "delivered@resend.dev") {
      return NextResponse.json({ error: "CONTACT_TO_EMAIL must not be delivered@resend.dev" }, { status: 400 });
    }

    const resend = new Resend(apiKey);
    const replyTo = email && /.+@.+\..+/.test(email) ? email : undefined;
    const html = `<div><p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>${replyTo ? `<p style="margin-top:12px;color:#64748b">From: ${escapeHtml(replyTo)}</p>` : ''}</div>`;

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to,
      subject: "New message from portfolio website",
      html,
      replyTo,
    });

    if (error) {
      return NextResponse.json({ error: error.message || "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Unexpected error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ready: true });
}
