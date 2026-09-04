import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Event Security",
  description:
    "Temporary security teams for weddings, corporate events, exhibitions, and public gatherings.",
};

export default function EventSecurityPage() {
  return (
    <>
      <PageHeader
        title="Event Security"
        description="Short-notice and planned security coverage for weddings, corporate events, and public gatherings."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4 text-slate-700">
            <h2 className="text-2xl font-bold text-navy-900">Safe and smooth events</h2>
            <p>
              From intimate gatherings to large public events, we provide trained
              security teams for crowd control, entry management, parking supervision,
              and VIP movement support.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Wedding and reception security</li>
              <li>• Corporate conferences and exhibitions</li>
              <li>• Concerts and public events</li>
              <li>• Parking and entry point management</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-semibold text-navy-900">Planning support</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Site assessment before event day</li>
              <li>Flexible guard count by crowd size</li>
              <li>Coordination with event organizers</li>
              <li>Same-day deployment when possible</li>
            </ul>
            <Link
              href="/quote?service=event"
              className={cn(buttonVariants({ variant: "default" }), "mt-6 inline-flex")}
            >
              Get Event Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
