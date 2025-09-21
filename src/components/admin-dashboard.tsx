"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { RichTextEditor } from "@/components/rich-text-editor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// Tabs are not used in the current admin UI
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, 
  Users, 
  BarChart3, 
  FileText, 
  ShoppingCart,
  Plus,
  Edit,
  Trash2,
  Save,
  Upload,
  Eye,
  EyeOff,
  Search,
  Download,
  RefreshCw
} from "lucide-react";
import { LemonSqueezyIntegration } from "./lemonsqueezy-integration";

// Types for our CMS data
interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  photo: string;
  isActive: boolean;
}

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  industry: string;
  client: string;
  duration: string;
  monthlySpend: string;
  challenge: string;
  solution: string;
  results: {
    metric1: { name: string; before: number; after: number; improvement: number; format: string; points?: number };
    metric2: { name: string; before: number; after: number; improvement: number; format: string; points?: number };
    metric3: { name: string; before: number; after: number; improvement: number; format: string; points?: number };
    metric4: { name: string; before: number; after: number; improvement: number; format: string; points?: number };
  };
  image: string;
  testimonial: string;
  author: string;
  role: string;
  isActive: boolean;
  // Detailed case study content
  detailedContent?: {
    heroImage?: string;
    executiveSummary?: string;
    background?: string;
    challenges?: string;
    approach?: string;
    implementation?: string;
    results?: string;
    lessonsLearned?: string;
    images?: Array<{
      url: string;
      caption?: string;
      alt?: string;
    }>;
    additionalMetrics?: Array<{
      name: string;
      value: string;
      description?: string;
    }>;
  };
}

interface ProductCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  isActive: boolean;
  productCount: number;
}

// Blog CMS
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  coverImage?: string;
  excerpt?: string;
  content: string;
  tags: string[];
  published: boolean;
  publishedAt?: string;
}

// Mock data - in a real app, this would come from an API
const mockBlogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "How We Scale Paid Ads Without Hiring In‑House",
    slug: "scale-paid-ads-without-inhouse",
    coverImage: "/blog/scale-ads.jpg",
    excerpt: "Our operating system for profitable growth with lean teams.",
    content: "# Operating System\n\n- Strategic audits first\n- Monthly consulting cadence\n- Automations to reduce toil",
    tags: ["google-ads","consulting","automation"],
    published: true,
    publishedAt: new Date().toISOString()
  }
];
const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Denis helped us identify optimization opportunities we never knew existed. Our ROAS improved by 40% within 2 months.",
    author: "Sarah M.",
    role: "CMO, E-commerce Brand",
    company: "$50K/month ad spend",
    photo: "/testimonials/sarah-m.jpg",
    isActive: true
  },
  {
    id: "2",
    quote: "Finally found someone who bridges the gap between our strategy and execution. The strategic oversight has been invaluable.",
    author: "Mike R.",
    role: "Marketing Director",
    company: "$25K/month ad spend",
    photo: "/testimonials/mike-r.jpg",
    isActive: true
  },
  {
    id: "3",
    quote: "Working with Denis is like having a senior strategist on demand. Immediate availability with proven expertise.",
    author: "Lisa K.",
    role: "CEO, DTC Brand",
    company: "$15K/month ad spend",
    photo: "/testimonials/lisa-k.jpg",
    isActive: true
  }
];

const mockCaseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "E-commerce Fashion Brand",
    category: "Fashion & Apparel",
    industry: "DTC Fashion",
    client: "StyleForward Co.",
    duration: "6 months",
    monthlySpend: "$45K",
    challenge: "Low ROAS (2.1x) and high customer acquisition costs preventing profitable growth",
    solution: "Complete Google Ads restructure with advanced audience targeting and conversion optimization",
    results: {
      metric1: { name: "ROAS", before: 2.1, after: 4.8, improvement: 0, format: "number", points: 0 },
      metric2: { name: "CPA", before: 85, after: 42, improvement: 0, format: "currency", points: 0 },
      metric3: { name: "Revenue", before: 180000, after: 432000, improvement: 0, format: "currency", points: 0 },
      metric4: { name: "Conversion", before: 1.8, after: 3.2, improvement: 0, format: "percentage", points: 0 }
    },
    image: "/case-studies/fashion-brand.jpg",
    testimonial: "Denis transformed our ad performance completely. We went from barely breaking even to profitable growth in just 3 months.",
    author: "Sarah Chen",
    role: "CMO, StyleForward Co.",
    isActive: true
  },
  {
    id: "2",
    title: "Home & Garden Retailer",
    category: "Home & Garden",
    industry: "E-commerce Retail",
    client: "GreenSpace Living",
    duration: "4 months",
    monthlySpend: "$28K",
    challenge: "Seasonal fluctuations causing inconsistent performance and wasted budget during off-peak periods",
    solution: "Dynamic seasonal bidding strategies with inventory-aware campaigns and smart budget allocation",
    results: {
      metric1: { name: "ROAS", before: 2.8, after: 5.2, improvement: 0, format: "number", points: 0 },
      metric2: { name: "CPA", before: 65, after: 35, improvement: 0, format: "currency", points: 0 },
      metric3: { name: "Revenue", before: 156000, after: 291200, improvement: 0, format: "currency", points: 0 },
      metric4: { name: "Conversion", before: 2.1, after: 3.8, improvement: 0, format: "percentage", points: 0 }
    },
    image: "/case-studies/home-garden.jpg",
    testimonial: "The seasonal optimization strategies Denis implemented saved us thousands during slow periods while maximizing peak season performance.",
    author: "Mike Rodriguez",
    role: "Marketing Director, GreenSpace Living",
    isActive: true
  },
  {
    id: "3",
    title: "Tech Accessories Brand",
    category: "Electronics",
    industry: "Consumer Tech",
    client: "TechFlow Solutions",
    duration: "5 months",
    monthlySpend: "$35K",
    challenge: "High competition in tech space with declining ad relevance and increasing costs",
    solution: "Advanced audience segmentation with creative testing and landing page optimization",
    results: {
      metric1: { name: "ROAS", before: 1.9, after: 4.1, improvement: 0, format: "number", points: 0 },
      metric2: { name: "CPA", before: 95, after: 46, improvement: 0, format: "currency", points: 0 },
      metric3: { name: "Revenue", before: 133000, after: 287000, improvement: 0, format: "currency", points: 0 },
      metric4: { name: "Conversion", before: 1.6, after: 2.9, improvement: 0, format: "percentage", points: 0 }
    },
    image: "/case-studies/tech-accessories.jpg",
    testimonial: "Denis helped us stand out in a crowded market. Our conversion rates doubled and we're now profitable at scale.",
    author: "Lisa Park",
    role: "CEO, TechFlow Solutions",
    isActive: true
  }
];

