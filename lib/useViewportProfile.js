"use client";

import { useEffect, useState } from "react";

function readProfile() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
    compact: width < 768,
    coarsePointer: window.matchMedia("(pointer: coarse)").matches,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
}

export function useViewportProfile() {
  const [viewport, setViewport] = useState(readProfile);

  useEffect(() => {
    const update = () => setViewport(readProfile());
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    window.addEventListener("resize", update);
    motionQuery.addEventListener("change", update);
    return () => {
      window.removeEventListener("resize", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return viewport;
}

export function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
