"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export const StatsSection = () => {
  const stats = [
    { value: "€2.7M", label: "Saved for Clients" },
    { value: "284%", label: "Revenue Growth" },
    { value: "600+", label: "Email List Built" },
    { value: "€10K", label: "Monthly Goal" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 via-transparent to-purple-500/5"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group hover:shadow-2xl hover:shadow-purple-500/20">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 transition-all duration-300 group-hover:scale-105">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-semibold text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