const mockProductCategories: ProductCategory[] = [
  { id: "1", name: "Google Ads Dashboards", description: "Comprehensive Google Ads performance dashboards", slug: "google-ads-dashboards", isActive: true, productCount: 5 },
  { id: "2", name: "Analytics Tools", description: "Advanced analytics and reporting tools", slug: "analytics-tools", isActive: true, productCount: 3 },
  { id: "3", name: "Strategy Templates", description: "Strategic planning and optimization templates", slug: "strategy-templates", isActive: true, productCount: 8 },
  { id: "4", name: "Training Materials", description: "Educational content and training resources", slug: "training-materials", isActive: false, productCount: 2 }
];

export const AdminDashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("overview");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTestimonials = localStorage.getItem('admin-testimonials');
    const savedCaseStudies = localStorage.getItem('admin-case-studies');
    const savedCategories = localStorage.getItem('admin-categories');
    const savedBlogPosts = localStorage.getItem('admin-blog-posts');
    
    // Set default data first
    setTestimonials(mockTestimonials);
    setCaseStudies(mockCaseStudies);
    setProductCategories(mockProductCategories);
    setBlogPosts(mockBlogPosts);
    
    if (savedTestimonials) {
      try {
        setTestimonials(JSON.parse(savedTestimonials));
      } catch (error) {
        console.error('Error parsing testimonials:', error);
      }
    }
    
    if (savedCaseStudies) {
      try {
        type OldResults = {
          roas: { before: number; after: number; improvement: number };
          cpa: { before: number; after: number; improvement: number };
          revenue: { before: number; after: number; improvement: number };
          conversion: { before: number; after: number; improvement: number };
        };
        type OldCaseStudy = Omit<CaseStudy, 'results'> & { results: OldResults };

        const hasOldResults = (cs: unknown): cs is OldCaseStudy => {
          if (typeof cs !== 'object' || cs === null) return false;
          const obj = cs as Record<string, unknown>;
          const res = obj['results'] as Record<string, unknown> | undefined;
          return !!res && 'roas' in res && 'cpa' in res && 'revenue' in res && 'conversion' in res;
        };

        const parsedCaseStudies = JSON.parse(savedCaseStudies) as unknown[];
        // Migrate old case study format to new format
        const migratedCaseStudies: CaseStudy[] = parsedCaseStudies.map((caseStudyUnknown) => {
          if (hasOldResults(caseStudyUnknown)) {
            const caseStudy = caseStudyUnknown as OldCaseStudy;
            return {
              ...(caseStudy as unknown as Omit<CaseStudy, 'results'>),
              results: {
                metric1: { name: "ROAS", before: caseStudy.results.roas.before, after: caseStudy.results.roas.after, improvement: caseStudy.results.roas.improvement, format: "number" },
                metric2: { name: "CPA", before: caseStudy.results.cpa.before, after: caseStudy.results.cpa.after, improvement: caseStudy.results.cpa.improvement, format: "currency" },
                metric3: { name: "Revenue", before: caseStudy.results.revenue.before, after: caseStudy.results.revenue.after, improvement: caseStudy.results.revenue.improvement, format: "currency" },
                metric4: { name: "Conversion", before: caseStudy.results.conversion.before, after: caseStudy.results.conversion.after, improvement: caseStudy.results.conversion.improvement, format: "percentage" }
              }
            } as CaseStudy;
          }
          return caseStudyUnknown as CaseStudy;
        });
        setCaseStudies(migratedCaseStudies);
      } catch (error) {
        console.error('Error parsing case studies:', error);
      }
    }
    
    if (savedCategories) {
      try {
        setProductCategories(JSON.parse(savedCategories));
      } catch (error) {
        console.error('Error parsing categories:', error);
      }
    }
    if (savedBlogPosts) {
      try {
        setBlogPosts(JSON.parse(savedBlogPosts));
      } catch (error) {
        console.error('Error parsing blog posts:', error);
      }
    }
    
    setIsLoaded(true);
  }, []);

  // Helpers to talk to server API
  const getOwnerEmail = () => user?.primaryEmailAddress?.emailAddress || "";
  const apiBase = "/api/admin/content";
  type CategoryRow = { id: string; name: string; description?: string; is_active: boolean; created_at: string };
  type ResultsPayload = {
    metric1: { name: string; before: number; after: number; improvement: number; format: string; points?: number };
    metric2: { name: string; before: number; after: number; improvement: number; format: string; points?: number };
    metric3: { name: string; before: number; after: number; improvement: number; format: string; points?: number };
    metric4: { name: string; before: number; after: number; improvement: number; format: string; points?: number };
  };
  type DetailedContentPayload = {
    heroImage?: string;
    executiveSummary?: string;
    background?: string;
    challenges?: string;
    approach?: string;
    implementation?: string;
    results?: string;
    lessonsLearned?: string;
    images?: Array<{ url: string; caption?: string; alt?: string }>;
    additionalMetrics?: Array<{ name: string; value: string; description?: string }>;
  };
  type CaseStudyRow = {
    id: string;
    title: string; category: string; industry?: string; client?: string; duration?: string; monthly_spend?: string;
    challenge?: string; solution?: string; results?: ResultsPayload; image?: string; testimonial?: string; author?: string; role?: string;
    is_active: boolean; created_at: string; detailed_content?: DetailedContentPayload;
  };
  const fetchTable = async (table: 'categories' | 'case_studies') => {
    const res = await fetch(`${apiBase}?table=${table}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(await res.text());
    const json = await res.json();
    return json.data as (CategoryRow[] | CaseStudyRow[]);
  };
  const insertTable = async (table: 'categories' | 'case_studies', payload: unknown[], mode: 'insert' | 'upsert' = 'insert') => {
    const res = await fetch(apiBase, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-email': getOwnerEmail() },
      body: JSON.stringify({ table, payload, mode })
    });
    if (!res.ok) throw new Error(await res.text());
    return (await res.json()).data as unknown[];
  };
  const deleteRows = async (table: 'categories' | 'case_studies', ids: string[] | '*', key: string = 'id') => {
    const res = await fetch(apiBase, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-user-email': getOwnerEmail() },
      body: JSON.stringify(ids === '*' ? { table, id: '*', key } : { table, ids, key })
    });
    if (!res.ok) throw new Error(await res.text());
    return (await res.json()).data as unknown[];
  };
  // Removed unused clearAndInsert helper to satisfy linter

  // Sync: pull from Supabase
  const pullFromServer = useCallback(async () => {
    try {
      const [cs, cats] = await Promise.all([
        fetchTable('case_studies'),
        fetchTable('categories')
      ]);
      const mappedCS: CaseStudy[] = (cs as CaseStudyRow[]).map((row) => ({
        id: row.id || crypto.randomUUID(),
        title: row.title || '',
        category: row.category || '',
        industry: row.industry || '',
        client: row.client || '',
        duration: row.duration || '',
        monthlySpend: row.monthly_spend || '',
        challenge: row.challenge || '',
        solution: row.solution || '',
        results: row.results || mockCaseStudies[0].results,
        image: row.image || '',
        testimonial: row.testimonial || '',
        author: row.author || '',
        role: row.role || '',
        isActive: row.is_active ?? true,
        detailedContent: row.detailed_content || undefined,
      }));
      const mappedCats: ProductCategory[] = (cats as CategoryRow[]).map((row) => ({
        id: row.id || crypto.randomUUID(),
        name: row.name,
        description: row.description || '',
        slug: (row.name || '').toLowerCase().replace(/\s+/g,'-'),
        isActive: row.is_active ?? true,
        productCount: 0,
      }));
      // Only adopt server data if it contains items; otherwise keep local
      if ((mappedCS?.length || 0) > 0) {
        setCaseStudies(mappedCS);
        localStorage.setItem('admin-case-studies', JSON.stringify(mappedCS));
      }
      if ((mappedCats?.length || 0) > 0) {
        setProductCategories(mappedCats);
        localStorage.setItem('admin-categories', JSON.stringify(mappedCats));
      }
    } catch (e) {
      console.error('Pull failed', e);
      alert('Failed to pull from server. Check console.');
    }
  }, [fetchTable]);

  // Server-first load (non-destructive): fetch once on mount
  useEffect(() => {
    void pullFromServer();
  }, [pullFromServer]);

  // Sync: push local state to Supabase
  const pushToServer = async () => {
    try {
      const csPayload = caseStudies.map(cs => ({
        id: cs.id,
        title: cs.title,
        category: cs.category,
        industry: cs.industry,
        client: cs.client,
        duration: cs.duration,
        monthly_spend: cs.monthlySpend,
        challenge: cs.challenge,
        solution: cs.solution,
        results: cs.results,
        image: cs.image,
        testimonial: cs.testimonial,
        author: cs.author,
        role: cs.role,
        is_active: cs.isActive,
      }));
      const catPayload = productCategories.map(c => ({
        id: c.id,
        name: c.name,
        description: c.description,
        is_active: c.isActive,
      }));
      // Use upsert to avoid accidental wipes if records already exist
      await insertTable('categories', catPayload, 'upsert');
      await insertTable('case_studies', csPayload, 'upsert');
      alert('Saved to server.');
    } catch (e) {
      console.error('Push failed', e);
      alert('Failed to save to server. Check console.');
    }
  };

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('admin-testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('admin-case-studies', JSON.stringify(caseStudies));
  }, [caseStudies]);

  useEffect(() => {
    localStorage.setItem('admin-categories', JSON.stringify(productCategories));
  }, [productCategories]);
  useEffect(() => {
    localStorage.setItem('admin-blog-posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  const toggleItemStatus = (type: 'testimonial' | 'case-study' | 'category', id: string) => {
    if (type === 'testimonial') {
      setTestimonials(prev => prev.map(item => 
        item.id === id ? { ...item, isActive: !item.isActive } : item
      ));
    } else if (type === 'case-study') {
      setCaseStudies(prev => prev.map(item => 
        item.id === id ? { ...item, isActive: !item.isActive } : item
      ));
    } else if (type === 'category') {
      setProductCategories(prev => prev.map(item => 
        item.id === id ? { ...item, isActive: !item.isActive } : item
      ));
    }
  };

  const deleteItem = async (type: 'testimonial' | 'case-study' | 'category' | 'blog', id: string) => {
    if (type === 'testimonial') {
      setTestimonials(prev => prev.filter(item => item.id !== id));
    } else if (type === 'case-study') {
      setCaseStudies(prev => prev.filter(item => item.id !== id));
      try { await deleteRows('case_studies', [id]); } catch (e) { console.error('Server delete failed', e); }
    } else if (type === 'category') {
      setProductCategories(prev => prev.filter(item => item.id !== id));
      try { await deleteRows('categories', [id]); } catch (e) { console.error('Server delete failed', e); }
    } else if (type === 'blog') {
      setBlogPosts(prev => prev.filter(item => item.id !== id));
    }
  };

  const addNewItem = (type: 'testimonial' | 'case-study' | 'category') => {
    const newId = (typeof crypto !== 'undefined' && 'randomUUID' in crypto) ? crypto.randomUUID() : `${Date.now()}`;
    
    if (type === 'testimonial') {
      const newTestimonial: Testimonial = {
        id: newId,
        quote: "",
        author: "",
        role: "",
        company: "",
        photo: "",
        isActive: true
      };
      setTestimonials(prev => [...prev, newTestimonial]);
      setEditingItem(newId);
    } else if (type === 'case-study') {
      const newCaseStudy: CaseStudy = {
        id: newId,
        title: "",
        category: "",
        industry: "",
        client: "",
        duration: "",
        monthlySpend: "",
        challenge: "",
        solution: "",
        results: {
          metric1: { name: "ROAS", before: 0, after: 0, improvement: 0, format: "number" },
          metric2: { name: "CPA", before: 0, after: 0, improvement: 0, format: "currency" },
          metric3: { name: "Revenue", before: 0, after: 0, improvement: 0, format: "currency" },
          metric4: { name: "Conversion", before: 0, after: 0, improvement: 0, format: "percentage" }
        },
        image: "",
        testimonial: "",
        author: "",
        role: "",
        isActive: true
      };
      setCaseStudies(prev => [...prev, newCaseStudy]);
      setEditingItem(newId);
    } else if (type === 'category') {
      const newCategory: ProductCategory = {
        id: newId,
        name: "",
        description: "",
        slug: "",
        isActive: true,
        productCount: 0
      };
      setProductCategories(prev => [...prev, newCategory]);
      setEditingItem(newId);
    }
  };

  type UpdatePayload = Partial<Testimonial> | Partial<CaseStudy> | Partial<ProductCategory>;
  const updateItem = (type: 'testimonial' | 'case-study' | 'category', id: string, updates: UpdatePayload) => {
    if (type === 'testimonial') {
      setTestimonials(prev => prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      ));
    } else if (type === 'case-study') {
      setCaseStudies(prev => prev.map(item => {
        if (item.id !== id) return item;

        const updatesCS = updates as Partial<CaseStudy>;
        let merged: CaseStudy = { ...item, ...updatesCS } as CaseStudy;

        if (updatesCS.results) {
          merged = {
            ...merged,
            results: {
              metric1: { ...item.results.metric1, ...(updatesCS.results.metric1 || {}) },
              metric2: { ...item.results.metric2, ...(updatesCS.results.metric2 || {}) },
              metric3: { ...item.results.metric3, ...(updatesCS.results.metric3 || {}) },
              metric4: { ...item.results.metric4, ...(updatesCS.results.metric4 || {}) }
            }
          };
        }

        return merged;
      }));
    } else if (type === 'category') {
      setProductCategories(prev => prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      ));
    }
  };

  const filteredTestimonials = testimonials.filter(item => 
    item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCaseStudies = caseStudies.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCategories = productCategories.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-slate-600">Manage your website content and products</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={pullFromServer}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Data
              </Button>
              <Button size="sm" onClick={pushToServer}>
                <Save className="w-4 h-4 mr-2" />
                Save All Changes
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  const confirmed = confirm('This will REPLACE the server data with your current local state for Case Studies and Categories. Proceed?');
                  if (!confirmed) return;
                  try {
                    const csPayload = caseStudies.map(cs => ({
                      id: cs.id,
                      title: cs.title,
                      category: cs.category,
                      industry: cs.industry,
                      client: cs.client,
                      duration: cs.duration,
                      monthly_spend: cs.monthlySpend,
                      challenge: cs.challenge,
                      solution: cs.solution,
                      results: cs.results,
                      image: cs.image,
                      testimonial: cs.testimonial,
                      author: cs.author,
                      role: cs.role,
                      is_active: cs.isActive,
                    }));
                    const catPayload = productCategories.map(c => ({
                      id: c.id,
                      name: c.name,
                      description: c.description,
                      is_active: c.isActive,
                    }));
                    await deleteRows('case_studies', '*');
                    await deleteRows('categories', '*');
                    await insertTable('categories', catPayload, 'upsert');
                    await insertTable('case_studies', csPayload, 'upsert');
                    alert('Server replaced with local state.');
                  } catch (e) {
                    console.error('Replace server failed', e);
                    alert('Failed to replace server. Check console.');
                  }
                }}
              >
                <Upload className="w-4 h-4 mr-2" />
                Replace server with local
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  try {
                    const lsCaseStudies = localStorage.getItem('admin-case-studies');
                    const lsCategories = localStorage.getItem('admin-categories');
                    const csArr = lsCaseStudies ? (JSON.parse(lsCaseStudies) as CaseStudy[]) : [];
                    const catArr = lsCategories ? (JSON.parse(lsCategories) as ProductCategory[]) : [];
                    if (csArr.length === 0 && catArr.length === 0) {
                      alert('No local data found to import.');
                      return;
                    }
                    const csPayload = csArr.map(cs => ({
                      title: cs.title,
                      category: cs.category,
                      industry: cs.industry,
                      client: cs.client,
                      duration: cs.duration,
                      monthly_spend: cs.monthlySpend,
                      challenge: cs.challenge,
                      solution: cs.solution,
                      results: cs.results,
                      image: cs.image,
                      testimonial: cs.testimonial,
                      author: cs.author,
                      role: cs.role,
                      is_active: cs.isActive,
                    }));
                    const catPayload = catArr.map(c => ({
                      name: c.name,
                      description: c.description,
                      is_active: c.isActive,
                    }));
                    await insertTable('categories', catPayload, 'upsert');
                    await insertTable('case_studies', csPayload, 'upsert');
                    alert('Imported local browser data to server.');
                  } catch (e) {
                    console.error('Import failed', e);
                    alert('Import failed. Check console.');
                  }
                }}
              >
                <Upload className="w-4 h-4 mr-2" />
                Import from this browser
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-slate-900 border-r border-slate-700 min-h-screen">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className={`w-full justify-start font-medium ${
                activeTab === "overview" 
                  ? "bg-primary text-white hover:bg-primary/90" 
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeTab === "testimonials" ? "default" : "ghost"}
              className={`w-full justify-start font-medium ${
                activeTab === "testimonials" 
                  ? "bg-primary text-white hover:bg-primary/90" 
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              onClick={() => setActiveTab("testimonials")}
            >
              <Users className="w-4 h-4 mr-2" />
              Testimonials
            </Button>
            <Button
              variant={activeTab === "case-studies" ? "default" : "ghost"}
              className={`w-full justify-start font-medium ${
                activeTab === "case-studies" 
                  ? "bg-primary text-white hover:bg-primary/90" 
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              onClick={() => setActiveTab("case-studies")}
            >
              <FileText className="w-4 h-4 mr-2" />
              Case Studies
            </Button>
            <Button
              variant={activeTab === "categories" ? "default" : "ghost"}
              className={`w-full justify-start font-medium ${
                activeTab === "categories" 
                  ? "bg-primary text-white hover:bg-primary/90" 
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              onClick={() => setActiveTab("categories")}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Product Categories
            </Button>
            <Button
              variant={activeTab === "lemonsqueezy" ? "default" : "ghost"}
              className={`w-full justify-start font-medium ${
                activeTab === "lemonsqueezy" 
                  ? "bg-primary text-white hover:bg-primary/90" 
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              onClick={() => setActiveTab("lemonsqueezy")}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              LemonSqueezy
            </Button>
            <Button
              variant={activeTab === "settings" ? "default" : "ghost"}
              className={`w-full justify-start font-medium ${
                activeTab === "settings" 
                  ? "bg-primary text-white hover:bg-primary/90" 
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 text-blue-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-slate-600">Testimonials</p>
                        <p className="text-2xl font-bold text-slate-900">{testimonials.length}</p>
                        <p className="text-xs text-green-600">{testimonials.filter(t => t.isActive).length} active</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-green-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-slate-600">Case Studies</p>
                        <p className="text-2xl font-bold text-slate-900">{caseStudies.length}</p>
                        <p className="text-xs text-green-600">{caseStudies.filter(c => c.isActive).length} active</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <ShoppingCart className="h-8 w-8 text-purple-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-slate-600">Categories</p>
                        <p className="text-2xl font-bold text-slate-900">{productCategories.length}</p>
                        <p className="text-xs text-green-600">{productCategories.filter(c => c.isActive).length} active</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <BarChart3 className="h-8 w-8 text-orange-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-slate-600">Total Products</p>
                        <p className="text-2xl font-bold text-slate-900">
                          {productCategories.reduce((sum, cat) => sum + cat.productCount, 0)}
                        </p>
                        <p className="text-xs text-slate-600">across all categories</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest changes to your content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Testimonial added</p>
                        <p className="text-xs text-slate-600">Sarah M. testimonial was published</p>
                      </div>
                      <span className="text-xs text-slate-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Case study updated</p>
                        <p className="text-xs text-slate-600">Fashion Brand case study metrics updated</p>
                      </div>
                      <span className="text-xs text-slate-500">1 day ago</span>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Category created</p>
                        <p className="text-xs text-slate-600">New Analytics Tools category added</p>
                      </div>
                      <span className="text-xs text-slate-500">3 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Testimonials</h2>
                  <p className="text-slate-600">Manage client testimonials and photos</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search testimonials..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button onClick={() => addNewItem('testimonial')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Testimonial
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTestimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge variant={testimonial.isActive ? "default" : "secondary"}>
                          {testimonial.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingItem(editingItem === testimonial.id ? null : testimonial.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleItemStatus('testimonial', testimonial.id)}
                          >
                            {testimonial.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteItem('testimonial', testimonial.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {editingItem === testimonial.id ? (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="quote">Quote</Label>
                            <Textarea
                              id="quote"
                              value={testimonial.quote}
                              onChange={(e) => updateItem('testimonial', testimonial.id, { quote: e.target.value })}
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label htmlFor="author">Author</Label>
                            <Input
                              id="author"
                              value={testimonial.author}
                              onChange={(e) => updateItem('testimonial', testimonial.id, { author: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="role">Role</Label>
                            <Input
                              id="role"
                              value={testimonial.role}
                              onChange={(e) => updateItem('testimonial', testimonial.id, { role: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="company">Company</Label>
                            <Input
                              id="company"
                              value={testimonial.company}
                              onChange={(e) => updateItem('testimonial', testimonial.id, { company: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="photo">Photo URL</Label>
                            <Input
                              id="photo"
                              value={testimonial.photo}
                              onChange={(e) => updateItem('testimonial', testimonial.id, { photo: e.target.value })}
                              placeholder="/testimonials/photo.jpg"
                            />
                          </div>
                          <Button onClick={() => setEditingItem(null)} className="w-full">
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-sm text-slate-600 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-slate-500" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{testimonial.author}</p>
                              <p className="text-xs text-slate-500">{testimonial.role}</p>
                              <p className="text-xs text-blue-600">{testimonial.company}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Case Studies Tab */}
          {activeTab === "case-studies" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Case Studies</h2>
                  <p className="text-slate-600">Manage client success stories and metrics</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search case studies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button onClick={() => addNewItem('case-study')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Case Study
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {filteredCaseStudies.map((caseStudy) => (
                  <Card key={caseStudy.id} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{caseStudy.title}</CardTitle>
                          <CardDescription>
                            {caseStudy.client} • {caseStudy.duration} • {caseStudy.monthlySpend}/month
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={caseStudy.isActive ? "default" : "secondary"}>
                            {caseStudy.isActive ? "Active" : "Inactive"}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingItem(editingItem === caseStudy.id ? null : caseStudy.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleItemStatus('case-study', caseStudy.id)}
                          >
                            {caseStudy.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteItem('case-study', caseStudy.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {editingItem === caseStudy.id ? (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="title">Title</Label>
                              <Input
                                id="title"
                                value={caseStudy.title}
                                onChange={(e) => updateItem('case-study', caseStudy.id, { title: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="client">Client</Label>
                              <Input
                                id="client"
                                value={caseStudy.client}
                                onChange={(e) => updateItem('case-study', caseStudy.id, { client: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="category">Category</Label>
                              <Input
                                id="category"
                                value={caseStudy.category}
                                onChange={(e) => updateItem('case-study', caseStudy.id, { category: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="industry">Industry</Label>
                              <Input
                                id="industry"
                                value={caseStudy.industry}
                                onChange={(e) => updateItem('case-study', caseStudy.id, { industry: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="duration">Duration</Label>
                              <Input
                                id="duration"
                                value={caseStudy.duration}
                                onChange={(e) => updateItem('case-study', caseStudy.id, { duration: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="monthlySpend">Monthly Spend</Label>
                              <Input
                                id="monthlySpend"
                                value={caseStudy.monthlySpend}
                                onChange={(e) => updateItem('case-study', caseStudy.id, { monthlySpend: e.target.value })}
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="challenge">Challenge</Label>
                            <Textarea
                              id="challenge"
                              value={caseStudy.challenge}
                              onChange={(e) => updateItem('case-study', caseStudy.id, { challenge: e.target.value })}
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label htmlFor="solution">Solution</Label>
                            <Textarea
                              id="solution"
                              value={caseStudy.solution}
                              onChange={(e) => updateItem('case-study', caseStudy.id, { solution: e.target.value })}
                              rows={3}
                            />
                          </div>
                          <div className="space-y-6">
                            <h4 className="text-lg font-semibold">Metrics</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Metric 1 */}
                              <div className="space-y-3">
                                <Label htmlFor="metric1-name">Metric 1 Name</Label>
                                <Input
                                  id="metric1-name"
                                  value={caseStudy.results?.metric1?.name || ""}
                                  onChange={(e) => updateItem('case-study', caseStudy.id, { 
                                    results: { ...caseStudy.results, metric1: { ...caseStudy.results?.metric1, name: e.target.value } }
                                  })}
                                  placeholder="e.g., ROAS, PoAS, CTR"
                                />
                                <div className="grid grid-cols-3 gap-2">
                                  <div>
                                    <Label htmlFor="metric1-before">Before</Label>
                                    <Input
                                      id="metric1-before"
                                      type="number"
                                      value={caseStudy.results?.metric1?.before || 0}
                                      onChange={(e) => updateItem('case-study', caseStudy.id, { 
                                        results: { ...caseStudy.results, metric1: { ...caseStudy.results?.metric1, before: parseFloat(e.target.value) } }
                                      })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="metric1-after">After</Label>
                                    <Input
                                      id="metric1-after"
                                      type="number"
                                      value={caseStudy.results?.metric1?.after || 0}
                                      onChange={(e) => updateItem('case-study', caseStudy.id, { 
                                        results: { ...caseStudy.results, metric1: { ...caseStudy.results?.metric1, after: parseFloat(e.target.value) } }
                                      })}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="metric1-points">Points</Label>
                                  <Input
                                    id="metric1-points"
                                    type="number"
                                    value={caseStudy.results?.metric1?.points || 0}
                                    onChange={(e) => updateItem('case-study', caseStudy.id, { 
                                      results: { ...caseStudy.results, metric1: { ...caseStudy.results?.metric1, points: parseFloat(e.target.value) } }
                                    })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="metric1-format">Format</Label>
                                  <Select
                                    value={caseStudy.results?.metric1?.format || "number"}
                                    onValueChange={(value) => updateItem('case-study', caseStudy.id, { 
                                      results: { ...caseStudy.results, metric1: { ...caseStudy.results?.metric1, format: value } }
                                    })}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="number">Number</SelectItem>
                                      <SelectItem value="currency">Currency ($)</SelectItem>
                                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                                      <SelectItem value="percentage-only">Percentage Only</SelectItem>
                                      <SelectItem value="percentage-points">Percentage Points (pp)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              {/* Metric 2 */}
                              <div className="space-y-3">
                                <Label htmlFor="metric2-name">Metric 2 Name</Label>
                                <Input
                                  id="metric2-name"
                                  value={caseStudy.results.metric2.name}
                                  onChange={(e) => updateItem('case-study', caseStudy.id, { 
                                    results: { ...caseStudy.results, metric2: { ...caseStudy.results.metric2, name: e.target.value } }
                                  })}
                                  placeholder="e.g., CPA, Marketing Spend, CTR"
                                />
                                <div className="grid grid-cols-3 gap-2">
                                  <div>
                                    <Label htmlFor="metric2-before">Before</Label>
                                    <Input
                                      id="metric2-before"
                                      type="number"
                                      value={caseStudy.results.metric2.before}
                                      onChange={(e) => updateItem('case-study', caseStudy.id, { 
                                        results: { ...caseStudy.results, metric2: { ...caseStudy.results.metric2, before: parseFloat(e.target.value) } }
                                      })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="metric2-after">After</Label>
                                    <Input
                                      id="metric2-after"
                                      type="number"
                                      value={caseStudy.results.metric2.after}
                                      onChange={(e) => updateItem('case-study', caseStudy.id, { 
                                        results: { ...caseStudy.results, metric2: { ...caseStudy.results.metric2, after: parseFloat(e.target.value) } }
                                      })}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="metric2-points">Points</Label>
                                  <Input
                                    id="metric2-points"
                                    type="number"
                                    value={caseStudy.results.metric2.points || 0}
                                    onChange={(e) => updateItem('case-study', caseStudy.id, { 
                                      results: { ...caseStudy.results, metric2: { ...caseStudy.results.metric2, points: parseFloat(e.target.value) } }
                                    })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="metric2-format">Format</Label>
                                  <Select
                                    value={caseStudy.results.metric2.format}
                                    onValueChange={(value) => updateItem('case-study', caseStudy.id, { 
                                      results: { ...caseStudy.results, metric2: { ...caseStudy.results.metric2, format: value } }
                                    })}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="number">Number</SelectItem>
                                      <SelectItem value="currency">Currency ($)</SelectItem>
                                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                                      <SelectItem value="percentage-only">Percentage Only</SelectItem>
                                      <SelectItem value="percentage-points">Percentage Points (pp)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              {/* Metric 3 */}
                              <div className="space-y-3">
                                <Label htmlFor="metric3-name">Metric 3 Name</Label>
                                <Input
                                  id="metric3-name"
                                  value={caseStudy.results.metric3.name}
                                  onChange={(e) => updateItem('case-study', caseStudy.id, { 
                                    results: { ...caseStudy.results, metric3: { ...caseStudy.results.metric3, name: e.target.value } }
                                  })}
                                  placeholder="e.g., Revenue, Orders, AOV"
                                />
                                <div className="grid grid-cols-3 gap-2">
                                  <div>
                                    <Label htmlFor="metric3-before">Before</Label>
                                    <Input
                                      id="metric3-before"
                                      type="number"
                                      value={caseStudy.results.metric3.before}
                                      onChange={(e) => updateItem('case-study', caseStudy.id, { 
                                        results: { ...caseStudy.results, metric3: { ...caseStudy.results.metric3, before: parseFloat(e.target.value) } }
                                      })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="metric3-after">After</Label>
                                    <Input
                                      id="metric3-after"
                                      type="number"
                                      value={caseStudy.results.metric3.after}
                                      onChange={(e) => updateItem('case-study', caseStudy.id, { 
                                        results: { ...caseStudy.results, metric3: { ...caseStudy.results.metric3, after: parseFloat(e.target.value) } }
                                      })}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="metric3-points">Points</Label>
                                  <Input
                                    id="metric3-points"
                                    type="number"
                                    value={caseStudy.results.metric3.points || 0}
                                    onChange={(e) => updateItem('case-study', caseStudy.id, { 
                                      results: { ...caseStudy.results, metric3: { ...caseStudy.results.metric3, points: parseFloat(e.target.value) } }
                                    })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="metric3-format">Format</Label>
                                  <Select
                                    value={caseStudy.results.metric3.format}
                                    onValueChange={(value) => updateItem('case-study', caseStudy.id, { 
                                      results: { ...caseStudy.results, metric3: { ...caseStudy.results.metric3, format: value } }
                                    })}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="number">Number</SelectItem>
                                      <SelectItem value="currency">Currency ($)</SelectItem>
                                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                                      <SelectItem value="percentage-only">Percentage Only</SelectItem>
                                      <SelectItem value="percentage-points">Percentage Points (pp)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              {/* Metric 4 */}
                              <div className="space-y-3">
                                <Label htmlFor="metric4-name">Metric 4 Name</Label>
                                <Input
                                  id="metric4-name"
                                  value={caseStudy.results.metric4.name}
                                  onChange={(e) => updateItem('case-study', caseStudy.id, { 
                                    results: { ...caseStudy.results, metric4: { ...caseStudy.results.metric4, name: e.target.value } }
                                  })}
                                  placeholder="e.g., Conversion Rate, CTR, Quality Score"
                                />
                                <div className="grid grid-cols-3 gap-2">
                                  <div>
                                    <Label htmlFor="metric4-before">Before</Label>
                                    <Input
                                      id="metric4-before"
                                      type="number"
                                      value={caseStudy.results.metric4.before}
                                      onChange={(e) => updateItem('case-study', caseStudy.id, { 
                                        results: { ...caseStudy.results, metric4: { ...caseStudy.results.metric4, before: parseFloat(e.target.value) } }
                                      })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="metric4-after">After</Label>
                                    <Input
                                      id="metric4-after"
                                      type="number"
                                      value={caseStudy.results.metric4.after}
                                      onChange={(e) => updateItem('case-study', caseStudy.id, { 
                                        results: { ...caseStudy.results, metric4: { ...caseStudy.results.metric4, after: parseFloat(e.target.value) } }
                                      })}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="metric4-points">Points</Label>
                                  <Input
                                    id="metric4-points"
                                    type="number"
                                    value={caseStudy.results.metric4.points || 0}
                                    onChange={(e) => updateItem('case-study', caseStudy.id, { 
                                      results: { ...caseStudy.results, metric4: { ...caseStudy.results.metric4, points: parseFloat(e.target.value) } }
                                    })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="metric4-format">Format</Label>
                                  <Select
                                    value={caseStudy.results.metric4.format}
                                    onValueChange={(value) => updateItem('case-study', caseStudy.id, { 
                                      results: { ...caseStudy.results, metric4: { ...caseStudy.results.metric4, format: value } }
                                    })}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="number">Number</SelectItem>
                                      <SelectItem value="currency">Currency ($)</SelectItem>
                                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                                      <SelectItem value="percentage-only">Percentage Only</SelectItem>
                                      <SelectItem value="percentage-points">Percentage Points (pp)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Detailed Content Section */}
                          <div className="space-y-6">
                            <h4 className="text-lg font-semibold">Detailed Case Study Content</h4>
                            
                            <div>
                              <Label htmlFor="heroImage">Hero Image URL</Label>
                              <Input
                                id="heroImage"
                                value={caseStudy.detailedContent?.heroImage || ""}
                                onChange={(e) => updateItem('case-study', caseStudy.id, { 
                                  detailedContent: { ...caseStudy.detailedContent, heroImage: e.target.value }
                                })}
                                placeholder="/case-studies/hero-image.jpg"
                              />
                            </div>

                            <RichTextEditor
                              label="Executive Summary"
                              value={caseStudy.detailedContent?.executiveSummary || ""}
                              onChange={(value) => updateItem('case-study', caseStudy.id, { 
                                detailedContent: { ...caseStudy.detailedContent, executiveSummary: value }
                              })}
                              placeholder="Write a compelling executive summary..."
                            />

                            <RichTextEditor
                              label="Background & Context"
                              value={caseStudy.detailedContent?.background || ""}
                              onChange={(value) => updateItem('case-study', caseStudy.id, { 
                                detailedContent: { ...caseStudy.detailedContent, background: value }
                              })}
                              placeholder="Describe the client's background and situation..."
                            />

                            <RichTextEditor
                              label="Detailed Challenges"
                              value={caseStudy.detailedContent?.challenges || ""}
                              onChange={(value) => updateItem('case-study', caseStudy.id, { 
                                detailedContent: { ...caseStudy.detailedContent, challenges: value }
                              })}
                              placeholder="Expand on the challenges faced..."
                            />

                            <RichTextEditor
                              label="Approach & Strategy"
                              value={caseStudy.detailedContent?.approach || ""}
                              onChange={(value) => updateItem('case-study', caseStudy.id, { 
                                detailedContent: { ...caseStudy.detailedContent, approach: value }
                              })}
                              placeholder="Detail your approach and strategy..."
                            />

                            <RichTextEditor
                              label="Implementation Details"
                              value={caseStudy.detailedContent?.implementation || ""}
                              onChange={(value) => updateItem('case-study', caseStudy.id, { 
                                detailedContent: { ...caseStudy.detailedContent, implementation: value }
                              })}
                              placeholder="Describe the implementation process..."
                            />

                            <RichTextEditor
                              label="Detailed Results"
                              value={caseStudy.detailedContent?.results || ""}
                              onChange={(value) => updateItem('case-study', caseStudy.id, { 
                                detailedContent: { ...caseStudy.detailedContent, results: value }
                              })}
                              placeholder="Expand on the results achieved..."
                            />

                            <RichTextEditor
                              label="Lessons Learned"
                              value={caseStudy.detailedContent?.lessonsLearned || ""}
                              onChange={(value) => updateItem('case-study', caseStudy.id, { 
                                detailedContent: { ...caseStudy.detailedContent, lessonsLearned: value }
                              })}
                              placeholder="Share key insights and lessons learned..."
                            />

                            {/* Additional Images */}
                            <div className="space-y-4">
                              <Label>Additional Images</Label>
                              <div className="space-y-3">
                                {(caseStudy.detailedContent?.images || []).map((image, index) => (
                                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 border rounded-lg">
                                    <div>
                                      <Label htmlFor={`image-${index}-url`}>Image URL</Label>
                                      <Input
                                        id={`image-${index}-url`}
                                        value={image.url}
                                        onChange={(e) => {
                                          const newImages = [...(caseStudy.detailedContent?.images || [])];
                                          newImages[index] = { ...image, url: e.target.value };
                                          updateItem('case-study', caseStudy.id, { 
                                            detailedContent: { ...caseStudy.detailedContent, images: newImages }
                                          });
                                        }}
                                        placeholder="/case-studies/image.jpg"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor={`image-${index}-caption`}>Caption</Label>
                                      <Input
                                        id={`image-${index}-caption`}
                                        value={image.caption || ""}
                                        onChange={(e) => {
                                          const newImages = [...(caseStudy.detailedContent?.images || [])];
                                          newImages[index] = { ...image, caption: e.target.value };
                                          updateItem('case-study', caseStudy.id, { 
                                            detailedContent: { ...caseStudy.detailedContent, images: newImages }
                                          });
                                        }}
                                        placeholder="Image caption"
                                      />
                                    </div>
                                    <div className="flex items-end">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const newImages = (caseStudy.detailedContent?.images || []).filter((_, i) => i !== index);
                                          updateItem('case-study', caseStudy.id, { 
                                            detailedContent: { ...caseStudy.detailedContent, images: newImages }
                                          });
                                        }}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    const newImages = [...(caseStudy.detailedContent?.images || []), { url: "", caption: "", alt: "" }];
                                    updateItem('case-study', caseStudy.id, { 
                                      detailedContent: { ...caseStudy.detailedContent, images: newImages }
                                    });
                                  }}
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Image
                                </Button>
                              </div>
                            </div>

                            {/* Additional Metrics */}
                            <div className="space-y-4">
                              <Label>Additional Metrics</Label>
                              <div className="space-y-3">
                                {(caseStudy.detailedContent?.additionalMetrics || []).map((metric, index) => (
                                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 border rounded-lg">
                                    <div>
                                      <Label htmlFor={`metric-${index}-name`}>Metric Name</Label>
                                      <Input
                                        id={`metric-${index}-name`}
                                        value={metric.name}
                                        onChange={(e) => {
                                          const newMetrics = [...(caseStudy.detailedContent?.additionalMetrics || [])];
                                          newMetrics[index] = { ...metric, name: e.target.value };
                                          updateItem('case-study', caseStudy.id, { 
                                            detailedContent: { ...caseStudy.detailedContent, additionalMetrics: newMetrics }
                                          });
                                        }}
                                        placeholder="e.g., CTR, Impression Share"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor={`metric-${index}-value`}>Value</Label>
                                      <Input
                                        id={`metric-${index}-value`}
                                        value={metric.value}
                                        onChange={(e) => {
                                          const newMetrics = [...(caseStudy.detailedContent?.additionalMetrics || [])];
                                          newMetrics[index] = { ...metric, value: e.target.value };
                                          updateItem('case-study', caseStudy.id, { 
                                            detailedContent: { ...caseStudy.detailedContent, additionalMetrics: newMetrics }
                                          });
                                        }}
                                        placeholder="e.g., 3.2%, 85%"
                                      />
                                    </div>
                                    <div className="flex items-end">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const newMetrics = (caseStudy.detailedContent?.additionalMetrics || []).filter((_, i) => i !== index);
                                          updateItem('case-study', caseStudy.id, { 
                                            detailedContent: { ...caseStudy.detailedContent, additionalMetrics: newMetrics }
                                          });
                                        }}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    const newMetrics = [...(caseStudy.detailedContent?.additionalMetrics || []), { name: "", value: "", description: "" }];
                                    updateItem('case-study', caseStudy.id, { 
                                      detailedContent: { ...caseStudy.detailedContent, additionalMetrics: newMetrics }
                                    });
                                  }}
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Metric
                                </Button>
                              </div>
                            </div>
                          </div>

                          <Button onClick={() => setEditingItem(null)} className="w-full">
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{caseStudy.category}</Badge>
                            <Badge variant="outline">{caseStudy.industry}</Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                              { metric: caseStudy.results?.metric1, color: "green" },
                              { metric: caseStudy.results?.metric2, color: "blue" },
                              { metric: caseStudy.results?.metric3, color: "purple" },
                              { metric: caseStudy.results?.metric4, color: "orange" }
                            ].map(({ metric, color }, index) => {
                              if (!metric || !metric.name) {
                                return (
                                  <div key={index} className="text-center p-3 bg-slate-50 rounded-lg">
                                    <p className="text-sm text-slate-600">Loading...</p>
                                  </div>
                                );
                              }

                              const formatValue = (value: number | null | undefined, format: string | null | undefined) => {
                                const safe = typeof value === 'number' && !Number.isNaN(value) ? value : 0;
                                const fmt = format || 'number';
                                if (fmt === 'currency') {
                                  return safe >= 1000 ? `$${(safe/1000).toFixed(0)}K` : `$${safe}`;
                                }
                                if (fmt === 'percentage') {
                                  return `${safe}%`;
                                }
                                if (fmt === 'percentage-points') {
                                  return `${safe}pp`;
                                }
                                return String(safe);
                              };
                              
                              return (
                                <div key={index} className={`text-center p-3 bg-slate-50 rounded-lg`}>
                                  <p className="text-sm text-slate-600">{metric.name}</p>
                                  <p className={`text-lg font-bold text-${color}-600`}>
                                    {formatValue(metric.before, metric.format)} → {formatValue(metric.after, metric.format)}
                                  </p>
                                  <p className={`text-xs text-${color}-600`}>
                                    {metric.improvement > 0 ? '+' : ''}{metric.improvement}%
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Product Categories Tab */}
          {activeTab === "categories" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Product Categories</h2>
                  <p className="text-slate-600">Manage product categories and organization</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button onClick={() => addNewItem('category')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category) => (
                  <Card key={category.id} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant={category.isActive ? "default" : "secondary"}>
                          {category.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingItem(editingItem === category.id ? null : category.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleItemStatus('category', category.id)}
                          >
                            {category.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteItem('category', category.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {editingItem === category.id ? (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Category Name</Label>
                            <Input
                              id="name"
                              value={category.name}
                              onChange={(e) => updateItem('category', category.id, { name: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={category.description}
                              onChange={(e) => updateItem('category', category.id, { description: e.target.value })}
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                              id="slug"
                              value={category.slug}
                              onChange={(e) => updateItem('category', category.id, { slug: e.target.value })}
                              placeholder="category-slug"
                            />
                          </div>
                          <div>
                            <Label htmlFor="productCount">Product Count</Label>
                            <Input
                              id="productCount"
                              type="number"
                              value={category.productCount}
                              onChange={(e) => updateItem('category', category.id, { productCount: parseInt(e.target.value) })}
                            />
                          </div>
                          <Button onClick={() => setEditingItem(null)} className="w-full">
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <h3 className="font-semibold text-lg">{category.name}</h3>
                          <p className="text-sm text-slate-600">{category.description}</p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Slug: {category.slug}</span>
                            <Badge variant="outline">{category.productCount} products</Badge>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* LemonSqueezy Tab */}
          {activeTab === "lemonsqueezy" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">LemonSqueezy Integration</h2>
                <p className="text-slate-600">Connect and manage your LemonSqueezy products</p>
              </div>
              <LemonSqueezyIntegration />
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
                <p className="text-slate-600">Configure your admin panel and integrations</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>LemonSqueezy Integration</CardTitle>
                    <CardDescription>Configure your LemonSqueezy API settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="api-key">API Key</Label>
                      <Input
                        id="api-key"
                        type="password"
                        placeholder="Enter your LemonSqueezy API key"
                      />
                    </div>
                    <div>
                      <Label htmlFor="store-id">Store ID</Label>
                      <Input
                        id="store-id"
                        placeholder="Enter your store ID"
                      />
                    </div>
                    <Button className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Save Settings
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Content Settings</CardTitle>
                    <CardDescription>Configure content display preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto-save changes</Label>
                        <p className="text-sm text-slate-600">Automatically save changes as you type</p>
                      </div>
                      <Button variant="outline" size="sm">Toggle</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show inactive items</Label>
                        <p className="text-sm text-slate-600">Display inactive testimonials and case studies</p>
                      </div>
                      <Button variant="outline" size="sm">Toggle</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable analytics</Label>
                        <p className="text-sm text-slate-600">Track content performance and engagement</p>
                      </div>
                      <Button variant="outline" size="sm">Toggle</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                    <CardDescription>Manage your content data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Export All Data
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Data
                    </Button>
                    <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All Data
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Backup & Recovery</CardTitle>
                    <CardDescription>Manage backups and restore data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-slate-600">
                      <p>Last backup: 2 hours ago</p>
                      <p>Backup size: 2.3 MB</p>
                      <p>Items backed up: {testimonials.length + caseStudies.length + productCategories.length}</p>
                    </div>
                    <Button className="w-full">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Create Backup
                    </Button>
                    <Button variant="outline" className="w-full">
                      Restore from Backup
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
