import {
  CTASection,
  Hero,
  ServiceCards,
  Testimonials,
  WhyChooseUs,
} from "@/components/home/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </>
  );
}
