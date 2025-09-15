"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Clock,
  ArrowUpRight,
  Users,
  ShoppingCart,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
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

// Default case studies (fallback)
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
    testimonial: "",
    author: "",
    role: "",
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
    testimonial: "",
    author: "",
    role: "",
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
    testimonial: "",
    author: "",
    role: "",
    isActive: true
  }
];

const MetricCard = ({ 
  metric,
  icon: Icon, 
  color = "green"
}: {
  metric: { name: string; before: number; after: number; improvement: number; format: string; points?: number };
  icon: any;
  color?: string;
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

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">{metric.name}</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {isPoints ? `${(metric.points ?? 0) >= 0 ? '+' : ''}${metric.points ?? 0}pp` : `${actualImprovement > 0 ? '+' : ''}${actualImprovement}%`}
          </Badge>
        </div>
        
        <div className="space-y-2">
          {!isPercentageOnly && !isPoints ? (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Before</span>
                <span className="font-medium">{formatValue(metric.before, metric.format)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">After</span>
                <span className="font-semibold text-primary">{formatValue(metric.after, metric.format)}</span>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {isPoints ? `${(metric.points ?? 0) >= 0 ? '+' : ''}${metric.points ?? 0}pp` : `${actualImprovement > 0 ? '+' : ''}${actualImprovement}%`}
              </div>
              <div className="text-xs text-muted-foreground">Improvement</div>
            </div>
          )}
          <Progress value={Math.min(Math.abs(isPoints ? (metric.points ?? 0) : actualImprovement), 100)} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export function CaseStudiesSection() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(defaultCaseStudies);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load case studies from localStorage
  useEffect(() => {
    const savedCaseStudies = localStorage.getItem('admin-case-studies');
    
    if (savedCaseStudies) {
      try {
        const parsedCaseStudies = JSON.parse(savedCaseStudies);
        // Migrate old case study format to new format
        const migratedCaseStudies = parsedCaseStudies.map((caseStudy: any) => {
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
          return caseStudy;
        });
        
        // Filter only active case studies
        const activeCaseStudies = migratedCaseStudies.filter((caseStudy: CaseStudy) => caseStudy.isActive);
        setCaseStudies(activeCaseStudies.length > 0 ? activeCaseStudies : defaultCaseStudies);
      } catch (error) {
        console.error('Error parsing case studies:', error);
        setCaseStudies(defaultCaseStudies);
      }
    }
    
    setIsLoaded(true);
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
            See how we've helped e-commerce brands achieve remarkable growth through strategic Google Ads optimization and data-driven decision making.
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-12">
          {caseStudies.map((study: CaseStudy, index: number) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{study.category}</Badge>
                        <Badge variant="outline">{study.industry}</Badge>
                      </div>
                      <CardTitle className="text-2xl">{study.title}</CardTitle>
                      <CardDescription className="text-base">
                        {study.client} • {study.duration} • {study.monthlySpend}/month ad spend
                      </CardDescription>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-fit"
                      onClick={() => handleViewDetails(study)}
                    >
                      View Details
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-8">
                  {/* Challenge & Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-destructive flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Challenge
                      </h4>
                      <div className="text-muted-foreground text-sm leading-relaxed">
                        {study.challenge
                          .split('\n')
                          .filter(line => line.trim() !== '')
                          .map((line, index) => (
                            <div key={index} className="flex items-start gap-2 mb-2">
                              <span className="text-destructive mt-1">•</span>
                              <span>{line.trim()}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-primary flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Solution
                      </h4>
                      <div className="text-muted-foreground text-sm leading-relaxed">
                        {study.solution
                          .split('\n')
                          .filter(line => line.trim() !== '')
                          .map((line, index) => (
                            <div key={index} className="flex items-start gap-2 mb-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{line.trim()}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Key Results</h4>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {[
                        { metric: study.results?.metric1, icon: TrendingUp, color: "green" },
                        { metric: study.results?.metric2, icon: DollarSign, color: "blue" },
                        { metric: study.results?.metric3, icon: ShoppingCart, color: "purple" },
                        { metric: study.results?.metric4, icon: Users, color: "orange" }
                      ].filter(({ metric }) => metric && metric.name && metric.name.trim() !== "").map(({ metric, icon, color }, index) => (
                        <div key={index} className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)] max-w-[340px]">
                          <MetricCard
                            metric={metric!}
                            icon={icon}
                            color={color}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Your Success Story
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View All Case Studies
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