import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { SocialProofSection } from "@/components/social-proof-section";
import { PricingSection } from "@/components/pricing-section";
import { CTASection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <HeroSection />
      <FeaturesSection />
      <SocialProofSection />
      <PricingSection />
      <CTASection />
      <SiteFooter />
    </main>
  );
}
