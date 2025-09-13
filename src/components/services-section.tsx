"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Zap, 
  BarChart3, 
  Settings, 
  ArrowRight, 
  CheckCircle,
  Lightbulb,
  Target
} from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Strategic Consulting",
    description: "Data-driven growth strategies to scale your eCommerce business",
    features: ["ROI Optimization", "Market Analysis", "Competitive Research"],
    badge: "Most Popular",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Zap,
    title: "Automation & Integration",
    description: "Streamline operations with n8n workflows and API integrations",
    features: ["n8n Workflows", "API Integrations", "Custom Dashboards"],
    badge: "New",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive reporting and insights for data-driven decisions",
    features: ["Looker Studio", "Custom Reports", "Real-time Data"],
    badge: "Featured",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Settings,
    title: "Performance Optimization",
    description: "Maximize efficiency and reduce costs across all campaigns",
    features: ["Campaign Optimization", "Budget Management", "A/B Testing"],
    badge: "Essential",
    color: "from-orange-500 to-red-500"
  }
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
            Our Services
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Scale
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From strategic consulting to advanced automation, we provide comprehensive solutions 
            to transform your eCommerce performance.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                      {service.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="ghost" 
                    className="w-full border border-slate-600/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/30"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Lightbulb className="w-8 h-8 text-yellow-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Ready to Transform Your Business?</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join 500+ eCommerce brands that have already saved millions with our strategic approach.
                Get your free audit today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Target className="mr-2 h-5 w-5" />
                  Get Free Audit
                </Button>
                <Button variant="outline" size="lg" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                  View Case Studies
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
