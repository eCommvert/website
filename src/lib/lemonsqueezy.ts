export interface LemonSqueezyProduct {
  id: string;
  type: string;
  attributes: {
    name: string;
    description: string;
    price: number;
    price_formatted: string;
    buy_now_url?: string;
    has_discount: boolean;
    discount_price: number;
    discount_price_formatted: string;
    image_url: string;
    status: string;
    created_at: string;
    updated_at: string;
    published_at: string;
    slug: string;
    url: string;
    // Additional fields for better product URLs
    store_id: number;
    has_physical_delivery: boolean;
    has_digital_delivery: boolean;
    sales_count: number;
    total_revenue: number;
    status_formatted: string;
    thumb_url: string;
    large_thumb_url: string;
    original_store_image_url: string;
    formatted_created_at: string;
    formatted_updated_at: string;
  };
  relationships: {
    store: {
      data: {
        id: string;
        type: string;
      };
    };
  };
}

export interface LemonSqueezyResponse {
  data: LemonSqueezyProduct[];
  meta: {
    page: {
      current_page: number;
      from: number;
      last_page: number;
      per_page: number;
      to: number;
      total: number;
    };
  };
}

export async function fetchLemonSqueezyProducts(storeId: string, page: number = 1, perPage: number = 50, all: boolean = true): Promise<LemonSqueezyProduct[]> {
  try {
    // Try to forward Authorization from client (if saved via admin). Server will fallback to env var.
    let authHeader: Record<string, string> = { };
    try {
      if (typeof window !== 'undefined') {
        const savedKey = localStorage.getItem('lemonsqueezy-api-key');
        if (savedKey) authHeader = { Authorization: `Bearer ${savedKey}` };
      }
    } catch {}

    const response = await fetch(`/api/lemonsqueezy/products?storeId=${encodeURIComponent(storeId)}&page=${page}&perPage=${perPage}&all=${all}`, {
      headers: { 'Accept': 'application/json', ...authHeader },
      cache: 'no-store',
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`HTTP error! status: ${response.status}${body ? ` - ${body}` : ''}`);
    }

    const data: LemonSqueezyResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching LemonSqueezy products:', error);
    return [];
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100); // LemonSqueezy prices are in cents
}

export function truncateDescription(description: string, maxLength: number = 120): string {
  const cleaned = cleanRichText(description);
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  return cleaned.substring(0, maxLength).trim() + '...';
}

// Basic rich-text cleaner: strips HTML tags and common markdown characters
export function cleanRichText(input: string): string {
  if (!input) return '';
  try {
    const withoutHtml = input
      .replace(/<[^>]*>/g, ' ') // strip HTML tags
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>');
    const withoutMd = withoutHtml
      .replace(/[#*_`~>/\\]/g, '') // remove basic markdown symbols
      .replace(/\s{2,}/g, ' ') // collapse whitespace
      .trim();
    return withoutMd;
  } catch {
    return input;
  }
}
