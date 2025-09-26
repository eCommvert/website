"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does your performance-based pricing work?",
      answer: "Our pricing is tied to your actual business results. We charge a base fee for our services, plus success fees based on revenue growth, cost savings, and ROI improvements. This ensures we only succeed when you succeed."
    },
    {
      question: "What's included in the comprehensive audit?",
      answer: "Our audit includes a deep analysis of your current Google Ads performance, identification of growth opportunities, a detailed 3-month action plan, video walkthrough with transcript, and specific recommendations for optimization."
    },
    {
      question: "How long does it take to see results?",
      answer: "Most clients see initial improvements within 2-4 weeks of implementation. However, significant results typically appear within 2-3 months as we optimize campaigns and scale successful strategies."
    },
    {
      question: "Do you work with all types of businesses?",
      answer: "We specialize in eCommerce businesses, agencies, and in-house marketing teams. Our expertise is particularly strong in B2C eCommerce, but we also work with B2B companies with substantial online marketing budgets."
    },
    {
      question: "What makes you different from other consultants?",
      answer: "We focus on business growth, not just campaign metrics. Our approach combines strategic thinking with tactical execution, and we're committed to long-term partnerships rather than one-off projects."
    },
    {
      question: "Can you help with other platforms besides Google Ads?",
      answer: "Yes! While Google Ads is our specialty, we also work with Meta Ads, TikTok Ads, and other digital advertising platforms. We can provide comprehensive cross-platform strategies."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
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
            FAQ
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about our services and process.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-700/30 transition-colors duration-200"
                  >
                    <h3 className="text-white font-semibold text-lg pr-4">{faq.question}</h3>
                    <div className="text-purple-400 transition-transform duration-200">
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-4">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                We&apos;re here to help! Schedule a free consultation to discuss your specific needs and how we can help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0e87iaSbJPqTsbMqqXVe9gyZJEji1ZsPaujJP5MO8ljbXyzjHOOUJ97qHhE8VeP_HiD-xj914j" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Schedule Free Consultation
                  </Button>
                </a>
                <a href="mailto:ads@ecommvert.com">
                  <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                    Contact Us
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
