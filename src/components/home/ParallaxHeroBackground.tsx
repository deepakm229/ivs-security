"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ParallaxHeroBackground({
  sectionRef,
  enabled = true,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  enabled?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const parallaxEnabled = enabled && !prefersReducedMotion;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="parallax-bg absolute inset-x-0 -top-[10%] h-[120%]"
        style={parallaxEnabled ? { y } : undefined}
      >
        <Image
          src="/images/hero-banner.png"
          alt=""
          fill
          priority
          className="object-cover object-[80%_center] md:object-right"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/92 via-navy-900/55 to-transparent" />
    </div>
  );
}
