"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle,
  Quote,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const socialProofItems = [
  {
    icon: Star,
    title: "Former Google Ads Team Member",
    subtitle: "9+ Years Scaling E-commerce Businesses",
    description: "Strategic Partner to Agencies & In-House Teams",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Limited Client Load for Maximum Attention",
    subtitle: "Handful of Clients for Quality Over Quantity",
    description: "Senior Strategic Oversight, Not Junior Execution",
    color: "text-blue-600"
  },
  {
    icon: TrendingUp,
    title: "Average 20%+ Efficiency Improvements",
    subtitle: "Strategic Roadmaps Worth Months of Work",
    description: "Immediate Start vs. 2-3 Month Hiring Process",
    color: "text-green-600"
  }
];

const testimonials = [
  {
    quote: "Denis helped us identify optimization opportunities we never knew existed. Our ROAS improved by 40% within 2 months.",
    author: "Sarah M.",
    role: "CMO, E-commerce Brand",
    company: "$50K/month ad spend"
  },
  {
    quote: "Finally found someone who bridges the gap between our strategy and execution. The strategic oversight has been invaluable.",
    author: "Mike R.",
    role: "Marketing Director",
    company: "$25K/month ad spend"
  },
  {
    quote: "Working with Denis is like having a senior strategist on demand. Immediate availability with proven expertise.",
    author: "Lisa K.",
    role: "CEO, DTC Brand",
    company: "$15K/month ad spend"
  }
];

export function SocialProofSection() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Authority Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <Badge variant="secondary" className="px-4 py-2">
            Trusted Expertise
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Why E-commerce Brands Choose eCommvert
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Senior expertise with immediate availability and no hiring risk. 
            Strategic oversight that bridges CMO vision and agency execution.
          </p>
        </motion.div>

        {/* Social Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {socialProofItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className={`inline-flex p-4 rounded-full bg-muted ${item.color}`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-primary font-medium">{item.subtitle}</p>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <Badge variant="outline" className="px-4 py-2">
              Client Success Stories
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold">
              What Our Clients Say
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    <Quote className="w-8 h-8 text-primary/50" />
                    <p className="text-muted-foreground italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="space-y-1">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-primary font-medium">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-muted/50 rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">E-commerce Brands Helped</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">20%+</div>
                <div className="text-sm text-muted-foreground">Average Efficiency Improvement</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">9+</div>
                <div className="text-sm text-muted-foreground">Years Scaling Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
