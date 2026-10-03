import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
          <Link href="/admin" className="inline-flex shrink-0 items-center gap-2 font-bold text-navy-900">
            <Image
              src="/images/logo.png"
              alt=""
              width={640}
              height={615}
              priority
              className="h-[54px] w-auto md:h-[70px]"
            />
            <span className="whitespace-nowrap text-[25px]">{SITE_NAME}</span>
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}
