import { NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/server-supabase';

export async function GET() {
  try {
    const supabase = getServerSupabase();
    
    // Fetch active case studies from Supabase
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching case studies:', error);
      return NextResponse.json({ error: 'Failed to fetch case studies' }, { status: 500 });
    }

    // Transform the data to match the frontend interface
    const transformedData = data?.map((item: Record<string, unknown>) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      industry: item.industry,
      client: item.client,
      duration: item.duration,
      monthlySpend: item.monthly_spend,
      challenge: item.challenge,
      solution: item.solution,
      results: item.results,
      image: item.image,
      testimonial: item.testimonial,
      author: item.author,
      role: item.role,
      isActive: item.is_active,
      detailedContent: item.detailed_content
    })) || [];

    return NextResponse.json({ data: transformedData });
  } catch (error) {
    console.error('Error in case studies API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
