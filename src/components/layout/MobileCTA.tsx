"use client";

import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export function MobileCTA() {
  const pathname = usePathname();
  const phone = process.env.NEXT_PUBLIC_PHONE ?? "+919876543210";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? "919876543210";

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white p-3 shadow-lg md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <Link
          href={`tel:${phone}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy-700 px-4 py-3 text-sm font-semibold text-white"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </Link>
        <Link
          href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi, I need security services.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </Link>
      </div>
    </div>
  );
}
