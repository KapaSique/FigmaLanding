import { HeroSection } from "@/components/sections/hero";
import { BrandStorySection } from "@/components/sections/brand-story";
import { CatalogSection } from "@/components/sections/catalog";
import { BenefitsSection } from "@/components/sections/benefits";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { ContactsSection } from "@/components/sections/contacts";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandStorySection />
      <CatalogSection />
      <BenefitsSection />
      <TestimonialsSection />
      <ContactsSection />
    </>
  );
}
