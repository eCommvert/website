import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  published_at?: string;
  featured_image?: string;
  blog_post_categories?: { blog_categories: { name: string; slug: string } }[];
  blog_post_tags?: { blog_tags: { name: string; slug: string } }[];
}

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic';

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blog/posts?public=true&limit=20`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">Blog</h1>
            <p className="text-xl text-muted-foreground">
              Insights on e-commerce optimization, paid advertising strategies, and growth tactics.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No blog posts published yet. Check back soon for insights and strategies!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    {post.featured_image && (
                      <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={post.featured_image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardTitle className="line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                    {post.excerpt && (
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.blog_post_categories?.slice(0, 2).map((cat) => (
                          <Badge key={cat.blog_categories.slug} variant="secondary" className="text-xs">
                            {cat.blog_categories.name}
                          </Badge>
                        ))}
                        {post.blog_post_tags?.slice(0, 2).map((tag) => (
                          <Badge key={tag.blog_tags.slug} variant="outline" className="text-xs">
                            {tag.blog_tags.name}
                          </Badge>
                        ))}
                      </div>
                      {post.published_at && (
                        <span className="text-sm text-muted-foreground">
                          {new Date(post.published_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}