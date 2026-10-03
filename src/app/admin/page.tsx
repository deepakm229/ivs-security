import { format } from "date-fns";
import Link from "next/link";
import { LeadTable } from "@/components/admin/LeadTable";
import { Button, buttonVariants } from "@/components/ui/button";
import { signOutAction } from "@/lib/auth/actions";
import { cn } from "@/lib/utils";
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
        <div className="flex items-center gap-3">
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
            Home
          </Link>
          <form action={signOutAction}>
            <Button type="submit" variant="outline">
              Sign Out
            </Button>
          </form>
        </div>
      </div>

      <LeadTable leads={serializedLeads} />

      <p className="text-xs text-slate-500">
        Latest update: {format(new Date(), "dd MMM yyyy, hh:mm a")}
      </p>
    </div>
  );
}
