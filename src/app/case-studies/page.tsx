import { CaseStudiesSection } from "@/components/case-studies-section";

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <section className="pt-12">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Case Studies</h1>
            <p className="text-muted-foreground mb-8">Real client success stories. Explore detailed results and approaches.</p>
          </div>
          <CaseStudiesSection />
        </section>
      </main>
    </div>
  );
}


