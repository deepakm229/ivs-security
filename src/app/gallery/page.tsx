import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { CTASection } from "@/components/home/sections";
import { PageHeader } from "@/components/layout/PageHeader";
import { GALLERY_IMAGES } from "@/lib/gallery";
import { SITE_CITY } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photos of IVS Security guards, sites, and events in ${SITE_CITY} — uniforms, residential posts, commercial coverage, and event teams.`,
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Gallery"
        description="A look at our uniformed personnel on residential, commercial, industrial, and event assignments."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <GalleryGrid images={GALLERY_IMAGES} />
      </section>
      <CTASection />
    </>
  );
}
