"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone, Shield } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { SITE_ADDRESS, SITE_EMAIL } from "@/lib/site-contact";

export function Footer() {
  const pathname = usePathname();
  const phone = process.env.NEXT_PUBLIC_PHONE ?? "+919876543210";
  const email = SITE_EMAIL;
  const address = SITE_ADDRESS;

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-slate-200 bg-navy-950 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-4 flex items-center gap-2 font-bold text-white">
            <Shield className="h-5 w-5 text-gold-400" />
            {SITE_NAME}
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-300">
            Reliable security manpower for residential buildings, commercial
            facilities, and events. Trained guards, quick deployment, and
            dependable supervision.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/services/residential" className="hover:text-white">
                Residential Security
              </Link>
            </li>
            <li>
              <Link href="/services/commercial" className="hover:text-white">
                Commercial Security
              </Link>
            </li>
            <li>
              <Link href="/services/events" className="hover:text-white">
                Event Security
              </Link>
            </li>
            <li>
              <Link href="/services/industrial" className="hover:text-white">
                Industrial Security Guards
              </Link>
            </li>
            <li>
              <Link href="/services/bodyguards" className="hover:text-white">
                Personal Body Guards
              </Link>
            </li>
            <li>
              <Link href="/quote" className="hover:text-white">
                Request a Quote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={`tel:${phone}`} className="hover:text-white">
                {phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={`mailto:${email}`} className="hover:text-white">
                {email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>{address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
