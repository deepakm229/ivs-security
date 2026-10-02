import { format } from "date-fns";
import { LeadTable } from "@/components/admin/LeadTable";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/lib/auth/actions";
import { PERMISSIONS } from "@/lib/auth/permissions";
import { requirePermissionForPage } from "@/lib/auth/guards";
import { db } from "@/lib/db";

export default async function AdminDashboardPage() {
  const user = await requirePermissionForPage(PERMISSIONS.LEADS_READ);

  const leads = await db.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serializedLeads = leads.map((lead) => ({
    ...lead,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
  }));

  const newCount = leads.filter((lead) => lead.status === "NEW").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Lead Dashboard</h1>
          <p className="text-sm text-slate-600">
            Signed in as {user.email} · {newCount} new lead
            {newCount === 1 ? "" : "s"}
          </p>
        </div>
        <form action={signOutAction}>
          <Button type="submit" variant="outline">
            Sign Out
          </Button>
        </form>
      </div>

      <LeadTable leads={serializedLeads} />

      <p className="text-xs text-slate-500">
        Latest update: {format(new Date(), "dd MMM yyyy, hh:mm a")}
      </p>
    </div>
  );
}
