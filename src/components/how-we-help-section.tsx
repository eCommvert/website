"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  TrendingUp, 
  Bot, 
  ArrowRight, 
  CheckCircle, 
  Zap,
  BarChart3,
  Settings,
  Target,
  MessageSquare,
  Clock
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Customized } from "recharts";
import { AnimatedPerformanceGraph } from "@/components/animated-performance-graph";

export function HowWeHelpSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [auditsInView, setAuditsInView] = useState(false);
  const [isAuditsHovering, setIsAuditsHovering] = useState(false);
  const [activeAxisIndex, setActiveAxisIndex] = useState<number | null>(null);
  const chartBoxRef = useRef<HTMLDivElement>(null);
  const [chartBox, setChartBox] = useState<{w:number;h:number}>({w:0,h:0});
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

  const mostUnderIndex = (() => {
    let idx = 0;
    let maxDelta = -Infinity;
    for (let i = 0; i < auditData.length; i++) {
      const delta = (auditData[i].potential ?? 0) - (auditData[i].current ?? 0);
      if (delta > maxDelta) {
        maxDelta = delta;
        idx = i;
      }
    }
    return idx;
  })();

  // Track chart container size for ripple positioning
  useEffect(() => {
    const el = chartBoxRef.current;
    if (!el) return;
    const handle = () => {
      setChartBox({ w: el.clientWidth, h: el.clientHeight });
    };
    handle();
    const ro = new ResizeObserver(handle);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);


  const handleScrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
          >
            How we help you scale
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-zinc-300 max-w-2xl mx-auto"
          >
            Three strategic approaches to get expert oversight without hiring a full-time marketing manager
          </motion.p>
        </div>

        {/* Service Sections */}
        <div className="space-y-24">
          {/* Strategic Audits Section */}
          <motion.div
            style={{ y: y1, opacity: opacity1 }}
            className="relative"
          >
            <div id="audits" className="grid lg:grid-cols-[45%_55%] gap-8 md:gap-16 items-center scroll-mt-24 border border-white/10 md:border-transparent rounded-2xl p-4 md:p-0">
              {/* Content Side */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <FileText className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider bg-zinc-800/50 px-3 py-1 rounded-full">
                    Best Value
                  </span>
                </div>
                
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    Strategic Audits
                  </h3>
                  
                  <p className="text-zinc-300 mb-8 leading-relaxed">
                    Comprehensive analysis of your Google Ads, Meta Ads & GA4 setup with actionable recommendations for immediate improvement.
                  </p>

                  {/* Unified Benefits List */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Google Ads & Meta Ads analysis
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      GA4 & conversion tracking audit
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Product-level performance insights
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Campaign optimization roadmap
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      1-2 weeks delivery with Q&A session
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleScrollToPricing}
                  variant="outline"
                  size="sm"
                  className="border-purple-400/30 text-purple-400 hover:bg-purple-400/10 hover:border-purple-400/50"
                >
                  View Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Visual Side - Softened Radar Chart */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  onViewportEnter={() => setAuditsInView(true)}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-white/10 md:border-transparent overflow-hidden"
                >
                  {/* Subtle looping pulse over potential area */}
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    animate={{ opacity: [0.04, 0.1, 0.04] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(139,92,246,0.15), transparent)' }}
                  />

                  <div ref={chartBoxRef} className="w-full h-64 md:h-80 relative">
                    {auditsInView && (
                      <ResponsiveContainer key={auditsInView ? 'radar-live' : 'radar-wait'} width="100%" height="100%">
                        <RadarChart 
                          data={auditData}
                          onMouseMove={((e: any) => {
                            const idx = e?.activeTooltipIndex;
                            if (typeof idx === 'number') setActiveAxisIndex(idx);
                          }) as any}
                          onMouseEnter={() => setIsAuditsHovering(true)}
                          onMouseLeave={() => { setIsAuditsHovering(false); setActiveAxisIndex(null); }}
                        >
                          <PolarGrid stroke="#ffffff" strokeOpacity={0.1} />
                          <PolarAngleAxis 
                            dataKey="category" 
                            tick={{ fontSize: 10, fill: '#a1a1aa' }}
                          />
                          <PolarRadiusAxis 
                            domain={[0, 10]} 
                            tick={false}
                            axisLine={false}
                          />
                          {/* Tooltip for category details */}
                          <Tooltip 
                            cursor={false}
                            content={((props: any) => {
                              const { active, label, payload } = props || {};
                              if (!active || !payload || payload.length === 0) return null;
                              const cur = payload.find((p: any) => p.dataKey === 'current')?.value ?? null;
                              const pot = payload.find((p: any) => p.dataKey === 'potential')?.value ?? null;
                              const delta = (pot ?? 0) - (cur ?? 0);
                              return (
                                <div className="rounded-md border border-white/10 bg-zinc-900/90 px-3 py-2 text-xs text-white shadow-lg">
                                  <div className="font-medium mb-1">{label}</div>
                                  {cur != null && (
                                    <div className="text-red-300">Current: {cur}</div>
                                  )}
                                  {pot != null && (
                                    <div className="text-purple-300">Potential: {pot}</div>
                                  )}
                                  <div className="text-zinc-300">Gap: {delta > 0 ? "+"+delta : delta}</div>
                                </div>
                              );
                            }) as any}
                          />
                          {/* Customized overlay to highlight active axis */}
                          <Customized component={({ width, height }: { width?: number; height?: number }) => {
                            if (activeAxisIndex == null) return null;
                            const w = width ?? 0;
                            const h = height ?? 0;
                            const cx = w / 2;
                            const cy = h / 2;
                            const radius = Math.min(w, h) * 0.36;
                            const angle = -Math.PI / 2 + (2 * Math.PI * activeAxisIndex / auditData.length);
                            const x = cx + radius * Math.cos(angle);
                            const y = cy + radius * Math.sin(angle);
                            return (
                              <g>
                                <circle cx={x} cy={y} r={5} fill="#8b5cf6" fillOpacity={0.9} />
                              </g>
                            );
                          }} />
                          {/* Stage 2: Potential polygon draws in with slight glow */}
                          <Radar
                            isAnimationActive
                            animationBegin={200}
                            animationDuration={900}
                            animationEasing="ease-out"
                            name="Optimization Potential"
                            dataKey="potential"
                            stroke="#8b5cf6"
                            fill="#8b5cf6"
                            fillOpacity={isAuditsHovering ? 0.24 : 0.18}
                            strokeWidth={isAuditsHovering ? 2.5 : 2}
                            strokeOpacity={0.95}
                            className={isAuditsHovering ? 'animate-[dash_1.6s_linear_infinite]' : ''}
                            style={{ filter: isAuditsHovering ? 'drop-shadow(0 0 10px rgba(139,92,246,0.5))' : 'drop-shadow(0 0 8px rgba(139,92,246,0.35))' }}
                          />
                          {/* Stage 3: Current polygon fills from center (delayed) */}
                          <Radar
                            isAnimationActive
                            animationBegin={650}
                            animationDuration={700}
                            animationEasing="ease-in-out"
                            name="Current Performance"
                            dataKey="current"
                            stroke="#ef4444"
                            fill="#ef4444"
                            fillOpacity={0.12}
                            strokeWidth={2}
                            strokeOpacity={0.65}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    )}
                    {/* Hover ripple from most underperforming axis */}
                    {isAuditsHovering && chartBox.w > 0 && chartBox.h > 0 && (
                      (() => {
                        const cx = chartBox.w / 2;
                        const cy = chartBox.h / 2;
                        const radius = Math.min(chartBox.w, chartBox.h) * 0.36;
                        const angle = -Math.PI / 2 + (2 * Math.PI * mostUnderIndex / auditData.length);
                        const x = cx + radius * Math.cos(angle);
                        const y = cy + radius * Math.sin(angle);
                        return (
                          <motion.div
                            key={`ripple-${mostUnderIndex}`}
                            className="pointer-events-none absolute rounded-full"
                            style={{
                              left: x - 8,
                              top: y - 8,
                              width: 16,
                              height: 16,
                              background: 'radial-gradient(circle, rgba(139,92,246,0.35), rgba(139,92,246,0.15) 40%, transparent 70%)',
                              filter: 'blur(2px)'
                            }}
                            initial={{ opacity: 0.4, scale: 0.6 }}
                            animate={{ opacity: [0.4, 0.15, 0], scale: [0.6, 1.6, 2.2] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                          />
                        );
                      })()
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 text-center mt-4">
                    Your current vs potential performance across key areas
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Monthly Consulting Section */}
          <motion.div
            style={{ y: y2, opacity: opacity2 }}
            className="relative"
          >
            <div id="consulting" className="grid lg:grid-cols-[55%_45%] gap-8 md:gap-16 items-center scroll-mt-24 border border-white/10 md:border-transparent rounded-2xl p-4 md:p-0">
              {/* Visual Side - Simplified Performance Graph */}
              <div className="relative order-2 lg:order-1">
                <div className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-white/10 md:border-transparent">
                  <h4 className="text-sm font-medium text-zinc-300 mb-6 text-center">
                    What your growth curve looks like with vs. without strategy
                  </h4>
                  <div className="w-full h-56 md:h-64">
                    <AnimatedPerformanceGraph className="w-full h-full" />
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="space-y-8 order-1 lg:order-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider bg-zinc-800/50 px-3 py-1 rounded-full">
                    Biggest Value
                  </span>
                </div>
                
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    Monthly Consulting
                  </h3>
                  
                  <p className="text-zinc-300 mb-8 leading-relaxed">
                    Ongoing strategic oversight and optimization with flexible communication options. Scale your advertising without the overhead of a full-time hire.
                  </p>

                  {/* Unified Benefits List */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <Target className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Performance-based model
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <MessageSquare className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Weekly calls + Slack
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <Clock className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Async-only option
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Strategic campaign oversight
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Performance optimization
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleScrollToPricing}
                  variant="outline"
                  size="sm"
                  className="border-purple-400/30 text-purple-400 hover:bg-purple-400/10 hover:border-purple-400/50"
                >
                  View Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Digital Products Section */}
          <motion.div
            style={{ y: y3, opacity: opacity3 }}
            className="relative"
          >
            <div id="products" className="grid lg:grid-cols-[45%_55%] gap-8 md:gap-16 items-center scroll-mt-24 border border-white/10 md:border-transparent rounded-2xl p-4 md:p-0">
              {/* Content Side */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Bot className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider bg-zinc-800/50 px-3 py-1 rounded-full">
                    Automation Focus
                  </span>
                </div>
                
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    Digital Products
                  </h3>
                  
                  <p className="text-zinc-300 mb-8 leading-relaxed">
                    Ready-to-use automation tools and dashboards to streamline your marketing operations and reduce manual work.
                  </p>

                  {/* Unified Benefits List */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <Zap className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Make.com & n8n workflows
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <BarChart3 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Looker & GA4 reporting dashboards
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <Settings className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Campaign management scripts
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Reduce manual work
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      Scale operations efficiently
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => window.open('/tools', '_blank')}
                  variant="outline"
                  size="sm"
                  className="border-purple-400/30 text-purple-400 hover:bg-purple-400/10 hover:border-purple-400/50"
                >
                  Explore Tools
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Visual Side - Floating Tool Cards */}
              <div className="relative">
                <div className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-white/10 md:border-transparent">
                  <p className="text-sm font-medium text-zinc-300 mb-6 text-center">
                    Explore plug-and-play tools to cut hours of manual work
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors">
                      <div className="p-2 rounded-lg bg-purple-500/20">
                        <Zap className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Automation Tools</div>
                        <div className="text-xs text-zinc-400">Workflow automation</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors">
                      <div className="p-2 rounded-lg bg-purple-500/20">
                        <BarChart3 className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Dashboards</div>
                        <div className="text-xs text-zinc-400">Real-time reporting</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors">
                      <div className="p-2 rounded-lg bg-purple-500/20">
                        <Settings className="w-5 h-5 text-purple-400" />
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}