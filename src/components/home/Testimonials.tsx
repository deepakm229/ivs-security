import {
  Briefcase,
  Building2,
  Quote,
  Star,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const testimonials: {
  quote: string;
  role: string;
  company: string;
  icon: LucideIcon;
  accent: string;
  accentSoft: string;
}[] = [
  {
    quote:
      "IVS Security has been managing our society gates for over two years. Guards are punctual and replacements are handled quickly.",
    role: "RWA Secretary",
    company: "Green Valley Apartments",
    icon: Building2,
    accent: "#1e4b8e",
    accentSoft: "#e8f0fb",
  },
  {
    quote:
      "We needed additional guards for a corporate event. The team deployed on short notice and managed entry professionally.",
    role: "Facility Manager",
    company: "Tech Park Office",
    icon: Briefcase,
    accent: "#2f7de1",
    accentSoft: "#eaf3ff",
  },
  {
    quote:
      "Reliable commercial security with proper documentation and supervisor visits. Highly recommended for warehouses.",
    role: "Operations Head",
    company: "Logistics Firm",
    icon: TrendingUp,
    accent: "#1aa39a",
    accentSoft: "#e7f7f5",
  },
];

export function Testimonials() {
  return (
    <section className="bg-[#f4f6fa] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-[#e8f1ff] px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-[#2f6fed]">
            TESTIMONIALS
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#12263d] md:text-4xl">
            What Clients Say
          </h2>
          <span className="mx-auto mt-3 block h-[3px] w-12 rounded-full bg-[#3b82f6]" />
          <p className="mt-4 text-[15px] text-slate-500">
            Trusted by residential communities and businesses across industries.
          </p>
        </div>

        <div className="grid gap-8 pt-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote
              key={item.role}
              className="relative rounded-2xl bg-white px-6 pb-6 pt-8 shadow-[0_10px_28px_rgba(15,23,42,0.06)]"
              style={{
                borderLeft: `3px solid ${item.accent}`,
                borderBottom: `3px solid ${item.accent}`,
              }}
            >
              <span
                className="absolute -left-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm"
                style={{ backgroundColor: item.accent }}
                aria-hidden="true"
              >
                <Quote className="h-4 w-4 fill-white" strokeWidth={0} />
              </span>

              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-[#f5c518] text-[#f5c518]"
                  />
                ))}
              </div>

              <p className="relative z-10 text-[15px] leading-7 text-slate-600">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="relative z-10 mt-5 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: item.accentSoft,
                      color: item.accent,
                    }}
                  >
                    <item.icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <footer>
                    <div className="text-sm font-semibold text-[#12263d]">
                      {item.role}
                    </div>
                    <div className="text-xs text-slate-500">{item.company}</div>
                  </footer>
                </div>
              </div>

              <Quote
                className="pointer-events-none absolute bottom-3 right-4 h-14 w-14 text-slate-200"
                strokeWidth={1.25}
                aria-hidden="true"
              />
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
