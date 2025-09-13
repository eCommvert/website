"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Settings, FileText, ExternalLink } from "lucide-react";

export const ProductsSection = () => {
  const products = [
    {
      icon: BarChart3,
      title: "Marketing Dashboards",
      description: "Professional dashboards for Google Ads, Meta Ads, and GA4 that provide actionable insights.",
      features: [
        "Google Ads Marketing Efficiency",
        "Margin Overview & Profitability",
        "Search Campaign Optimization",
        "Shopping Campaign Analyzer",
        "Budgeting & Scaling Dashboards",
      ],
      price: "€20-100",
      period: "one-time purchase",
      link: "/tools",
    },
    {
      icon: Settings,
      title: "n8n Workflow Templates",
      description: "Pre-built automation workflows for marketing operations, reporting, and data processing.",
      features: [
        "Automated reporting workflows",
        "Data synchronization tools",
        "Marketing automation templates",
        "Custom workflow development",
        "Documentation & setup guides",
      ],
      price: "€50-200",
      period: "one-time purchase",
      link: "/tools",
    },
    {
      icon: FileText,
      title: "SOPs & Documentation",
      description: "Standard Operating Procedures and process documentation for marketing teams and agencies.",
      features: [
        "Marketing process SOPs",
        "Campaign management workflows",
        "Reporting templates",
        "Team training materials",
        "Process optimization guides",
      ],
      price: "€30-150",
      period: "one-time purchase",
      link: "/tools",
    },
  ];

  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/5 via-transparent to-green-500/5"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
            Digital Products
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready-to-use <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Tools</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready-to-use dashboards, reports, and automation workflows to accelerate your marketing operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 group-hover:scale-110 transition-transform duration-300">
                      <product.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">{product.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col h-full">
                  <ul className="space-y-2 mb-6 flex-grow">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                        <span className="text-green-400 font-bold">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-center mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{product.price}</div>
                    <div className="text-gray-400 text-sm">{product.period}</div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-green-500/30 text-green-300 hover:bg-green-500/10 hover:border-green-500/50"
                    asChild
                  >
                    <a href={product.link} className="flex items-center gap-2">
                      Browse {product.title}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
