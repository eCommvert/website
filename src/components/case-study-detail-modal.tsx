"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  X, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Users, 
  ShoppingCart,
  BarChart3,
  Clock,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
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

// Clean metric card matching homepage design
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
      case "percentage-points":
        return `${value}pp`;
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
  const isPoints = metric.format === "percentage-points";
  const isImprovement = actualImprovement > 0;

  // Brand color per metric type
  const getMetricColor = () => {
    const name = metric.name?.toLowerCase() || '';
    if (name.includes('roas')) return 'text-[#A259FF]';
    if (name.includes('cpa') || name.includes('cost')) return 'text-[#FF5E5E]';
    if (name.includes('revenue') || name.includes('sales')) return 'text-[#22D3EE]';
    if (name.includes('conversion') || name.includes('rate')) return 'text-[#2DD4BF]';
    return 'text-[#A259FF]';
  };

  return (
    <div className="bg-[#121212] rounded-xl p-4 border border-[#2a2a2d] hover:border-white/10 transition-all duration-300">
      {/* Icon and Title */}
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-white/5">
          <Icon className="w-4 h-4 text-zinc-400" />
        </div>
        <h4 className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
          {metric.name}
        </h4>
      </div>

      {/* Before / After Stats */}
      {!isPercentageOnly && !isPoints ? (
        <div className="space-y-2 mb-3">
          {/* Before */}
          <div className="flex justify-between text-xs text-zinc-500">
            <span>Before</span>
            <span>{formatValue(metric.before, metric.format)}</span>
          </div>
          
          {/* After */}
          <div className="flex justify-between">
            <span className="text-xs text-zinc-500">After</span>
            <span className={`text-lg font-bold ${getMetricColor()}`}>
              {formatValue(metric.after, metric.format)}
            </span>
          </div>
        </div>
      ) : (
        <div className="mb-3">
          <div className={`text-2xl font-bold ${getMetricColor()} mb-1`}>
            {isPoints 
              ? `${actualImprovement >= 0 ? '+' : ''}${actualImprovement}pp` 
              : `${actualImprovement > 0 ? '+' : ''}${actualImprovement}%`
            }
          </div>
          <div className="text-xs text-zinc-500 uppercase tracking-wide">Improvement</div>
        </div>
      )}

      {/* Change Badge */}
      <div className="flex justify-start">
        <div className={`
          inline-flex items-center gap-1.5
          px-2.5 py-1
          rounded-lg
          text-xs font-semibold
          ${isImprovement 
            ? 'bg-green-600/20 text-green-400' 
            : 'bg-red-600/20 text-red-400'
          }
        `}>
          <ArrowUpRight className={`w-3 h-3 ${!isImprovement ? 'rotate-90' : ''}`} />
          <span>
            {isPoints 
              ? `${actualImprovement >= 0 ? '+' : ''}${actualImprovement}pp` 
              : `${actualImprovement > 0 ? '+' : ''}${actualImprovement}%`
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export const CaseStudyDetailModal = ({ caseStudy, isOpen, onClose }: CaseStudyDetailModalProps) => {
  if (!caseStudy) return null;

  const { detailedContent } = caseStudy;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[75vw] md:max-w-[1024px] max-h-[90vh] bg-[#1e1e22] border border-[#2a2a2d] rounded-xl p-0 overflow-hidden flex flex-col">
        <DialogHeader className="sr-only">
          <DialogTitle>{caseStudy.title} - Case Study</DialogTitle>
        </DialogHeader>
        
        {/* Modal Header */}
        <div className="p-6 md:p-10 border-b border-[#2a2a2d]">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#A259FF]" />
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Case Study
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                {caseStudy.title}
              </h2>
              <p className="text-sm text-zinc-400 flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-white">{caseStudy.client}</span>
                <span className="text-zinc-500">•</span>
                <span>{caseStudy.duration}</span>
                <span className="text-zinc-500">•</span>
                <span className="font-semibold text-[#22D3EE]">{caseStudy.monthlySpend}/mo</span>
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-10 space-y-8 overflow-y-auto flex-1">
          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Challenge */}
            <div className="space-y-3 border border-red-500/20 rounded-xl p-6 bg-transparent">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-red-500/70 rounded-full" />
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Challenge
                </h3>
              </div>
              <p className="text-sm text-white/90 leading-relaxed">
                {detailedContent?.challenges || caseStudy.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="space-y-3 border border-emerald-500/20 rounded-xl p-6 bg-transparent">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-emerald-500/70 rounded-full" />
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Solution
                </h3>
              </div>
              <p className="text-sm text-white/90 leading-relaxed">
                {detailedContent?.approach || caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Key Results */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-white/5">
                <Sparkles className="w-5 h-5 text-[#22D3EE]" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Key Results
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>


          {/* Testimonial */}
          <div className="bg-[#121212] rounded-xl p-6 border border-[#2a2a2d]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-[#A259FF]/10">
                <Users className="w-5 h-5 text-[#A259FF]" />
              </div>
              <div className="flex-1">
                <blockquote className="text-white/90 italic text-base leading-relaxed mb-4">
                  "{caseStudy.testimonial}"
                </blockquote>
                <div className="text-sm">
                  <div className="font-semibold text-white">{caseStudy.author}</div>
                  <div className="text-zinc-400">{caseStudy.role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Button 
              size="lg"
              className="w-full group relative overflow-hidden bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white font-bold text-base rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 py-4"
              onClick={onClose}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Similar Results
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
