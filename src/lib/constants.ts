export const SITE_NAME = "IVS Security";

/** Resolves a valid absolute site URL (empty env vars are treated as unset). */
export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUOTED",
  "WON",
  "LOST",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const SERVICE_TYPES = [
  { value: "RESIDENTIAL", label: "Residential Security" },
  { value: "COMMERCIAL", label: "Commercial Security" },
  { value: "EVENT", label: "Event Security" },
  { value: "INDUSTRIAL", label: "Industrial Security Guards" },
  { value: "BODYGUARD", label: "Personal Body Guards" },
  { value: "GENERAL", label: "General Inquiry" },
] as const;

export type ServiceType = (typeof SERVICE_TYPES)[number]["value"];

export const SHIFT_TYPES = ["8 Hour", "12 Hour"] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/quote", label: "Get Quote" },
] as const;

export function getStatusLabel(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export function getServiceLabel(serviceType: string) {
  return (
    SERVICE_TYPES.find((s) => s.value === serviceType)?.label ?? serviceType
  );
}
