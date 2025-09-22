"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight,
  Users,
  ShoppingCart
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CaseStudyDetailModal } from "@/components/case-study-detail-modal";

// Interface matching the admin dashboard
interface CaseStudy {
  id: string;
  title: string;
  category: string;
  industry: string;
  client: string;
  duration: string;
  monthlySpend: string;
  challenge: string;
  solution: string;
  results: {
    metric1: { name: string; before: number; after: number; improvement: number; format: string; points?: number };
    metric2: { name: string; before: number; after: number; improvement: number; format: string; points?: number };
    metric3: { name: string; before: number; after: number; improvement: number; format: string; points?: number };
    metric4: { name: string; before: number; after: number; improvement: number; format: string; points?: number };
  };
  image: string;
  testimonial: string;
  author: string;
  role: string;
  isActive: boolean;
  // Detailed case study content
  detailedContent?: {
    heroImage?: string;
    executiveSummary?: string;
    background?: string;
    challenges?: string;
    approach?: string;
    implementation?: string;
    results?: string;
    lessonsLearned?: string;
    images?: Array<{
      url: string;
      caption?: string;
      alt?: string;
    }>;
    additionalMetrics?: Array<{
      name: string;
      value: string;
      description?: string;
    }>;
  };
}

// Legacy results shape used in older saved data
type LegacyResults = {
  roas: { before: number; after: number; improvement: number };
  cpa: { before: number; after: number; improvement: number };
  revenue: { before: number; after: number; improvement: number };
  conversion: { before: number; after: number; improvement: number };
};

// Default case studies (fallback) - using original data with testimonials
const defaultCaseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "E-commerce Fashion Brand",
    category: "Fashion & Apparel",
    industry: "DTC Fashion",
    client: "StyleForward Co.",
    duration: "6 months",
    monthlySpend: "$45K",
    challenge: "Low ROAS (2.1x) and high customer acquisition costs preventing profitable growth",
    solution: "Complete Google Ads restructure with advanced audience targeting and conversion optimization",
    results: {
      metric1: { name: "ROAS", before: 2.1, after: 4.8, improvement: 0, format: "number" },
      metric2: { name: "CPA", before: 85, after: 42, improvement: 0, format: "currency" },
      metric3: { name: "Revenue", before: 180000, after: 432000, improvement: 0, format: "currency" },
      metric4: { name: "Conversion", before: 1.8, after: 3.2, improvement: 0, format: "percentage" }
    },
    image: "/case-studies/fashion-brand.jpg",
    testimonial: "Denis transformed our ad performance completely. We went from barely breaking even to profitable growth in just 3 months.",
    author: "Sarah Chen",
    role: "CMO, StyleForward Co.",
    isActive: true
  },
  {
    id: "2",
    title: "Home & Garden Retailer",
    category: "Home & Garden",
    industry: "E-commerce Retail",
    client: "GreenSpace Living",
    duration: "4 months",
    monthlySpend: "$28K",
    challenge: "Seasonal fluctuations causing inconsistent performance and wasted budget during off-peak periods",
    solution: "Dynamic seasonal bidding strategies with inventory-aware campaigns and smart budget allocation",
    results: {
      metric1: { name: "ROAS", before: 2.8, after: 5.2, improvement: 0, format: "number" },
      metric2: { name: "CPA", before: 65, after: 35, improvement: 0, format: "currency" },
      metric3: { name: "Revenue", before: 156000, after: 291200, improvement: 0, format: "currency" },
      metric4: { name: "Conversion", before: 2.1, after: 3.8, improvement: 0, format: "percentage" }
    },
    image: "/case-studies/home-garden.jpg",
    testimonial: "The seasonal optimization strategy was a game-changer. We now maximize ROI during peak seasons and minimize waste during slower periods.",
    author: "Mike Rodriguez",
    role: "Marketing Director, GreenSpace Living",
    isActive: true
  },
  {
    id: "3",
    title: "Tech Accessories Brand",
    category: "Electronics",
    industry: "Consumer Tech",
    client: "TechFlow Solutions",
    duration: "5 months",
    monthlySpend: "$35K",
    challenge: "High competition in tech space with declining ad relevance and increasing costs",
    solution: "Advanced audience segmentation with creative testing and landing page optimization",
    results: {
      metric1: { name: "ROAS", before: 1.9, after: 4.1, improvement: 0, format: "number" },
      metric2: { name: "CPA", before: 95, after: 46, improvement: 0, format: "currency" },
      metric3: { name: "Revenue", before: 133000, after: 287000, improvement: 0, format: "currency" },
      metric4: { name: "Conversion", before: 1.6, after: 2.9, improvement: 0, format: "percentage" }
    },
    image: "/case-studies/tech-accessories.jpg",
    testimonial: "Denis helped us stand out in a crowded market. Our conversion rates doubled and we're now profitable at scale.",
    author: "Lisa Park",
    role: "CEO, TechFlow Solutions",
    isActive: true
  }
];

