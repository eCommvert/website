"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Clock, 
  Users, 
  Shield, 
  BarChart3, 
  Settings,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Target,
    title: "Senior Strategic Guidance",
    description: "Direct access to 9+ years scaling experience. Strategic oversight that bridges CMO vision and agency execution.",
    badge: "Primary",
    color: "text-primary"
  },
  {
    icon: Clock,
    title: "Start Optimizing Within Days",
    description: "No 2-3 month hiring process. Immediate availability with proven expertise and no training required.",
    badge: "Speed",
    color: "text-green-600"
  },
  {
    icon: Users,
    title: "Cancel Anytime",
    description: "Flexible monthly agreements with no long-term commitments. Pay for one month and cancel the upcoming month if needed.",
    badge: "Flexible",
    color: "text-blue-600"
  },
  {
    icon: Shield,
    title: "No Hiring Risk",
    description: "Success fee models available. Focus on results, not hours worked. No hiring overhead or training costs.",
    badge: "Risk-Free",
    color: "text-purple-600"
  },
  {
    icon: BarChart3,
    title: "Diversify Beyond Top Products",
    description: "Advanced portfolio management for 1,000+ SKU catalogs. Optimize beyond the 10% driving 80% of revenue.",
    badge: "Advanced",
    color: "text-orange-600"
  },
  {
    icon: Settings,
    title: "Tailored Strategic Roadmaps",
    description: "Custom strategies based on your specific challenges. Hypothesis-driven optimization approach.",
    badge: "Custom",
    color: "text-pink-600"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-20 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <Badge variant="secondary" className="px-4 py-2">
            Why Choose eCommvert
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Strategic Benefits That Drive Results
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get senior-level expertise with immediate availability and no hiring overhead. 
            Focus on results, not hours worked.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-border">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-muted ${feature.color}`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-card border border-border rounded-xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-medium">All benefits included in every engagement</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Whether you choose a strategic audit or monthly consulting, you get access to all these benefits 
              with immediate availability and no hiring risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                See Which Service Fits Your Needs
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                Get Free Strategic Assessment
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
