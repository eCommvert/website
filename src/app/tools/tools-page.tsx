"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Settings, 
  FileText, 
  ExternalLink, 
  Zap, 
  TrendingUp, 
  Target, 
  Users,
  Shield,
  Clock,
  Star,
  ArrowRight,
  Loader2
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SearchFilters } from "@/components/search-filters";
import { LemonSqueezyProduct, fetchLemonSqueezyProducts } from "@/lib/lemonsqueezy";

export const ToolsPage = () => {
  const [products, setProducts] = useState<LemonSqueezyProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<LemonSqueezyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("all");
  const [selectedPlatformFilter, setSelectedPlatformFilter] = useState("all");
  const [selectedBackendFilter, setSelectedBackendFilter] = useState("all");

  // Fetch products from LemonSqueezy
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // Replace 'your-store-id' with your actual LemonSqueezy store ID
        const storeId = process.env.NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID || "your-store-id";
        const fetchedProducts = await fetchLemonSqueezyProducts(storeId);
        
        // Debug: Log the first product to see the structure
        if (fetchedProducts.length > 0) {
          console.log('First product data:', fetchedProducts[0]);
          console.log('Image URLs available:', {
            image_url: fetchedProducts[0].attributes.image_url,
            thumb_url: fetchedProducts[0].attributes.thumb_url,
            large_thumb_url: fetchedProducts[0].attributes.large_thumb_url,
            original_store_image_url: fetchedProducts[0].attributes.original_store_image_url,
          });
        }
        
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error("Error loading products:", error);
        // Fallback to sample data if API fails
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products based on search and filters
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.attributes.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.attributes.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    if (selectedPriceFilter !== "all") {
      if (selectedPriceFilter === "free") {
        filtered = filtered.filter(product => product.attributes.price === 0);
      } else if (selectedPriceFilter === "premium") {
        filtered = filtered.filter(product => product.attributes.price > 0);
      }
    }

    // Platform filter (you can customize this based on your product tags/attributes)
    if (selectedPlatformFilter !== "all") {
      // This is a placeholder - you'll need to implement based on your product structure
      // You might want to add tags or custom fields to your LemonSqueezy products
    }

    // Backend filter (you can customize this based on your product tags/attributes)
    if (selectedBackendFilter !== "all") {
      // This is a placeholder - you'll need to implement based on your product structure
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedPriceFilter, selectedPlatformFilter, selectedBackendFilter]);

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed and performance, ensuring your data loads instantly.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Built for teams with role-based access and real-time collaboration.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock support to help you succeed.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content: "These tools have transformed our marketing operations. The dashboards are incredibly intuitive and the automation saves us hours every week.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "E-commerce Manager",
      company: "Shopify Store",
      content: "The n8n workflows have automated 80% of our manual tasks. ROI has increased by 300% since implementation.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Digital Marketing Lead",
      company: "StartupXYZ",
      content: "The SOPs and documentation have standardized our processes across the entire team. Highly recommended!",
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
              Digital Tools
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Professional <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Marketing Tools</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Transform your marketing operations with our suite of professional tools, dashboards, and automation workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                View Demo
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {[
              { value: "500+", label: "Active Users" },
              { value: "99.9%", label: "Uptime" },
              { value: "24/7", label: "Support" },
              { value: "€2.7M", label: "Saved for Clients" },
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

      {/* Products Section */}
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
              Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Products</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose from our professional suite of marketing tools designed to scale your business.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="mb-12">
            <SearchFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedPriceFilter={selectedPriceFilter}
              onPriceFilterChange={setSelectedPriceFilter}
              selectedPlatformFilter={selectedPlatformFilter}
              onPlatformFilterChange={setSelectedPlatformFilter}
              selectedBackendFilter={selectedBackendFilter}
              onBackendFilterChange={setSelectedBackendFilter}
            />
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
              <span className="ml-3 text-gray-300">Loading products...</span>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-400 text-lg mb-4">
                {searchQuery || selectedPriceFilter !== "all" || selectedPlatformFilter !== "all" || selectedBackendFilter !== "all"
                  ? "No products match your filters"
                  : "No products available"}
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedPriceFilter("all");
                  setSelectedPlatformFilter("all");
                  setSelectedBackendFilter("all");
                }}
                className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
              >
                Clear Filters
              </Button>
            </div>
          )}
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
              Why Choose Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Tools</span>
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
              Join hundreds of satisfied customers who have transformed their marketing operations.
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
                <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Marketing?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Join 500+ marketing professionals who have already upgraded their operations with our tools.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Start Free Trial
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
