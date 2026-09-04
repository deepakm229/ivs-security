import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Commercial Security",
  description:
    "Professional security guards for offices, warehouses, retail stores, and industrial facilities.",
};

export default function CommercialSecurityPage() {
  return (
    <>
      <PageHeader
        title="Commercial Security"
        description="Deploy trained security personnel for offices, warehouses, retail, and industrial sites."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4 text-slate-700">
            <h2 className="text-2xl font-bold text-navy-900">Secure your business premises</h2>
            <p>
              IVS Security provides professional guards for commercial properties with
              emphasis on access control, asset protection, and staff safety. We support
              long-term contracts with supervisor oversight.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Office and corporate building security</li>
              <li>• Warehouse and logistics facility coverage</li>
              <li>• Retail and showroom protection</li>
              <li>• Industrial and factory gate management</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-semibold text-navy-900">Contract options</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Monthly and annual contracts</li>
              <li>Multiple shift rotations</li>
              <li>Supervisor reporting</li>
              <li>Scalable guard count</li>
            </ul>
            <Link
              href="/quote?service=commercial"
              className={cn(buttonVariants({ variant: "default" }), "mt-6 inline-flex")}
            >
              Get Commercial Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
