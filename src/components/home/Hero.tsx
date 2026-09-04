"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ParallaxHeroBackground } from "@/components/home/ParallaxHeroBackground";
import { useDesktopParallax } from "@/hooks/use-reduced-motion";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxEnabled = useDesktopParallax();

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[560px] overflow-hidden text-white md:min-h-[620px]"
    >
      <ParallaxHeroBackground sectionRef={sectionRef} enabled={parallaxEnabled} />

      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="max-w-xl">
            <p className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm text-gold-300">
              Licensed security manpower provider
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Reliable Security. Anytime, Anywhere.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-200">
              Trained and uniformed security personnel for residential, commercial,
              and event needs, with dependable supervision and quick replacement.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/quote" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/30 bg-transparent text-white hover:bg-white/10",
                )}
              >
                View Services
              </Link>
            </div>
          </div>

          {/* Right column intentionally empty so the guard in the background stays visible */}
          <div className="hidden md:block" aria-hidden="true" />
        </div>

        <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
          {[
            { label: "Guards deployed", value: "500+" },
            { label: "Sites covered", value: "120+" },
            { label: "Years of service", value: "10+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/15 bg-navy-950/50 p-5 backdrop-blur-sm"
            >
              <div className="text-3xl font-bold text-gold-400">{stat.value}</div>
              <div className="mt-1 text-sm text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
