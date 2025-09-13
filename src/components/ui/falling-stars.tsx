"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FallingStars = React.memo(
  ({ className }: { className?: string }) => {
    // Generate random stars with different properties
    const stars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Random x position (0-100%)
      delay: Math.random() * 10, // Random delay (0-10s)
      duration: Math.random() * 3 + 2, // Random duration (2-5s)
      size: Math.random() * 3 + 1, // Random size (1-4px)
      opacity: Math.random() * 0.5 + 0.3, // Random opacity (0.3-0.8)
    }));

    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: '-10px',
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(255, 255, 255, 0.3)`,
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [`0px`, `${Math.random() * 200 - 100}px`], // Slight horizontal drift
              opacity: [star.opacity, 0],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: Math.random() * 5 + 5, // Random delay between repeats
            }}
          />
        ))}
        
        {/* Additional shooting stars with trails */}
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-20px',
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [`0px`, `${Math.random() * 300 - 150}px`],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              delay: Math.random() * 15,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: Math.random() * 10 + 10,
            }}
          >
            {/* Star */}
            <div 
              className="w-2 h-2 bg-white rounded-full absolute"
              style={{
                boxShadow: '0 0 6px 3px rgba(255, 255, 255, 0.6)',
              }}
            />
            {/* Trail */}
            <div 
              className="absolute top-1 left-1 w-20 h-0.5 bg-gradient-to-r from-white to-transparent"
              style={{
                transform: 'rotate(-45deg)',
                transformOrigin: 'left center',
              }}
            />
          </motion.div>
        ))}
      </div>
    );
  },
);

FallingStars.displayName = "FallingStars";
