"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight, Calendar } from "lucide-react";
import { LemonSqueezyProduct, formatPrice, truncateDescription, cleanRichText } from "@/lib/lemonsqueezy";

interface ProductCardProps {
  product: LemonSqueezyProduct;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { attributes } = product;
  const isFree = attributes.price === 0;
  const displayPrice = isFree ? "$0.00" : formatPrice(attributes.price);
  const [platformTags, setPlatformTags] = useState<string[]>([]);
  const [dataBackend, setDataBackend] = useState<string | null>(null);
  const [pricingTag, setPricingTag] = useState<string | null>(null);

  // Get the best available image URL
  const getImageUrl = () => {
    return attributes.large_thumb_url || 
           attributes.thumb_url || 
           attributes.original_store_image_url || 
           attributes.image_url;
  };

  // Create the checkout URL
  const [buyUrl, setBuyUrl] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    async function loadVariantUrl() {
      try {
        const savedKey = typeof window !== 'undefined' ? localStorage.getItem('lemonsqueezy-api-key') : null;
        const res = await fetch(`/api/lemonsqueezy/variants?productId=${product.id}`, {
          headers: savedKey ? { Authorization: `Bearer ${savedKey}` } : undefined,
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setBuyUrl(data?.buyUrl || null);
      } catch {}
    }
    loadVariantUrl();
    return () => { cancelled = true; };
  }, [product.id]);

  const checkoutUrl = useMemo(() => {
    // Priority: explicit product attribute (if present) -> variant buy url -> product url -> slug
    if (attributes?.buy_now_url) return attributes.buy_now_url;
    if (buyUrl) return buyUrl;
    if (attributes?.url) return attributes.url;
    if (attributes?.slug) return `https://lemonsqueezy.com/product/${attributes.slug}`;
    return "";
  }, [attributes?.buy_now_url, buyUrl, attributes?.url, attributes?.slug]);

  const imageUrl = getImageUrl();

  // Read optional facet tags (set in Admin) to display on cards
  useEffect(() => {
    try {
      const mapRaw = localStorage.getItem('lemonsqueezy-product-filters-map');
      if (mapRaw) {
        const map = JSON.parse(mapRaw) as Record<string, { platform?: string[]; dataBackend?: string; pricing?: string }>;
        const entry = map[product.id];
        if (entry?.platform && Array.isArray(entry.platform)) setPlatformTags(entry.platform.slice(0, 3));
        if (entry?.dataBackend && entry.dataBackend !== 'all') setDataBackend(entry.dataBackend);
        if (entry?.pricing && entry.pricing !== 'all') setPricingTag(entry.pricing);
      }
    } catch {}
  }, [product.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group relative bg-card border-border hover:shadow-md transition-all duration-300 overflow-hidden rounded-lg">
        <div className="flex">
          {/* Product Image - Fixed width */}
          <div className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={attributes.name}
                width={192}
                height={128}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            
            {/* Fallback placeholder */}
            <div className={`w-full h-full bg-muted flex items-center justify-center ${imageUrl ? 'hidden' : ''}`}>
              <div className="w-12 h-12 bg-accent/30 rounded-lg flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Product Content */}
          <CardContent className="p-4 flex-1 flex items-stretch gap-6 min-h-[128px]">
            {/* Middle Column: Title, Description, Badges, Meta */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-foreground leading-tight mb-1 line-clamp-1">
                {attributes.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-2">
                {truncateDescription(cleanRichText(attributes.description), 100)}
              </p>

              {/* Filter Badges */}
              <div className="flex flex-wrap gap-1 mb-2">
                {platformTags.map((p) => (
                  <Badge key={p} variant="secondary" className="text-xs px-2 py-0.5">
                    {p}
                  </Badge>
                ))}
                {dataBackend && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    {dataBackend}
                  </Badge>
                )}
                {pricingTag && (
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    {pricingTag}
                  </Badge>
                )}
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Updated {new Date(attributes.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Right Column: Price + CTA with vertical divider */}
            <div className="w-44 md:w-52 flex flex-col items-center justify-center gap-3 border-l border-border pl-6 text-center">
              <div>
                <div className="text-2xl font-semibold text-foreground">
                  {isFree ? 'Free' : displayPrice}
                </div>
              </div>
              <a href={checkoutUrl || undefined} target={checkoutUrl ? "_blank" : undefined} rel={checkoutUrl ? "noopener noreferrer" : undefined}>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
                  disabled={!checkoutUrl}
                >
                  Get this tool
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </a>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};
