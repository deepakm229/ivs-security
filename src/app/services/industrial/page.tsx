import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Industrial Security Guards Service",
  description:
    "Hire trained industrial security guards for factories, plants, warehouses, and manufacturing campuses.",
};

export default function IndustrialSecurityPage() {
  return (
    <>
      <PageHeader
        title="Industrial Security Guards Service"
        description="Trained security manpower for factories, plants, and industrial campuses with reliable shift coverage."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4 text-slate-700">
            <h2 className="text-2xl font-bold text-navy-900">Secure industrial operations</h2>
            <p>
              IVS Security deploys industrial security guards for manufacturing units,
              processing plants, and large industrial campuses. Our teams support gate
              control, perimeter patrols, and material movement checks around the clock.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Factory and plant gate security</li>
              <li>• Perimeter and night patrol coverage</li>
              <li>• Material and vehicle entry checks</li>
              <li>• Shift-based industrial manpower</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-semibold text-navy-900">Ideal for</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Manufacturing plants</li>
              <li>Industrial parks and SEZs</li>
              <li>Warehouses and logistics hubs</li>
              <li>Processing and utility facilities</li>
            </ul>
            <Link
              href="/quote?service=industrial"
              className={cn(buttonVariants({ variant: "default" }), "mt-6 inline-flex")}
            >
              Get Industrial Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
