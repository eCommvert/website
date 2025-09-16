import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/server-supabase';

const OWNER_EMAILS = (process.env.NEXT_PUBLIC_OWNER_EMAILS || '').split(',').map(v => v.trim()).filter(Boolean);

function isOwner(email?: string | null) {
  if (!email) return false;
  if (OWNER_EMAILS.length === 0) return true;
  return OWNER_EMAILS.includes(email);
}

export async function GET(req: NextRequest) {
  const search = new URL(req.url).searchParams;
  const table = search.get('table');
  const supabase = getServerSupabase();
  if (!table) return NextResponse.json({ error: 'Missing table' }, { status: 400 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as unknown as any).from(table).select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const email = req.headers.get('x-user-email'); // provided from client via Clerk session
  if (!isOwner(email)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { table, payload } = await req.json();
  if (!table || !payload) return NextResponse.json({ error: 'Missing table or payload' }, { status: 400 });
  const supabase = getServerSupabase();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as unknown as any).from(table).insert(payload).select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PUT(req: NextRequest) {
  const email = req.headers.get('x-user-email');
  if (!isOwner(email)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { table, id, payload, key = 'id' } = await req.json();
  if (!table || !id || !payload) return NextResponse.json({ error: 'Missing table, id, or payload' }, { status: 400 });
  const supabase = getServerSupabase();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as unknown as any).from(table).update(payload).eq(key, id).select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(req: NextRequest) {
  const email = req.headers.get('x-user-email');
  if (!isOwner(email)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { table, id, key = 'id' } = await req.json();
  if (!table || !id) return NextResponse.json({ error: 'Missing table or id' }, { status: 400 });
  const supabase = getServerSupabase();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as unknown as any).from(table).delete().eq(key, id).select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
