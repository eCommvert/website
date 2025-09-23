import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/server-supabase";
import { auth } from "@clerk/nextjs/server";

// GET /api/blog/posts/[id] - Get single post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getServerSupabase();

    const { data, error } = await supabase
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
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post: data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/blog/posts/[id] - Update post (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const {
      title,
      slug,
      content,
      excerpt,
      is_published,
      featured_image,
      seo_title,
      seo_description,
      categories = [],
      tags = []
    } = body;

    const supabase = getServerSupabase();

    // Update the post
    const { data: post, error: postError } = await supabase
      .from("blog_posts")
      .update({
        title,
        slug,
        content,
        excerpt,
        is_published,
        published_at: is_published ? new Date().toISOString() : null,
        featured_image,
        seo_title,
        seo_description,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (postError) {
      console.error("Post update error:", postError);
      return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
    }

    // Update categories - remove existing and add new ones
    await supabase.from("blog_post_categories").delete().eq("post_id", id);
    if (categories.length > 0) {
      const categoryRelations = categories.map((categoryId: string) => ({
        post_id: id,
        category_id: categoryId,
      }));
      await supabase.from("blog_post_categories").insert(categoryRelations);
    }

    // Update tags - remove existing and add new ones
    await supabase.from("blog_post_tags").delete().eq("post_id", id);
    if (tags.length > 0) {
      const tagRelations = tags.map((tagId: string) => ({
        post_id: id,
        tag_id: tagId,
      }));
      await supabase.from("blog_post_tags").insert(tagRelations);
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/blog/posts/[id] - Delete post (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const supabase = getServerSupabase();

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
