import { useState, useEffect } from "react";

export const useBreakpoint = (breakpoint: string) => {
  const [isBreakpoint, setIsBreakpoint] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      switch (breakpoint) {
        case "sm":
          setIsBreakpoint(width >= 640);
          break;
        case "md":
          setIsBreakpoint(width >= 768);
          break;
        case "lg":
          setIsBreakpoint(width >= 1024);
          break;
        case "xl":
          setIsBreakpoint(width >= 1280);
          break;
        default:
          setIsBreakpoint(false);
      }
    };

    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, [breakpoint]);

  return isBreakpoint;
};
