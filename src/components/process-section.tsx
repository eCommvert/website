"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle, MoreHorizontal, User } from "lucide-react";

export const ProcessSection = () => {
  const processSteps = [
    {
      step: "1",
      badge: "Discovery",
      icon: Search,
      title: "Discovery & Audit",
      description: "We dive deep into your current performance, identifying growth opportunities and strategic gaps. Our comprehensive audit reveals hidden potential and creates a clear roadmap for success.",
      features: [
        "Comprehensive performance audit",
        "3-month action plan with priorities",
        "Video audit + detailed transcript",
      ],
      progress: 85,
      stats: [
        { label: "Audit Time", value: "2-3 days" },
        { label: "Deliverables", value: "Video + Report" },
      ],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
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
            Our Process
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            How We <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Work</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We streamline the design workflow by breaking down projects into bite-sized design tasks.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/30 text-xs uppercase tracking-wider">
                      <Search className="w-3 h-3 mr-1" />
                      {step.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-gray-900 text-3xl font-bold leading-tight">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <CardDescription className="text-gray-600 text-lg leading-relaxed mb-6">
                        {step.description}
                      </CardDescription>
                      
                      <div className="space-y-3">
                        {step.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <Card className="bg-gray-50 border border-gray-200 w-full max-w-sm">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-purple-500 text-white text-xs uppercase">
                              Audit
                            </Badge>
                            <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <h4 className="text-gray-900 font-semibold mb-2">Performance Analysis</h4>
                          <p className="text-gray-600 text-sm mb-4">Deep dive into your current setup</p>
                          
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${step.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-gray-500 text-xs mb-4">{step.progress}% completed</p>
                          
                          <div className="flex justify-between items-center">
                            <div className="space-y-1">
                              {step.stats.map((stat, idx) => (
                                <div key={idx} className="text-xs text-gray-500">
                                  {stat.label}: {stat.value}
                                </div>
                              ))}
                            </div>
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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
          <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
                  <span className="text-yellow-900 font-bold text-sm">💡</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Ready to Transform Your Business?</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join 500+ eCommerce brands that have already saved millions with our strategic approach. Get your free audit today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Get Free Audit
                </Button>
                <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                  View Case Studies
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
