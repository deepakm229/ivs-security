import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function QuoteSuccessPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-navy-900">Quote Request Received</h1>
      <p className="mt-4 text-slate-600">
        Thank you for your interest in IVS Security. Our team will review your
        requirements and contact you within 24 hours.
      </p>
      <Link href="/" className={cn(buttonVariants(), "mt-8 inline-flex")}>
        Back to Home
      </Link>
    </section>
  );
}
