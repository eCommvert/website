"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight } from "lucide-react";
import { LemonSqueezyProduct, formatPrice, truncateDescription } from "@/lib/lemonsqueezy";

interface ProductCardProps {
  product: LemonSqueezyProduct;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { attributes } = product;
  const isFree = attributes.price === 0;
  const displayPrice = isFree ? "$0.00" : formatPrice(attributes.price);

  // Get the best available image URL
  const getImageUrl = () => {
    return attributes.large_thumb_url || 
           attributes.thumb_url || 
           attributes.original_store_image_url || 
           attributes.image_url;
  };

  // Create the checkout URL
  const getCheckoutUrl = () => {
    // For free products, use the product URL
    if (isFree) {
      return attributes.url;
    }
    // For paid products, create a checkout URL
    return `https://lemonsqueezy.com/checkout/buy/${product.id}`;
  };

  const imageUrl = getImageUrl();
  const checkoutUrl = getCheckoutUrl();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group relative bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 h-full overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-video overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={attributes.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          
          {/* Fallback placeholder */}
          <div className={`w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center ${imageUrl ? 'hidden' : ''}`}>
            <div className="w-16 h-16 bg-slate-600 rounded-lg flex items-center justify-center">
              <ExternalLink className="w-8 h-8 text-slate-400" />
            </div>
          </div>
          
          {/* Price Badge */}
          <Badge className="absolute top-3 right-3 bg-purple-600/90 backdrop-blur-sm border-0 text-white">
            {displayPrice}
          </Badge>
        </div>

        {/* Product Content */}
        <CardContent className="p-6 flex flex-col h-full">
          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors">
            {attributes.name}
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-6 flex-grow line-clamp-3">
            {truncateDescription(attributes.description, 120)}
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              onClick={() => window.open(checkoutUrl, '_blank')}
            >
              {isFree ? 'Get this resource' : 'Buy now'}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/50"
              onClick={() => window.open(attributes.url, '_blank')}
            >
              Product Detail
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
