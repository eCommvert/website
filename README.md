This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Deployment note: this commit is intended to trigger a new Vercel build.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Website Structure & Routes

### Public Routes
- `/` - Homepage with hero, services, case studies, pricing
- `/blog` - Blog index page (fetches from Supabase)
- `/blog/[slug]` - Individual blog post pages
- `/case-studies` - Case studies showcase page
- `/tools` - Digital products from Lemon Squeezy
- `/reports` - Reports and dashboards showcase
- `/three-d-card` - 3D product card demo

### Admin Routes
- `/admin` - Admin dashboard with tabs (requires Clerk authentication)
  - Overview tab - Statistics and quick actions
  - Testimonials tab - Manage client testimonials
  - Case Studies tab - Manage case studies with metrics
  - Categories tab - Manage product categories
  - Products tab - Manage Lemon Squeezy product metadata
  - Settings tab - Configure site settings and GTM
  - Pages tab - Real-time list of all site pages
  - Blog tab - Manage blog posts, categories, and tags

## Supabase Database Schema

Run this SQL in your Supabase project:

```sql
-- Blog Schema
CREATE TABLE public.blog_posts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    title text NOT NULL,
    slug text NOT NULL UNIQUE,
    content text,
    excerpt text,
    author_id uuid REFERENCES auth.users(id),
    is_published boolean DEFAULT FALSE NOT NULL,
    published_at timestamp with time zone,
    featured_image text,
    seo_title text,
    seo_description text
);

CREATE TABLE public.blog_categories (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL UNIQUE,
    slug text NOT NULL UNIQUE
);

CREATE TABLE public.blog_tags (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL UNIQUE,
    slug text NOT NULL UNIQUE
);

CREATE TABLE public.blog_post_categories (
    post_id uuid REFERENCES public.blog_posts(id) ON DELETE CASCADE NOT NULL,
    category_id uuid REFERENCES public.blog_categories(id) ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (post_id, category_id)
);

CREATE TABLE public.blog_post_tags (
    post_id uuid REFERENCES public.blog_posts(id) ON DELETE CASCADE NOT NULL,
    tag_id uuid REFERENCES public.blog_tags(id) ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (post_id, tag_id)
);

-- Settings Schema
CREATE TABLE public.settings (
    id integer PRIMARY KEY DEFAULT 1,
    autosave boolean DEFAULT true NOT NULL,
    show_inactive boolean DEFAULT true NOT NULL,
    enable_analytics boolean DEFAULT false NOT NULL,
    gtm_container text DEFAULT '',
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- RLS Policies
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.blog_posts FOR SELECT USING (true);

ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.blog_categories FOR SELECT USING (true);

ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.blog_tags FOR SELECT USING (true);

ALTER TABLE public.blog_post_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.blog_post_categories FOR SELECT USING (true);

ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.blog_post_tags FOR SELECT USING (true);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.settings FOR SELECT USING (true);
-- Add admin policies for insert/update/delete as needed
```

## Admin Workflows

### Blog Management
1. Access `/admin` and navigate to "Blog" tab
2. Create new posts with title, content, excerpt, categories, and tags
3. Publish/unpublish posts with toggle
4. Posts appear automatically on `/blog` when published

### Google Tag Manager Setup
1. Go to `/admin` → "Settings" tab → "Tracking & Analytics" section
2. Enter your GTM container ID (format: GTM-XXXXXXX)
3. Scripts are automatically injected site-wide via `layout.tsx`
4. Settings are saved to Supabase and persist across sessions

### Footer Link Management
Footer links are automatically configured:
- **Services**: Strategic Audits (`/#audits`), Monthly Consulting (`/#consulting`), Digital Products (`/tools`)
- **Resources**: Case Studies (`/case-studies`), Blog (`/blog`), Tools (`/tools`)

## Authentication & Authorization

### Clerk Setup
- Admin access controlled by Clerk authentication
- Authorization via `user.publicMetadata.role` (admin/owner) or `user.publicMetadata.admin === true`
- Environment variable `NEXT_PUBLIC_OWNER_EMAILS` as fallback

### Admin Access
1. Sign in via Clerk
2. Ensure your user has admin role in Clerk dashboard
3. Access `/admin` for full dashboard functionality

## Environment Variables

Required environment variables:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Lemon Squeezy
NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID=your_store_id

# Admin Access (fallback)
NEXT_PUBLIC_OWNER_EMAILS=admin@example.com,owner@example.com

# Site URL (for API calls)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
