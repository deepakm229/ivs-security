import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Residential Security",
  description:
    "Hire trained security guards for apartments, gated communities, and housing societies.",
};

export default function ResidentialSecurityPage() {
  return (
    <>
      <PageHeader
        title="Residential Security"
        description="Reliable gate and patrol security for apartments, housing societies, and gated communities."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4 text-slate-700">
            <h2 className="text-2xl font-bold text-navy-900">Protect your community</h2>
            <p>
              Our residential security teams manage gate access, visitor logs, delivery
              coordination, and night patrols. We provide uniformed guards for 8, 12,
              and 24-hour shifts based on your society&apos;s needs.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Main gate and lobby security</li>
              <li>• Visitor and vendor entry management</li>
              <li>• Emergency response coordination</li>
              <li>• Quick guard replacement support</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-semibold text-navy-900">Ideal for</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Apartment complexes</li>
              <li>Gated communities</li>
              <li>Housing societies and RWAs</li>
              <li>Residential townships</li>
            </ul>
            <Link
              href="/quote?service=residential"
              className={cn(buttonVariants({ variant: "default" }), "mt-6 inline-flex")}
            >
              Get Residential Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
