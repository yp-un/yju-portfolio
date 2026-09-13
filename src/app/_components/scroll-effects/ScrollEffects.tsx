"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollEffects() {
  const pathname = usePathname();
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || reducedMotion.matches) return;
        if (entry.target instanceof HTMLElement) entry.target.dataset.revealed = "true";
        animations.push(entry.target.animate([{ opacity: .25, transform: "translateY(24px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" }));
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((element) => observer.observe(element));
    const stopAnimations = () => {
      if (reducedMotion.matches) {
        observer.disconnect();
        animations.forEach((animation) => animation.cancel());
      }
    };
    reducedMotion.addEventListener("change", stopAnimations);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      reducedMotion.removeEventListener("change", stopAnimations);
    };
  }, [pathname]);
  return null;
}
