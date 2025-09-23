"use client";

import { cn } from "@/lib/utils";
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

interface MousePosition {
  x: number;
  y: number;
}

function MousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "");

  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

interface Circle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  color: string;
}

export default function Particles({
  className,
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  // const mousePosition = MousePosition();
  // const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  // const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rafID = useRef<number>(0);
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null);

  const resizeCanvas = useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;

      canvasRef.current.width = canvasSize.current.w;
      canvasRef.current.height = canvasSize.current.h;
    }
  }, []);

  const clearContext = useCallback(() => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    }
  }, []);

  const drawCircle = useCallback((circle: Circle) => {
    if (!context.current) return;
    const { x, y, alpha, color } = circle;
    context.current.save();
    context.current.globalAlpha = alpha;
    context.current.beginPath();
    context.current.arc(x, y, size, 0, 2 * Math.PI);
    context.current.fillStyle = color;
    context.current.fill();
    context.current.restore();
  }, [size]);

  const circleParams = useCallback((): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const pSize = Math.floor(Math.random() * 2) + size;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const colorValue = hexToRgb(color);
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      color: `rgba(${colorValue.join(", ")}, ${alpha})`,
    };
  }, [color, size]);

  const drawParticles = useCallback(() => {
    clearContext();
    circles.current = [];
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      circles.current.push(circle);
      drawCircle(circle);
    }
  }, [quantity, clearContext, circleParams, drawCircle]);

  const animate = useCallback(() => {
    clearContext();
    circles.current.forEach((circle: Circle) => {
      // Keep alpha stable at target value
      circle.alpha = circle.targetAlpha;
      
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;

      // Wrap particles around edges
      if (circle.x < 0) circle.x = canvasSize.current.w;
      if (circle.x > canvasSize.current.w) circle.x = 0;
      if (circle.y < 0) circle.y = canvasSize.current.h;
      if (circle.y > canvasSize.current.h) circle.y = 0;

      // Update color with current alpha
      const colorValue = hexToRgb(color);
      circle.color = `rgba(${colorValue.join(", ")}, ${circle.alpha})`;
      drawCircle(circle);
    });

    rafID.current = window.requestAnimationFrame(animate);
  }, [clearContext, drawCircle, vx, vy, color]);

  const initCanvas = useCallback(() => {
    resizeCanvas();
    drawParticles();
  }, [resizeCanvas, drawParticles]);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    if (context.current) {
      initCanvas();
    }

    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = setTimeout(() => {
        initCanvas();
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [color, initCanvas]);

  
  useEffect(() => {
    initCanvas();
  }, [refresh, initCanvas]);

  // Update mouse position smoothly - only when canvas is ready
  // useEffect(() => {
  //   if (canvasRef.current && canvasSize.current.w > 0) {
  //     const rect = canvasRef.current.getBoundingClientRect();
  //     mouse.current.x = mousePosition.x - rect.left;
  //     mouse.current.y = mousePosition.y - rect.top;
  //   }
  // }, [mousePosition.x, mousePosition.y]);

  // Start animation loop
  useEffect(() => {
    rafID.current = window.requestAnimationFrame(animate);
    return () => {
      if (rafID.current) {
        window.cancelAnimationFrame(rafID.current);
      }
    };
  }, [animate]);

  return (
    <div
      className={cn("pointer-events-none", className)}
      {...props}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
}

export { Particles };