"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Calendar, 
  MessageCircle,
  CheckCircle,
  Star
} from "lucide-react";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          {/* Header */}
          <div className="space-y-4">
            <Badge variant="secondary" className="px-4 py-2 bg-white/20 text-white border-white/30">
              Ready to Scale?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Stop Losing Money on Ineffective Google Ads
            </h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Get strategic oversight from a former Google Ads team member. 
              Immediate start, senior expertise, no hiring risk.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="space-y-3">
              <div className="inline-flex p-3 rounded-full bg-white/20">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Immediate Start</h3>
              <p className="text-sm text-primary-foreground/80">
                No 2-3 month hiring process. Start optimizing today.
              </p>
            </div>
            <div className="space-y-3">
              <div className="inline-flex p-3 rounded-full bg-white/20">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Senior Expertise</h3>
              <p className="text-sm text-primary-foreground/80">
                Former Google Ads team member with 9+ years experience.
              </p>
            </div>
            <div className="space-y-3">
              <div className="inline-flex p-3 rounded-full bg-white/20">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Proven Results</h3>
              <p className="text-sm text-primary-foreground/80">
                Average 20%+ efficiency improvements for our clients.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="px-8 py-4 text-lg font-semibold"
            >
              Schedule Strategy Call
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-4 text-lg font-semibold border-white/30 text-white hover:bg-white/10"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Get Started Today
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="pt-8 border-t border-white/20">
            <p className="text-sm text-primary-foreground/80 mb-4">
              Trusted by e-commerce brands spending $10K+ monthly
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/70">
              <span>✓ No long-term contracts</span>
              <span>✓ Cancel anytime</span>
              <span>✓ 30-day money-back guarantee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}