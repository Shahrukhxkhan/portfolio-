import { useEffect, useState } from "react";

export interface PerformancePreferences {
  reducedMotion: boolean;
  isLowPowerOrMobile: boolean;
  shouldPauseParticles: boolean;
}

export function usePerformanceMode(): PerformancePreferences {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const [isLowPowerOrMobile, setIsLowPowerOrMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const isMobileScreen = window.innerWidth < 768;
    const isLowConcurrency = typeof navigator !== "undefined" && (navigator.hardwareConcurrency || 4) <= 2;
    return isMobileScreen || isLowConcurrency;
  });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", handleMotionChange);
    } else {
      motionQuery.addListener(handleMotionChange);
    }

    const checkDeviceConditions = () => {
      const isMobileScreen = window.innerWidth < 768;
      const isLowConcurrency = (navigator.hardwareConcurrency || 4) <= 2;
      setIsLowPowerOrMobile(isMobileScreen || isLowConcurrency);
    };

    window.addEventListener("resize", checkDeviceConditions, { passive: true });

    return () => {
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener("change", handleMotionChange);
      } else {
        motionQuery.removeListener(handleMotionChange);
      }
      window.removeEventListener("resize", checkDeviceConditions);
    };
  }, []);

  return {
    reducedMotion,
    isLowPowerOrMobile,
    shouldPauseParticles: reducedMotion,
  };
}
