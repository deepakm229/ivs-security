import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Request a free security services quote for residential, commercial, or event requirements.",
};

export default function QuotePage() {
  return (
    <>
      <PageHeader
        title="Request a Quote"
        description="Tell us about your security requirement and our team will contact you within 24 hours."
      />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <Suspense fallback={<div>Loading form...</div>}>
            <QuoteForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
