import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/server-supabase";
import { auth } from "@clerk/nextjs/server";

// GET /api/blog/posts - List all posts (published for public, all for admin)
export async function GET(request: NextRequest) {
  try {
    const supabase = getServerSupabase();
    const { searchParams } = new URL(request.url);
    const isPublic = searchParams.get("public") === "true";
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    let query = supabase
      .from("blog_posts")
      .select(`
        id,
        created_at,
        updated_at,
        title,
        slug,
        content,
        excerpt,
        author_id,
        is_published,
        published_at,
        featured_image,
        seo_title,
        seo_description,
        blog_post_categories(
          blog_categories(id, name, slug)
        ),
        blog_post_tags(
          blog_tags(id, name, slug)
        )
      `)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (isPublic) {
      query = query.eq("is_published", true);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }

    return NextResponse.json({ posts: data || [] });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/blog/posts - Create new post (admin only)
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      content,
      excerpt,
      is_published = false,
      featured_image,
      seo_title,
      seo_description,
      categories = [],
      tags = []
    } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const supabase = getServerSupabase();

    // Create the post
    const { data: post, error: postError } = await supabase
      .from("blog_posts")
      .insert({
        title,
        slug,
        content,
        excerpt,
        author_id: userId,
        is_published,
        published_at: is_published ? new Date().toISOString() : null,
        featured_image,
        seo_title,
        seo_description,
      })
      .select()
      .single();

    if (postError) {
      console.error("Post creation error:", postError);
      return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }

    // Add categories
    if (categories.length > 0) {
      const categoryRelations = categories.map((categoryId: string) => ({
        post_id: post.id,
        category_id: categoryId,
      }));

      await supabase.from("blog_post_categories").insert(categoryRelations);
    }

    // Add tags
    if (tags.length > 0) {
      const tagRelations = tags.map((tagId: string) => ({
        post_id: post.id,
        tag_id: tagId,
      }));

      await supabase.from("blog_post_tags").insert(tagRelations);
    }

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
