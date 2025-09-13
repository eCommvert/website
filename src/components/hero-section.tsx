"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Users, TrendingUp, Circle } from "lucide-react";
import { motion } from "framer-motion";
import { GrowthChart } from "@/components/growth-chart";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-8 md:py-12 lg:py-16">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8 max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-2 h-2 rounded-full bg-green-500"
                  />
                  <span>Last 2 Spots Available</span>
                </div>
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Scale Your Advertising{" "}
                <span className="text-primary">Without Hiring</span> a Full-Time Marketing Manager
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                On-demand Google & Meta consulting for agencies, in-house teams and e-commerce businesses.
              </p>
            </motion.div>


            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Button size="default" className="!pl-10 !pr-6 !py-2.5 text-base font-medium">
                See If We're a Fit
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" size="default" className="px-6 py-2.5 text-base font-medium">
                Get Free Strategic Assessment
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-3"
            >
              <p className="text-sm text-muted-foreground mb-3 text-center">Trusted by e-commerce brands spending $10K+/month</p>
              <div className="flex items-center justify-center gap-8 opacity-60">
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <CheckCircle className="w-3 h-3 text-primary" />
                  Strategic Audits
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <CheckCircle className="w-3 h-3 text-primary" />
                  Monthly Consulting
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <CheckCircle className="w-3 h-3 text-primary" />
                  Digital Products
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-full"
          >
            <GrowthChart />
          </motion.div>
        </div>
      </div>
    </section>
  );
}