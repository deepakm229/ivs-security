import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about IVS Security — a trusted provider of trained security manpower for residential, commercial, and event sites.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About IVS Security"
        description="We provide dependable security manpower with trained personnel, responsive support, and professional supervision."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4 text-slate-700">
            <h2 className="text-2xl font-bold text-navy-900">Our Mission</h2>
            <p>
              IVS Security helps residential societies, commercial facilities, and
              event organizers protect people and property through reliable guard
              deployment. We focus on punctual staff, clear communication, and
              quick replacements when needed.
            </p>
            <p>
              From long-term building contracts to short-notice event coverage, our
              team manages recruitment, training, supervision, and deployment so
              clients can focus on their operations.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-navy-900">Why clients trust us</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>Licensed and compliant security operations</li>
              <li>Background-verified guard recruitment</li>
              <li>Supervisor visits and performance monitoring</li>
              <li>Fast replacement support for active contracts</li>
              <li>Coverage across nearby residential and commercial areas</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
