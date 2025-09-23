import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/server-supabase";
import { auth } from "@clerk/nextjs/server";

// GET /api/blog/categories - List all categories
export async function GET() {
  try {
    const supabase = getServerSupabase();

    const { data, error } = await supabase
      .from("blog_categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }

    return NextResponse.json({ categories: data || [] });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/blog/categories - Create new category (admin only)
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    const supabase = getServerSupabase();

    const { data, error } = await supabase
      .from("blog_categories")
      .insert({ name, slug })
      .select()
      .single();

    if (error) {
      console.error("Category creation error:", error);
      return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
    }

    return NextResponse.json({ category: data }, { status: 201 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
