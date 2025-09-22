"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Particles } from "@/components/ui/particles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [particleColor, setParticleColor] = useState("#ffffff");

  useEffect(() => {
    setParticleColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  return (
    <section className="relative overflow-hidden bg-background min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Particles Effect */}
      <div className="absolute inset-0 z-0">
        <Particles
          className="absolute inset-0"
          quantity={100}
          staticity={50}
          ease={50}
          color={particleColor}
          size={0.4}
          refresh
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 h-full flex items-start justify-center -mt-10 sm:-mt-14 md:-mt-20 lg:-mt-24">
        <div className="space-y-10 w-full max-w-5xl">
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
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                Scale Your Advertising{" "}
                <span className="text-primary">Without Hiring</span> a Full-Time Marketing Manager
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-4xl">
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
              <Button size="default" className="!pl-10 !pr-6 !py-3 text-base font-medium">
                See If We&apos;re a Fit
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" size="default" className="px-6 py-3 text-base font-medium">
                Get Free Strategic Assessment
              </Button>
            </motion.div>

          {/* Primary Services Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Button
              variant="outline"
              className="h-12 px-6 text-sm md:text-base rounded-xl border-border/60 hover:border-primary/60 hover:bg-primary/10"
              onClick={() => {
                const el = document.getElementById('audits');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Strategic Audits
            </Button>
            <Button
              variant="outline"
              className="h-12 px-6 text-sm md:text-base rounded-xl border-border/60 hover:border-primary/60 hover:bg-primary/10"
              onClick={() => {
                const el = document.getElementById('consulting');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Monthly Consulting
            </Button>
            <Button
              variant="outline"
              className="h-12 px-6 text-sm md:text-base rounded-xl border-border/60 hover:border-primary/60 hover:bg-primary/10"
              onClick={() => {
                const el = document.getElementById('products');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              DIY Marketing Automation
            </Button>
          </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-4"
            >
              <p className="text-sm text-muted-foreground mb-3 text-center">Trusted by e-commerce brands spending $10K+/month</p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 opacity-60">
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

        </div>
      </div>
    </section>
  );
}