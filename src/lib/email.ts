import { Resend } from "resend";
import { getServiceLabel } from "./constants";
import { SITE_EMAIL } from "./site-contact";

export type LeadEmailPayload = {
  name: string;
  phone: string;
  email: string | null;
  serviceType: string;
  location: string | null;
  message: string | null;
  metadata: Record<string, string>;
  source: "QUOTE" | "CONTACT";
};

type SendResult = { ok: true } | { ok: false; error: string };

function normalizeEnv(value: string | undefined) {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function getEnv(name: string) {
  return normalizeEnv(process.env[name]);
}

function isPlaceholderApiKey(apiKey: string) {
  return (
    apiKey.includes("your_resend_api_key") ||
    apiKey === "re_xxxxxxxx" ||
    apiKey.endsWith("_here")
  );
}

function getResendClient() {
  const apiKey = getEnv("RESEND_API_KEY");
  if (!apiKey || isPlaceholderApiKey(apiKey)) return null;
  return new Resend(apiKey);
}

function isProduction() {
  return process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL);
}

export async function sendLeadNotification(
  lead: LeadEmailPayload,
): Promise<SendResult> {
  const adminEmail = getEnv("ADMIN_EMAIL") ?? SITE_EMAIL;

  if (!adminEmail) {
    console.warn("ADMIN_EMAIL not set; skipping lead notification email.");
    return { ok: false, error: "Admin email not configured" };
  }

  const metadataLines = Object.entries(lead.metadata)
    .map(([key, value]) => `${formatKey(key)}: ${value}`)
    .join("\n");

  const serviceLabel = getServiceLabel(lead.serviceType);
  const sourceLabel =
    lead.source === "CONTACT" ? "contact inquiry" : "quote request";

  const fields = [
    { label: "Name", value: lead.name },
    { label: "Phone", value: lead.phone },
    { label: "Email", value: lead.email ?? "Not provided" },
    { label: "Service", value: serviceLabel },
    { label: "Location", value: lead.location ?? "Not provided" },
  ];

  const metadataEntries = Object.entries(lead.metadata).map(([key, value]) => ({
    label: formatKey(key),
    value,
  }));

  const text = [
    `New ${sourceLabel} received on IVS Security website`,
    "",
    ...fields.map(({ label, value }) => `${label}: ${value}`),
    metadataLines ? `\nAdditional details:\n${metadataLines}` : "",
    lead.message ? `\nMessage:\n${lead.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const html = buildLeadEmailHtml({
    title:
      lead.source === "CONTACT"
        ? "New Contact Inquiry"
        : "New Quote Request",
    subtitle: `A new ${sourceLabel} was submitted on the IVS Security website.`,
    fields,
    metadataEntries,
    message: lead.message,
  });

  const subject =
    lead.source === "CONTACT"
      ? `New Contact Inquiry — ${lead.name}`
      : `New Quote Request — ${serviceLabel} — ${lead.name}`;

  const resend = getResendClient();
  const fromEmail = getEnv("RESEND_FROM_EMAIL");

  if (!resend) {
    const message = isProduction()
      ? "RESEND_API_KEY is missing or invalid on the server"
      : "RESEND_API_KEY not set (dev fallback: logged only)";

    if (isProduction()) {
      console.error("[Lead notification]", message);
      return { ok: false, error: message };
    }

    console.info("[Lead notification]", { to: adminEmail, subject, text });
    return { ok: true };
  }

  if (!fromEmail) {
    console.error("RESEND_FROM_EMAIL not set; unable to send lead notification.");
    return { ok: false, error: "Sender email not configured" };
  }

  if (fromEmail.includes("onboarding@resend.dev")) {
    console.warn(
      "[Lead notification] Using Resend test sender. Emails can only be delivered to the email address on your Resend account. Set ADMIN_EMAIL to that address, or verify a domain and update RESEND_FROM_EMAIL.",
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("[Lead notification] Resend error:", {
        message: error.message,
        name: error.name,
        to: adminEmail,
        from: fromEmail,
      });
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch (err) {
    console.error("[Lead notification] Failed to send:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown email error",
    };
  }
}

function formatKey(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildFieldRows(fields: { label: string; value: string }[]) {
  return fields
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;width:140px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;vertical-align:top;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");
}

function buildLeadEmailHtml({
  title,
  subtitle,
  fields,
  metadataEntries,
  message,
}: {
  title: string;
  subtitle: string;
  fields: { label: string; value: string }[];
  metadataEntries: { label: string; value: string }[];
  message: string | null;
}) {
  const metadataSection =
    metadataEntries.length > 0
      ? `
        <h2 style="margin:28px 0 12px;font-size:16px;color:#0f172a;">Additional Details</h2>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
          ${buildFieldRows(metadataEntries)}
        </table>`
      : "";

  const messageSection = message
    ? `
        <h2 style="margin:28px 0 12px;font-size:16px;color:#0f172a;">Message</h2>
        <div style="padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;color:#0f172a;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;">
      <tr>
        <td style="padding:24px;background:#0f172a;border-radius:12px 12px 0 0;">
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">IVS Security</p>
          <h1 style="margin:0;font-size:24px;line-height:1.3;color:#ffffff;">${escapeHtml(title)}</h1>
          <p style="margin:12px 0 0;font-size:14px;line-height:1.5;color:#cbd5e1;">${escapeHtml(subtitle)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:24px;background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
          <h2 style="margin:0 0 12px;font-size:16px;color:#0f172a;">Contact Details</h2>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
            ${buildFieldRows(fields)}
          </table>
          ${metadataSection}
          ${messageSection}
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
