"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { fetchLemonSqueezyProducts, LemonSqueezyProduct, formatPrice } from "@/lib/lemonsqueezy";

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

  // Load saved settings from localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem('lemonsqueezy-api-key');
    const savedStoreId = localStorage.getItem('lemonsqueezy-store-id');
    const savedProducts = localStorage.getItem('lemonsqueezy-products');
    
    if (savedApiKey) setApiKey(savedApiKey);
    if (savedStoreId) setStoreId(savedStoreId);
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
      setIsConnected(true);
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

  const toggleProductVisibility = (productId: string) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, attributes: { ...product.attributes, status: product.attributes.status === 'published' ? 'draft' : 'published' } }
        : product
    ));
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

      {/* Products Management */}
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
              Manage your LemonSqueezy products and their visibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{product.attributes.name}</h3>
                        {getStatusBadge(product.attributes.status)}
                        {getRevenueBadge(product.attributes.total_revenue)}
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {product.attributes.description}
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="text-slate-600">Price:</span>
                          <span className="font-medium">{product.attributes.price_formatted}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-slate-600">Sales:</span>
                          <span className="font-medium">{product.attributes.sales_count}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-purple-600" />
                          <span className="text-slate-600">Revenue:</span>
                          <span className="font-medium">{formatPrice(product.attributes.total_revenue)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600">Created:</span>
                          <span className="font-medium">
                            {new Date(product.attributes.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleProductVisibility(product.id)}
                      >
                        {product.attributes.status === 'published' ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <a 
                          href={product.attributes.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
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
