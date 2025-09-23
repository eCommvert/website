import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/server-supabase";
import { auth } from "@clerk/nextjs/server";

// GET /api/blog/tags - List all tags
export async function GET() {
  try {
    const supabase = getServerSupabase();

    const { data, error } = await supabase
      .from("blog_tags")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
    }

    return NextResponse.json({ tags: data || [] });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/blog/tags - Create new tag (admin only)
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
      .from("blog_tags")
      .insert({ name, slug })
      .select()
      .single();

    if (error) {
      console.error("Tag creation error:", error);
      return NextResponse.json({ error: "Failed to create tag" }, { status: 500 });
    }

    return NextResponse.json({ tag: data }, { status: 201 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
