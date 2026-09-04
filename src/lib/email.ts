import type { Lead } from "@prisma/client";
import { getServiceLabel } from "./constants";
import { SITE_EMAIL } from "./site-contact";

type LeadEmailPayload = Pick<
  Lead,
  "name" | "phone" | "email" | "serviceType" | "location" | "message" | "metadata"
>;

export async function sendLeadNotification(lead: LeadEmailPayload) {
  const adminEmail = process.env.ADMIN_EMAIL ?? SITE_EMAIL;

  if (!adminEmail) {
    console.warn("ADMIN_EMAIL not set; skipping lead notification email.");
    return;
  }

  const metadata =
    lead.metadata && lead.metadata !== "{}"
      ? JSON.parse(lead.metadata) as Record<string, string>
      : {};

  const metadataLines = Object.entries(metadata)
    .map(([key, value]) => `${formatKey(key)}: ${value}`)
    .join("\n");

  const body = [
    "New lead received on IVS Security website",
    "",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email ?? "Not provided"}`,
    `Service: ${getServiceLabel(lead.serviceType)}`,
    `Location: ${lead.location ?? "Not provided"}`,
    metadataLines ? `\nAdditional details:\n${metadataLines}` : "",
    lead.message ? `\nMessage:\n${lead.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  // MVP: log to console. Wire Resend/Nodemailer when SMTP/API keys are available.
  console.info("[Lead notification]", { to: adminEmail, body });
}

function formatKey(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}
