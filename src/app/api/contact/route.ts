export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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
        await fetch(sheetWebhookUrl, {
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
          }),
        });
      } catch (sheetErr: unknown) {
        console.warn(
          "Google Sheet submission failed:",
          sheetErr instanceof Error ? sheetErr.message : sheetErr,
        );
      }
    }

    // 2. Send Email via Resend (onboarding@resend.dev)
    if (!process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY_SEC) {
      console.error(
        "Contact API 500: Missing RESEND_API_KEY and RESEND_API_KEY_SEC in environment variables.",
      );
      return NextResponse.json(
        {
          success: false,
          message:
            "The enquiry email service is not configured. Add RESEND_API_KEY to .env.local and restart the dev server.",
        },
        { status: 500 },
      );
    }

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

    const recipients = process.env.EMAIL_USER
      ? process.env.EMAIL_USER.split(",").map((s) => s.trim()).filter(Boolean)
      : ["winsdigitals@gmail.com"];

    const recipientsSec = process.env.EMAIL_USER_SEC
      ? process.env.EMAIL_USER_SEC.split(",").map((s) => s.trim()).filter(Boolean)
      : ["aishwaryajune2106@gmail.com"];

    let emailSent = false;
    let lastEmailError = "";

    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: recipients,
          replyTo: email || undefined,
          subject: `New Enquiry – ${name}`,
          html: emailHtml,
        });
        if (error) {
          lastEmailError = error.message;
          console.error("First resend failed:", error.message);
        } else {
          emailSent = true;
        }
      } catch (err: unknown) {
        lastEmailError = err instanceof Error ? err.message : String(err);
        console.error("First resend failed:", lastEmailError);
      }
    }

    if (process.env.RESEND_API_KEY_SEC) {
      try {
        const resend2 = new Resend(process.env.RESEND_API_KEY_SEC);
        const { error } = await resend2.emails.send({
          from: "onboarding@resend.dev",
          to: recipientsSec,
          replyTo: email || undefined,
          subject: `New Enquiry – ${name}`,
          html: emailHtml,
        });
        if (error) {
          lastEmailError = error.message;
          console.error("Second resend failed:", error.message);
        } else {
          emailSent = true;
        }
      } catch (err: unknown) {
        lastEmailError = err instanceof Error ? err.message : String(err);
        console.error("Second resend failed:", lastEmailError);
      }
    }

    if (!emailSent) {
      return NextResponse.json(
        {
          success: false,
          message: lastEmailError || "Unable to send enquiry. Please try again.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry sent successfully.",
    });
  } catch (error: unknown) {
    console.error(
      "Lead submission error:",
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong.",
      },
      { status: 500 },
    );
  }
}
