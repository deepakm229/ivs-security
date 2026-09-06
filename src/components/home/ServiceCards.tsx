import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Factory,
  Home,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Service = {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  imagePosition: string;
  variant: "compact" | "wide";
};

const services: Service[] = [
  {
    href: "/services/residential",
    icon: Home,
    title: "Residential Security",
    description:
      "Round-the-clock gate security, visitor management, and patrol for apartments and housing societies.",
    image: "/images/services/residential.jpg",
    imagePosition: "68% center",
    variant: "compact",
  },
  {
    href: "/services/commercial",
    icon: Building2,
    title: "Commercial Security",
    description:
      "Professional guards for offices, warehouses, retail, and industrial facilities.",
    image: "/images/services/commercial.jpg",
    imagePosition: "72% center",
    variant: "compact",
  },
  {
    href: "/services/events",
    icon: CalendarDays,
    title: "Event Security",
    description:
      "Temporary security teams for weddings, corporate events, exhibitions, and concerts.",
    image: "/images/services/events.jpg",
    imagePosition: "70% center",
    variant: "compact",
  },
  {
    href: "/services/industrial",
    icon: Factory,
    title: "Industrial Security Guards Service",
    description:
      "Trained guards for factories, plants, and industrial campuses with gate and perimeter coverage.",
    image: "/images/services/industrial.jpg",
    imagePosition: "62% center",
    variant: "wide",
  },
  {
    href: "/services/bodyguards",
    icon: UserRound,
    title: "Personal Body Guards Service",
    description:
      "Discreet, trained personal protection for executives, families, and high-profile individuals.",
    image: "/images/services/bodyguard.jpg",
    imagePosition: "58% center",
    variant: "wide",
  },
];

function DotGrid() {
  return (
    <div className="mt-1 grid grid-cols-4 gap-[3px]" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, index) => (
        <span
          key={index}
          className="h-[3px] w-[3px] rounded-full bg-slate-300"
        />
      ))}
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const isWide = service.variant === "wide";

  return (
    <Link
      href={service.href}
      className={cn(
        "group relative isolate block overflow-hidden rounded-[18px] bg-white shadow-[0_10px_32px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition duration-300",
        "hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)]",
        isWide ? "min-h-[260px] md:min-h-[280px]" : "min-h-[270px] lg:min-h-[300px]",
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={service.image}
          alt=""
          fill
          sizes={
            isWide
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 1024px) 100vw, 33vw"
          }
          className="object-cover opacity-55 transition duration-500 group-hover:scale-105 group-hover:opacity-65"
          style={{ objectPosition: service.imagePosition }}
        />
      </div>

      <div className="absolute inset-0 bg-white/40" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #ffffff 0%, #ffffff 58%, rgba(255,255,255,0.97) 68%, rgba(255,255,255,0.75) 82%, rgba(255,255,255,0.5) 100%)",
        }}
      />

      <div
        className={cn(
          "relative z-10 flex h-full flex-col p-6 pr-[46%] sm:p-7",
          isWide ? "min-h-[260px] md:min-h-[280px]" : "min-h-[270px] lg:min-h-[300px]",
        )}
      >
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0a2342] text-white shadow-sm">
            <service.icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <DotGrid />
        </div>

        <h3 className="mt-5 text-[1.2rem] font-bold leading-snug text-[#0a2342] sm:text-[1.25rem]">
          {service.title}
        </h3>
        <span className="mt-2.5 h-[3px] w-10 rounded-full bg-[#7ec8ea]" />
        <p className="mt-3 max-w-[15.5rem] text-sm leading-6 text-slate-600">
          {service.description}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-[#0a2342] transition-all group-hover:gap-2.5">
          Learn more
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>

      <div
        className="absolute bottom-0 right-0 z-20 h-[78px] w-[78px] bg-[#0a2342]"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
        aria-hidden="true"
      >
        <ShieldCheck className="absolute bottom-2.5 right-2.5 h-[18px] w-[18px] text-white" strokeWidth={1.75} />
      </div>
    </Link>
  );
}

export function ServiceCards({ showIntro = true }: { showIntro?: boolean } = {}) {
  const compact = services.filter((service) => service.variant === "compact");
  const wide = services.filter((service) => service.variant === "wide");

  return (
    <section className={cn("mx-auto max-w-6xl px-4", showIntro ? "py-16" : "py-12")}>
      {showIntro ? (
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold text-navy-900">Our Security Services</h2>
          <p className="mt-3 text-slate-600">
            Manpower solutions tailored for residential, commercial, industrial,
            event, and personal protection requirements across your local area.
          </p>
        </div>
      ) : null}

      <div className="grid gap-5">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {compact.map((service) => (
            <ServiceCard key={service.href} service={service} />
          ))}
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {wide.map((service) => (
            <ServiceCard key={service.href} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
