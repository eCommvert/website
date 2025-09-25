import { HeroSection } from "@/components/hero-section";
import { HowWeHelpSection } from "@/components/how-we-help-section";
import { FeaturesSection } from "@/components/features-section";
import { SocialProofSection } from "@/components/social-proof-section";
import { CaseStudiesSection } from "@/components/case-studies-section";
import { PricingSection } from "@/components/pricing-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <HowWeHelpSection />
      <FeaturesSection />
      <SocialProofSection />
      <CaseStudiesSection />
      <PricingSection />
    </main>
  );
}
