import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CalendarDays, Home } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore IVS Security services for residential buildings, commercial facilities, and events.",
};

const services = [
  {
    href: "/services/residential",
    icon: Home,
    title: "Residential Security",
    points: ["Gate and lobby security", "Visitor management", "Night patrol support"],
  },
  {
    href: "/services/commercial",
    icon: Building2,
    title: "Commercial Security",
    points: ["Office and warehouse guards", "Access control support", "Asset protection"],
  },
  {
    href: "/services/events",
    icon: CalendarDays,
    title: "Event Security",
    points: ["Crowd management", "Entry and parking control", "VIP movement support"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Security Services"
        description="Professional manpower solutions for residential societies, commercial premises, and events."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 inline-flex rounded-xl bg-navy-50 p-3 text-navy-700">
                <service.icon className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold text-navy-900">{service.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {service.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
              <Link
                href={service.href}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-navy-700"
              >
                View details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
