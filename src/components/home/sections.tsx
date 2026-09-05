import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export { Hero } from "@/components/home/Hero";
export { ServiceCards } from "@/components/home/ServiceCards";
export { WhyChooseUs } from "@/components/home/WhyChooseUs";
export { Testimonials } from "@/components/home/Testimonials";

export function CTASection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="rounded-3xl bg-navy-900 px-6 py-10 text-center text-white md:px-12">
        <h2 className="text-3xl font-bold">Need security personnel for your site?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-300">
          Share your requirements and our team will contact you within 24 hours
          with a tailored quote.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/quote" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
            Request a Quote
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white/30 bg-transparent text-white hover:bg-white/10",
            )}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
