"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { HeaderAuth, HeaderSignOut, useHeaderSession } from "@/components/auth/HeaderAuth";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const session = useHeaderSession();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
        <Link href="/" className="inline-flex shrink-0 items-center gap-2 font-bold text-navy-900">
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

        <nav className="hidden items-center gap-4 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-navy-700",
                pathname === link.href ? "text-navy-800" : "text-slate-600",
              )}
            >
              {link.label}
            </Link>
          ))}
          <HeaderAuth {...session} />
          <Link
            href="/quote"
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
          >
            Get Quote
          </Link>
          {session.signedIn && <HeaderSignOut />}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-700"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col items-start gap-3 pt-2">
              <HeaderAuth {...session} />
              {session.signedIn && <HeaderSignOut />}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
