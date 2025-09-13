"use client";

import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  MessageCircle,
  Mail,
  Phone,
  Linkedin,
  Twitter
} from "lucide-react";

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
              <Button variant="ghost" size="sm" className="p-2">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Strategic Oversight</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Campaign Architecture</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Performance Analysis</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Competitive Analysis</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Free Audit</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Strategy Guide</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Get Started</h3>
            <div className="space-y-3">
              <Button size="sm" className="w-full">
                Schedule Strategy Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@ecommvert.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
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
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}