"use client";

// import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  X, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Users, 
  ShoppingCart,
  BarChart3,
  Clock,
  // ArrowUpRight,
  // Calendar,
  // MapPin,
  Building
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

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
    metric1: { name: string; before: number; after: number; improvement: number; format: string };
    metric2: { name: string; before: number; after: number; improvement: number; format: string };
    metric3: { name: string; before: number; after: number; improvement: number; format: string };
    metric4: { name: string; before: number; after: number; improvement: number; format: string };
  };
  image: string;
  testimonial: string;
  author: string;
  role: string;
  isActive: boolean;
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

interface CaseStudyDetailModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

const MetricCard = ({ 
  metric,
  icon: Icon 
}: {
  metric: { name: string; before: number; after: number; improvement: number; format: string };
  icon: React.ComponentType<{ className?: string }>;
}) => {
  const formatValue = (value: number, format: string) => {
    switch (format) {
      case "currency":
        return value >= 1000 ? `$${(value/1000).toFixed(0)}K` : `$${value}`;
      case "percentage":
        return `${value}%`;
      default:
        return value.toString();
    }
  };

  // Calculate improvement percentage correctly
  const calculateImprovement = (before: number, after: number) => {
    if (before === 0) return after > 0 ? 100 : 0;
    return Math.round(((after - before) / before) * 100);
  };

  const actualImprovement = metric.improvement || calculateImprovement(metric.before, metric.after);
  const isPercentageOnly = metric.format === "percentage-only";

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">{metric.name}</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {actualImprovement > 0 ? '+' : ''}{actualImprovement}%
          </Badge>
        </div>
        
        <div className="space-y-2">
          {!isPercentageOnly ? (
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
                {actualImprovement > 0 ? '+' : ''}{actualImprovement}%
              </div>
              <div className="text-xs text-muted-foreground">Improvement</div>
            </div>
          )}
          <Progress value={Math.min(Math.abs(actualImprovement), 100)} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export const CaseStudyDetailModal = ({ caseStudy, isOpen, onClose }: CaseStudyDetailModalProps) => {
  if (!caseStudy) return null;

  const { detailedContent } = caseStudy;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent fullscreen showCloseButton className="max-w-none">
        <DialogHeader className="space-y-4 px-6 pt-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{caseStudy.category}</Badge>
                <Badge variant="outline">{caseStudy.industry}</Badge>
              </div>
              <DialogTitle className="text-2xl md:text-4xl lg:text-5xl leading-tight">{caseStudy.title}</DialogTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  {caseStudy.client}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {caseStudy.duration}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {caseStudy.monthlySpend}/month
                </div>
              </div>
            </div>
            {/* Remove duplicate close; DialogContent renders one */}
          </div>
        </DialogHeader>

        <div className="space-y-8 px-6 pb-10">
          {/* Hero Image */}
          {detailedContent?.heroImage && (
            <div className="relative h-64 md:h-[28rem] rounded-lg overflow-hidden">
              <Image
                src={detailedContent.heroImage}
                alt={caseStudy.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Executive Summary */}
          {detailedContent?.executiveSummary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary/5 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Executive Summary
              </h3>
              <div 
                className="prose prose-sm max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: detailedContent.executiveSummary }}
              />
            </motion.div>
          )}

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-3"
            >
              <h4 className="font-semibold text-destructive flex items-center gap-2">
                <Target className="w-4 h-4" />
                Challenge
              </h4>
              <div className="text-muted-foreground text-sm leading-relaxed">
                {(detailedContent?.challenges || caseStudy.challenge)
                  .split('\n')
                  .filter(line => line.trim() !== '')
                  .map((line, index) => (
                    <div key={index} className="flex items-start gap-2 mb-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>{line.trim()}</span>
                    </div>
                  ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-3"
            >
              <h4 className="font-semibold text-primary flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Solution
              </h4>
              <div className="text-muted-foreground text-sm leading-relaxed">
                {(detailedContent?.approach || caseStudy.solution)
                  .split('\n')
                  .filter(line => line.trim() !== '')
                  .map((line, index) => (
                    <div key={index} className="flex items-start gap-2 mb-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{line.trim()}</span>
                    </div>
                  ))}
              </div>
            </motion.div>
          </div>

          {/* Key Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-lg">Key Results</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { metric: caseStudy.results?.metric1, icon: TrendingUp },
                { metric: caseStudy.results?.metric2, icon: DollarSign },
                { metric: caseStudy.results?.metric3, icon: ShoppingCart },
                { metric: caseStudy.results?.metric4, icon: Users }
              ].filter(({ metric }) => metric && metric.name && metric.name.trim() !== "").map(({ metric, icon }, index) => (
                <MetricCard
                  key={index}
                  metric={metric!}
                  icon={icon}
                />
              ))}
            </div>
          </motion.div>

          {/* Additional Metrics */}
          {detailedContent?.additionalMetrics && detailedContent.additionalMetrics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-lg">Additional Metrics</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {detailedContent.additionalMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h5 className="font-medium">{metric.name}</h5>
                        <p className="text-2xl font-bold text-primary">{metric.value}</p>
                        {metric.description && (
                          <p className="text-sm text-muted-foreground">{metric.description}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Implementation Details */}
          {detailedContent?.implementation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-lg">Implementation</h4>
              <div 
                className="prose prose-sm max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: detailedContent.implementation }}
              />
            </motion.div>
          )}

          {/* Images Gallery */}
          {detailedContent?.images && detailedContent.images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-lg">Visual Results</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detailedContent.images.map((image, index) => (
                  <div key={index} className="space-y-2">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={image.url}
                        alt={image.alt || `Case study image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {image.caption && (
                      <p className="text-sm text-muted-foreground text-center">{image.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Lessons Learned */}
          {detailedContent?.lessonsLearned && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-lg">Lessons Learned</h4>
              <div 
                className="prose prose-sm max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: detailedContent.lessonsLearned }}
              />
            </motion.div>
          )}

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-muted/50 rounded-lg p-6"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground italic leading-relaxed">
                  &ldquo;{caseStudy.testimonial}&rdquo;
                </p>
                <div className="space-y-1">
                  <p className="font-semibold text-sm">{caseStudy.author}</p>
                  <p className="text-xs text-muted-foreground">{caseStudy.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
