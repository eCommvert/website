import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const storeId = searchParams.get('storeId');
  const authHeader = request.headers.get('authorization');

  if (!storeId) {
    return NextResponse.json({ error: 'Store ID is required' }, { status: 400 });
  }

  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header is required' }, { status: 401 });
  }

  try {
    // In a real implementation, you'd make the actual API call to LemonSqueezy
    // For now, we'll return mock data
    const mockProducts = [
      {
        id: "1",
        type: "products",
        attributes: {
          name: "Google Ads Performance Dashboard",
          description: "Comprehensive dashboard for tracking Google Ads performance with real-time metrics and insights.",
          price: 4900,
          price_formatted: "$49.00",
          has_discount: false,
          discount_price: 0,
          discount_price_formatted: "$0.00",
          image_url: "/products/google-ads-dashboard.jpg",
          status: "published",
          created_at: "2024-01-15T10:00:00Z",
          updated_at: "2024-01-20T15:30:00Z",
          published_at: "2024-01-15T10:00:00Z",
          slug: "google-ads-performance-dashboard",
          url: "https://lemonsqueezy.com/product/google-ads-performance-dashboard",
          store_id: parseInt(storeId),
          has_physical_delivery: false,
          has_digital_delivery: true,
          sales_count: 127,
          total_revenue: 62230,
          status_formatted: "Published",
          thumb_url: "/products/google-ads-dashboard-thumb.jpg",
          large_thumb_url: "/products/google-ads-dashboard-large.jpg",
          original_store_image_url: "/products/google-ads-dashboard-original.jpg",
          formatted_created_at: "Jan 15, 2024",
          formatted_updated_at: "Jan 20, 2024"
        },
        relationships: {
          store: {
            data: {
              id: storeId,
              type: "stores"
            }
          }
        }
      },
      {
        id: "2",
        type: "products",
        attributes: {
          name: "E-commerce Analytics Suite",
          description: "Advanced analytics tools for e-commerce businesses with conversion tracking and ROI analysis.",
          price: 9900,
          price_formatted: "$99.00",
          has_discount: true,
          discount_price: 7900,
          discount_price_formatted: "$79.00",
          image_url: "/products/ecommerce-analytics.jpg",
          status: "published",
          created_at: "2024-01-10T09:00:00Z",
          updated_at: "2024-01-18T14:20:00Z",
          published_at: "2024-01-10T09:00:00Z",
          slug: "ecommerce-analytics-suite",
          url: "https://lemonsqueezy.com/product/ecommerce-analytics-suite",
          store_id: parseInt(storeId),
          has_physical_delivery: false,
          has_digital_delivery: true,
          sales_count: 89,
          total_revenue: 70310,
          status_formatted: "Published",
          thumb_url: "/products/ecommerce-analytics-thumb.jpg",
          large_thumb_url: "/products/ecommerce-analytics-large.jpg",
          original_store_image_url: "/products/ecommerce-analytics-original.jpg",
          formatted_created_at: "Jan 10, 2024",
          formatted_updated_at: "Jan 18, 2024"
        },
        relationships: {
          store: {
            data: {
              id: storeId,
              type: "stores"
            }
          }
        }
      },
      {
        id: "3",
        type: "products",
        attributes: {
          name: "Marketing Strategy Templates",
          description: "Professional marketing strategy templates and frameworks for digital marketing campaigns.",
          price: 2900,
          price_formatted: "$29.00",
          has_discount: false,
          discount_price: 0,
          discount_price_formatted: "$0.00",
          image_url: "/products/marketing-templates.jpg",
          status: "draft",
          created_at: "2024-01-25T11:00:00Z",
          updated_at: "2024-01-25T11:00:00Z",
          published_at: null,
          slug: "marketing-strategy-templates",
          url: "https://lemonsqueezy.com/product/marketing-strategy-templates",
          store_id: parseInt(storeId),
          has_physical_delivery: false,
          has_digital_delivery: true,
          sales_count: 0,
          total_revenue: 0,
          status_formatted: "Draft",
          thumb_url: "/products/marketing-templates-thumb.jpg",
          large_thumb_url: "/products/marketing-templates-large.jpg",
          original_store_image_url: "/products/marketing-templates-original.jpg",
          formatted_created_at: "Jan 25, 2024",
          formatted_updated_at: "Jan 25, 2024"
        },
        relationships: {
          store: {
            data: {
              id: storeId,
              type: "stores"
            }
          }
        }
      }
    ];

    return NextResponse.json({
      data: mockProducts,
      meta: {
        page: {
          current_page: 1,
          from: 1,
          last_page: 1,
          per_page: 10,
          to: mockProducts.length,
          total: mockProducts.length
        }
      }
    });

  } catch (error) {
    console.error('Error fetching LemonSqueezy products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' }, 
      { status: 500 }
    );
  }
}
