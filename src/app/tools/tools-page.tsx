"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Users,
  Shield,
  Clock,
  Star,
  ArrowRight,
  Loader2
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { ProductCardVertical } from "@/components/product-card-vertical";
// import { SearchFilters } from "@/components/search-filters";
import { FILTER_FACETS } from "@/lib/product-filters";
import { LemonSqueezyProduct, fetchLemonSqueezyProducts } from "@/lib/lemonsqueezy";

export const ToolsPage = () => {
  const [products, setProducts] = useState<LemonSqueezyProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<LemonSqueezyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("all");
  const [selectedPlatformFilter, setSelectedPlatformFilter] = useState("all");
  const [selectedDataBackendFilter, setSelectedDataBackendFilter] = useState("all");
  const [categories, setCategories] = useState<Array<{ id: string; name: string; description?: string; isActive: boolean }>>([]);
  const [productCategoryMap, setProductCategoryMap] = useState<Record<string, string>>({});
  const [productFiltersMap, setProductFiltersMap] = useState<Record<string, { platform?: string[]; dataBackend?: string; pricing?: string }>>({});
  const [viewMode, setViewMode] = useState<'list' | 'gallery'>(() => {
    if (typeof window === 'undefined') return 'list';
    const url = new URLSearchParams(window.location.search).get('view');
    const ls = localStorage.getItem('tools-view');
    return (url === 'gallery' || ls === 'gallery') ? 'gallery' : 'list';
  });

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
        
        // Sort by updated_at desc
        const sorted = [...fetchedProducts].sort((a,b) => new Date(b.attributes.updated_at).getTime() - new Date(a.attributes.updated_at).getTime());
        setProducts(sorted);
        setFilteredProducts(sorted);
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
    // Load categories and mapping from localStorage (managed in Admin)
    try {
      const savedCategories = localStorage.getItem('admin-categories');
      if (savedCategories) {
        const parsed = JSON.parse(savedCategories) as Array<{ id: string; name: string; description?: string; isActive: boolean }>;
        setCategories(parsed.filter(c => c.isActive));
      }
      const savedMap = localStorage.getItem('lemonsqueezy-product-category-map');
      const savedFiltersMap = localStorage.getItem('lemonsqueezy-product-filters-map');
      if (savedMap) {
        setProductCategoryMap(JSON.parse(savedMap));
      }
      if (savedFiltersMap) {
        setProductFiltersMap(JSON.parse(savedFiltersMap));
      }
    } catch {}

    // Initialize filters from URL or localStorage
    try {
      const params = new URLSearchParams(window.location.search);
      const ls = localStorage.getItem('tools-filters');
      const initial = ls ? JSON.parse(ls) : {};
      const q = params.get('q') ?? initial.q ?? "";
      const platform = params.get('platform') ?? initial.platform ?? 'all';
      const dataBackend = params.get('dataBackend') ?? initial.dataBackend ?? 'all';
      const price = params.get('price') ?? initial.price ?? 'all';
      setSearchQuery(q);
      setSelectedPlatformFilter(platform);
      setSelectedDataBackendFilter(dataBackend);
      setSelectedPriceFilter(price);
    } catch {}
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
      } else if (selectedPriceFilter === "paid") {
        filtered = filtered.filter(product => product.attributes.price > 0);
      }
    }

    // Platform filter (from admin-assigned filters; supports multiple)
    if (selectedPlatformFilter !== "all") {
      filtered = filtered.filter(product => {
        const arr = productFiltersMap[product.id]?.platform || [];
        return Array.isArray(arr) && arr.includes(selectedPlatformFilter);
      });
    }

    // Data backend filter (from admin-assigned filters)
    if (selectedDataBackendFilter !== "all") {
      filtered = filtered.filter(product => {
        const tag = productFiltersMap[product.id]?.dataBackend || 'all';
        return tag === selectedDataBackendFilter;
      });
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedPriceFilter, selectedPlatformFilter, selectedDataBackendFilter, productFiltersMap]);

  // Persist filters in URL and localStorage (debounced)
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        const params = new URLSearchParams(window.location.search);
        if (searchQuery) params.set('q', searchQuery); else params.delete('q');
        if (selectedPlatformFilter && selectedPlatformFilter !== 'all') params.set('platform', selectedPlatformFilter); else params.delete('platform');
        if (selectedDataBackendFilter && selectedDataBackendFilter !== 'all') params.set('dataBackend', selectedDataBackendFilter); else params.delete('dataBackend');
        if (selectedPriceFilter && selectedPriceFilter !== 'all') params.set('price', selectedPriceFilter); else params.delete('price');
        const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}${window.location.hash}`;
        window.history.replaceState(null, '', newUrl);
        localStorage.setItem('tools-filters', JSON.stringify({ q: searchQuery, platform: selectedPlatformFilter, dataBackend: selectedDataBackendFilter, price: selectedPriceFilter }));
      } catch {}
    }, 250);
    return () => clearTimeout(id);
  }, [searchQuery, selectedPlatformFilter, selectedDataBackendFilter, selectedPriceFilter]);

  // Persist view mode
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      params.set('view', viewMode);
      const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
      window.history.replaceState(null, '', newUrl);
      localStorage.setItem('tools-view', viewMode);
    } catch {}
  }, [viewMode]);

  const features = [
    {
      icon: Users,
      title: "From marketers to marketers",
      description: "Built by hands‑on performance marketers for their own work—then shared with the world.",
    },
    {
      icon: Zap,
      title: "Reliable tools marketers use",
      description: "Works with Looker Studio, Make.com, Google Ads Scripts, Google Sheets, and n8n.",
    },
    {
      icon: Shield,
      title: "Secure",
      description: "We never store your client data. Automations and dashboards run in your environment.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Friendly help when you need it—documentation, email support, and quick fixes.",
    },
  ];
  type StoredTestimonial = { id: string; quote: string; author: string; role: string; company: string; photo?: string; isActive?: boolean; rating?: number; scope?: "tools" | "consulting" };
  const [testimonials, setTestimonials] = useState<StoredTestimonial[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('admin-testimonials');
      if (raw) {
        const list = JSON.parse(raw) as StoredTestimonial[];
        setTestimonials(list.filter(t => (t.isActive ?? true) && (t.scope === 'tools')));
      }
    } catch {}
  }, []);

  const grouped: Record<string, LemonSqueezyProduct[]> = React.useMemo(() => {
    const groups: Record<string, LemonSqueezyProduct[]> = {};
    const activeCategoryIds = new Set(categories.map(c => c.id));
    filteredProducts.forEach(p => {
      const catId = productCategoryMap[p.id];
      const groupKey = catId && activeCategoryIds.has(catId) ? catId : 'uncategorized';
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(p);
    });
    return groups;
  }, [filteredProducts, productCategoryMap, categories]);

  const getCategoryById = (id: string) => categories.find(c => c.id === id);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background via-primary/10 to-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30">
              Automation & Reporting
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Automate your Google Ads and Meta Ads with workflows and reports
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Ready‑to‑use automations, dashboards, and utilities to cut busywork and scale performance.
            </p>
            <div className="flex justify-center">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View all tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">Products</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our professional suite of marketing tools designed to scale your business.
            </p>
          </motion.div>

          {/* View Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="hidden md:block text-sm text-muted-foreground">
              {filteredProducts.length} items
            </div>
            <div className="inline-flex rounded-md border border-border overflow-hidden">
              <button
                aria-pressed={viewMode === 'list'}
                className={`px-3 py-1.5 text-sm ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground'}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
              <button
                aria-pressed={viewMode === 'gallery'}
                className={`px-3 py-1.5 text-sm border-l border-border ${viewMode === 'gallery' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground'}`}
                onClick={() => setViewMode('gallery')}
              >
                Gallery
              </button>
            </div>
          </div>

          {/* Layout: filters left for list view; filters above for gallery view */}
          {viewMode === 'list' ? (
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
              {/* Sidebar Filters */}
              <aside>
                <div className="md:sticky md:top-24 space-y-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Search</label>
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search tools..."
                      className="w-full rounded-lg border border-border bg-background px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Platform</label>
                    <select
                      value={selectedPlatformFilter}
                      onChange={(e) => setSelectedPlatformFilter(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2"
                    >
                      {FILTER_FACETS.platform.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Data backend</label>
                    <select
                      value={selectedDataBackendFilter}
                      onChange={(e) => setSelectedDataBackendFilter(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2"
                    >
                      {FILTER_FACETS.dataBackend.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Price</label>
                    <select
                      value={selectedPriceFilter}
                      onChange={(e) => setSelectedPriceFilter(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2"
                    >
                      {FILTER_FACETS.pricing.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedPriceFilter("all");
                      setSelectedPlatformFilter("all");
                      setSelectedDataBackendFilter("all");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              </aside>

              {/* Products Column */}
              <div>
              {/* Products Grid */}
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="ml-3 text-muted-foreground">Loading products...</span>
                </div>
              ) : filteredProducts.length > 0 ? (
                  <div className="space-y-12 mb-16">
                    {[
                      ...categories.map(c => c.id),
                      'uncategorized',
                    ].map((catId) => {
                    const items = grouped[catId] || [];
                    if (items.length === 0) return null;
                    const cat = getCategoryById(catId);
                    const title = cat ? cat.name : 'Uncategorized';
                    const desc = cat?.description || (cat ? '' : 'Items not yet assigned to a category');
                    return (
                      <div key={catId}>
                        <div className="mb-6">
                          <h3 className="text-2xl sm:text-3xl font-bold text-white">{title}</h3>
                          {desc ? <p className="text-gray-300 mt-2">{desc}</p> : null}
                        </div>
                        <div className="space-y-6">
                          {items.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-muted-foreground text-lg mb-4">
                    {searchQuery || selectedPriceFilter !== "all" || selectedPlatformFilter !== "all" || selectedDataBackendFilter !== "all"
                      ? "No products match your filters"
                      : "No products available"}
                  </div>
                </div>
              )}
              </div>
            </div>
          ) : (
            // Gallery view
            <div className="space-y-6">
              {/* Compact filters above products */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools..."
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                />
                <select value={selectedPlatformFilter} onChange={(e) => setSelectedPlatformFilter(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2">
                  {FILTER_FACETS.platform.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                </select>
                <select value={selectedDataBackendFilter} onChange={(e) => setSelectedDataBackendFilter(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2">
                  {FILTER_FACETS.dataBackend.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                </select>
                <select value={selectedPriceFilter} onChange={(e) => setSelectedPriceFilter(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2">
                  {FILTER_FACETS.pricing.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                </select>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="ml-3 text-muted-foreground">Loading products...</span>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product, index) => (
                    <ProductCardVertical key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-muted-foreground text-lg mb-4">
                    {searchQuery || selectedPriceFilter !== "all" || selectedPlatformFilter !== "all" || selectedDataBackendFilter !== "all"
                      ? "No products match your filters"
                      : "No products available"}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Removed duplicate 3-column section to avoid duplication */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background via-primary/10 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Why Choose Our <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">Tools</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                <Card className="bg-card border-border backdrop-blur-sm hover:bg-accent/10 transition-all duration-300 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-primary font-semibold text-lg mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              What Our <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">Clients Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                <Card className="bg-card border-border backdrop-blur-sm hover:bg-accent/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array((testimonial.rating ?? 5))].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-muted-foreground text-sm">{testimonial.role} at {testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section removed per request */}
      </main>
    </div>
  );
};
