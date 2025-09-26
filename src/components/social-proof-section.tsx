"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  TrendingUp, 
  Users
} from "lucide-react";
import { motion } from "framer-motion";
// import Image from "next/image";

const socialProofItems = [
  {
    icon: Users,
    title: "Limited Client Load",
    subtitle: "",
    description: "We work with a handful of partners at a time. Senior attention on every account — no junior handoffs.",
    color: "text-blue-600"
  },
  {
    icon: Star,
    title: "No Hiring Risk — Cancel Anytime",
    subtitle: "",
    description: "Start fast without long contracts. Stay month-to-month and pause when you no longer need us.",
    color: "text-purple-600"
  },
  {
    icon: TrendingUp,
    title: "Aligned on Outcomes",
    subtitle: "",
    description: "Success fee options available. We tie incentives to results — not hours logged.",
    color: "text-primary"
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
          <Badge variant="secondary" className="px-4 py-2">Why E-commerce Brands Choose eCommvert</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Built for speed, seniority and flexibility</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Partner directly with senior expertise, start quickly, and keep full flexibility with month-to-month engagement and outcome-aligned models.</p>
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


      </div>
    </section>
  );
}
