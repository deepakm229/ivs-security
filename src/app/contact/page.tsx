import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact IVS Security for security manpower inquiries and support.",
};

export default function ContactPage() {
  const phone = process.env.NEXT_PUBLIC_PHONE ?? "+919876543210";
  const email = process.env.NEXT_PUBLIC_EMAIL ?? "ivsindia1986@gmail.com";
  const address =
    process.env.NEXT_PUBLIC_ADDRESS ??
    "No. 315, R-4, Vakil Marigold, Vakil Township, Chandapura, Bangalore - 562107";
  const city = process.env.NEXT_PUBLIC_CITY ?? "Bangalore";

  return (
    <>
      <PageHeader
        title="Contact Us"
        description={`Reach IVS Security for quotes, site visits, and service inquiries in ${city} and nearby areas.`}
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-navy-900">Get in touch</h2>
            <ul className="mt-4 space-y-4 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-navy-700" />
                <a href={`tel:${phone}`} className="hover:text-navy-800">
                  {phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-navy-700" />
                <a href={`mailto:${email}`} className="hover:text-navy-800">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-navy-700" />
                <span>{address}</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-navy-900">Opening Hours</h2>
            <ul className="mt-4">
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day) => (
                <li
                  key={day}
                  className="flex items-center justify-between border-b border-slate-200 py-3 text-sm last:border-b-0 last:pb-0"
                >
                  <span className="text-slate-500">{day}</span>
                  <span className="font-medium text-slate-900">12:00 AM - 11:59 PM</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
            <h3 className="font-semibold text-navy-900">Coverage area</h3>
            <p className="mt-2">
              We serve {city} and nearby residential, commercial, and event locations.
              Contact us to confirm availability for your area.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-navy-900">Send a message</h2>
          <Suspense fallback={<div>Loading form...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