// Redesigned minimal metric card component
const MetricCard = ({ 
  metric,
  icon: Icon
}: {
  metric: { name: string; before: number; after: number; improvement: number; format: string; points?: number };
  icon: React.ComponentType<{ className?: string }>; 
}) => {
  const formatValue = (value: number | null | undefined, format: string | null | undefined) => {
    const safe = typeof value === 'number' && !Number.isNaN(value) ? value : 0;
    const fmt = format || 'number';
    if (fmt === 'currency') return safe >= 1000 ? `$${(safe/1000).toFixed(0)}K` : `$${safe}`;
    if (fmt === 'percentage') return `${safe}%`;
    if (fmt === 'percentage-points') return `${safe}pp`;
    return String(safe);
  };

  // Calculate improvement percentage correctly
  const calculateImprovement = (before: number, after: number) => {
    if (before === 0) return after > 0 ? 100 : 0;
    return Math.round(((after - before) / before) * 100);
  };

  const actualImprovement = calculateImprovement(metric.before, metric.after);
  const isPercentageOnly = metric.format === "percentage-only";
  const isPoints = metric.format === "percentage-points";
  const isImprovement = actualImprovement > 0;
  const improvementValue = isPoints ? (metric.points ?? 0) : actualImprovement;

  return (
    <div className="bg-muted/30 rounded-lg p-4 border border-border/50 hover:border-border transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{metric.name}</span>
      </div>

      <div className="space-y-3">
        {!isPercentageOnly && !isPoints ? (
          <>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-muted-foreground">Before</span>
              <span className="text-sm font-medium text-foreground">{formatValue(metric.before, metric.format)}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-muted-foreground">After</span>
              <span className="text-lg font-bold text-foreground">{formatValue(metric.after, metric.format)}</span>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {isPoints ? `${improvementValue >= 0 ? '+' : ''}${improvementValue}pp` : `${improvementValue > 0 ? '+' : ''}${improvementValue}%`}
            </div>
            <div className="text-xs text-muted-foreground">Improvement</div>
          </div>
        )}
        
        {/* Subtle improvement indicator */}
        <div className="flex justify-end">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            isImprovement 
              ? 'bg-green-500/10 text-green-600 border border-green-500/20' 
              : 'bg-red-500/10 text-red-600 border border-red-500/20'
          }`}>
            {isPoints ? `${improvementValue >= 0 ? '+' : ''}${improvementValue}pp` : `${improvementValue > 0 ? '+' : ''}${improvementValue}%`}
          </span>
        </div>
      </div>
    </div>
  );
};

export function CaseStudiesSection() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load case studies from API (production) or localStorage (development)
  useEffect(() => {
    const loadCaseStudies = async () => {
      try {
        // Try to fetch from API first (production)
        const response = await fetch('/api/case-studies');
        if (response.ok) {
          const result = await response.json();
          if (result.data && result.data.length > 0) {
            setCaseStudies(result.data);
            console.log(`Loaded ${result.data.length} case studies from API`);
            setIsLoaded(true);
            return;
          }
        }
        
        // Fallback to localStorage (development/admin)
        const savedCaseStudies = localStorage.getItem('admin-case-studies');
        
        if (savedCaseStudies) {
          try {
            const parsedCaseStudies = JSON.parse(savedCaseStudies) as unknown[];
            
            // Migrate old case study format to new format
            const migratedCaseStudies = parsedCaseStudies.map((caseStudyItem) => {
              const caseStudy = caseStudyItem as Partial<CaseStudy> & { results?: LegacyResults };
              if (caseStudy.results && caseStudy.results.roas) {
                // Old format - migrate to new format
                return {
                  ...caseStudy,
                  results: {
                    metric1: { name: "ROAS", before: caseStudy.results.roas.before, after: caseStudy.results.roas.after, improvement: caseStudy.results.roas.improvement, format: "number" },
                    metric2: { name: "CPA", before: caseStudy.results.cpa.before, after: caseStudy.results.cpa.after, improvement: caseStudy.results.cpa.improvement, format: "currency" },
                    metric3: { name: "Revenue", before: caseStudy.results.revenue.before, after: caseStudy.results.revenue.after, improvement: caseStudy.results.revenue.improvement, format: "currency" },
                    metric4: { name: "Conversion", before: caseStudy.results.conversion.before, after: caseStudy.results.conversion.after, improvement: caseStudy.results.conversion.improvement, format: "percentage" }
                  }
                };
              }
              return caseStudy as CaseStudy;
            });
            
            // Guard: ensure items conform to CaseStudy
            const isCaseStudy = (item: unknown): item is CaseStudy => {
              const i = item as Partial<CaseStudy>;
              return typeof i?.id === 'string' && typeof i?.title === 'string' && typeof i?.isActive === 'boolean' && !!i.results;
            };
            
            // Filter for active case studies only
            const activeCaseStudies = migratedCaseStudies.filter(isCaseStudy).filter((cs) => cs.isActive);
            
            if (activeCaseStudies.length > 0) {
              setCaseStudies(activeCaseStudies);
              console.log(`Loaded ${activeCaseStudies.length} active case studies from localStorage`);
            } else {
              console.log('No active case studies found in localStorage, using default data');
              setCaseStudies(defaultCaseStudies);
            }
          } catch (error) {
            console.error('Error parsing case studies from localStorage:', error);
            console.log('Falling back to default case studies');
            setCaseStudies(defaultCaseStudies);
          }
        } else {
          console.log('No case studies found, using default data');
          setCaseStudies(defaultCaseStudies);
        }
      } catch (error) {
        console.error('Error loading case studies:', error);
        console.log('Falling back to default case studies');
        setCaseStudies(defaultCaseStudies);
      }
      
      setIsLoaded(true);
    };

    loadCaseStudies();
  }, []);

  const handleViewDetails = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCaseStudy(null);
  };

  if (!isLoaded) {
    return (
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-slate-600">Loading case studies...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <Badge variant="outline" className="px-4 py-2">
            Proven Results
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Real Client Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See how we&rsquo;ve helped e-commerce brands achieve remarkable growth through strategic Google Ads optimization and data-driven decision making.
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-12">
          {!isLoaded ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading case studies...</p>
            </div>
          ) : caseStudies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No case studies available at the moment.</p>
              <p className="text-sm text-muted-foreground">Check back later or contact us for more information.</p>
            </div>
          ) : (
            caseStudies.map((study: CaseStudy, index: number) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-border/50 hover:border-border transition-colors">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-0">
                    {/* Left Section - Story (40%) */}
                    <div className="p-6 md:p-8 space-y-6">
                      {/* Tags */}
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs px-2 py-1 bg-muted/30 border-border/50 text-muted-foreground">
                          {study.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs px-2 py-1 bg-muted/30 border-border/50 text-muted-foreground">
                          {study.industry}
                        </Badge>
                      </div>

                      {/* Client Name */}
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{study.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {study.client} • {study.duration} • {study.monthlySpend}/month ad spend
                        </p>
                      </div>

                      {/* Challenge */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Challenge
                        </h4>
                        <p className="text-sm text-foreground leading-relaxed">
                          {study.challenge.split('\n')[0].trim()}
                        </p>
                      </div>

                      {/* Solution */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Solution
                        </h4>
                        <p className="text-sm text-foreground leading-relaxed">
                          {study.solution.split('\n')[0].trim()}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleViewDetails(study)}
                        >
                          View Details
                          <ArrowUpRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>

                    {/* Right Section - Metrics (60%) */}
                    <div className="p-6 md:p-8 bg-muted/20 border-t lg:border-t-0 lg:border-l border-border/50">
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                          Key Results
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { metric: study.results?.metric1, icon: TrendingUp },
                            { metric: study.results?.metric2, icon: DollarSign },
                            { metric: study.results?.metric3, icon: ShoppingCart },
                            { metric: study.results?.metric4, icon: Users }
                          ].filter(({ metric }) => metric && metric.name && metric.name.trim() !== "").map(({ metric, icon }, index) => (
                            <MetricCard
                              key={index}
                              metric={metric!}
                              icon={icon}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            ))
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Achieve Similar Results?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join the growing list of e-commerce brands that have transformed their Google Ads performance with strategic optimization and data-driven insights.
              </p>
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={() => {
                    const pricingSection = document.getElementById('pricing');
                    if (pricingSection) {
                      pricingSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Start Your Success Story
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Case Study Detail Modal */}
      <CaseStudyDetailModal
        caseStudy={selectedCaseStudy}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}