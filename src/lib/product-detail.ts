export type ProductPrice = {
  amount: number;
  currency: string;
  billing?: string;
};

export type ProductFeature = {
  title: string;
  description: string;
  icon?: string;
};

export type ProductFAQ = {
  q: string;
  a: string;
};

export type ProductSEO = {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
};

export type ProductDetail = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  heroImage?: string;
  gallery?: string[];
  heroVideoUrl?: string;
  price?: ProductPrice;
  buyUrl?: string;
  features?: ProductFeature[];
  badges?: string[];
  faqs?: ProductFAQ[];
  seo?: ProductSEO;
  relatedSlugs?: string[];
};

export const mockProducts: ProductDetail[] = [
  {
    id: "ls_margins",
    slug: "margin-overview",
    title: "Margin Overview — Profitability Tracking for Google Ads",
    shortDescription:
      "From revenue to contribution margin — see what you really keep.",
    heroImage: "/images/tools/margin-hero.png",
    price: { amount: 25, currency: "USD" },
    buyUrl: "https://checkout.lemonsqueezy.com/buy/margin-overview",
    badges: ["Looker Studio", "Google Ads", "CM1/CM2/CM3"],
    features: [
      { title: "Full Margin Breakdown", description: "CM1 → CM3 across campaigns." },
      { title: "Break-even ROAS", description: "Auto-calc by product/category." },
      { title: "Trend Analysis", description: "MoM contribution & profit shifts." },
    ],
    longDescription:
      "<p>This dashboard combines Google Ads data with business margin parameters to reveal real profitability.</p>",
    gallery: [
      "/images/tools/margin-shot-1.png",
      "/images/tools/margin-shot-2.png",
    ],
    faqs: [
      { q: "Does this store my data?", a: "No. Data stays in your accounts." },
    ],
    seo: {
      title: "Margin Overview – Profitability Tracking for Google Ads",
      description:
        "Track contribution margin and break-even ROAS with a Looker Studio template.",
    },
    relatedSlugs: ["search-campaign-optimizer"],
  },
  {
    id: "ls_search_opt",
    slug: "search-campaign-optimizer",
    title: "Search Campaign Optimizer — Keywords & DSA",
    shortDescription:
      "Diagnose and optimize search campaigns from every angle.",
    heroImage: "/images/tools/search-hero.png",
    price: { amount: 49, currency: "USD" },
    buyUrl: "https://checkout.lemonsqueezy.com/buy/search-optimizer",
    badges: ["Looker Studio", "Search", "Audit"],
    features: [
      { title: "Query Insights", description: "See waste, find winners quickly." },
      { title: "Structure Checks", description: "Spot DSA and match type issues." },
      { title: "Actionable Filters", description: "Prioritize high-impact fixes." },
    ],
    longDescription:
      "<p>Built for performance marketers to accelerate search audits and daily ops.</p>",
    gallery: [
      "/images/tools/search-shot-1.png",
      "/images/tools/search-shot-2.png",
    ],
    seo: {
      title: "Search Campaign Optimizer – Keywords & DSA",
      description:
        "A Looker Studio template to analyze queries, structure, and performance.",
    },
    relatedSlugs: ["margin-overview"],
  },
];

export function getMockProductBySlug(slug: string): ProductDetail | undefined {
  return mockProducts.find((p) => p.slug === slug);
}




