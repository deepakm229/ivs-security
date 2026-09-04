import Link from "next/link";
import { ArrowRight, Building2, CalendarDays, Home } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export { Hero } from "@/components/home/Hero";

export function ServiceCards() {
  const services = [
    {
      href: "/services/residential",
      icon: Home,
      title: "Residential Security",
      description:
        "24/7 gate security, visitor management, and patrol for apartments and housing societies.",
    },
    {
      href: "/services/commercial",
      icon: Building2,
      title: "Commercial Security",
      description:
        "Professional guards for offices, warehouses, retail, and industrial facilities.",
    },
    {
      href: "/services/events",
      icon: CalendarDays,
      title: "Event Security",
      description:
        "Temporary security teams for weddings, corporate events, exhibitions, and concerts.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-3xl font-bold text-navy-900">Our Security Services</h2>
        <p className="mt-3 text-slate-600">
          Manpower solutions tailored for residential, commercial, and event
          requirements across your local area.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-navy-200 hover:shadow-md"
          >
            <div className="mb-4 inline-flex rounded-xl bg-navy-50 p-3 text-navy-700">
              <service.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-navy-900">{service.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {service.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-700 group-hover:gap-2">
              Learn more <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  const points = [
    "Background-verified and trained security personnel",
    "Quick guard replacement within 24 hours",
    "Supervisor visits and regular performance checks",
    "Flexible shift options: 8, 12, and 24 hours",
    "Uniformed staff with professional conduct",
    "Local deployment across nearby areas",
  ];

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-navy-900">Why Choose IVS Security?</h2>
            <p className="mt-3 text-slate-600">
              We focus on dependable manpower, clear communication, and responsive
              support so your premises stay protected without operational hassle.
            </p>
          </div>
          <ul className="grid gap-3">
            {points.map((point) => (
              <li
                key={point}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "IVS Security has been managing our society gates for over two years. Guards are punctual and replacements are handled quickly.",
      author: "RWA Secretary, Green Valley Apartments",
    },
    {
      quote:
        "We needed additional guards for a corporate event. The team deployed on short notice and managed entry professionally.",
      author: "Facility Manager, Tech Park Office",
    },
    {
      quote:
        "Reliable commercial security with proper documentation and supervisor visits. Highly recommended for warehouses.",
      author: "Operations Head, Logistics Firm",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-3xl font-bold text-navy-900">What Clients Say</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <blockquote
            key={item.author}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm leading-6 text-slate-700">&ldquo;{item.quote}&rdquo;</p>
            <footer className="mt-4 text-sm font-semibold text-navy-800">
              {item.author}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

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
