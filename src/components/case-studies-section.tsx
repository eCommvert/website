"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight,
  ArrowRight,
  Users,
  ShoppingCart,
  Target,
  Sparkles
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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

// Mobile-optimized metric card with responsive design
const MetricCard = ({ 
  metric,
  icon: Icon,
  index = 0
}: {
  metric: { name: string; before: number; after: number; improvement: number; format: string; points?: number };
  icon: React.ComponentType<{ className?: string }>; 
  index?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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

  // Brand color per metric type
  const getMetricColor = () => {
    const name = metric.name?.toLowerCase() || '';
    if (name.includes('roas')) return 'text-[#A259FF]';
    if (name.includes('cpa') || name.includes('cost')) return 'text-[#FF5E5E]';
    if (name.includes('revenue') || name.includes('sales')) return 'text-[#22D3EE]';
    if (name.includes('conversion') || name.includes('rate')) return 'text-[#2DD4BF]';
    return 'text-[#A259FF]'; // default purple
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="
        bg-[#1e1e22] 
        rounded-xl 
        p-4 md:p-6 
        border border-[#2a2a2d]
        hover:border-white/10
        shadow-md
        transition-all duration-300
        hover:shadow-lg
        mb-4 md:mb-0
      "
    >
      {/* Icon and Title - Mobile Optimized */}
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 md:p-2 rounded-lg bg-white/5">
          <Icon className="w-4 h-4 text-gray-400" />
        </div>
        <h4 className="text-xs md:text-sm font-medium text-zinc-400 uppercase tracking-wide truncate">
          {metric.name}
        </h4>
      </div>

      {/* Before / After Stats - Mobile Responsive */}
      {!isPercentageOnly && !isPoints ? (
        <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
          {/* Before */}
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-zinc-500 uppercase tracking-wide">Before</span>
            <span className="text-sm font-medium text-zinc-300 truncate">
              {formatValue(metric.before, metric.format)}
            </span>
          </div>
          
          {/* After */}
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-zinc-500 uppercase tracking-wide">After</span>
            <span className={`text-xl md:text-2xl font-bold ${getMetricColor()} truncate`}>
              {formatValue(metric.after, metric.format)}
            </span>
          </div>
        </div>
      ) : (
        <div className="mb-3 md:mb-4">
          <div className={`text-2xl md:text-3xl font-bold ${getMetricColor()} mb-1`}>
            {isPoints 
              ? `${improvementValue >= 0 ? '+' : ''}${improvementValue}pp` 
              : `${improvementValue > 0 ? '+' : ''}${improvementValue}%`
            }
          </div>
          <div className="text-xs text-zinc-500 uppercase tracking-wide">Improvement</div>
        </div>
      )}

      {/* Change Badge - Mobile Optimized */}
      <div className="flex justify-start">
        <div className={`
          inline-flex items-center gap-1.5
          px-2.5 md:px-3 py-1 md:py-1.5
          rounded-lg
          text-xs font-semibold
          ${isImprovement 
            ? 'bg-green-600/20 text-green-400' 
            : 'bg-red-600/20 text-red-400'
          }
        `}>
          <ArrowUpRight className={`w-3 h-3 md:w-3.5 md:h-3.5 ${!isImprovement ? 'rotate-90' : ''}`} />
          <span>
            {isPoints 
              ? `${improvementValue >= 0 ? '+' : ''}${improvementValue}pp` 
              : `${improvementValue > 0 ? '+' : ''}${improvementValue}%`
            }
          </span>
        </div>
      </div>
    </motion.div>
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
    <section className="py-14 md:py-18 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-3 mb-12"
        >
          <Badge variant="outline" className="px-4 py-2">
            Proven Results
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Real Client Success Stories
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            See how we&rsquo;ve helped e-commerce brands achieve remarkable growth through strategic Google Ads optimization.
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-10">
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
            caseStudies.map((study: CaseStudy, index: number) => {
              // Prepare metrics array
              const metrics = [
                { ...study.results?.metric1, icon: TrendingUp, key: 'metric1' },
                { ...study.results?.metric2, icon: DollarSign, key: 'metric2' },
                { ...study.results?.metric3, icon: ShoppingCart, key: 'metric3' },
                { ...study.results?.metric4, icon: Users, key: 'metric4' }
              ].filter(m => m && m.name && m.name.trim() !== "");

              return (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Card className="overflow-hidden border-border/30 hover:border-border/50 bg-gradient-to-br from-background/95 to-muted/30 backdrop-blur-sm transition-all duration-300">
                    <CardContent className="p-0">
                      {/* Mobile: Single Column Layout */}
                      <div className="block lg:hidden">
                        <div className="p-4 md:p-6 space-y-6">
                          {/* Tags */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge 
                              variant="outline" 
                              className="text-xs font-semibold px-2.5 py-1 bg-[#A259FF]/10 border-[#A259FF]/30 text-[#A259FF] uppercase tracking-wider"
                            >
                              {study.category}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className="text-xs font-semibold px-2.5 py-1 bg-muted/50 border-border/50 text-muted-foreground uppercase tracking-wider"
                            >
                              {study.industry}
                            </Badge>
                          </div>

                          {/* Project Title */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Target className="w-4 h-4 text-[#A259FF]" />
                              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Case Study
                              </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight tracking-tight">
                              {study.title}
                            </h3>
                            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-foreground">{study.client}</span>
                              <span className="text-muted-foreground/50">•</span>
                              <span>{study.duration}</span>
                              <span className="text-muted-foreground/50">•</span>
                              <span className="font-semibold text-[#22D3EE]">{study.monthlySpend}/mo</span>
                            </p>
                          </div>

                          {/* Challenge */}
                          <div className="space-y-2 border border-red-500/20 rounded-lg p-4 bg-transparent">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-4 bg-red-500/70 rounded-full" />
                              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                Challenge
                              </h4>
                            </div>
                            <p className="text-sm text-foreground/90 leading-relaxed">
                              {study.challenge.split('\n')[0].trim()}
                            </p>
                          </div>

                          {/* Solution */}
                          <div className="space-y-2 border border-emerald-500/20 rounded-lg p-4 bg-transparent">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-4 bg-emerald-500/70 rounded-full" />
                              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                Solution
                              </h4>
                            </div>
                            <p className="text-sm text-foreground/90 leading-relaxed">
                              {study.solution.split('\n')[0].trim()}
                            </p>
                          </div>

                          {/* Performance Scorecard - Mobile */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="p-2 rounded-lg bg-white/5">
                                <Sparkles className="w-4 h-4 text-[#22D3EE]" />
                              </div>
                              <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                                Performance Scorecard
                              </h4>
                            </div>
                            <p className="text-lg font-bold text-white">
                              Key Results
                            </p>

                            {/* Metrics Grid - Single Column on Mobile */}
                            <div className="grid grid-cols-1 gap-4">
                              {metrics.map((m, idx) => (
                                <MetricCard
                                  key={idx}
                                  metric={m}
                                  icon={m.icon}
                                  index={idx}
                                />
                              ))}
                            </div>
                          </div>

                          {/* CTA Button - At Bottom on Mobile */}
                          <div className="pt-4">
                            <Button 
                              size="default"
                              className="w-full group relative overflow-hidden bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white font-bold text-base rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 py-3"
                              onClick={() => handleViewDetails(study)}
                            >
                              <span className="relative z-10 flex items-center justify-center gap-2">
                                View Full Results
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Desktop: Two Column Layout */}
                      <div className="hidden lg:grid lg:grid-cols-[48%_52%] gap-0">
                        {/* Left Section - Story & Context */}
                        <div className="p-6 md:p-8 space-y-5 flex flex-col">
                          {/* Tags */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge 
                              variant="outline" 
                              className="text-xs font-semibold px-3 py-1 bg-[#A259FF]/10 border-[#A259FF]/30 text-[#A259FF] uppercase tracking-wider"
                            >
                              {study.category}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className="text-xs font-semibold px-3 py-1 bg-muted/50 border-border/50 text-muted-foreground uppercase tracking-wider"
                            >
                              {study.industry}
                            </Badge>
                          </div>

                          {/* Project Title */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Target className="w-4 h-4 text-[#A259FF]" />
                              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Case Study
                              </span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight tracking-tight">
                              {study.title}
                            </h3>
                            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-foreground">{study.client}</span>
                              <span className="text-muted-foreground/50">•</span>
                              <span>{study.duration}</span>
                              <span className="text-muted-foreground/50">•</span>
                              <span className="font-semibold text-[#22D3EE]">{study.monthlySpend}/mo</span>
                            </p>
                          </div>

                          {/* Challenge - Stacked Vertically */}
                          <div className="space-y-2 border border-red-500/20 rounded-lg p-4 bg-transparent">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-4 bg-red-500/70 rounded-full" />
                              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                Challenge
                              </h4>
                            </div>
                            <p className="text-sm text-foreground/90 leading-relaxed">
                              {study.challenge.split('\n')[0].trim()}
                            </p>
                          </div>

                          {/* Solution - Stacked Vertically */}
                          <div className="space-y-2 border border-emerald-500/20 rounded-lg p-4 bg-transparent">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-4 bg-emerald-500/70 rounded-full" />
                              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                Solution
                              </h4>
                            </div>
                            <p className="text-sm text-foreground/90 leading-relaxed">
                              {study.solution.split('\n')[0].trim()}
                            </p>
                          </div>

                          {/* CTA Button - Premium Gradient */}
                          <div className="pt-3 mt-auto">
                            <Button 
                              size="default"
                              className="w-full group relative overflow-hidden bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
                              onClick={() => handleViewDetails(study)}
                            >
                              <span className="relative z-10 flex items-center gap-2">
                                View Full Results
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            </Button>
                          </div>
                        </div>

                        {/* Right Section - Performance Scorecard */}
                        <div className="p-6 md:p-8 bg-[#transparent] border-t lg:border-t-0 lg:border-l border-white/5">
                          {/* Scorecard Header */}
                          <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="p-2 rounded-lg bg-white/5">
                                <Sparkles className="w-4 h-4 text-[#22D3EE]" />
                              </div>
                              <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                                Performance Scorecard
                              </h4>
                            </div>
                            <p className="text-xl font-bold text-white">
                              Key Results
                            </p>
                          </div>

                          {/* Metrics Grid - Clean 2x2 Grid */}
                          <div className="grid grid-cols-2 gap-6">
                            {metrics.map((m, idx) => (
                              <MetricCard
                                key={idx}
                                metric={m}
                                icon={m.icon}
                                index={idx}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          )}
        </div>

        {/* CTA Section removed as requested */}
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