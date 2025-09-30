"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductDetail } from "@/lib/product-detail";

type Props = { product: ProductDetail };

export function ProductPage({ product }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="grid grid-cols-12 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-12 md:col-span-7 space-y-4"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">{product.title}</h1>
          <p className="text-lg text-muted-foreground">{product.shortDescription}</p>
          {product.badges?.length ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {product.badges.map((b) => (
                <Badge key={b} variant="secondary">{b}</Badge>
              ))}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-3 pt-4">
            {product.buyUrl ? (
              <Button size="lg" onClick={() => { window.open(product.buyUrl, "_blank"); }}>
                {product.price ? `Buy — $${product.price.amount}` : "Buy"}
              </Button>
            ) : null}
            <Button variant="outline" size="lg" onClick={() => {
              const el = document.getElementById("features");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}>See features</Button>
          </div>
          {product.longDescription ? (
            <div
              className="prose prose-lg dark:prose-invert max-w-none pt-6"
              dangerouslySetInnerHTML={{ __html: product.longDescription }}
            />
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="col-span-12 md:col-span-5"
        >
          <Card className="sticky top-24">
            <CardContent className="p-0">
              {product.heroImage ? (
                <Image src={product.heroImage} alt={product.title} width={1200} height={800} className="w-full h-auto rounded-t-lg" />
              ) : (
                <div className="aspect-video flex items-center justify-center text-sm text-muted-foreground">No image</div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {product.features?.length ? (
        <section id="features" className="mt-14 md:mt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Key features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((f) => (
              <Card key={f.title}>
                <CardContent className="p-5">
                  <div className="text-base font-semibold">{f.title}</div>
                  <p className="text-sm text-muted-foreground mt-1">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {product.gallery?.length ? (
        <section className="mt-14 md:mt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {product.gallery.map((src) => (
              <Card key={src}>
                <CardContent className="p-0">
                  <Image src={src} alt="Screenshot" width={1200} height={800} className="w-full h-auto rounded-lg" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {product.faqs?.length ? (
        <section className="mt-14 md:mt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">FAQ</h2>
          <Accordion type="single" collapsible className="w-full">
            {product.faqs.map((f, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      ) : null}
    </div>
  );
}







