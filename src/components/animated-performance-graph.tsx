"use client";

import { useEffect, useRef, useState } from "react";

interface PerformanceGraphProps {
  className?: string;
}

export function AnimatedPerformanceGraph({ className = "" }: PerformanceGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [pulsingDot, setPulsingDot] = useState(0);

  // Performance data
  const currentPerformance = [95, 100, 105, 108, 110, 115];
  const withConsulting = [105, 118, 115, 140, 130, 170];
  const months = ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Pulsing dot animation
    const interval = setInterval(() => {
      setPulsingDot((prev) => (prev + 1) % months.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Set up drawing parameters
      const padding = 40;
      const chartWidth = width - padding * 2;
      const chartHeight = height - padding * 2;
      const chartY = padding;
      const chartX = padding;

      // Draw grid lines
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.1;

      // Horizontal grid lines
      for (let i = 0; i <= 5; i++) {
        const y = chartY + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(chartX, y);
        ctx.lineTo(chartX + chartWidth, y);
        ctx.stroke();
      }

      // Vertical grid lines
      for (let i = 0; i <= 5; i++) {
        const x = chartX + (chartWidth / 5) * i;
        ctx.beginPath();
        ctx.moveTo(x, chartY);
        ctx.lineTo(x, chartY + chartHeight);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      // Draw current performance line (50% transparent) - smooth curve
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.5;
      ctx.setLineDash([5, 5]);

      // Create smooth curve for current performance
      ctx.beginPath();
      const currentPoints = currentPerformance.map((value, index) => ({
        x: chartX + (chartWidth / 5) * index,
        y: chartY + chartHeight - ((value - 90) / 85) * chartHeight
      }));

      // Draw smooth curve
      ctx.moveTo(currentPoints[0].x, currentPoints[0].y);
      for (let i = 1; i < currentPoints.length; i++) {
        const prevPoint = currentPoints[i - 1];
        const currentPoint = currentPoints[i];
        const nextPoint = currentPoints[i + 1] || currentPoint;
        
        const cp1x = prevPoint.x + (currentPoint.x - prevPoint.x) / 3;
        const cp1y = prevPoint.y;
        const cp2x = currentPoint.x - (nextPoint.x - currentPoint.x) / 3;
        const cp2y = currentPoint.y;
        
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, currentPoint.x, currentPoint.y);
      }
      ctx.stroke();

      // Draw current performance dots
      currentPerformance.forEach((value, index) => {
        const x = chartX + (chartWidth / 5) * index;
        const y = chartY + chartHeight - ((value - 90) / 85) * chartHeight;
        
        ctx.fillStyle = "#ef4444";
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Draw "With Consulting" line with animation - smooth curve
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "#8b5cf6";
      ctx.lineWidth = 2;

      const animatedData = withConsulting.map((value, index) => {
        const progress = Math.max(0, Math.min(1, animationProgress * 6 - index));
        const animatedValue = currentPerformance[index] + (value - currentPerformance[index]) * progress;
        return {
          value: animatedValue,
          x: chartX + (chartWidth / 5) * index,
          y: chartY + chartHeight - ((animatedValue - 90) / 85) * chartHeight,
          progress: progress
        };
      });

      // Draw the animated smooth curve
      ctx.beginPath();
      const visiblePoints = animatedData.filter(point => point.progress > 0);
      
      if (visiblePoints.length > 1) {
        ctx.moveTo(visiblePoints[0].x, visiblePoints[0].y);
        for (let i = 1; i < visiblePoints.length; i++) {
          const prevPoint = visiblePoints[i - 1];
          const currentPoint = visiblePoints[i];
          const nextPoint = visiblePoints[i + 1] || currentPoint;
          
          const cp1x = prevPoint.x + (currentPoint.x - prevPoint.x) / 3;
          const cp1y = prevPoint.y;
          const cp2x = currentPoint.x - (nextPoint.x - currentPoint.x) / 3;
          const cp2y = currentPoint.y;
          
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, currentPoint.x, currentPoint.y);
        }
      }
      ctx.stroke();

      // Draw "With Consulting" dots
      animatedData.forEach((point, index) => {
        const progress = Math.max(0, Math.min(1, animationProgress * 6 - index));
        if (progress > 0) {
          ctx.fillStyle = "#8b5cf6";
          ctx.globalAlpha = progress;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
          ctx.fill();
        }
      });

      // Draw filled area between lines with smooth curves - fixed to prevent overlap
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = "#8b5cf6";
      ctx.beginPath();
      
      // Start from first current performance point
      ctx.moveTo(currentPoints[0].x, currentPoints[0].y);

      // Draw current performance smooth curve
      for (let i = 1; i < currentPoints.length; i++) {
        const prevPoint = currentPoints[i - 1];
        const currentPoint = currentPoints[i];
        const nextPoint = currentPoints[i + 1] || currentPoint;
        
        const cp1x = prevPoint.x + (currentPoint.x - prevPoint.x) / 3;
        const cp1y = prevPoint.y;
        const cp2x = currentPoint.x - (nextPoint.x - currentPoint.x) / 3;
        const cp2y = currentPoint.y;
        
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, currentPoint.x, currentPoint.y);
      }

      // Draw animated "With Consulting" line in reverse with smooth curves
      // Only draw the filled area for the visible portion
      if (visiblePoints.length > 1) {
        // Start from the last visible point and work backwards
        const lastVisiblePoint = visiblePoints[visiblePoints.length - 1];
        ctx.lineTo(lastVisiblePoint.x, lastVisiblePoint.y);
        
        // Draw the reverse curve for the visible portion
        for (let i = visiblePoints.length - 2; i >= 0; i--) {
          const currentPoint = visiblePoints[i];
          const prevPoint = visiblePoints[i + 1];
          const nextPoint = visiblePoints[i - 1] || currentPoint;
          
          const cp1x = prevPoint.x + (currentPoint.x - prevPoint.x) / 3;
          const cp1y = prevPoint.y;
          const cp2x = currentPoint.x - (nextPoint.x - currentPoint.x) / 3;
          const cp2y = currentPoint.y;
          
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, currentPoint.x, currentPoint.y);
        }
      }

      ctx.closePath();
      ctx.fill();

      // Draw Y-axis label
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#ffffff";
      ctx.font = "12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.save();
      ctx.translate(15, chartY + chartHeight / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("% Growth", 0, 0);
      ctx.restore();

      // Draw month labels
      months.forEach((month, index) => {
        const x = chartX + (chartWidth / 5) * index;
        const y = height - 10;
        ctx.fillText(month, x, y);
      });

      // Draw pulsing dot for current month
      const currentMonthX = chartX + (chartWidth / 5) * pulsingDot;
      const currentMonthY = height - 10;
      
      ctx.fillStyle = "#8b5cf6";
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(currentMonthX, currentMonthY - 15, 4, 0, 2 * Math.PI);
      ctx.fill();
    };

    draw();
  }, [animationProgress, pulsingDot, currentPerformance, months, withConsulting]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: "transparent" }}
      />
      
      {/* Legend - moved to top */}
      <div className="absolute top-4 left-4 right-4">
        <div className="flex justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-red-500 opacity-50" style={{ borderTop: "2px dashed #ef4444" }}></div>
            <span className="text-white/80">Current Performance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-purple-500"></div>
            <span className="text-white/80">With Consulting</span>
          </div>
        </div>
      </div>
    </div>
  );
}
