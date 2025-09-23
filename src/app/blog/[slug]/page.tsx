import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  published_at?: string;
  featured_image?: string;
  seo_title?: string;
  seo_description?: string;
  blog_post_categories?: { blog_categories: { name: string; slug: string } }[];
  blog_post_tags?: { blog_tags: { name: string; slug: string } }[];
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/blog/posts?public=true&slug=${slug}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const data = await res.json();
    const posts = data.posts || [];
    return posts.find((post: BlogPost) => post.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      images: post.featured_image ? [post.featured_image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </Button>

            {post.featured_image && (
              <div className="aspect-video bg-muted rounded-lg mb-8 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={post.featured_image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {post.blog_post_categories?.map((cat) => (
                  <Badge key={cat.blog_categories.slug} variant="secondary">
                    {cat.blog_categories.name}
                  </Badge>
                ))}
                {post.blog_post_tags?.map((tag) => (
                  <Badge key={tag.blog_tags.slug} variant="outline">
                    {tag.blog_tags.name}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl font-bold">{post.title}</h1>
              
              {post.excerpt && (
                <p className="text-xl text-muted-foreground">{post.excerpt}</p>
              )}

              {post.published_at && (
                <p className="text-sm text-muted-foreground">
                  Published on {new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              )}
            </div>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
            ) : (
              <p>Content coming soon...</p>
            )}
          </div>

          <div className="mt-16 pt-8 border-t">
            <div className="flex items-center justify-between">
              <Button variant="outline" asChild>
                <Link href="/blog">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  All Posts
                </Link>
              </Button>
              
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/#consulting">Monthly Consulting</Link>
                </Button>
                <Button asChild>
                  <Link href="/#audits">Get Strategic Audit</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
