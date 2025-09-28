# eCommvert Website - Design & Development Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Design System](#design-system)
4. [Project Architecture](#project-architecture)
5. [Component Library](#component-library)
6. [Styling Guidelines](#styling-guidelines)
7. [External Integrations](#external-integrations)
8. [Development Setup](#development-setup)
9. [Deployment Configuration](#deployment-configuration)
10. [Best Practices](#best-practices)
11. [Creating New Apps](#creating-new-apps)

---

## 🎯 Project Overview

**eCommvert** is a strategic PPC partner platform for e-commerce growth, built as a modern Next.js application with a focus on performance, accessibility, and maintainability.

### Key Features
- **Marketing Consulting Services** - Monthly consulting, audits, and automation
- **Tools for Marketers** - 50+ pages of Google Ads & GA4 insights
- **Product Marketplace** - LemonSqueezy integration for digital products
- **Admin Dashboard** - Content management and settings
- **Responsive Design** - Mobile-first approach with dark/light themes

---

## 🛠 Technology Stack

### Core Framework
- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety and developer experience

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Component library (New York style)
- **Radix UI** - Headless UI primitives
- **Framer Motion 12.23.12** - Animation library
- **Lucide React** - Icon library

### State Management & Data
- **Supabase** - Backend-as-a-Service (database, auth, storage)
- **Clerk** - Authentication and user management
- **LemonSqueezy** - Digital product marketplace integration

### Development Tools
- **ESLint** - Code linting
- **Turbopack** - Fast bundler (dev/build)
- **PostCSS** - CSS processing

### Analytics & Tracking
- **Google Tag Manager** - Analytics and tracking
- **Vercel Analytics** - Performance monitoring

---

## 🎨 Design System

### Color Palette

#### Light Theme
```css
--background: oklch(0.9940 0 0)           /* Pure white */
--foreground: oklch(0 0 0)                /* Pure black */
--primary: oklch(0.5393 0.2713 286.7462)  /* Purple (#8B5CF6) */
--secondary: oklch(0.9540 0.0063 255.4755) /* Light gray */
--muted: oklch(0.9702 0 0)                /* Very light gray */
--accent: oklch(0.9393 0.0288 266.3680)   /* Light purple */
--destructive: oklch(0.6290 0.1902 23.0704) /* Red */
--border: oklch(0.9300 0.0094 286.2156)   /* Light border */
```

#### Dark Theme
```css
--background: oklch(0.2223 0.0060 271.1393) /* Dark background */
--foreground: oklch(0.9551 0 0)            /* Light text */
--primary: oklch(0.6132 0.2294 291.7437)   /* Brighter purple */
--secondary: oklch(0.2940 0.0130 272.9312) /* Dark gray */
--muted: oklch(0.2940 0.0130 272.9312)     /* Dark muted */
--accent: oklch(0.2795 0.0368 260.0310)    /* Dark accent */
--destructive: oklch(0.7106 0.1661 22.2162) /* Bright red */
--border: oklch(0.3289 0.0092 268.3843)    /* Dark border */
```

### Typography

#### Font Families
- **Primary (Sans)**: Inter - Modern, clean, highly readable
- **Secondary (Serif)**: Lora - For elegant headings
- **Monospace**: IBM Plex Mono - For code and technical content

#### Font Scale
```css
/* Headings */
h1: 2.5rem (40px) - font-bold
h2: 2rem (32px) - font-semibold  
h3: 1.5rem (24px) - font-semibold
h4: 1.25rem (20px) - font-medium
h5: 1.125rem (18px) - font-medium
h6: 1rem (16px) - font-medium

/* Body Text */
text-lg: 1.125rem (18px)
text-base: 1rem (16px) - Default
text-sm: 0.875rem (14px)
text-xs: 0.75rem (12px)
```

### Spacing System
```css
/* Tailwind spacing scale */
space-1: 0.25rem (4px)
space-2: 0.5rem (8px)
space-3: 0.75rem (12px)
space-4: 1rem (16px)
space-6: 1.5rem (24px)
space-8: 2rem (32px)
space-12: 3rem (48px)
space-16: 4rem (64px)
space-24: 6rem (96px)
```

### Border Radius
```css
--radius: 1.4rem (22.4px) - Base radius
--radius-lg: var(--radius) - Large (22.4px)
--radius-md: calc(var(--radius) - 2px) - Medium (20.4px)
--radius-sm: calc(var(--radius) - 4px) - Small (18.4px)
```

### Shadows
```css
shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05)
shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
```

### Animations
```css
/* Custom animations */
fade-in: 0.5s ease-in-out
slide-up: 0.5s ease-out
slide-in-left: 0.5s ease-out
slide-in-right: 0.5s ease-out
bounce-in: 0.6s ease-out
pulse-slow: 3s cubic-bezier(0.4, 0, 0.6, 1) infinite
```

---

## 🏗 Project Architecture

### Directory Structure
```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── case-studies/      # Case study pages
│   ├── tools/             # Tools marketplace
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── admin-dashboard.tsx
│   ├── hero-section.tsx
│   ├── pricing-section.tsx
│   └── ...               # Feature components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── utils.ts          # Common utilities
│   ├── supabase.ts       # Supabase client
│   └── lemonsqueezy.ts   # LemonSqueezy integration
└── utils/                # Additional utilities
```

### App Router Structure
```
app/
├── (root)/               # Public pages
│   ├── page.tsx         # Home page
│   ├── blog/            # Blog section
│   ├── case-studies/    # Case studies
│   └── tools/           # Tools marketplace
├── admin/               # Admin dashboard
│   ├── page.tsx         # Admin home
│   └── pages/           # Content management
└── api/                 # API routes
    ├── admin/           # Admin APIs
    ├── blog/            # Blog APIs
    └── lemonsqueezy/    # LemonSqueezy APIs
```

### Component Organization

#### UI Components (`/components/ui/`)
- **Base Components**: Button, Card, Input, etc.
- **Layout Components**: Navigation, Footer, Header
- **Interactive Components**: Dialog, Accordion, Tabs
- **Data Display**: Badge, Avatar, Progress

#### Feature Components (`/components/`)
- **Page Sections**: Hero, Pricing, Features
- **Business Logic**: Product cards, Search filters
- **Admin Components**: Dashboard, Content editor

---

## 🧩 Component Library

### Button Component
```tsx
// Variants: default, destructive, outline, secondary, ghost, link
// Sizes: default, sm, lg, icon
<Button variant="default" size="lg">
  Get Started
</Button>
```

### Card Component
```tsx
<Card>
  <CardHeader>
    <CardTitle>Product Name</CardTitle>
    <CardDescription>Product description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

### Navigation Menu
```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Services</NavigationMenuTrigger>
      <NavigationMenuContent>
        {/* Dropdown content */}
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### Theme Toggle
```tsx
<ThemeToggle />
// Automatically handles light/dark mode switching
```

---

## 🎨 Styling Guidelines

### CSS Architecture
1. **Tailwind CSS** - Primary styling method
2. **CSS Variables** - For theme colors and spacing
3. **Component Styles** - Scoped to components
4. **Global Styles** - In `globals.css`

### Class Naming Conventions
```tsx
// Utility classes (Tailwind)
className="flex items-center justify-between p-4 bg-background"

// Component variants (CVA)
className={cn(buttonVariants({ variant: "default", size: "lg" }))}

// Custom classes
className="custom-animation"
```

### Responsive Design
```tsx
// Mobile-first approach
className="text-sm md:text-base lg:text-lg"

// Breakpoints
sm: 640px   // Small devices
md: 768px   // Medium devices  
lg: 1024px  // Large devices
xl: 1280px  // Extra large devices
2xl: 1536px // 2X large devices
```

### Dark Mode Support
```tsx
// Automatic theme switching
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
  {/* App content */}
</ThemeProvider>

// Theme-aware classes
className="bg-background text-foreground border-border"
```

---

## 🔌 External Integrations

### Supabase
```typescript
// Database operations
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('column', 'value');

// Authentication
const { user } = await supabase.auth.getUser();
```

### LemonSqueezy
```typescript
// Product fetching
const products = await fetchLemonSqueezyProducts(storeId);

// Price formatting
const formattedPrice = formatPrice(priceInCents);
```

### Clerk Authentication
```typescript
// User management
import { useUser } from '@clerk/nextjs';

const { user, isLoaded } = useUser();
```

### Google Tag Manager
```tsx
// Analytics tracking
<GTMScript />
// Automatically loads GTM container from admin settings
```

---

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
# Clone repository
git clone <repository-url>
cd ecommvert-website

# Install dependencies
npm install

# Copy environment variables
cp env.example .env.local

# Start development server
npm run dev
```

### Environment Variables
```env
# LemonSqueezy
LEMONSQUEEZY_API_KEY=your_api_key
NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID=your_store_id

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
NEXT_PUBLIC_OWNER_EMAILS=admin@example.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

### Development Commands
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## 🚀 Deployment Configuration

### Vercel Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### Build Optimization
- **Turbopack** - Fast bundling for dev and build
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic route-based splitting
- **Static Generation** - ISR for blog and tools pages

### Performance Features
- **Lazy Loading** - Components and images
- **Prefetching** - Link prefetching for navigation
- **Caching** - API response caching
- **Compression** - Gzip/Brotli compression

---

## 📝 Best Practices

### Code Organization
1. **Component Structure** - Single responsibility principle
2. **File Naming** - kebab-case for files, PascalCase for components
3. **Import Order** - External → Internal → Relative
4. **TypeScript** - Strict mode enabled, proper typing

### Performance
1. **Image Optimization** - Use Next.js Image component
2. **Bundle Size** - Tree shaking, dynamic imports
3. **Caching** - Appropriate cache headers
4. **Lazy Loading** - Code splitting and lazy components

### Accessibility
1. **Semantic HTML** - Proper heading hierarchy
2. **ARIA Labels** - Screen reader support
3. **Keyboard Navigation** - Full keyboard accessibility
4. **Color Contrast** - WCAG AA compliance

### SEO
1. **Meta Tags** - Proper title, description, OG tags
2. **Structured Data** - JSON-LD for rich snippets
3. **Sitemap** - Automatic sitemap generation
4. **Performance** - Core Web Vitals optimization

---

## 🆕 Creating New Apps

### Project Initialization
```bash
# Create new Next.js project
npx create-next-app@latest my-app --typescript --tailwind --eslint --app

# Install additional dependencies
npm install @radix-ui/react-* framer-motion lucide-react
npm install @supabase/supabase-js @clerk/nextjs
npm install class-variance-authority clsx tailwind-merge
```

### Design System Setup
1. **Copy Tailwind Config** - Use existing `tailwind.config.ts`
2. **Copy Global Styles** - Use `globals.css` as base
3. **Setup shadcn/ui** - Initialize with New York style
4. **Configure Themes** - Copy theme provider setup

### Component Library Setup
```bash
# Initialize shadcn/ui
npx shadcn@latest init

# Add components
npx shadcn@latest add button card input
npx shadcn@latest add navigation-menu dialog
```

### Project Structure
```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/           # shadcn/ui components
│   └── ...           # Feature components
├── lib/
│   ├── utils.ts
│   └── ...           # Utility libraries
└── hooks/            # Custom hooks
```

### Integration Setup
1. **Supabase** - Copy client configuration
2. **Clerk** - Setup authentication
3. **LemonSqueezy** - Copy API utilities
4. **GTM** - Copy analytics setup

### Styling Consistency
1. **Color System** - Use CSS variables for theming
2. **Typography** - Inter font family
3. **Spacing** - Tailwind spacing scale
4. **Components** - shadcn/ui component variants

### Development Workflow
1. **TypeScript** - Strict mode enabled
2. **ESLint** - Code quality enforcement
3. **Prettier** - Code formatting
4. **Git Hooks** - Pre-commit checks

---

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)

### Design Inspiration
- [Tailwind UI](https://tailwindui.com/)
- [shadcn/ui Examples](https://ui.shadcn.com/examples)
- [Radix UI Examples](https://www.radix-ui.com/examples)

### Performance Tools
- [Next.js Analytics](https://nextjs.org/analytics)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals](https://web.dev/vitals/)

---

## 🤝 Contributing

### Code Standards
- Follow TypeScript best practices
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Write tests for critical functionality

### Pull Request Process
1. Create feature branch from `main`
2. Make changes following the style guide
3. Test thoroughly across devices
4. Submit PR with clear description
5. Address review feedback

### Issue Reporting
- Use GitHub issues for bugs and features
- Provide clear reproduction steps
- Include relevant screenshots/logs
- Label issues appropriately

---

*This guide serves as the definitive reference for maintaining design consistency and development standards across all eCommvert applications.*

