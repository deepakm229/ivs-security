import Link from "next/link";
import { format } from "date-fns";
import { auth, signOut } from "@/auth";
import { LeadTable } from "@/components/admin/LeadTable";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

export default async function AdminDashboardPage() {
  const session = await auth();

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
            Signed in as {session?.user?.email} · {newCount} new lead
            {newCount === 1 ? "" : "s"}
          </p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
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
