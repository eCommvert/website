"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// Select not used here
import { 
  ShoppingCart, 
  ExternalLink, 
  RefreshCw, 
  DollarSign, 
  Users, 
  TrendingUp,
  Eye,
  EyeOff,
  Settings,
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react";
import { LemonSqueezyProduct, formatPrice } from "@/lib/lemonsqueezy";
import { FILTER_FACETS, ProductFiltersMap, hasRequiredFacets } from "@/lib/product-filters";

interface LemonSqueezyIntegrationProps {
  onProductsUpdate?: (products: LemonSqueezyProduct[]) => void;
}

export const LemonSqueezyIntegration: React.FC<LemonSqueezyIntegrationProps> = ({ 
  onProductsUpdate 
}) => {
  const [apiKey, setApiKey] = useState("");
  const [storeId, setStoreId] = useState("");
  const [products, setProducts] = useState<LemonSqueezyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [categories, setCategories] = useState<Array<{ id: string; name: string; isActive: boolean }>>([]);
  const [productCategoryMap, setProductCategoryMap] = useState<Record<string, string>>({});
  const [productFiltersMap, setProductFiltersMap] = useState<ProductFiltersMap>({});

  // UI state for compact table management
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "price" | "sales" | "revenue" | "created">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});

  // Load saved settings from localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem('lemonsqueezy-api-key');
    const savedStoreId = localStorage.getItem('lemonsqueezy-store-id');
    const savedProducts = localStorage.getItem('lemonsqueezy-products');
    const savedCategories = localStorage.getItem('admin-categories');
    const savedMap = localStorage.getItem('lemonsqueezy-product-category-map');
    const savedFiltersMap = localStorage.getItem('lemonsqueezy-product-filters-map');
    
    if (savedApiKey) setApiKey(savedApiKey);
    if (savedStoreId) setStoreId(savedStoreId);
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
      setIsConnected(true);
    }
    if (savedCategories) {
      try {
        const parsed = JSON.parse(savedCategories) as Array<{ id: string; name: string; isActive: boolean }>;
        setCategories(parsed);
      } catch {}
    }
    if (savedMap) {
      try {
        setProductCategoryMap(JSON.parse(savedMap));
      } catch {}
    }
    if (savedFiltersMap) {
      try {
        setProductFiltersMap(JSON.parse(savedFiltersMap));
      } catch {}
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('lemonsqueezy-api-key', apiKey);
    localStorage.setItem('lemonsqueezy-store-id', storeId);
    setSuccess("Settings saved successfully!");
    setTimeout(() => setSuccess(null), 3000);
  };

  const fetchProducts = async () => {
    if (!apiKey || !storeId) {
      setError("Please enter both API key and Store ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // In a real implementation, you'd make this API call from your backend
      // For now, we'll simulate the API call
      const response = await fetch(`/api/lemonsqueezy/products?storeId=${storeId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data.data || []);
      setIsConnected(true);
      setSuccess(`Successfully fetched ${data.data?.length || 0} products!`);
      
      // Save products to localStorage
      localStorage.setItem('lemonsqueezy-products', JSON.stringify(data.data || []));
      
      // Notify parent component
      if (onProductsUpdate) {
        onProductsUpdate(data.data || []);
      }
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(`Failed to fetch products: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignCategory = (productId: string, categoryId: string) => {
    setProductCategoryMap(prev => {
      const updated = { ...prev } as Record<string, string>;
      if (categoryId === 'uncategorized') {
        delete updated[productId];
      } else {
        updated[productId] = categoryId;
      }
      localStorage.setItem('lemonsqueezy-product-category-map', JSON.stringify(updated));
      return updated;
    });
  };

  const handleAssignFilters = (productId: string, key: 'platform' | 'dataBackend' | 'pricing', value: string) => {
    setProductFiltersMap(prev => {
      let newEntry = { ...(prev[productId] || {}) } as any;
      if (key === 'platform') {
        const existing: string[] = Array.isArray(newEntry.platform) ? newEntry.platform : [];
        // toggle selection in multi-select style
        newEntry.platform = existing.includes(value) ? existing.filter(v => v !== value) : [...existing, value];
      } else {
        newEntry[key] = value;
      }
      const updated = { ...prev, [productId]: newEntry };
      localStorage.setItem('lemonsqueezy-product-filters-map', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleProductVisibility = (productId: string) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, attributes: { ...product.attributes, status: product.attributes.status === 'published' ? 'draft' : 'published' } }
        : product
    ));
  };

  const toggleSelectAll = (ids: string[], checked: boolean) => {
    setSelectedIds(prev => {
      const next: Record<string, boolean> = { ...prev };
      ids.forEach(id => next[id] = checked);
      return next;
    });
  };

  const toggleSelectOne = (id: string, checked: boolean) => {
    setSelectedIds(prev => ({ ...prev, [id]: checked }));
  };

  const bulkAssignCategory = (categoryId: string) => {
    const ids = Object.keys(selectedIds).filter(id => selectedIds[id]);
    if (ids.length === 0) return;
    setProductCategoryMap(prev => {
      const updated = { ...prev } as Record<string, string>;
      ids.forEach(id => {
        if (categoryId === 'uncategorized') {
          delete updated[id];
        } else {
          updated[id] = categoryId;
        }
      });
      localStorage.setItem('lemonsqueezy-product-category-map', JSON.stringify(updated));
      return updated;
    });
  };

  const bulkSetStatus = (status: 'published' | 'draft' | 'archived') => {
    const ids = Object.keys(selectedIds).filter(id => selectedIds[id]);
    if (ids.length === 0) return;
    setProducts(prev => prev.map(p => ids.includes(p.id) ? { ...p, attributes: { ...p.attributes, status } } : p));
  };

  const getCategoryLabel = (productId: string) => {
    const id = productCategoryMap[productId];
    if (!id) return 'Uncategorized';
    const cat = categories.find(c => c.id === id);
    return cat ? cat.name : 'Uncategorized';
  };

  const visibleProducts = React.useMemo(() => {
    let list = [...products];
    // search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(p =>
        p.attributes.name.toLowerCase().includes(q) ||
        (p.attributes.description || '').toLowerCase().includes(q)
      );
    }
    // status filter
    if (filterStatus !== 'all') {
      list = list.filter(p => p.attributes.status === filterStatus);
    }
    // category filter
    if (filterCategory !== 'all') {
      if (filterCategory === 'uncategorized') {
        list = list.filter(p => !productCategoryMap[p.id]);
      } else {
        list = list.filter(p => productCategoryMap[p.id] === filterCategory);
      }
    }
    // sort
    list.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      switch (sortBy) {
        case 'name':
          return a.attributes.name.localeCompare(b.attributes.name) * dir;
        case 'price':
          return ((a.attributes.price || 0) - (b.attributes.price || 0)) * dir;
        case 'sales':
          return ((a.attributes.sales_count || 0) - (b.attributes.sales_count || 0)) * dir;
        case 'revenue':
          return ((a.attributes.total_revenue || 0) - (b.attributes.total_revenue || 0)) * dir;
        case 'created':
          return (new Date(a.attributes.created_at).getTime() - new Date(b.attributes.created_at).getTime()) * dir;
        default:
          return 0;
      }
    });
    return list;
  }, [products, searchTerm, filterStatus, filterCategory, sortBy, sortDir, productCategoryMap]);

  const toggleSort = (key: typeof sortBy) => {
    if (sortBy === key) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDir('asc');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default" className="bg-green-100 text-green-800">Published</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'archived':
        return <Badge variant="destructive">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRevenueBadge = (revenue: number) => {
    if (revenue > 10000) {
      return <Badge variant="default" className="bg-green-100 text-green-800">High Revenue</Badge>;
    } else if (revenue > 1000) {
      return <Badge variant="secondary">Medium Revenue</Badge>;
    } else {
      return <Badge variant="outline">Low Revenue</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Connection Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            LemonSqueezy Integration
          </CardTitle>
          <CardDescription>
            Connect your LemonSqueezy store to manage products and sync data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your LemonSqueezy API key"
              />
            </div>
            <div>
              <Label htmlFor="store-id">Store ID</Label>
              <Input
                id="store-id"
                value={storeId}
                onChange={(e) => setStoreId(e.target.value)}
                placeholder="Enter your store ID"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button onClick={saveSettings} variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
            <Button 
              onClick={fetchProducts} 
              disabled={loading || !apiKey || !storeId}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              {loading ? 'Fetching...' : 'Fetch Products'}
            </Button>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
              <CheckCircle className="w-4 h-4" />
              {success}
            </div>
          )}

          {isConnected && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">
              <CheckCircle className="w-4 h-4" />
              Connected to LemonSqueezy • {products.length} products synced
            </div>
          )}
        </CardContent>
      </Card>

      {/* Products Management - compact table with filters/sorting/bulk actions */}
      {products.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Products ({products.length})
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {products.filter(p => p.attributes.status === 'published').length} Published
                </Badge>
                <Badge variant="outline">
                  {products.filter(p => p.attributes.status === 'draft').length} Draft
                </Badge>
              </div>
            </CardTitle>
            <CardDescription>
              Manage your LemonSqueezy products with filters, sorting, and bulk actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-3">
              <div className="flex gap-3 items-center">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-[220px]"
                />
                <div className="min-w-[170px]">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="min-w-[200px]">
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      <SelectItem value="uncategorized">Uncategorized</SelectItem>
                      {categories.filter(c => c.isActive).map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Bulk actions when selection present */}
              {Object.values(selectedIds).some(Boolean) && (
                <div className="flex gap-2 items-center">
                  <div className="min-w-[200px]">
                    <Select onValueChange={bulkAssignCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Bulk assign category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uncategorized">Uncategorized</SelectItem>
                        {categories.filter(c => c.isActive).map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="min-w-[170px]">
                    <Select onValueChange={(v) => bulkSetStatus(v as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Bulk set status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto border rounded-md">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-600">
                    <th className="px-3 py-2 w-10">
                      <input
                        aria-label="select-all"
                        type="checkbox"
                        className="h-4 w-4"
                        onChange={(e) => toggleSelectAll(visibleProducts.map(p => p.id), e.currentTarget.checked)}
                        checked={visibleProducts.length > 0 && visibleProducts.every(p => selectedIds[p.id])}
                      />
                    </th>
                    <th className="px-3 py-2 text-left cursor-pointer" onClick={() => toggleSort('name')}>Name</th>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-left cursor-pointer" onClick={() => toggleSort('price')}>Price</th>
                    <th className="px-3 py-2 text-left cursor-pointer" onClick={() => toggleSort('sales')}>Sales</th>
                    <th className="px-3 py-2 text-left cursor-pointer" onClick={() => toggleSort('revenue')}>Revenue</th>
                    <th className="px-3 py-2 text-left cursor-pointer" onClick={() => toggleSort('created')}>Created</th>
                    <th className="px-3 py-2 text-left">Category</th>
                    <th className="px-3 py-2 text-left">Platform</th>
                    <th className="px-3 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleProducts.map((product) => {
                    const catLabel = getCategoryLabel(product.id);
                    const selected = !!selectedIds[product.id];
                    const platform = (productFiltersMap[product.id]?.platform || []) as string[];
                    return (
                      <tr key={product.id} className="border-t hover:bg-slate-50">
                        <td className="px-3 py-2 align-top">
                          <input
                            aria-label={`select-${product.id}`}
                            type="checkbox"
                            className="h-4 w-4"
                            checked={selected}
                            onChange={(e) => toggleSelectOne(product.id, e.currentTarget.checked)}
                          />
                        </td>
                        <td className="px-3 py-2 align-top">
                          <div className="font-medium leading-tight">{product.attributes.name}</div>
                          <div className="text-slate-500 line-clamp-1 max-w-[340px]">{product.attributes.description}</div>
                        </td>
                        <td className="px-3 py-2 align-top">{getStatusBadge(product.attributes.status)}</td>
                        <td className="px-3 py-2 align-top">{product.attributes.price_formatted}</td>
                        <td className="px-3 py-2 align-top">{product.attributes.sales_count}</td>
                        <td className="px-3 py-2 align-top">{formatPrice(product.attributes.total_revenue)}</td>
                        <td className="px-3 py-2 align-top">{new Date(product.attributes.created_at).toLocaleDateString()}</td>
                        <td className="px-3 py-2 align-top">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{catLabel}</Badge>
                            <div className="min-w-[160px]">
                              <Select
                                value={productCategoryMap[product.id] ?? 'uncategorized'}
                                onValueChange={(val) => handleAssignCategory(product.id, val)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="uncategorized">Uncategorized</SelectItem>
                                  {categories.filter(c => c.isActive).map(cat => (
                                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-2 align-top">
                          <div className="flex flex-wrap gap-1">
                            {FILTER_FACETS.platform.map(opt => {
                              const active = platform.includes(opt.value);
                              return (
                                <Button key={opt.value} type="button" size="sm" variant={active ? 'default' : 'outline'} onClick={() => handleAssignFilters(product.id, 'platform', opt.value)}>
                                  {opt.label}
                                </Button>
                              );
                            })}
                          </div>
                        </td>
                        <td className="px-3 py-2 align-top text-right">
                          <div className="flex gap-1 justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              title={product.attributes.status === 'published' ? 'Hide (draft)' : 'Publish'}
                              onClick={() => toggleProductVisibility(product.id)}
                            >
                              {product.attributes.status === 'published' ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                            <Button variant="ghost" size="sm" asChild title="Open product">
                              <a href={product.attributes.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {visibleProducts.length === 0 && (
                    <tr>
                      <td className="px-3 py-8 text-center text-slate-500" colSpan={10}>No products match your filters.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Product Categories Sync */}
      {products.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>
              Automatically sync product categories from LemonSqueezy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Digital Products</h4>
                  <p className="text-sm text-slate-600 mb-2">
                    {products.filter(p => p.attributes.has_digital_delivery).length} products
                  </p>
                  <Badge variant="outline">Auto-synced</Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Physical Products</h4>
                  <p className="text-sm text-slate-600 mb-2">
                    {products.filter(p => p.attributes.has_physical_delivery).length} products
                  </p>
                  <Badge variant="outline">Auto-synced</Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Mixed Products</h4>
                  <p className="text-sm text-slate-600 mb-2">
                    {products.filter(p => p.attributes.has_digital_delivery && p.attributes.has_physical_delivery).length} products
                  </p>
                  <Badge variant="outline">Auto-synced</Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-4">
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync Categories
                </Button>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure Mapping
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
