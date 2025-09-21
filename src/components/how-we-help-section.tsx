"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  TrendingUp, 
  Bot, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Target,
  BarChart3,
  Zap,
  Lightbulb,
  Settings
} from "lucide-react";
import { useRef } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
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

  // Chart data for Monthly Consulting - Performance Growth
  const consultingData = [
    { month: 'Month 1', without: 100, with: 100 },
    { month: 'Month 2', without: 105, with: 120 },
    { month: 'Month 3', without: 108, with: 115 },
    { month: 'Month 4', without: 110, with: 137 },
    { month: 'Month 5', without: 112, with: 130 },
    { month: 'Month 6', without: 115, with: 160 }
  ];

  const handleScrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            How we help you scale
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Three strategic approaches to get expert oversight without hiring a full-time marketing manager
          </motion.p>
        </div>

        {/* Stacked Cards */}
        <div className="space-y-6 md:space-y-8">
          {/* Strategic Audits Card */}
          <motion.div
            style={{ y: y1, opacity: opacity1 }}
            className="relative"
          >
            <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5 hover:border-primary/40 transition-all duration-500">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Content Side */}
                <div className="p-6 md:p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-sm font-medium">
                      Best Value
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-3">
                    Strategic Audits
                  </h3>
                  
                  <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                    Comprehensive analysis of your Google Ads, Meta Ads & GA4 setup with actionable recommendations for immediate improvement.
                  </p>

                  {/* What's Included */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-base font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      What&rsquo;s included:
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Google Ads & Meta Ads analysis
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        GA4 & conversion tracking audit
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Product-level performance insights
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Campaign optimization roadmap
                      </div>
                    </div>
                  </div>

                  {/* Timeline & Process */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-base font-semibold flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Timeline & Process:
                    </h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        1-2 weeks delivery
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        Interactive Q&A session
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        Custom scope based on your needs
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleScrollToPricing}
                    className="w-full md:w-auto bg-primary hover:bg-primary/90"
                  >
                    View Pricing
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Visual Side - Radar Chart */}
                <div className="relative p-6 md:p-8 lg:p-10 flex items-center justify-center">
                  <div className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={auditData}>
                        <PolarGrid stroke="#e2e8f0" strokeOpacity={0.05} />
                        <PolarAngleAxis 
                          dataKey="category" 
                          tick={{ fontSize: 12, fill: '#ffffff' }}
                        />
                        <PolarRadiusAxis 
                          domain={[0, 10]} 
                          tick={false}
                          axisLine={false}
                        />
                        <Radar
                          name="Current Performance"
                          dataKey="current"
                          stroke="#ef4444"
                          fill="#ef4444"
                          fillOpacity={0.1}
                          strokeWidth={2}
                          strokeOpacity={0.8}
                        />
                        <Radar
                          name="Optimization Potential"
                          dataKey="potential"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-muted-foreground">Current</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                          <span className="text-muted-foreground">Potential</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Monthly Consulting Card */}
          <motion.div
            style={{ y: y2, opacity: opacity2 }}
            className="relative"
          >
            <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5 hover:border-primary/40 transition-all duration-500">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Visual Side - Animated Performance Graph */}
                <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 p-6 md:p-8 lg:p-10 flex items-center justify-center order-2 lg:order-1 min-h-full">
                  <AnimatedPerformanceGraph className="w-full h-full" />
                </div>

                {/* Content Side */}
                <div className="p-6 md:p-8 lg:p-10 order-1 lg:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-sm font-medium">
                      Biggest Value
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-3">
                    Monthly Consulting
                  </h3>
                  
                  <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                    Ongoing strategic oversight and optimization with flexible communication options. Scale your advertising without the overhead of a full-time hire.
                  </p>

                  {/* Service Models */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-base font-semibold flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      Service Models:
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <strong>Pay for Results:</strong> Performance-based pricing with success fees
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <strong>With Meetings:</strong> Weekly calls + Slack channel
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <strong>Slack Only:</strong> Efficient communication, occasional meetings
                      </div>
                    </div>
                  </div>

                  {/* What You Get */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-base font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      What you get:
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Strategic campaign oversight
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Performance optimization
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Budget allocation guidance
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Competitive analysis
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleScrollToPricing}
                    className="w-full md:w-auto bg-primary hover:bg-primary/90"
                  >
                    View Pricing
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Digital Products Card */}
          <motion.div
            style={{ y: y3, opacity: opacity3 }}
            className="relative"
          >
            <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5 hover:border-primary/40 transition-all duration-500">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Content Side */}
                <div className="p-6 md:p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-sm font-medium">
                      Automation Focus
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-3">
                    Digital Products
                  </h3>
                  
                  <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                    Ready-to-use automation tools and dashboards to streamline your marketing operations and reduce manual work.
                  </p>

                  {/* Product Categories */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-base font-semibold flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      Product Categories:
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <strong>Automation Tools:</strong> Make.com & n8n workflows
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <strong>Dashboards:</strong> Looker & GA4 reporting
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <strong>Optimization Scripts:</strong> Campaign management tools
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-base font-semibold flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-primary" />
                      Benefits:
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Reduce manual work
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Improve efficiency
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Scale operations
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Cost-effective solutions
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => window.open('/tools', '_blank')}
                    className="w-full md:w-auto bg-primary hover:bg-primary/90"
                  >
                    Explore Tools
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Visual Side - Simple Automation Icons */}
                <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 p-6 md:p-8 lg:p-10 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 rounded-xl bg-primary/20">
                        <Zap className="w-8 h-8 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-center">Automation</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 rounded-xl bg-primary/20">
                        <BarChart3 className="w-8 h-8 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-center">Dashboards</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 rounded-xl bg-primary/20">
                        <Settings className="w-8 h-8 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-center">Scripts</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 rounded-xl bg-primary/20">
                        <Bot className="w-8 h-8 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-center">Tools</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}