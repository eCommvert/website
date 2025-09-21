"use client";

import React, { useRef, useState, useEffect, HTMLAttributes } from "react";

type CardContainerProps = {
  className?: string;
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function CardContainer({ className = "", children, ...props }: CardContainerProps) {
  return (
    <div
      className={`[perspective:1000px] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

type CardBodyProps = {
  className?: string;
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function CardBody({ className = "", children, ...props }: CardBodyProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState<string>("rotateX(0deg) rotateY(0deg)");

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current as HTMLDivElement;

    function handleMouseMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 20; // tilt left/right
      const rotateX = (0.5 - py) * 20; // tilt up/down
      setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    }

    function handleMouseLeave() {
      setTransform("rotateX(0deg) rotateY(0deg)");
    }

    el.addEventListener("mousemove", handleMouseMove as EventListener);
    el.addEventListener("mouseleave", handleMouseLeave as EventListener);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove as EventListener);
      el.removeEventListener("mouseleave", handleMouseLeave as EventListener);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`[transform-style:preserve-3d] transition-transform duration-200 ease-out ${className}`}
      style={{ transform }}
      {...props}
    >
      {children}
    </div>
  );
}

type AsElement = React.ElementType;

type CardItemProps<As extends AsElement> = {
  as?: As;
  className?: string;
  children?: React.ReactNode;
  translateZ?: number | string;
} & Omit<React.ComponentPropsWithoutRef<As>, "as" | "children" | "className">;

export function CardItem<As extends AsElement = "div">({
  as,
  className = "",
  children,
  translateZ = 0,
  ...props
}: CardItemProps<As>) {
  const Comp = (as || "div") as AsElement;
  const z = typeof translateZ === "number" ? `${translateZ}px` : translateZ;
  return (
    <Comp
      className={className}
      style={{ transform: `translateZ(${z})`, transformStyle: "preserve-3d" }}
      {...props}
    >
      {children}
    </Comp>
  );
}


