import { NextRequest, NextResponse } from 'next/server';

const LEMON_API_BASE = 'https://api.lemonsqueezy.com/v1';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json({ error: 'productId is required' }, { status: 400 });
  }

  const incomingAuth = request.headers.get('authorization');
  const apiKeyEnv = process.env.LEMONSQUEEZY_API_KEY;
  const bearerToken = incomingAuth && incomingAuth.startsWith('Bearer ')
    ? incomingAuth.substring('Bearer '.length)
    : apiKeyEnv;
  if (!bearerToken) {
    return NextResponse.json({ error: 'Missing API key: provide Authorization header or set LEMONSQUEEZY_API_KEY' }, { status: 500 });
  }

  try {
    const url = `${LEMON_API_BASE}/variants?filter[product_id]=${encodeURIComponent(productId)}&page[size]=1`;
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${bearerToken}`,
      },
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: 'LemonSqueezy API error', status: res.status, body: text }, { status: res.status });
    }
    const data = await res.json();
    const first = data?.data?.[0];
    const buyUrl = first?.attributes?.buy_now_url || first?.attributes?.checkout_url || null;
    return NextResponse.json({ buyUrl }, { status: 200 });
  } catch (e) {
    console.error('Error fetching variants:', e);
    return NextResponse.json({ error: 'Failed to fetch variants' }, { status: 500 });
  }
}


