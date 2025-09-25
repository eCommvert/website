"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, MessageCircle, Mail } from "lucide-react";
import { SiLinkedin, SiX } from "react-icons/si";

export function SiteFooter() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">eC</span>
              </div>
              <span className="font-bold text-xl">eCommvert</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Strategic PPC partner for e-commerce brands spending $10K+/month. 
              Senior expertise with immediate availability.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.linkedin.com/in/denis-capko/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-accent transition-colors">
                <SiLinkedin className="w-4 h-4" />
              </Link>
              <Link href="https://x.com/CapkoDenis" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-accent transition-colors">
                <SiX className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Services (Home anchors) */}
          <div className="space-y-4">
            <h3 className="font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#audits" className="hover:text-primary transition-colors">
                  Strategic Audits
                </Link>
              </li>
              <li>
                <Link href="/#consulting" className="hover:text-primary transition-colors">
                  Monthly Consulting
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-primary transition-colors">
                  Digital Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/case-studies" className="hover:text-primary transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-primary transition-colors">
                  Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Get Started</h3>
            <div className="space-y-3">
              <Link href="/contact" className="w-full">
                <Button size="sm" className="w-full">
                Schedule Strategy Call
                <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
              </Link>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@ecommvert.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 eCommvert. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}