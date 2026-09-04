import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { LeadUpdateForm } from "@/components/admin/LeadUpdateForm";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { getServiceLabel, getStatusLabel } from "@/lib/constants";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await db.lead.findUnique({ where: { id } });

  if (!lead) notFound();

  const metadata =
    lead.metadata && lead.metadata !== "{}"
      ? (JSON.parse(lead.metadata) as Record<string, string>)
      : {};

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin" className="text-sm text-navy-700 hover:underline">
          ← Back to leads
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-navy-900">{lead.name}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge status={lead.status}>{getStatusLabel(lead.status)}</Badge>
          <span className="text-sm text-slate-500">
            Received {format(lead.createdAt, "dd MMM yyyy, hh:mm a")}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-navy-900">Lead Details</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-slate-500">Phone</dt>
              <dd className="font-medium">{lead.phone}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Email</dt>
              <dd className="font-medium">{lead.email ?? "Not provided"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Service</dt>
              <dd className="font-medium">{getServiceLabel(lead.serviceType)}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Location</dt>
              <dd className="font-medium">{lead.location ?? "Not provided"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Source</dt>
              <dd className="font-medium">{lead.source}</dd>
            </div>
            {lead.message && (
              <div>
                <dt className="text-slate-500">Message</dt>
                <dd className="font-medium whitespace-pre-wrap">{lead.message}</dd>
              </div>
            )}
          </dl>

          {Object.keys(metadata).length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium text-navy-900">Additional details</h3>
              <dl className="mt-3 space-y-2 text-sm">
                {Object.entries(metadata).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        <LeadUpdateForm lead={lead} />
      </div>
    </div>
  );
}
