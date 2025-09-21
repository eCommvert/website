"use client";

import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { fetchLemonSqueezyProducts, LemonSqueezyProduct, formatPrice, truncateDescription } from "@/lib/lemonsqueezy";

export default function Page() {
  const [product, setProduct] = useState<LemonSqueezyProduct | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storeId = process.env.NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID;
    if (!storeId) {
      setError("Missing NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID");
      return;
    }
    fetchLemonSqueezyProducts(storeId, 1, 1, false)
      .then((list) => setProduct(list?.[0] ?? null))
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      {product ? (
        <Product3DCard product={product} />
      ) : (
        <div className="text-sm text-muted-foreground">{error ?? "Loading product..."}</div>
      )}
    </main>
  );
}

function Product3DCard({ product }: { product: LemonSqueezyProduct }) {
  const title = product.attributes.name;
  const desc = truncateDescription(product.attributes.description, 140);
  const price = product.attributes.price_formatted || formatPrice(product.attributes.price ?? 0);
  const href = product.attributes.buy_now_url || product.attributes.url;
  const img = product.attributes.large_thumb_url || product.attributes.thumb_url || product.attributes.image_url;
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {desc}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          {img ? (
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              height={1000}
              width={1000}
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt={title}
            />
          ) : null}
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="a"
            href={href}
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Buy now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            {price}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}


