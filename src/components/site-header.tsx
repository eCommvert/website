"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Menu, 
  X,
  ArrowRight,
  User,
  FileText,
  Bot,
  Grid3X3,
  Mountain,
  Network
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">eC</span>
              </div>
              <span className="font-bold text-xl">eCommvert<span className="text-orange-500">.</span></span>
            </div>
          </div>

          {/* Desktop Navigation */}
          {isMounted && (
            <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {/* Marketing Consulting */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50">
                  Marketing Consulting
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink href="#pricing" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">Monthly Consulting</div>
                        <div className="text-xs text-muted-foreground">We will consult your Ad campaigns and manage your agency or internal team</div>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="#pricing" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">One-time Audit</div>
                        <div className="text-xs text-muted-foreground">Get an unbiased view on your campaigns</div>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="#pricing" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">Done-for-You Automatisation</div>
                        <div className="text-xs text-muted-foreground">Let us automate your Advertising Workflows</div>
                      </div>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Tools & Automatisation */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50">
                  Tools & Automatisation
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <NavigationMenuLink href="/tools" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Grid3X3 className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">All Tools</div>
                        <div className="text-xs text-muted-foreground">50+ Pages of Google Ads & GA4 Insights</div>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/tools" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Mountain className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">By Platform</div>
                        <div className="text-xs text-muted-foreground">Google Ads, Google Analytics 4, Meta</div>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/tools" className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Network className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">By Automatisation tool</div>
                        <div className="text-xs text-muted-foreground">Looker Studio, Make, N8n, Google Sheets</div>
                      </div>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          )}

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Get in touch
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t"
            >
              <nav className="py-4 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Marketing Consulting</div>
                  <a href="#pricing" className="block text-sm hover:text-primary transition-colors ml-4">
                    Monthly Consulting
                  </a>
                  <a href="#pricing" className="block text-sm hover:text-primary transition-colors ml-4">
                    One-time Audit
                  </a>
                  <a href="#pricing" className="block text-sm hover:text-primary transition-colors ml-4">
                    Done-for-You Automatisation
                  </a>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Tools & Automatisation</div>
                  <a href="/tools" className="block text-sm hover:text-primary transition-colors ml-4">
                    All Tools
                  </a>
                  <a href="/tools" className="block text-sm hover:text-primary transition-colors ml-4">
                    By Platform
                  </a>
                  <a href="/tools" className="block text-sm hover:text-primary transition-colors ml-4">
                    By Automatisation tool
                  </a>
                </div>
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Theme</span>
                    <ThemeToggle />
                  </div>
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                    Get in touch
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}