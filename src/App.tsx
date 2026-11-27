import { EnquiryCta, SiteFooter } from "@/components/landing/EnquiryCta";
import { Hero } from "@/components/landing/Hero";
import { SectionNav } from "@/components/landing/SectionNav";
import {
  Amenities,
  Faqs,
  FloorPlans,
  HowToBuy,
  LocationMap,
  Overview,
  ProjectProgress,
  Specification,
  Testimonials,
  WhyKumarapuram,
  WhyPearl,
} from "@/components/landing/Sections";
// import { SiteHeader } from "@/components/landing/SiteHeader";
import { FAQS } from "@/data/pearl";
import { useEffect } from "react";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.title,
    acceptedAnswer: { "@type": "Answer", text: f.body },
  })),
};

export default function App() {
  useEffect(() => {
    // Inject FAQ structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* <SiteHeader /> */}
      <main>
        <Hero />
        <div className="page-container grid gap-10 pt-12 md:pt-14 lg:grid-cols-[185px_1fr] lg:gap-12">
          <SectionNav />
          <div className="min-w-0">
            <Overview />
            <WhyKumarapuram />
            <WhyPearl />
            <Amenities />
            <Specification />
            <FloorPlans />
            <LocationMap />
            <ProjectProgress />
            <HowToBuy />
            <Testimonials />
            <Faqs />
          </div>
        </div>
        <EnquiryCta />
      </main>
      <SiteFooter />
    </div>
  );
}

