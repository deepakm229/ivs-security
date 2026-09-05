import type { Metadata } from "next";
import { ServiceCards } from "@/components/home/ServiceCards";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore IVS Security services for residential buildings, commercial facilities, industrial sites, events, and personal protection.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Security Services"
        description="Professional manpower solutions for residential societies, commercial premises, industrial sites, events, and personal protection."
      />
      <ServiceCards showIntro={false} />
    </>
  );
}
