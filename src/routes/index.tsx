import { createFileRoute } from "@tanstack/react-router";

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
import { SiteHeader } from "@/components/landing/SiteHeader";
import { FAQS } from "@/data/pearl";

const TITLE = "Ready to Occupy Flats in Kumarapuram, Trivandrum | VFIVE Pearl";
const DESCRIPTION =
  "VFIVE Pearl offers ready to occupy 2 and 3 BHK flats in Kumarapuram, Trivandrum, about 1 km from Medical College. K-RERA registered. Book a site visit.";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.title,
    acceptedAnswer: { "@type": "Answer", text: f.body },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqSchema) }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
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
