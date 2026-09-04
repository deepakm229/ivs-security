import Link from "next/link";
import { Shield } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold text-navy-900">
            <Shield className="h-5 w-5" />
            {SITE_NAME} Admin
          </Link>
          <Link href="/" className="text-sm text-slate-600 hover:text-navy-800">
            View Website
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}
