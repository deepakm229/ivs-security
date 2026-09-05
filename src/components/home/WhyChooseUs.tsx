import Image from "next/image";
import {
  Award,
  CalendarClock,
  Clock,
  Headset,
  ShieldCheck,
  User,
  type LucideIcon,
} from "lucide-react";

const points: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: ShieldCheck,
    title: "Background-verified and trained security personnel",
    description: "Every guard is verified, trained, and regularly evaluated.",
  },
  {
    icon: Clock,
    title: "Quick guard replacement within 24 hours",
    description: "We ensure zero disruption with our fast replacement promise.",
  },
  {
    icon: Award,
    title: "Supervisor visits and regular performance checks",
    description: "On-ground supervision to maintain high service standards.",
  },
  {
    icon: CalendarClock,
    title: "Flexible shift options: 8, 12, and 24 hours",
    description: "Choose shifts that fit your operational requirements.",
  },
  {
    icon: Headset,
    title: "Uniformed staff with professional conduct",
    description: "Neat appearance, proper etiquette, and complete professionalism.",
  },
  {
    icon: User,
    title: "Local deployment across your city/area",
    description: "Quick mobilization with local presence for better response.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
        <div className="flex min-h-0 flex-col">
          <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.22em] text-[#2f6fed]">
            <span className="h-[2px] w-6 bg-[#2f6fed]" />
            WHY CHOOSE US
          </p>
          <h2 className="mt-3 text-[2rem] font-bold leading-[1.15] text-[#12263d] md:text-[2.35rem]">
            Why Choose IVS Security?
          </h2>
          <span className="mt-3 block h-[3px] w-11 rounded-full bg-[#3b82f6]" />
          <p className="mt-4 max-w-[26rem] text-[15px] leading-7 text-slate-500">
            We focus on dependable manpower, clear communication, and responsive
            support so your premises stay protected without operational hassle.
          </p>

          <div className="mt-4 overflow-hidden">
            <Image
              src="/images/why-choose-graphic.png"
              alt="IVS Security guard on duty"
              width={1024}
              height={870}
              className="relative h-auto w-full object-contain"
              sizes="(max-width: 1024px) 90vw, 42vw"
            />
          </div>
        </div>

        <ul className="flex flex-col justify-center gap-3.5">
          {points.map((point) => (
            <li
              key={point.title}
              className="flex items-center gap-4 rounded-[22px] bg-white px-5 py-[18px] shadow-[0_10px_28px_rgba(15,23,42,0.06)]"
            >
              <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#eaf3ff] text-[#2f6fed]">
                <point.icon className="h-[22px] w-[22px]" strokeWidth={1.7} />
              </span>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold leading-snug text-[#12263d]">
                  {point.title}
                </p>
                <p className="mt-1 text-[13px] leading-5 text-slate-500">
                  {point.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
