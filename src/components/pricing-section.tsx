"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, TrendingUp, Calendar, Bot, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 px-4"
          >
            Flexible plans for growth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg lg:text-xl text-muted-foreground px-4"
          >
            Transparent pricing designed to fit your requirements.
          </motion.p>
        </div>

        <Tabs defaultValue="monthly" className="w-full ">
          <div className="flex justify-center mb-8 md:mb-12">
            <TabsList className="inline-flex h-auto items-center justify-center rounded-lg bg-muted/20 p-1 flex-wrap gap-1 max-w-full">
              <TabsTrigger 
                value="monthly" 
                className="flex items-center gap-2 px-3 py-2 md:px-6 text-xs md:text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:!text-white data-[state=active]:!font-bold data-[state=active]:!border-2 data-[state=active]:!border-primary data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground [&[data-state=active]_svg]:!text-primary"
              >
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Monthly Consulting</span>
                <span className="sm:hidden">Monthly</span>
              </TabsTrigger>
              <TabsTrigger 
                value="audit" 
                className="flex items-center gap-2 px-3 py-2 md:px-6 text-xs md:text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:!text-white data-[state=active]:!font-bold data-[state=active]:!border-2 data-[state=active]:!border-primary data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground [&[data-state=active]_svg]:!text-primary"
              >
                <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">One-time Audit</span>
                <span className="sm:hidden">Audit</span>
              </TabsTrigger>
              <TabsTrigger 
                value="Automate Marketing Tasks" 
                className="flex items-center gap-2 px-3 py-2 md:px-6 text-xs md:text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:!text-white data-[state=active]:!font-bold data-[state=active]:!border-2 data-[state=active]:!border-primary data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground [&[data-state=active]_svg]:!text-primary"
              >
                <Bot className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Automate Marketing Tasks</span>
                <span className="sm:hidden">Custom</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Monthly Consulting Tab */}
          <TabsContent value="monthly">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto">
              {/* With Meetings */}
              <Card className="flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Cancel Anytime - With Meetings</CardTitle>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    Full support with weekly meetings. Perfect for hands-on collaboration and strategic planning.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="text-2xl font-bold mb-6">$3,990 / monthly</div>
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">Paid Ads Audit + Action Plan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">Consulting & Ads Strategy Management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">Weekly Calls + Slack Channel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">No Contract - Cancel anytime</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">Fixed Retainer billed monthly</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3 pt-6">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => window.open('https://calendar.app.google/UxGcM27wsoNqLHL1A', '_blank')}
                  >
                    Book a Call
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                    onClick={() => window.open('https://tally.so/r/w5je2P', '_blank')}
                  >
                    Form Request - eCom
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                    onClick={() => window.open('https://tally.so/r/mOk2l7', '_blank')}
                  >
                    Form Request - Services
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Pay for Results */}
              <Card className="relative flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <CardTitle className="text-lg">Pay for Results</CardTitle>
                    </div>
                    <Badge className="bg-primary text-primary-foreground text-xs">Favorite Pick</Badge>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    A performance model that rewards growth. We win when you do. Flat monthly fee + success bonus. 3-month minimum.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="text-2xl font-bold mb-6">from $2,500 + success fee</div>
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">Paid Ads Audit + Action Plan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">Consulting & Ads Strategy Management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">Regular Calls + Slack Channel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">Pay for Results (3-month contract)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">Flat Retainer billed monthly + Success Fee billed quarterly</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3 pt-6">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => window.open('https://calendar.app.google/UxGcM27wsoNqLHL1A', '_blank')}
                  >
                    Book a Call
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                    onClick={() => window.open('https://tally.so/r/w5je2P', '_blank')}
                  >
                    Form Request - eCom
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                    onClick={() => window.open('https://tally.so/r/mOk2l7', '_blank')}
                  >
                    Form Request - Services
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* One-time Audit Tab */}
          <TabsContent value="audit">
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <CardTitle>Standalone Audit</CardTitle>
                  </div>
                  <CardDescription>
                    Get a fresh pair of eyes audit your current marketing efforts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">$2,000 / one-time payment</div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Tactical Audit - Optimising inside Google / Meta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Strategic Audit - Optimising your overall Marketing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">3-month Action Plan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Video Audit + Transcript</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => window.open('https://tally.so/r/w5je2P', '_blank')}
                  >
                    Request Audit - eCom
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => window.open('https://tally.so/r/mOk2l7', '_blank')}
                  >
                    Request Audit - Services
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open('https://ecommvert.notion.site/Google-Ads-Audit-1ce046f46b5c80e190abdf1685d963f6?pvs=4', '_blank')}
                  >
                    Example Content
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Automate Marketing Tasks Tab */}
          <TabsContent value="Automate Marketing Tasks">
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <CardTitle>Automate Marketing Tasks</CardTitle>
                  </div>
                  <CardDescription>
                    Custom automation solutions built specifically for your business needs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">from €500</div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Custom Make.com Workflows</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">N8n Automation Solutions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Google Sheets Integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">API Connections & Data Sync</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Documentation & Training</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Request Custom Solution
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}