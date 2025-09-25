"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { LemonSqueezyProduct, formatPrice, truncateDescription, cleanRichText } from "@/lib/lemonsqueezy";

interface ProductCardVerticalProps {
  product: LemonSqueezyProduct;
  index: number;
}

export const ProductCardVertical: React.FC<ProductCardVerticalProps> = ({ product, index }) => {
  const { attributes } = product;
  const isFree = attributes.price === 0;
  const displayPrice = isFree ? "$0.00" : formatPrice(attributes.price);

  const imageUrl = attributes.large_thumb_url || attributes.thumb_url || attributes.original_store_image_url || attributes.image_url || "";
  const checkoutUrl = attributes?.buy_now_url || attributes?.url || (attributes?.slug ? `https://lemonsqueezy.com/product/${attributes.slug}` : "");

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: index * 0.03 }}>
      <Card className="bg-card border-border overflow-hidden rounded-lg hover:shadow-md transition-shadow">
        {imageUrl && (
          <div className="relative w-full h-48 md:h-64">
            <Image src={imageUrl} alt={attributes.name} fill className="object-cover" />
          </div>
        )}
        <CardContent className="p-5 space-y-3">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-lg md:text-xl font-semibold leading-tight line-clamp-2">{attributes.name}</h3>
            <div className="text-base font-semibold whitespace-nowrap">{displayPrice}</div>
          </div>
          <p className="text-sm md:text-base text-muted-foreground line-clamp-3">
            {truncateDescription(cleanRichText(attributes.description), 240)}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-4 h-4" /> Updated {new Date(attributes.updated_at).toLocaleDateString()}
            </span>
            <a href={checkoutUrl || undefined} target={checkoutUrl ? "_blank" : undefined} rel={checkoutUrl ? "noopener noreferrer" : undefined}>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90" size="sm">View product</Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};


