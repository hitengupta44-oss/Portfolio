"use client";

import { useEffect } from "react";

export function useFocusScroll(focus) {
  useEffect(() => {
    if (!focus) return undefined;
    const timer = window.setTimeout(() => {
      document.getElementById(`section-${focus}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
    return () => window.clearTimeout(timer);
  }, [focus]);
}
