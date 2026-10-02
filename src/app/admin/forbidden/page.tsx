import Link from "next/link";
import { signOutAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";

export default function AdminForbiddenPage() {
  return (
    <div className="mx-auto max-w-md space-y-4 rounded-xl border border-slate-200 bg-white p-8 text-center">
      <h1 className="text-xl font-bold text-navy-900">Access denied</h1>
      <p className="text-sm text-slate-600">
        Your account is signed in but does not have permission to use the admin
        portal. Contact an administrator to assign a role.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-navy-200 bg-white px-5 text-sm font-semibold text-navy-800 hover:bg-navy-50"
        >
          Back to website
        </Link>
        <form action={signOutAction}>
          <Button type="submit" variant="default" className="w-full">
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}
