"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Search, Zap, BarChart3, Settings, Target } from "lucide-react";

export const AnalyticsChartsSection = () => {
  const charts = [
    {
      title: "Revenue Growth",
      description: "Monthly revenue performance over time",
      icon: TrendingUp,
      metrics: [
        { value: "$2.7M", label: "Total Revenue" },
        { value: "+340%", label: "Growth Rate" },
        { value: "2.8x", label: "ROI" },
      ],
      chartType: "bar",
    },
    {
      title: "Campaign Performance",
      description: "Distribution of campaign results",
      icon: Target,
      metrics: [
        { value: "92%", label: "Success Rate" },
        { value: "4.2", label: "Avg ROAS" },
      ],
      chartType: "pie",
    },
    {
      title: "Conversion Metrics",
      description: "Monthly conversion performance",
      icon: BarChart3,
      metrics: [
        { value: "5.2%", label: "Conversion Rate" },
        { value: "$89", label: "Avg Order Value" },
        { value: "1,247", label: "Total Conversions" },
      ],
      chartType: "line",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
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
            Analytics
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Performance <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Analytics</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-time data visualization and insights from our client campaigns.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {charts.slice(0, 2).map((chart, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
                      <chart.icon className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">{chart.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">{chart.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Chart placeholder */}
                  <div className="h-48 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 mb-6 flex items-center justify-center">
                    <div className="text-purple-400 text-sm font-mono">Chart Visualization</div>
                  </div>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    {chart.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <div className="text-purple-400 font-bold text-lg font-mono">{metric.value}</div>
                        <div className="text-gray-400 text-xs mt-1">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Full-width chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Conversion Metrics</CardTitle>
              </div>
              <CardDescription className="text-gray-400">Monthly conversion performance</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Chart placeholder */}
              <div className="h-48 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 mb-6 flex items-center justify-center">
                <div className="text-purple-400 text-sm font-mono">Advanced Chart Visualization</div>
              </div>
              
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4">
                {charts[2].metrics.map((metric, idx) => (
                  <div key={idx} className="text-center p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <div className="text-purple-400 font-bold text-lg font-mono">{metric.value}</div>
                    <div className="text-gray-400 text-xs mt-1">{metric.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
