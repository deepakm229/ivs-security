"use client";

import { useSyncExternalStore } from "react";

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
}

function subscribeDesktopParallax(callback: () => void) {
  const mediaQuery = window.matchMedia("(min-width: 768px)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getDesktopParallaxSnapshot() {
  return window.matchMedia("(min-width: 768px)").matches;
}

export function useDesktopParallax() {
  return useSyncExternalStore(
    subscribeDesktopParallax,
    getDesktopParallaxSnapshot,
    () => false,
  );
}
