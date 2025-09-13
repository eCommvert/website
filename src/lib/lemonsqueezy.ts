export interface LemonSqueezyProduct {
  id: string;
  type: string;
  attributes: {
    name: string;
    description: string;
    price: number;
    price_formatted: string;
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

export async function fetchLemonSqueezyProducts(storeId: string): Promise<LemonSqueezyProduct[]> {
  try {
    const response = await fetch(
      `https://api.lemonsqueezy.com/v1/products?filter[store_id]=${storeId}&include=store`,
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_LEMONSQUEEZY_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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
  if (description.length <= maxLength) {
    return description;
  }
  return description.substring(0, maxLength).trim() + '...';
}
