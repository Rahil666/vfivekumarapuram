export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function parseContactPayload(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = (await request.json()) as Record<string, unknown>;
    return {
      name: String(body.name || "").trim(),
      phone: String(body.phone || "").trim(),
      email: String(body.email || "").trim(),
      interest: String(body.interest || "").trim(),
    };
  }

  const form = await request.formData();
  return {
    name: String(form.get("name") || "").trim(),
    phone: String(form.get("phone") || "").trim(),
    email: String(form.get("email") || "").trim(),
    interest: String(form.get("interest") || "").trim(),
  };
}

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, interest } = await parseContactPayload(request);

    if (!name || !phone || !interest) {
      return NextResponse.json(
        { success: false, message: "Please complete all required fields." },
        { status: 422 },
      );
    }

    if (!/^[-+\d\s]{8,16}$/.test(phone)) {
      return NextResponse.json(
        { success: false, message: "Invalid phone number." },
        { status: 422 },
      );
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address." },
        { status: 422 },
      );
    }

    // 1. Send to Google Sheet Webhook
    const sheetWebhookUrl = process.env.GOOGLE_SCRIPT_WEBHOOK_URL;
    if (sheetWebhookUrl) {
      try {
        const sheetRes = await fetch(sheetWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toLocaleString(),
            name,
            phone,
            email: email || "",
            interest,
            location: "VFIVE Pearl – Kumarapuram",
            leadFrom: "Kumarapuram Landing Page",
            ...(process.env.GOOGLE_SCRIPT_SECRET
              ? { secret: process.env.GOOGLE_SCRIPT_SECRET }
              : {}),
          }),
        });
        const sheetText = await sheetRes.text();
        try {
          const sheetJson = JSON.parse(sheetText) as {
            success?: boolean;
            error?: string;
          };
          if (!sheetRes.ok || sheetJson.success === false) {
            console.warn(
              "Google Sheet webhook rejected request:",
              sheetJson.error || sheetText,
            );
          }
        } catch {
          if (!sheetRes.ok) {
            console.warn(
              "Google Sheet webhook returned HTTP",
              sheetRes.status,
              sheetText.slice(0, 200),
            );
          }
        }
      } catch (sheetErr: unknown) {
        console.warn(
          "Google Sheet submission failed:",
          sheetErr instanceof Error ? sheetErr.message : sheetErr,
        );
      }
    }

    // 2. Send Email via Nodemailer
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 465);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      console.error(
        "Contact API 500: Missing SMTP_HOST, SMTP_USER, or SMTP_PASSWORD in environment variables.",
      );
      return NextResponse.json(
        {
          success: false,
          message: "The enquiry email service is not configured.",
        },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for port 465, false for port 587
      auth: {
        user,
        pass,
      },
    });

    const recipients = process.env.EMAIL_USER
      ? process.env.EMAIL_USER.split(",").map((s) => s.trim()).filter(Boolean)
      : ["winsdigitals@gmail.com", "sales@vfivehomes.com"];

    const emailHtml = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FDF6EC; padding: 32px; border-radius: 8px; border: 1px solid #C8860A;">
        <h2 style="color: #7B4A0F;">New Enquiry – VFIVE Pearl</h2>
        <p>Lead Type: <strong>Site Visit Enquiry</strong></p>
        <hr />
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone / WhatsApp:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${email ? escapeHtml(email) : "—"}</p>
        <p><strong>Interested in:</strong> ${escapeHtml(interest)}</p>
        <p><strong>Property:</strong> Pearl – Kumarapuram</p>
        <p><strong>Lead From:</strong> Kumarapuram Landing Page</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `VFIVE Pearl <${user}>`,
      to: recipients,
      replyTo: email || undefined,
      subject: `New Enquiry – ${name}`,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry sent successfully.",
      messageId: info.messageId,
    });
  } catch (error: unknown) {
    console.error("Failed to send:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to send enquiry.",
      },
      { status: 500 },
    );
  }
}
