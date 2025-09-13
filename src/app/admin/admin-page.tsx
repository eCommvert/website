"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Users, 
  BarChart3, 
  ExternalLink, 
  Zap, 
  Shield,
  Clock,
  Star,
  ArrowRight,
  Database
} from "lucide-react";

export const AdminPage = () => {
  const adminFeatures = [
    {
      icon: Database,
      title: "Product Management",
      description: "Manage all your digital products, dashboards, and tools in one place.",
      features: [
        "Product Catalog Management",
        "Pricing & Availability",
        "Access Control",
        "Analytics & Insights",
        "Customer Management",
      ],
      popular: true,
    },
    {
      icon: Users,
      title: "User Management",
      description: "Manage customer accounts, permissions, and access levels.",
      features: [
        "Customer Database",
        "Role-based Access",
        "Subscription Management",
        "Support Tickets",
        "User Analytics",
      ],
      popular: false,
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive analytics for your business performance.",
      features: [
        "Revenue Analytics",
        "Product Performance",
        "Customer Insights",
        "Conversion Tracking",
        "Growth Metrics",
      ],
      popular: false,
    },
    {
      icon: Settings,
      title: "System Settings",
      description: "Configure system settings, integrations, and preferences.",
      features: [
        "API Configuration",
        "Payment Settings",
        "Email Templates",
        "Security Settings",
        "Backup & Recovery",
      ],
      popular: false,
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed and performance, ensuring your data loads instantly.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security with role-based access control.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Built for teams with comprehensive user management.",
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Continuous monitoring and automated alerts.",
    },
  ];

  const stats = [
    { value: "500+", label: "Active Products" },
    { value: "2000+", label: "Customers" },
    { value: "€150K", label: "Monthly Revenue" },
    { value: "99.9%", label: "Uptime" },
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
              Admin Panel
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Product <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Management</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Manage your digital products, customers, and business operations with our comprehensive admin panel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Access Admin Panel
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                View Documentation
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
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

      {/* Admin Features Section */}
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
              Admin <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive tools to manage your digital business operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {adminFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`relative bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group h-full ${
                  feature.popular ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20' : ''
                }`}>
                  {feature.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                      <Star className="w-3 h-3 mr-1" />
                      Core Feature
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-2xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-300">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <ul className="space-y-3 mb-6 flex-grow">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-300">
                          <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Access {feature.title}
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
              Why Choose Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Admin Panel</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built for scalability, security, and ease of use.
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
                <h3 className="text-3xl font-bold text-white mb-4">Ready to Manage Your Business?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Access the admin panel to manage your products, customers, and business operations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Access Admin Panel
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                    Contact Support
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
