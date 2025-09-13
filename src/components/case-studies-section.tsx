"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Home, Rocket } from "lucide-react";

export const CaseStudiesSection = () => {
  const caseStudies = [
    {
      category: "eCom Travel & Transportation",
      icon: Plane,
      title: "Saved $2.7M in 6-months",
      description: "Saved around $15,000 daily on wasted Search Ads spend, by identifying low performing campaigns.",
      details: "After the restructured Google Ads setup, we cut spend in half and achieved the same Contribution Margin as we did before the setup.",
      metrics: [
        { value: "$2.7M", label: "Saved" },
        { value: "6", label: "Months" },
        { value: "$15K", label: "Daily Savings" },
      ],
    },
    {
      category: "Home-Decor eCommerce Store",
      icon: Home,
      title: "Black Friday Frenzy",
      description: "By identifying the best selling product categories during the first days of Black Friday, we were able to steer & scale campaigns towards the right products.",
      results: [
        { icon: Rocket, text: "Ad Spend: +119% YoY" },
        { icon: Rocket, text: "Revenue: +284% YoY" },
        { icon: Rocket, text: "Efficiency: +7pp YoY" },
      ],
      hasChart: true,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 via-transparent to-purple-500/5"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
            Success Stories
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Real Results from Real <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Businesses</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real results from real eCommerce businesses we&apos;ve helped scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                      {study.category}
                    </Badge>
                    <study.icon className="w-6 h-6 text-purple-400 opacity-80" />
                  </div>
                  <CardTitle className="text-white text-2xl font-bold leading-tight">
                    {study.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-full">
                  <CardDescription className="text-gray-300 mb-4 text-base leading-relaxed">
                    {study.description}
                  </CardDescription>
                  
                  {study.details && (
                    <CardDescription className="text-gray-300 mb-6 text-base leading-relaxed">
                      {study.details}
                    </CardDescription>
                  )}

                  {/* Revenue Chart for Black Friday case study */}
                  {study.hasChart && (
                    <div className="mb-6">
                      <div className="bg-white rounded-lg p-4 border-2 border-purple-500/20">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
                            <span className="text-purple-600 font-bold">⬢</span>
                            <span className="text-purple-600 font-semibold text-sm">THREE.E</span>
                            <span className="text-purple-600">•</span>
                            <span className="text-purple-600 font-semibold text-sm">eCommvert.</span>
                          </div>
                          <h4 className="text-gray-800 font-bold text-sm uppercase tracking-wider">
                            Revenue development during peak season
                          </h4>
                        </div>
                        <div className="h-32 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 flex items-center justify-center">
                          <div className="text-purple-600 text-sm font-mono">Revenue Chart Visualization</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Metrics */}
                  {study.metrics && (
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {study.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                          <div className="text-purple-400 font-bold text-lg font-mono">{metric.value}</div>
                          <div className="text-gray-400 text-xs mt-1 uppercase tracking-wider">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Results */}
                  {study.results && (
                    <div className="mt-auto">
                      <h4 className="text-purple-400 font-semibold text-sm uppercase tracking-wider mb-3">
                        Final Results:
                      </h4>
                      <ul className="space-y-2">
                        {study.results.map((result, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-gray-300 text-sm">
                            <result.icon className="w-4 h-4 text-purple-400" />
                            {result.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
