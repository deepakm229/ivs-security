import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Personal Body Guards Service",
  description:
    "Hire trained personal bodyguards for executive protection, family security, and discreet close protection.",
};

export default function PersonalBodyguardsPage() {
  return (
    <>
      <PageHeader
        title="Personal Body Guards Service"
        description="Discreet, trained personal protection for executives, families, and high-profile individuals."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4 text-slate-700">
            <h2 className="text-2xl font-bold text-navy-900">Personal protection you can trust</h2>
            <p>
              Our personal bodyguards provide close protection for individuals and
              families who need reliable security at home, during travel, or at public
              engagements. We focus on professional conduct, discretion, and readiness.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Executive and VIP protection</li>
              <li>• Family and residential escort security</li>
              <li>• Travel and event accompaniment</li>
              <li>• Short-term and long-term assignments</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-semibold text-navy-900">Coverage options</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Single and multi-guard details</li>
              <li>Day, night, or round-the-clock protection</li>
              <li>Local and outstation assignments</li>
              <li>Confidential client handling</li>
            </ul>
            <Link
              href="/quote?service=bodyguard"
              className={cn(buttonVariants({ variant: "default" }), "mt-6 inline-flex")}
            >
              Get Bodyguard Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
