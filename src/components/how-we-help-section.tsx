"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle, 
  Zap,
  BarChart3,
  Settings,
  Target,
  MessageSquare,
  Clock,
  FileCheck,
  Lightbulb,
  Box
} from "lucide-react";
import { useRef, useState } from "react";
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from "recharts";
import { AnimatedPerformanceGraph } from "@/components/animated-performance-graph";

export function HowWeHelpSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);
  const y3 = useTransform(scrollYProgress, [0.4, 0.7], [100, 0]);

  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);

  // Chart data for Strategic Audits - Spider/Radar Chart
  const auditData = [
    { category: 'Smart Bidding', current: 3, potential: 8 },
    { category: 'Product Portfolio', current: 4, potential: 9 },
    { category: 'Budget Allocation', current: 5, potential: 8 },
    { category: 'Feed Optimization', current: 3, potential: 7 },
    { category: 'Campaign Structure', current: 4, potential: 8 },
    { category: 'Conversion Tracking', current: 6, potential: 9 }
  ];

  const handleScrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="py-24 bg-muted/30 relative">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            How We Help
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto"
          >
            Three strategic approaches to get expert oversight without hiring a full-time marketing manager
          </motion.p>
        </div>

        {/* Service Sections */}
        <div className="space-y-20">
          {/* Strategic Audits Section */}
          <motion.div
            style={{ y: y1, opacity: opacity1 }}
            className="relative"
          >
            <div id="audits" className="bg-[#1e1e22] rounded-xl shadow-md py-20 px-6 md:px-12">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  {/* Content Side */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-800/20 rounded-full flex items-center justify-center">
                        <FileCheck className="w-4 h-4 text-[#A259FF]" />
                      </div>
                      <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider bg-zinc-800 text-xs rounded-full px-2 py-1">
                        Best Value
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-3xl font-bold mb-2 text-white">
                        Strategic Audits
                      </h3>
                      
                      <p className="text-base text-zinc-400 mb-6 leading-relaxed">
                        Comprehensive analysis of your Google Ads, Meta Ads & GA4 setup with actionable recommendations for immediate improvement.
                      </p>

                      {/* Benefits List */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-base text-white/90 leading-tight">
                          <CheckCircle className="w-4 h-4 text-[#A259FF] flex-shrink-0" />
                          Google Ads & Meta Ads analysis
                        </div>
                        <div className="flex items-center gap-3 text-base text-white/90 leading-tight">
                          <CheckCircle className="w-4 h-4 text-[#A259FF] flex-shrink-0" />
                          GA4 & conversion tracking audit
                        </div>
                        <div className="flex items-center gap-3 text-base text-white/90 leading-tight">
                          <CheckCircle className="w-4 h-4 text-[#A259FF] flex-shrink-0" />
                          Product-level performance insights
                        </div>
                        <div className="flex items-center gap-3 text-base text-white/90 leading-tight">
                          <CheckCircle className="w-4 h-4 text-[#A259FF] flex-shrink-0" />
                          Campaign optimization roadmap
                        </div>
                        <div className="flex items-center gap-3 text-base text-white/90 leading-tight">
                          <CheckCircle className="w-4 h-4 text-[#A259FF] flex-shrink-0" />
                          1-2 weeks delivery with Q&A session
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={handleScrollToPricing}
                      className="bg-gradient-to-r from-purple-500 to-purple-700 hover:scale-[1.02] transition rounded-xl px-6 py-3 font-semibold text-white"
                    >
                      View Pricing
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  {/* Visual Side - Radar Chart */}
                  <div className="relative">
                    <div className="bg-[#121212] p-4 rounded-xl shadow-sm">
                      <div className="w-full h-64 md:h-80 relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart 
                            data={auditData}
                          >
                            <PolarGrid stroke="#374151" strokeWidth={1} />
                            <PolarAngleAxis 
                              dataKey="category" 
                              tick={{ fill: '#9CA3AF', fontSize: 11 }}
                              className="text-xs"
                            />
                            <PolarRadiusAxis 
                              angle={0} 
                              domain={[0, 10]} 
                              tick={{ fill: '#6B7280', fontSize: 10 }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <Radar
                              name="Current"
                              dataKey="current"
                              stroke="#EF4444"
                              fill="#EF4444"
                              fillOpacity={0.1}
                              strokeWidth={2}
                              strokeDasharray="5 5"
                            />
                            <Radar
                              name="Potential"
                              dataKey="potential"
                              stroke="#8B5CF6"
                              fill="#8B5CF6"
                              fillOpacity={0.15}
                              strokeWidth={2}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#2a2a2d', 
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                color: '#F9FAFB'
                              }}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 text-center mt-2">
                      Your current vs potential performance across key areas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Monthly Consulting Section */}
          <motion.div
            style={{ y: y2, opacity: opacity2 }}
            className="relative"
          >
            <div id="consulting" className="bg-[#1e1e22] rounded-xl shadow-md py-20 px-6 md:px-12">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  {/* Visual Side - Performance Graph */}
                  <div className="relative order-2 md:order-1">
                    <div className="bg-[#121212] p-4 rounded-xl shadow-sm">
                      <h4 className="text-sm font-medium text-zinc-300 mb-6 text-center">
                        What your growth curve looks like with vs. without strategy
                      </h4>
                      <div className="w-full h-56 md:h-64">
                        <AnimatedPerformanceGraph className="w-full h-full" />
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="space-y-8 order-1 md:order-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-800/20 rounded-full flex items-center justify-center">
                        <Lightbulb className="w-4 h-4 text-[#A259FF]" />
                      </div>
                      <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider bg-zinc-800 text-xs rounded-full px-2 py-1">
                        Biggest Value
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-3xl font-bold mb-2 text-white">
                        Monthly Consulting
                      </h3>
                      
                      <p className="text-base text-zinc-400 mb-6 leading-relaxed">
                        Ongoing strategic oversight and optimization with flexible communication options. Scale your advertising without the overhead of a full-time hire.
                      </p>

                      {/* Benefits List */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-base text-white/90 leading-tight">
                          <Target className="w-4 h-4 text-[#A259FF] flex-shrink-0" />
                          Performance-based model
                        </div>
                        <div className="flex items-center gap-3 text-base text-white/90 leading-tight">
                          <MessageSquare className="w-4 h-4 text-[#A259FF] flex-shrink-0" />
                          Weekly calls + Slack
                        </div>
                        <div className="flex items-center gap-3 text-base text-white/90 leading-tight">
                          <Clock className="w-4 h-4 text-[#A259FF] flex-shrink-0" />
                          Async-only option
                        </div>
                        <div className="flex items-center gap-3 text-base text-white/90 leading-tight">
                          <CheckCircle className="w-4 h-4 text-[#A259FF] flex-shrink-0" />
                          Strategic campaign oversight
                        </div>
                        <div className="flex items-center gap-3 text-base text-white/90 leading-tight">
                          <CheckCircle className="w-4 h-4 text-[#A259FF] flex-shrink-0" />
                          Performance optimization
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={handleScrollToPricing}
                      className="bg-gradient-to-r from-purple-500 to-purple-700 hover:scale-[1.02] hover:shadow-[0_0_12px_rgba(162,89,255,0.4)] transition rounded-xl px-6 py-3 font-semibold text-white"
                    >
                      View Pricing
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Digital Products Section */}
          <motion.div
            style={{ y: y3, opacity: opacity3 }}
            className="relative"
          >
            <div id="products" className="bg-[#1e1e22] rounded-xl shadow-md py-20 px-6 md:px-12">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  {/* Content Side */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-800/20 rounded-full flex items-center justify-center">
                        <Box className="w-4 h-4 text-[#A259FF]" />
                      </div>
                      <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider bg-zinc-800 text-xs rounded-full px-2 py-1">
                        Automation Focus
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-3xl font-bold mb-2 text-white">
                        Digital Products
                      </h3>
                      
                      <p className="text-base text-zinc-400 mb-6 leading-relaxed">
                        Ready-to-use automation tools and dashboards to streamline your marketing operations and reduce manual work.
                      </p>

                      {/* Benefits List - 2 Columns on Desktop */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 text-base text-white/90 leading-tight">
                          <Zap className="w-4 h-4 text-[#A259FF] flex-shrink-0" />
                          Make.com & n8n workflows
                        </div>
                        <div className="flex items-center gap-3 text-base text-white/90 leading-tight">
                          <BarChart3 className="w-4 h-4 text-[#A259FF] flex-shrink-0" />
                          Looker & GA4 reporting dashboards
                        </div>
                        <div className="flex items-center gap-3 text-base text-white/90 leading-tight">
                          <Settings className="w-4 h-4 text-[#A259FF] flex-shrink-0" />
                          Campaign management scripts
                        </div>
                        <div className="flex items-center gap-3 text-base text-white/90 leading-tight">
                          <CheckCircle className="w-4 h-4 text-[#A259FF] flex-shrink-0" />
                          Reduce manual work
                        </div>
                        <div className="flex items-center gap-3 text-base text-white/90 leading-tight md:col-span-2">
                          <CheckCircle className="w-4 h-4 text-[#A259FF] flex-shrink-0" />
                          Scale operations efficiently
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={() => window.open('/tools', '_blank')}
                      className="bg-gradient-to-r from-purple-500 to-purple-700 hover:scale-[1.02] transition rounded-xl px-6 py-3 font-semibold text-white"
                    >
                      Explore Tools
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  {/* Visual Side - Product Tiles */}
                  <div className="relative">
                    <div className="bg-[#121212] p-4 rounded-xl shadow-sm">
                      <p className="text-sm font-medium text-zinc-300 mb-6 text-center">
                        Explore plug-and-play tools to cut hours of manual work
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition">
                          <div className="p-2 rounded-lg bg-gray-700/50">
                            <Zap className="w-5 h-5 text-gray-300" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">Automation Tools</div>
                            <div className="text-xs text-zinc-400">Workflow automation</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition">
                          <div className="p-2 rounded-lg bg-gray-700/50">
                            <BarChart3 className="w-5 h-5 text-gray-300" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">Dashboards</div>
                            <div className="text-xs text-zinc-400">Real-time reporting</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition">
                          <div className="p-2 rounded-lg bg-gray-700/50">
                            <Settings className="w-5 h-5 text-gray-300" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">Optimization Scripts</div>
                            <div className="text-xs text-zinc-400">Campaign management</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}