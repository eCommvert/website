"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  ExternalLink, 
  Zap, 
  Users,
  Shield,
  Clock,
  Star,
  ArrowRight,
  PieChart,
  LineChart,
  Activity
} from "lucide-react";

export const ReportsPage = () => {
  const dashboards = [
    {
      icon: BarChart3,
      title: "Google Ads Marketing Efficiency",
      description: "Comprehensive analysis of your Google Ads performance with actionable insights.",
      features: [
        "Campaign Performance Analysis",
        "ROI & Conversion Tracking",
        "Budget Optimization",
        "Keyword Performance",
        "Ad Group Insights",
      ],
      price: "€50",
      period: "one-time purchase",
      popular: true,
    },
    {
      icon: PieChart,
      title: "Margin Overview & Profitability",
      description: "Deep dive into your profit margins and profitability across all campaigns.",
      features: [
        "Profit Margin Analysis",
        "Cost Structure Breakdown",
        "Revenue Attribution",
        "Profitability Trends",
        "Break-even Analysis",
      ],
      price: "€75",
      period: "one-time purchase",
      popular: false,
    },
    {
      icon: LineChart,
      title: "Search Campaign Optimization",
      description: "Advanced optimization tools for your search campaigns.",
      features: [
        "Keyword Performance",
        "Quality Score Analysis",
        "Bid Optimization",
        "Ad Copy Testing",
        "Competitive Analysis",
      ],
      price: "€60",
      period: "one-time purchase",
      popular: false,
    },
    {
      icon: Activity,
      title: "Shopping Campaign Analyzer",
      description: "Specialized analytics for Google Shopping campaigns.",
      features: [
        "Product Performance",
        "Feed Optimization",
        "Competitive Pricing",
        "Inventory Analysis",
        "Shopping Insights",
      ],
      price: "€65",
      period: "one-time purchase",
      popular: false,
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Real-time Data",
      description: "Live data synchronization with your Google Ads and GA4 accounts.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data stays private with enterprise-grade security.",
    },
    {
      icon: Users,
      title: "Team Access",
      description: "Share insights with your entire marketing team.",
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Continuous monitoring and automated alerts.",
    },
  ];

  const testimonials = [
    {
      name: "David Martinez",
      role: "PPC Manager",
      company: "E-commerce Store",
      content: "The Google Ads Marketing Efficiency dashboard has transformed how we optimize campaigns. ROI increased by 40% in the first month.",
      rating: 5,
    },
    {
      name: "Lisa Chen",
      role: "Marketing Director",
      company: "Tech Startup",
      content: "The Margin Overview dashboard revealed hidden profit opportunities we never knew existed. Game changer!",
      rating: 5,
    },
    {
      name: "Robert Johnson",
      role: "Digital Marketing Lead",
      company: "Retail Chain",
      content: "The Shopping Campaign Analyzer helped us optimize our product feed and increase conversions by 60%.",
      rating: 5,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
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
              Professional Dashboards
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Google Ads & GA4 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Reporting</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Transform your marketing data into actionable insights with our professional reporting dashboards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                View Dashboards
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                Request Demo
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {[
              { value: "1000+", label: "Active Dashboards" },
              { value: "99.9%", label: "Data Accuracy" },
              { value: "24/7", label: "Real-time Sync" },
              { value: "€5.2M", label: "Revenue Generated" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-purple-400 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboards Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Professional <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Dashboards</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose from our suite of specialized dashboards designed for Google Ads and GA4 analytics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {dashboards.map((dashboard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`relative bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group h-full ${
                  dashboard.popular ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20' : ''
                }`}>
                  {dashboard.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <dashboard.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-2xl mb-2">{dashboard.title}</CardTitle>
                    <CardDescription className="text-gray-300">{dashboard.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <ul className="space-y-3 mb-6 flex-grow">
                      {dashboard.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-300">
                          <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-purple-400">{dashboard.price}</div>
                      <div className="text-gray-400 text-sm">{dashboard.period}</div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Get Dashboard
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Why Choose Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Dashboards</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built by marketing professionals, for marketing professionals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-purple-400 font-semibold text-lg mb-3">{feature.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              What Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join hundreds of satisfied customers who have transformed their reporting.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.role} at {testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Reporting?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Join 1000+ marketing professionals who have already upgraded their reporting with our dashboards.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                    Schedule Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
};
