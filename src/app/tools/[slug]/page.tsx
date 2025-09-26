import { Metadata } from "next";
import { ProductPage } from "@/components/product/product-page";
import { getMockProductBySlug, mockProducts } from "@/lib/product-detail";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return mockProducts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const product = getMockProductBySlug(params.slug);
  const title = product?.seo?.title ?? product?.title ?? "Product";
  const description = product?.seo?.description ?? product?.shortDescription ?? "";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product?.seo?.ogImage ? [product.seo.ogImage] : undefined,
    },
  };
}

export default function ToolProductPage({ params }: Params) {
  const product = getMockProductBySlug(params.slug);
  if (!product) {
    return <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">Product not found.</div>;
  }
  return <ProductPage product={product} />;
}


