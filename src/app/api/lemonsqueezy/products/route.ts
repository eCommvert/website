import { NextRequest, NextResponse } from 'next/server';

const LEMON_API_BASE = 'https://api.lemonsqueezy.com/v1';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const storeId = searchParams.get('storeId');
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '50';
  const fetchAll = searchParams.get('all') === 'true';
  const bypassCache = searchParams.get('bypassCache') === 'true';

  if (!storeId) {
    return NextResponse.json({ error: 'Store ID is required' }, { status: 400 });
  }

  // Prefer client-provided Authorization header (for admin fetch), fallback to server env
  const incomingAuth = request.headers.get('authorization');
  const apiKeyEnv = process.env.LEMONSQUEEZY_API_KEY;
  const bearerToken = incomingAuth && incomingAuth.startsWith('Bearer ')
    ? incomingAuth.substring('Bearer '.length)
    : apiKeyEnv;
  if (!bearerToken) {
    return NextResponse.json({ error: 'Missing API key: provide Authorization header or set LEMONSQUEEZY_API_KEY' }, { status: 500 });
  }

  try {
    const commonHeaders = {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${bearerToken}`,
    } as const;

    if (!fetchAll) {
      const url = `${LEMON_API_BASE}/products?filter[store_id]=${encodeURIComponent(storeId)}&include=store&page[number]=${encodeURIComponent(page)}&page[size]=${encodeURIComponent(perPage)}`;
      const res = await fetch(url, { 
        headers: commonHeaders, 
        ...(bypassCache ? { cache: 'no-store' } : { next: { revalidate: 300 } }),
      });
      if (!res.ok) {
        const text = await res.text();
        return NextResponse.json({ error: 'LemonSqueezy API error', status: res.status, body: text }, { status: res.status });
      }
      const data = await res.json();
      return NextResponse.json(data, { status: 200 });
    }

    // Fetch all pages
    let currentPage = Number(page) || 1;
    const size = Number(perPage) || 50;
    const aggregated: unknown[] = [];
    let lastPage = currentPage;

    while (true) {
      const url = `${LEMON_API_BASE}/products?filter[store_id]=${encodeURIComponent(storeId)}&include=store&page[number]=${encodeURIComponent(String(currentPage))}&page[size]=${encodeURIComponent(String(size))}`;
      const res = await fetch(url, { headers: commonHeaders, ...(bypassCache ? { cache: 'no-store' } : { next: { revalidate: 300 } }) });
      if (!res.ok) {
        const text = await res.text();
        return NextResponse.json({ error: 'LemonSqueezy API error', status: res.status, body: text }, { status: res.status });
      }
      const data = await res.json();
      aggregated.push(...(data?.data || []));
      lastPage = data?.meta?.page?.last_page ?? currentPage;
      if (currentPage >= lastPage) break;
      currentPage += 1;
    }

    return NextResponse.json({
      data: aggregated,
      meta: {
        page: {
          current_page: 1,
          from: 1,
          last_page: lastPage,
          per_page: size,
          to: aggregated.length,
          total: aggregated.length,
        }
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching LemonSqueezy products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
